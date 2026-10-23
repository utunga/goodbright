#!/usr/bin/env node
/* =====================================================================
   Kitty sync server — run on the laptop; Kitty on the phone and in the
   laptop's browser sync through it while they're on the same network.

   No dependencies beyond Node 18+. Keeps its own merged copy of the lists in
   ~/.kitty-sync (doc.json, plus a dated copy per day in backups/).

     tailscale serve --bg 8787           # once: Tailscale gives it an HTTPS name
     node kitty/server/kitty-sync.js     # listens on 127.0.0.1:8787 only

     node kitty/server/kitty-sync.js --cert host.pem --key host-key.pem
                                         # or: own certificate, open to the LAN

   On start it prints a pairing code (valid 10 minutes). In Kitty: menu →
   Sync with laptop → enter the address and the code. Restart for a new code.
   See README.md for setup.

   Endpoints (JSON):
     POST /pair   { code, name }        → { token, server }
     POST /sync   { doc }  + Bearer     → { doc }      merged copy, both ways
     GET  /events?token=…               → server-sent "changed" events
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const K = require('../crdt.js');

// ---------- options ----------
const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i < 0 ? dflt : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };
if (opt('help')) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]); process.exit(0); }
const PORT = Number(opt('port', process.env.KITTY_PORT || 8787));
const DATA = path.resolve(String(opt('data', process.env.KITTY_DATA || path.join(os.homedir(), '.kitty-sync'))).replace(/^~(?=\/|$)/, os.homedir()));
const CERT = opt('cert', process.env.KITTY_CERT), KEY = opt('key', process.env.KITTY_KEY);
const HOST = String(opt('host', CERT && KEY ? '0.0.0.0' : '127.0.0.1'));
// Without a certificate we serve plain HTTP to this machine only, for
// `tailscale serve` to put HTTPS in front of.
const PLAIN = !CERT || !KEY;
const ORIGINS = String(opt('origin', process.env.KITTY_ORIGINS || 'https://goodbright.nz,https://www.goodbright.nz')).split(',').map(s => s.trim()).filter(Boolean);
const NAME = String(opt('name', os.hostname().replace(/\.local$/, '')));

// ---------- storage ----------
fs.mkdirSync(path.join(DATA, 'backups'), { recursive: true });
const DOC_FILE = path.join(DATA, 'doc.json'), TOKENS_FILE = path.join(DATA, 'tokens.json');
const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') console.error(`Couldn't read ${f}:`, e.message); return d; } };
function writeJSON(f, v) {
  const tmp = f + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(v));
  fs.renameSync(tmp, f);
}
let doc = K.cleanDoc(readJSON(DOC_FILE, null));
const tokens = readJSON(TOKENS_FILE, {});
function saveDoc() {
  writeJSON(DOC_FILE, doc);
  const day = new Date().toISOString().slice(0, 10);
  const b = path.join(DATA, 'backups', `doc-${day}.json`);
  writeJSON(b, doc);
  // keep the most recent 30 days
  const old = fs.readdirSync(path.join(DATA, 'backups')).filter(f => /^doc-\d{4}-\d\d-\d\d\.json$/.test(f)).sort().slice(0, -30);
  for (const f of old) try { fs.unlinkSync(path.join(DATA, 'backups', f)); } catch (_) {}
}

// ---------- pairing ----------
let pairCode = String(crypto.randomInt(0, 1e6)).padStart(6, '0');
let pairUntil = Date.now() + 10 * 60e3, pairMisses = 0;
const pretty = c => c.slice(0, 3) + ' ' + c.slice(3);

// ---------- live clients (server-sent events) ----------
const listeners = new Set();
function announce(except) {
  for (const l of listeners) if (l.token !== except) l.res.write('event: changed\ndata: {}\n\n');
}

// ---------- http ----------
function cors(req, res) {
  const o = req.headers.origin;
  if (o && (ORIGINS.includes(o) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))) {
    res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // Chrome asks before a public page talks to a machine on the local network.
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    res.setHeader('Access-Control-Max-Age', '600');
  }
}
const send = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
function readBody(req) {
  return new Promise((resolve, reject) => {
    let n = 0; const chunks = [];
    req.on('data', c => { n += c.length; if (n > 8e6) { reject(Object.assign(new Error('too big'), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (_) { reject(Object.assign(new Error('bad json'), { status: 400 })); } });
    req.on('error', reject);
  });
}
function auth(req, url) {
  const h = req.headers.authorization || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : url.searchParams.get('token');
  if (!t || !Object.prototype.hasOwnProperty.call(tokens, t)) return null;
  tokens[t].seen = Date.now();
  return t;
}
const log = (...a) => console.log(new Date().toTimeString().slice(0, 8), ...a);

async function handle(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  const url = new URL(req.url, 'http://x');
  try {
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(`Kitty sync server on ${NAME} is running.\nIf you can read this on your phone, the certificate is trusted and Kitty can pair.\n`);
    }
    if (req.method === 'POST' && url.pathname === '/pair') {
      const b = await readBody(req);
      const code = String(b.code || '').replace(/\D/g, '');
      if (Date.now() > pairUntil || pairMisses >= 5) return send(res, 410, { error: 'The pairing code has expired. Restart the sync server on the laptop for a new one.' });
      if (code !== pairCode) { pairMisses++; return send(res, 403, { error: 'That code doesn’t match.' }); }
      const token = crypto.randomBytes(24).toString('base64url');
      const name = String(b.name || 'device').slice(0, 40);
      tokens[token] = { name, paired: Date.now(), seen: Date.now() };
      writeJSON(TOKENS_FILE, tokens);
      log(`paired ${name}`);
      return send(res, 200, { token, server: NAME, empty: K.isEmpty(doc) });
    }
    if (req.method === 'POST' && url.pathname === '/sync') {
      const t = auth(req, url);
      if (!t) return send(res, 401, { error: 'Not paired (or unpaired on the laptop).' });
      const b = await readBody(req);
      if (b.doc && K.merge(doc, K.cleanDoc(b.doc))) {
        saveDoc();
        const v = K.materialize(doc);
        log(`${tokens[t].name}: merged → ${v.cats.length} lists, ${v.items.length} items`);
        announce(t);
      }
      return send(res, 200, { doc, server: NAME });
    }
    if (req.method === 'GET' && url.pathname === '/events') {
      const t = auth(req, url);
      if (!t) return send(res, 401, { error: 'Not paired.' });
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
      res.write('retry: 5000\n\n');
      const l = { token: t, res };
      listeners.add(l);
      const hb = setInterval(() => res.write(': hi\n\n'), 25e3);
      req.on('close', () => { clearInterval(hb); listeners.delete(l); });
      return;
    }
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, e.status || 500, { error: e.message });
  }
}

const server = PLAIN ? http.createServer(handle) : https.createServer({ cert: fs.readFileSync(CERT), key: fs.readFileSync(KEY) }, handle);
// The name `tailscale serve` publishes this machine under, if it's running.
function tailscaleName() {
  const { execFileSync } = require('child_process');
  for (const bin of ['tailscale', '/Applications/Tailscale.app/Contents/MacOS/Tailscale']) {
    try { return JSON.parse(execFileSync(bin, ['status', '--json'], { stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000 })).Self.DNSName.replace(/\.$/, ''); } catch (_) {}
  }
  return null;
}
server.listen(PORT, HOST, () => {
  const v = K.materialize(doc);
  const local = /\.local$/.test(os.hostname()) ? os.hostname() : os.hostname() + '.local';
  const ts = PLAIN ? tailscaleName() : null;
  console.log(`\nKitty sync server — ${v.cats.length} lists, ${v.items.length} items in ${DATA}`);
  if (!PLAIN) console.log(`  address:      https://${local}:${PORT}`);
  else if (ts) console.log(`  address:      ${ts}   (via \`tailscale serve --bg ${PORT}\`)`);
  else console.log(`  address:      http://${HOST}:${PORT} (this machine only; Tailscale not found — see README)`);
  console.log(`  pairing code: ${pretty(pairCode)}   (valid 10 minutes)`);
  console.log(`  paired:       ${Object.values(tokens).map(t => t.name).join(', ') || 'nothing yet'}\n`);
});

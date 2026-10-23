/* =====================================================================
   Kitty sync core — shared by the app (window.KittyCRDT) and the laptop
   sync server (require('./crdt.js')).

   The synced document ("doc") is a state-based CRDT:
     { v: 2,
       cats:  { [id]: { name, pos, del, t: { name, pos, del } } },
       items: { [id]: { cat, text, created, done, pos, del, t: { ...same keys } } },
       done:  { [deviceId]: count } }
   Every field carries a hybrid-logical-clock stamp in t[field]; merging keeps
   the value with the larger stamp, field by field. Deletes are tombstones
   (del: true) so they win over edits made elsewhere. pos orders open items
   within a list (and the lists themselves); only moved records get a new pos.
   done{} is a per-device counter, merged by max and read as a sum.

   The app keeps working on its familiar "view" ({cats:[...], items:[...]}
   in display order). commit(doc, view, clock) diffs a view against the doc
   and stamps only what changed; materialize(doc) turns a doc back into a view.
   ===================================================================== */
(function (root) {
'use strict';

const DOC_V = 2;
const ITEM_F = ['cat', 'text', 'created', 'done', 'pos', 'del'];
const CAT_F = ['name', 'pos', 'del'];

const emptyDoc = () => ({ v: DOC_V, cats: {}, items: {}, done: {} });

// ---------- hybrid logical clock ----------
// Stamps are fixed-width strings, so plain string comparison orders them:
//   <ms, base36, 10 chars>.<counter, base36, 4 chars>.<device id>
function makeStamp(ms, c, dev) {
  return ms.toString(36).padStart(10, '0') + '.' + c.toString(36).padStart(4, '0') + '.' + dev;
}
function parseStamp(s) {
  const [a, b] = String(s).split('.');
  return { ms: parseInt(a, 36) || 0, c: parseInt(b, 36) || 0 };
}
// clock: { dev, ms, c } — mutated in place.
function tick(clock, nowMs = Date.now()) {
  if (nowMs > clock.ms) { clock.ms = nowMs; clock.c = 0; } else clock.c++;
  return makeStamp(clock.ms, clock.c, clock.dev);
}
// Move our clock past every stamp seen in a doc, so our next edit sorts after it.
function observe(clock, doc) {
  let hi = '';
  for (const kind of ['cats', 'items']) for (const r of Object.values(doc[kind] || {})) for (const s of Object.values(r.t || {})) if (s > hi) hi = s;
  if (!hi) return;
  const p = parseStamp(hi);
  if (p.ms > clock.ms || (p.ms === clock.ms && p.c > clock.c)) { clock.ms = p.ms; clock.c = p.c; }
}

// ---------- merge ----------
// Merge src into dst (mutates dst). Returns true if dst changed.
function merge(dst, src) {
  if (!src || typeof src !== 'object') return false;
  let changed = false;
  for (const [kind, fields] of [['cats', CAT_F], ['items', ITEM_F]]) {
    const d = dst[kind] || (dst[kind] = {});
    for (const [id, r] of Object.entries(src[kind] || {})) {
      if (!r || typeof r !== 'object' || !r.t) continue;
      const mine = d[id] || (d[id] = { t: {} });
      for (const f of fields) {
        const s = r.t[f];
        if (s && s > (mine.t[f] || '')) { mine[f] = r[f]; mine.t[f] = s; changed = true; }
      }
    }
  }
  const dd = dst.done || (dst.done = {});
  for (const [dev, n] of Object.entries(src.done || {})) {
    if ((Number(n) || 0) > (dd[dev] || 0)) { dd[dev] = Number(n); changed = true; }
  }
  return changed;
}

function set(doc, kind, id, field, value, stamp) {
  const r = doc[kind][id] || (doc[kind][id] = { t: {} });
  r[field] = value;
  r.t[field] = stamp;
}

const byPos = (a, b) => (a.pos - b.pos) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const live = r => r && !r.del;

// ---------- doc -> view ----------
// Deterministic, so every replica shows the same thing for the same doc:
//  - lists by pos; open items by pos, done items keep their pos too;
//  - an item whose list is gone shows in the first list;
//  - open items with the same text in the same list collapse into the oldest id
//    (the next commit tombstones the others).
function materialize(doc) {
  const cats = Object.entries(doc.cats).filter(([, c]) => live(c) && typeof c.name === 'string')
    .map(([id, c]) => ({ id, name: c.name, pos: Number(c.pos) || 0 })).sort(byPos);
  const catIds = new Set(cats.map(c => c.id));
  const first = cats[0] ? cats[0].id : null;
  const catRank = new Map(cats.map((c, k) => [c.id, k]));
  const rows = Object.entries(doc.items).filter(([, i]) => live(i) && typeof i.text === 'string' && i.text)
    .map(([id, i]) => ({ id, cat: catIds.has(i.cat) ? i.cat : first, text: i.text, created: Number(i.created) || 0, done: i.done ? Number(i.done) : null, pos: Number(i.pos) || 0 }))
    .filter(i => i.cat)
    .sort((a, b) => (catRank.get(a.cat) - catRank.get(b.cat)) || byPos(a, b));
  const seen = new Map(), items = [];
  for (const i of [...rows].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))) {
    if (i.done) continue;
    const k = i.cat + '\n' + i.text.toLowerCase();
    if (!seen.has(k)) seen.set(k, i.id);
  }
  for (const i of rows) {
    if (!i.done && seen.get(i.cat + '\n' + i.text.toLowerCase()) !== i.id) continue;
    items.push({ id: i.id, cat: i.cat, text: i.text, created: i.created, done: i.done });
  }
  const doneCount = Object.values(doc.done || {}).reduce((a, n) => a + (Number(n) || 0), 0);
  return { cats: cats.map(c => ({ id: c.id, name: c.name })), items, doneCount };
}

// ---------- view -> doc ----------
// Longest increasing subsequence (indices) of nums; null entries never qualify.
function lisIndices(nums) {
  const tails = [], prev = new Array(nums.length).fill(-1);
  nums.forEach((n, i) => {
    if (n == null) return;
    let lo = 0, hi = tails.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (nums[tails[m]] < n) lo = m + 1; else hi = m; }
    if (lo > 0) prev[i] = tails[lo - 1];
    tails[lo] = i;
  });
  const keep = new Set();
  for (let i = tails.length ? tails[tails.length - 1] : -1; i >= 0; i = prev[i]) keep.add(i);
  return keep;
}
// Given records in display order and their current pos (or null), return new
// pos values for the records that must move so the order holds. Records that
// are already in order keep theirs, which is what lets two devices reorder
// different things at once without undoing each other.
function placeInOrder(ids, posOf) {
  const cur = ids.map(posOf);
  const keep = lisIndices(cur);
  const out = new Map();
  let prev = null;
  for (let i = 0; i < ids.length; i++) {
    if (keep.has(i)) { prev = cur[i]; continue; }
    let next = null;
    for (let j = i + 1; j < ids.length; j++) if (keep.has(j)) { next = cur[j]; break; }
    const p = next == null ? (prev == null ? 0 : prev + 1) : prev == null ? next - 1 : (prev + next) / 2;
    if ((prev != null && !(p > prev)) || (next != null && !(p < next))) {
      // Ran out of float precision in this gap: renumber the whole run.
      ids.forEach((id, k) => out.set(id, k));
      return out;
    }
    out.set(ids[i], p);
    prev = p;
  }
  return out;
}

// Write the differences between view and doc into doc. view: { cats, items,
// doneCount }. Records in the doc but missing from the view are tombstoned.
// Returns the number of fields written.
function commit(doc, view, clock) {
  let n = 0;
  const put = (kind, id, f, v) => {
    const r = doc[kind][id];
    if (r && r.t[f] && sameVal(r[f], v)) return;
    set(doc, kind, id, f, v, tick(clock));
    n++;
  };
  // lists
  const catPos = placeInOrder(view.cats.map(c => c.id), id => (live(doc.cats[id]) ? doc.cats[id].pos : null));
  for (const c of view.cats) {
    put('cats', c.id, 'name', c.name);
    if (catPos.has(c.id)) put('cats', c.id, 'pos', catPos.get(c.id));
    put('cats', c.id, 'del', false);
  }
  const vc = new Set(view.cats.map(c => c.id));
  for (const [id, c] of Object.entries(doc.cats)) if (live(c) && !vc.has(id)) put('cats', id, 'del', true);
  // items: order matters only among a list's open items
  const byCat = new Map();
  for (const i of view.items) if (!i.done) { if (!byCat.has(i.cat)) byCat.set(i.cat, []); byCat.get(i.cat).push(i.id); }
  const itemPos = new Map();
  for (const ids of byCat.values()) {
    const p = placeInOrder(ids, id => { const r = doc.items[id]; return live(r) && !r.done ? r.pos : null; });
    for (const [id, v] of p) itemPos.set(id, v);
  }
  for (const i of view.items) {
    put('items', i.id, 'cat', i.cat);
    put('items', i.id, 'text', i.text);
    put('items', i.id, 'created', i.created);
    put('items', i.id, 'done', i.done || null);
    if (itemPos.has(i.id)) put('items', i.id, 'pos', itemPos.get(i.id));
    else if (!doc.items[i.id].t.pos) put('items', i.id, 'pos', 0);
    put('items', i.id, 'del', false);
  }
  const vi = new Set(view.items.map(i => i.id));
  for (const [id, r] of Object.entries(doc.items)) if (live(r) && !vi.has(id)) put('items', id, 'del', true);
  // completions: this device's counter absorbs any increase
  const total = Object.values(doc.done).reduce((a, x) => a + (Number(x) || 0), 0);
  if ((view.doneCount || 0) > total) { doc.done[clock.dev] = (doc.done[clock.dev] || 0) + (view.doneCount - total); n++; }
  return n;
}
const sameVal = (a, b) => a === b || (a == null && b == null);

// Is there anything real in this doc (any live list or item)?
const isEmpty = doc => !Object.values(doc.items).some(live) && !Object.values(doc.cats).some(live);

// Coerce a parsed doc (from storage or the network) into a valid shape.
function cleanDoc(d) {
  const out = emptyDoc();
  if (!d || typeof d !== 'object') return out;
  for (const kind of ['cats', 'items']) if (d[kind] && typeof d[kind] === 'object')
    for (const [id, r] of Object.entries(d[kind])) if (r && typeof r === 'object' && r.t && typeof r.t === 'object') out[kind][String(id)] = r;
  if (d.done && typeof d.done === 'object') for (const [k, v] of Object.entries(d.done)) out.done[k] = Number(v) || 0;
  return out;
}

const api = { DOC_V, emptyDoc, tick, observe, merge, materialize, commit, isEmpty, cleanDoc, placeInOrder, makeStamp };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else root.KittyCRDT = api;
})(typeof self !== 'undefined' ? self : this);

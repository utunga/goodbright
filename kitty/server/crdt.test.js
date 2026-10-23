// Convergence tests for ../crdt.js. Run: node kitty/server/crdt.test.js
'use strict';
const assert = require('assert');
const K = require('../crdt.js');

let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = a => a[Math.floor(rnd() * a.length)];
let idn = 0;
const uid = () => 'id' + (idn++).toString(36).padStart(4, '0');

function replica(dev, t0) {
  return { dev, clock: { dev, ms: 0, c: 0 }, doc: K.emptyDoc(), t: t0 };
}
function view(r) { return K.materialize(r.doc); }
function edit(r, fn) {
  const v = view(r);
  fn(v);
  r.t += Math.floor(rnd() * 3);
  K.commit(r.doc, v, r.clock);
}
// The app keeps open items in display order with new ones at the front.
function randomEdit(v) {
  const open = v.items.filter(i => !i.done);
  const op = rnd();
  if (!v.cats.length || op < 0.05) { v.cats.push({ id: uid(), name: pick(['Shop', 'Work', 'Home']) }); return; }
  if (op < 0.35 || !v.items.length) { v.items.unshift({ id: uid(), cat: pick(v.cats).id, text: pick(['milk', 'eggs', 'bread', 'call mum', 'tax', 'fix bike']) + (rnd() < .5 ? '' : ' ' + Math.floor(rnd() * 50)), created: 1, done: null }); return; }
  const it = pick(v.items);
  if (op < 0.5) { it.done = it.done ? null : 5; if (!it.done) { v.items.splice(v.items.indexOf(it), 1); v.items.unshift(it); } else v.doneCount++; return; }
  if (op < 0.6) { it.text = it.text + '!'; return; }
  if (op < 0.68) { it.cat = pick(v.cats).id; return; }
  if (op < 0.78) { v.items.splice(v.items.indexOf(it), 1); return; }
  if (op < 0.92 && open.length > 1) { // drag one open item to another slot
    const a = pick(open); v.items.splice(v.items.indexOf(a), 1);
    const b = pick(v.items.filter(i => !i.done) .concat([null]));
    if (b) v.items.splice(v.items.indexOf(b), 0, a); else v.items.push(a);
    return;
  }
  if (op < 0.96 && v.cats.length > 1) { const c = pick(v.cats); v.cats.splice(v.cats.indexOf(c), 1); if (rnd() < .7) v.items = v.items.filter(i => i.cat !== c.id); return; }
  pick(v.cats).name += '+';
}
const json = d => JSON.stringify(K.materialize(d));
function sync(a, b) {
  const da = JSON.parse(JSON.stringify(a.doc)), db = JSON.parse(JSON.stringify(b.doc));
  K.merge(a.doc, db); K.observe(a.clock, a.doc);
  K.merge(b.doc, da); K.observe(b.clock, b.doc);
}

// 1. Random concurrent edits on three replicas converge regardless of sync order.
for (let round = 0; round < 300; round++) {
  const rs = [replica('A'), replica('B'), replica('C')];
  for (let step = 0; step < 40; step++) {
    const r = pick(rs);
    edit(r, randomEdit);
    if (rnd() < 0.2) { const a = pick(rs), b = pick(rs); if (a !== b) sync(a, b); }
  }
  // Settle: everyone syncs with everyone, then a commit (dedupe/orphans), then again.
  for (let k = 0; k < 2; k++) {
    sync(rs[0], rs[1]); sync(rs[1], rs[2]); sync(rs[0], rs[2]);
    for (const r of rs) edit(r, () => {});
  }
  sync(rs[0], rs[1]); sync(rs[1], rs[2]); sync(rs[0], rs[2]);
  const v0 = json(rs[0].doc);
  assert.strictEqual(json(rs[1].doc), v0, `round ${round}: B differs`);
  assert.strictEqual(json(rs[2].doc), v0, `round ${round}: C differs`);
  // Merge is idempotent and commutative.
  const x = JSON.parse(JSON.stringify(rs[0].doc));
  assert.strictEqual(K.merge(x, rs[1].doc), false, 'merge of equal docs changes nothing');
}

// 2. A committed view materializes back to itself (order included).
{
  const r = replica('A');
  for (let i = 0; i < 200; i++) {
    const v = view(r); randomEdit(v); for (const it of v.items) if (!it.text.includes('#')) it.text += ' #' + it.id; K.commit(r.doc, v, r.clock);
    const back = K.materialize(r.doc);
    const want = { ...v, items: v.items.map(it => v.cats.some(c => c.id === it.cat) ? it : { ...it, cat: v.cats[0].id }) };
    assert.deepStrictEqual(back.cats, want.cats);
    const openIds = x => x.cats.map(c => x.items.filter(i => !i.done && i.cat === c.id).map(i => i.id));
    assert.deepStrictEqual(openIds(back), openIds(want), 'open order survives');
  }
}

// 3. Concurrent reorders of different items both stick.
{
  const a = replica('A'), b = replica('B');
  edit(a, v => { v.cats.push({ id: 'c', name: 'L' }); for (const t of 'edcba') v.items.unshift({ id: t, cat: 'c', text: t, created: 1, done: null }); });
  sync(a, b);
  edit(a, v => { const x = v.items.splice(0, 1)[0]; v.items.push(x); });             // a to the end
  edit(b, v => { const x = v.items.splice(4, 1)[0]; v.items.splice(1, 0, x); });      // e to second
  sync(a, b);
  assert.strictEqual(json(a.doc), json(b.doc));
  const order = K.materialize(a.doc).items.map(i => i.id).join('');
  assert.ok(order.endsWith('a') && order.indexOf('e') < order.indexOf('c'), order);
}

// 4. Delete beats a concurrent edit; edits to different fields both stick.
{
  const a = replica('A'), b = replica('B');
  edit(a, v => { v.cats.push({ id: 'c', name: 'L' }, { id: 'd', name: 'M' }); v.items.push({ id: 'x', cat: 'c', text: 'x', created: 1, done: null }, { id: 'y', cat: 'c', text: 'y', created: 1, done: null }); });
  sync(a, b);
  edit(a, v => { v.items = v.items.filter(i => i.id !== 'x'); v.items.find(i => i.id === 'y').text = 'y2'; });
  edit(b, v => { v.items.find(i => i.id === 'x').text = 'x2'; v.items.find(i => i.id === 'y').cat = 'd'; });
  sync(a, b);
  const v = K.materialize(a.doc);
  assert.deepStrictEqual(v.items.map(i => [i.id, i.text, i.cat]), [['y', 'y2', 'd']]);
}

// 5. Same text added on both sides while apart ends up as one item.
{
  const a = replica('A'), b = replica('B');
  edit(a, v => { v.cats.push({ id: 'c', name: 'L' }); });
  sync(a, b);
  edit(a, v => { v.items.unshift({ id: 'm1', cat: 'c', text: 'Milk', created: 1, done: null }); });
  edit(b, v => { v.items.unshift({ id: 'm2', cat: 'c', text: 'milk', created: 2, done: null }); });
  sync(a, b); edit(a, () => {}); edit(b, () => {}); sync(a, b);
  assert.deepStrictEqual(K.materialize(a.doc).items.map(i => i.id), ['m1']);
  assert.strictEqual(json(a.doc), json(b.doc));
}

// 6. Ticks on both devices add up.
{
  const a = replica('A'), b = replica('B');
  edit(a, v => { v.doneCount += 2; }); edit(b, v => { v.doneCount += 3; }); sync(a, b);
  assert.strictEqual(K.materialize(a.doc).doneCount, 5);
}

// 7. Clock: a device with a slow clock still wins after it has seen the newer stamp.
{
  const c = { dev: 'A', ms: 0, c: 0 };
  const s1 = K.tick(c, 1000), s2 = K.tick(c, 1000), s3 = K.tick(c, 900);
  assert.ok(s1 < s2 && s2 < s3);
}

console.log('crdt: all tests passed');

#!/usr/bin/env python3
"""Turn-by-turn directions for a walk, from the route in dist/<walk>/data.js and a list of the
OpenStreetMap ways matched along it (tools/osm_runs_<walk>.txt: from|to|name|highway, metres along).

    directions.py <walk> [dist dir]

Writes directions.html (printable A4) and directions.txt into the dist folder.
Turns come from the route's own bearing either side of each street change; street names from OSM;
off-road sections are named from the overrides table below (the hand-drawn lines' names in My Maps)."""
import json, math, os, re, sys, html

ROOT = os.path.dirname(os.path.abspath(__file__))
R = 6371008.8

# Where OSM has no name, what to call the section (from, to, label, kind). Kind: 'path' or 'road'.
OVERRIDES = {
    'freyja_walk': [
        (2860, 4540, 'the waterfront path (Herd St → Te Papa → Frank Kitts Park → Queens Wharf)', 'path'),
        (7940, 7960, 'Winchester Street', 'road'),
        (12980, 13000, 'Moorefield Road', 'road'),
        (16660, 17820, 'the track from the top of Cedarwood Street down to Horokiwi Road', 'path'),
        (21260, 21400, 'Horokiwi Road', 'road'),
        (21420, 22560, 'Horokiwi Bridleway (the walking track from the viewpoint to the bridge)', 'path'),
        (22580, 23920, 'the walking track up to Belmont Trig (Belmont Regional Park)', 'path'),
        (23940, 24700, 'Dress Circle tramping track — up to the trig and back down the same way', 'path'),
        (24720, 26900, 'Belmont Trig tramping track, down to the carpark', 'path'),
        (29900, 30160, 'the farm driveway, 278 Normandale Rd', 'road'),
        (30180, 30320, 'the path up to the campsite', 'path'),
    ],
}
# Which side a touching side street is on, for the "passing X on your left" cues.
SIDES = {
    'freyja_walk': {'Lady Elizabeth Lane': 'right', 'Custom House Plaza': 'left', 'Gateway Lane': 'right', 'Wellington Urban Motorway': 'overhead',
        'Aotea Quay': 'ahead', 'Pickering Street': 'right', 'Pickering Lane': 'left', 'Cameron Street': 'left', 'Calcutta Street': 'left',
        'Jalna Avenue': 'left', 'Kohima Drive': 'left', 'Haumia Street': 'right', 'Hawea Street': 'left', 'Burgess Road': 'right',
        'Arthur Carman Street': 'right', 'Quigley Street': 'right', 'Batchelor Street': 'right', 'Rakopi Drive': 'left',
        'Colchester Crescent': 'left', 'Kentwood Drive': 'left', 'Astelia Way': 'left', 'Grenada Grinderton': 'left', 'Woollaston Way': 'left',
        'Normandale Road': 'left', 'Kaiwharawhara Bridleway': 'right', 'Belmont Trig tramping track': 'right', 'Bracken Road': 'right'},
}
DIRSCRIPT = r'''<script>
// on the phone, shift the plan times to the start she pressed in the app (same localStorage key the app uses)
(function(){ try {
  var s = +localStorage.getItem('walk:SLUG:startAt'); if (!s) return;
  var d = new Date(s), sh = d.getHours()*60 + d.getMinutes();
  var shift = sh - NOMINAL; if (!shift) return;
  document.querySelectorAll('td.t').forEach(function(td){
    var m = td.textContent.match(/^(\d+):(\d+)(am|pm)$/); if (!m) return;
    var h = +m[1] % 12 + (m[3] === 'pm' ? 12 : 0), t = (h*60 + +m[2] + shift + 1440) % 1440;
    var hh = Math.floor(t/60), mm = t % 60, ap = hh >= 12 ? 'pm' : 'am'; hh = hh % 12 || 12;
    td.textContent = hh + ':' + (mm < 10 ? '0' : '') + mm + ap;
  });
  var sub = document.querySelector('.sub'); if (sub) sub.textContent += ' · times shifted to your start at ' + (d.getHours() % 12 || 12) + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + (d.getHours() >= 12 ? 'pm' : 'am');
} catch(e){} })();
</script>'''
PATH_KINDS = {'cycleway', 'footway', 'pedestrian', 'path', 'track', 'bridleway', 'steps'}

def load(walk, dist):
    s = open(os.path.join(dist, 'data.js')).read()
    return json.loads(s[len('window.WALK = '):].rstrip(';\n'))

def norm(name):
    if not name: return None
    if ' to ' in name: return name
    name = re.sub(r'\s+(cycleway|walkway)$', '', name, flags=re.I)
    return re.sub(r'\b(road|street|drive|lane|avenue|parade|quay|place|crescent|way)\b', lambda m: m.group(1).capitalize(), name)

def read_runs(path):
    runs = []
    for line in open(path):
        line = line.strip()
        if not line or line.startswith('#'): continue
        a, b, name, hw = line.split('|')
        runs.append({'from': int(a), 'to': int(b), 'name': norm(name) or None, 'hw': hw or None, 'pass': []})
    return runs

def fmt_dist(m):
    if m < 950: return f'{int(round(m/10)*10)} m'
    return f'{m/1000:.1f} km'

def fmt_time(start_min, offset_min):
    t = int(round(start_min + offset_min)) % 1440
    h, m = divmod(t, 60); ap = 'pm' if h >= 12 else 'am'; h = h % 12 or 12
    return f'{h}:{m:02d}{ap}'

def fmt_hhmm(t):
    h, m = map(int, t.split(':')); return fmt_time(h*60 + m, 0)

def compass(b):
    return ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][int(((b + 22.5) % 360) // 45)]

def main():
    walk = sys.argv[1]
    dist = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'dist', walk)
    W = load(walk, dist)
    route = W['route']; MS = W['milestones']
    lat0 = math.radians(route[0][0]); KX = R*math.cos(lat0)*math.pi/180; KY = R*math.pi/180
    xy = [(p[1]*KX, p[0]*KY) for p in route]
    cum = [0.0]
    for i in range(1, len(xy)): cum.append(cum[-1] + math.hypot(xy[i][0]-xy[i-1][0], xy[i][1]-xy[i-1][1]))
    TOTAL = cum[-1]
    def point_at(a):
        a = max(0, min(TOTAL, a)); lo, hi = 0, len(cum)-1
        while hi-lo > 1:
            m = (lo+hi)//2
            if cum[m] <= a: lo = m
            else: hi = m
        t = (a-cum[lo])/((cum[hi]-cum[lo]) or 1)
        return (xy[lo][0] + t*(xy[hi][0]-xy[lo][0]), xy[lo][1] + t*(xy[hi][1]-xy[lo][1]))
    def bearing(a1, a2):
        p, q = point_at(a1), point_at(a2)
        return (math.degrees(math.atan2(q[0]-p[0], q[1]-p[1])) + 360) % 360
    nh, nm = map(int, W['nominalStart'].split(':')); start_min = nh*60 + nm
    def expected(along):
        i = 0
        while i < len(MS)-1 and MS[i+1]['along'] <= along: i += 1
        a = MS[i]; b = MS[i+1] if i < len(MS)-1 else None
        if not b: return a['offset'] + a['break']
        leg_start = a['offset'] + a['break']; frac = max(0, min(1, (along - a['along'])/max(1, b['along'] - a['along'])))
        return leg_start + frac*(b['offset'] - leg_start)

    runs = read_runs(os.path.join(ROOT, f'osm_runs_{walk}.txt'))
    # 1. overrides replace everything inside their range with one named run
    for (f, t, label, kind) in OVERRIDES.get(walk, []):
        inside = [r for r in runs if r['from'] >= f and r['to'] <= t]
        if not inside: continue
        first = min(runs.index(r) for r in inside)
        for r in inside: runs.remove(r)
        runs.insert(first, {'from': f, 'to': t, 'name': label, 'hw': 'path' if kind == 'path' else 'road', 'pass': [], 'override': True})
    def merge_same(rs):
        out = []
        for r in rs:
            if out and out[-1]['name'] and out[-1]['name'] == r['name']:
                out[-1]['to'] = r['to']; out[-1]['pass'] += r['pass']
            else: out.append(r)
        return out
    runs = merge_same(runs)
    # 2. short blips are side streets she passes (or path crossings), not turns:
    #    <= 20 m always; <= 40 m when the street either side is the same, when it isn't a road, or when the route doesn't bend there
    sides = SIDES.get(walk, {})
    def bend(a):
        b0 = bearing(max(0, a - 40), a); b1 = bearing(a, min(TOTAL, a + 40))
        return abs((b1 - b0 + 540) % 360 - 180)
    NOT_STREETS = ('cycleway', 'footway', 'proposed', 'service', 'pedestrian', 'path', 'steps')
    for it in range(6):
        out = []
        for i, r in enumerate(runs):
            prev = out[-1] if out else None; nxt = runs[i+1] if i+1 < len(runs) else None
            n = (r['to'] - r['from']) // 20 + 1          # samples: 1 = a street merely touched, 2–3 = 40–60 m
            if prev and not r.get('override') and n <= 3 and r['name'] != prev['name']:
                link = ' to ' in (r['name'] or '')    # "X to Y Walkway": a real link she takes, however short
                # the start of a street that side-street blips have chopped up: keep it, the blips go
                ahead = runs[i+1:i+4]
                street_start = False
                for j, a in enumerate(ahead):
                    if r['name'] and a['name'] == r['name'] and all((b['to'] - b['from']) <= 40 for b in ahead[:j]): street_start = True; break
                sure = n == 1 or (nxt and prev['name'] == nxt['name'])
                maybe = it >= 2 and (r['hw'] in NOT_STREETS or bend(r['from']) < 30)
                if not link and not street_start and (sure or maybe):
                    if r['name'] and r['hw'] not in NOT_STREETS: prev['pass'].append((r['from'], r['name'], sides.get(r['name'], '')))
                    prev['to'] = r['to']; prev['pass'] += r['pass']; continue
            out.append(r)
        runs = merge_same(out)
    # 3. unnamed neighbours merge; describe by type
    out = []
    for r in runs:
        if out and not out[-1]['name'] and not r['name']:
            out[-1]['to'] = r['to']; continue
        out.append(r)
    runs = out
    for r in runs:
        if not r['name']:
            r['name'] = {'cycleway': 'the shared path', 'footway': 'the footpath', 'pedestrian': 'the pedestrian area', 'path': 'the path', 'track': 'the track', 'bridleway': 'the track', 'steps': 'the steps', 'service': 'the service road'}.get(r['hw'], 'the way ahead')
            r['generic'] = True
    # 4. steps with turns
    steps = []
    for i, r in enumerate(runs):
        is_path = r['hw'] in PATH_KINDS or r['hw'] == 'path' or r.get('override') and 'track' in r['name'] or 'path' in r['name']
        if i == 0:
            instr = f"Start at {MS[0]['label']}. Head {compass(bearing(0, 100))} along {r['name']}"
            turn = 'start'
        else:
            b0 = bearing(max(0, r['from'] - 40), r['from']); b1 = bearing(r['from'], min(TOTAL, r['from'] + 40))
            d = (b1 - b0 + 540) % 360 - 180
            ad = abs(d); side = 'left' if d < 0 else 'right'
            if ad < 22: verb = 'Continue onto' if not is_path else 'Continue along'
            elif ad < 60: verb = f'Bear {side} onto'
            elif ad < 140: verb = f'Turn {side} onto'
            else: verb = f'Sharp {side} onto' if ad < 165 else f'Double back onto'
            if r['name'].startswith('the '):
                verb = verb.replace(' onto', ' and take' if 'Continue' not in verb else ' along').replace('Continue along along', 'Continue along')
                if verb.startswith('Continue'): verb = 'Continue along'
            instr = f"{verb} {r['name']}"
            turn = 'straight' if ad < 22 else side
        steps.append({'along': r['from'], 'to': r['to'], 'name': r['name'], 'instr': instr, 'turn': turn, 'pass': r['pass'], 'dist': r['to'] - r['from'] + (20 if i < len(runs)-1 else 0), 'hw': r['hw']})
    steps[-1]['dist'] = TOTAL - steps[-1]['along']
    # 5. every milestone is a row of its own: before the step it starts, after the step it ends, or cutting the step it sits in
    rows = []
    pending = list(MS[1:])
    for si, s in enumerate(steps):
        end = s['along'] + s['dist']
        nxt_start = steps[si+1]['along'] if si+1 < len(steps) else TOTAL + 1
        before = [m for m in pending if m['along'] <= s['along'] + 60]
        for m in before: rows.append(('ms', m)); pending.remove(m)
        inside = [m for m in pending if s['along'] + 60 < m['along'] < end - 60]
        after = [m for m in pending if end - 60 <= m['along'] < nxt_start + 60 and m not in inside]
        cur = dict(s); start = s['along']
        for m in inside:
            part = dict(cur); part['dist'] = m['along'] - start; part['pass'] = [p for p in s['pass'] if start <= p[0] < m['along']]
            rows.append(('step', part)); rows.append(('ms', m)); pending.remove(m)
            start = m['along']
            cur = dict(s); cur['along'] = start; cur['instr'] = f"Carry on along {s['name']}"; cur['turn'] = 'straight'
        cur['dist'] = end - start; cur['pass'] = [p for p in s['pass'] if p[0] >= start]
        rows.append(('step', cur))
        # a milestone at the end of this step, unless it is nearer the start of the next one
        for m in after:
            if m['along'] - end <= nxt_start - m['along'] or si == len(steps) - 1:
                rows.append(('ms', m)); pending.remove(m)
    for m in pending: rows.append(('ms', m))

    # a step that starts at a milestone starts when the break there ends
    last_leave = None
    for kind, x in rows:
        if kind == 'ms': last_leave = x['offset'] + x['break']
        else:
            x['time'] = expected(x['along'])
            if last_leave is not None and x['time'] < last_leave: x['time'] = last_leave
            last_leave = None

    # ---- text ----
    lines = [f"{W['title']} — turn by turn", f"{fmt_dist(TOTAL)} · plan: leave {fmt_time(start_min, 0)}, {MS[-1]['label']} by {fmt_time(start_min, MS[-1]['offset'])}" + (f" · be there by {fmt_hhmm(W['deadline'])}" if W.get('deadline') else ''), '']
    n = 0
    for kind, x in rows:
        if kind == 'ms':
            ci = {'send': 'CHECK IN (WhatsApp)', 'test': 'TEST CHECK-IN', 'call': 'CALL DAD'}.get(x.get('checkin', ''), '')
            lines.append(f"  ★ {x['n']}  {x['label']}  — plan {fmt_time(start_min, x['offset'])}" + (f", {x['break']} min break" if x['break'] else '') + (f" ({x['note']})" if x.get('note') else '') + (f"  ► {ci}" + (f" — {x['checkinNote']}" if x.get('checkinNote') else '') if ci else '') + f"  [{fmt_dist(x['along'])}]")
        else:
            n += 1
            p = '; '.join(f"pass {nm}" + (f" on your {sd}" if sd in ('left', 'right') else (' overhead' if sd == 'overhead' else '')) for _, nm, sd in x['pass'])
            lines.append(f"{n:2d}. {x['instr']} — {fmt_dist(x['dist'])}" + (f" ({p})" if p else '') + f"   {fmt_time(start_min, x['time'])}")
    open(os.path.join(dist, 'directions.txt'), 'w').write('\n'.join(lines) + '\n')

    # ---- html ----
    def esc(s): return html.escape(str(s))
    arrows = {'start': '⚑', 'straight': '↑', 'left': '↰', 'right': '↱'}
    h = []
    h.append(f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>{esc(W['title'])} — turn by turn</title>
<style>
@page {{ size: A4 portrait; margin: 12mm 12mm 14mm; }}
*{{box-sizing:border-box}}
body{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#111;margin:0;background:#f3f4f6}}
.sheet{{background:#fff;max-width:210mm;margin:0 auto;padding:12mm}}
@media print{{ body{{background:#fff}} .sheet{{max-width:none;padding:0}} .noprint{{display:none}} }}
h1{{font-size:22pt;margin:0 0 2mm}}
.sub{{font-size:11pt;color:#374151;margin:0 0 5mm}}
table{{width:100%;border-collapse:collapse;font-size:11pt}}
td{{padding:2.2mm 2mm;border-bottom:1px solid #e5e7eb;vertical-align:top}}
tr{{page-break-inside:avoid}}
td.n{{width:9mm;color:#6b7280;font-variant-numeric:tabular-nums;text-align:right}}
td.a{{width:9mm;font-size:16pt;line-height:1;text-align:center;color:#e8590c}}
td.d{{width:17mm;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}}
td.t{{width:17mm;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;color:#374151}}
td.k{{width:15mm;text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;color:#9ca3af;font-size:9.5pt}}
.pass{{display:block;font-size:9.5pt;color:#6b7280;margin-top:1mm}}
tr.ms td{{background:#fff7ed;border-top:2px solid #e8590c;border-bottom:2px solid #e8590c;font-weight:700}}
tr.ms td .brk{{font-weight:400;color:#065f46}}
tr.ms td .ci{{display:block;color:#1e3a8a;font-weight:700;margin-top:1mm}}
tr.ms td.a{{color:#111;font-size:14pt}}
tr.ms .box{{display:inline-block;width:5mm;height:5mm;border:1.5px solid #111;border-radius:1mm;vertical-align:middle;margin-right:2mm}}
.legend{{font-size:9.5pt;color:#6b7280;margin-top:5mm;line-height:1.4}}
.noprint a{{color:#0b6bcb}}
@media screen and (max-width: 640px){{
  .sheet{{padding:12px 10px}}
  h1{{font-size:20px}}
  .sub{{font-size:13px}}
  table{{font-size:15px}}
  td{{padding:8px 4px}}
  td.k{{display:none}}
  td.d,td.t{{width:auto;font-size:13px}}
  td.n{{width:22px}}
  td.a{{width:26px;font-size:20px}}
  tr.ms .box{{width:18px;height:18px}}
  .noprint{{font-size:14px}}
}}
</style></head><body><div class="sheet">
<div class="noprint" style="margin-bottom:4mm;font-size:11pt"><a href="index.html">← back to the app</a> · <a href="print.html">map sheets</a> · <a href="overview.html">whole route</a> · <button onclick="window.print()">Print</button></div>
__DIRSCRIPT__
<h1>{esc(W['title'])} — turn by turn</h1>
<p class="sub">{fmt_dist(TOTAL)} · plan: leave {fmt_time(start_min, 0)}, {esc(MS[-1]['label'])} at {fmt_time(start_min, MS[-1]['offset'])}{(' · be there by ' + fmt_hhmm(W['deadline'])) if W.get('deadline') else ''} · times are the plan (the app shows the live buffer) · tick the boxes as you go</p>
<table>""")
    n = 0
    for kind, x in rows:
        if kind == 'ms':
            brk = (f" · {x['break']} min break" if x['break'] else '') + (f" — {esc(x['note'])}" if x.get('note') else '')
            ci = {'send': '📱 check in on WhatsApp', 'test': '📱 test check-in', 'call': '☎ call Dad'}.get(x.get('checkin', ''), '')
            if ci: brk += f"<span class=\"ci\">{ci}" + (f" — {esc(x['checkinNote'])}" if x.get('checkinNote') else '') + "</span>"
            h.append(f"<tr class=\"ms\"><td class=\"n\">{x['n']}</td><td class=\"a\">★</td><td><span class=\"box\"></span>{esc(x['label'])}<span class=\"brk\">{brk}</span>" + (f"<span class=\"pass\">{esc(x['legNote'])}</span>" if x.get('legNote') else '') + f"</td><td class=\"d\"></td><td class=\"t\">{fmt_time(start_min, x['offset'])}</td><td class=\"k\">{fmt_dist(x['along'])}</td></tr>")
        else:
            n += 1
            p = '; '.join(f"pass {esc(nm)}" + (f" on your {sd}" if sd in ('left', 'right') else (' overhead' if sd == 'overhead' else '')) for _, nm, sd in x['pass'])
            h.append(f"<tr><td class=\"n\">{n}</td><td class=\"a\">{arrows.get(x['turn'], '↑')}</td><td>{esc(x['instr'])}" + (f"<span class=\"pass\">{p}</span>" if p else '') + f"</td><td class=\"d\">{fmt_dist(x['dist'])}</td><td class=\"t\">{fmt_time(start_min, x['time'])}</td><td class=\"k\">{fmt_dist(x['along'])}</td></tr>")
    h.append(f"""</table>
<p class="legend">Columns: what to do · how far along that street or path · the plan's clock time at that point · kilometres from the start. ★ rows are the milestones on the sheet; the plan times there are Miles's numbers; 📱 means send a WhatsApp check-in from there (the app's Check in button does it), ☎ means ring Dad. Street names from OpenStreetMap; turns from the route line; "pass X on your left" is a check that you're on the right road, not a turn.</p>
</div></body></html>""")
    page = '\n'.join(h).replace('__DIRSCRIPT__', DIRSCRIPT.replace('SLUG', W['slug']).replace('NOMINAL', str(start_min)))
    open(os.path.join(dist, 'directions.html'), 'w').write(page)
    print(f"directions: {len([r for r in rows if r[0]=='step'])} steps, {len([r for r in rows if r[0]=='ms'])} milestones → {dist}/directions.html + .txt")

if __name__ == '__main__':
    main()

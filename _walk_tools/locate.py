#!/usr/bin/env python3
"""Place a check-in on the route. Usage:
   locate.py <walk> <start HH:MM> <check-in text or 'lat,lng HH:MM'> [...]
Reads dist/<walk>/data.js. Prints along-route position, nearest/next milestone, plan vs actual."""
import json, math, re, sys, os
R = 6371008.8
ROOT = os.path.dirname(os.path.abspath(__file__))

def load(walk):
    s = open(os.path.join(ROOT, 'dist', walk, 'data.js')).read()
    return json.loads(s[len('window.WALK = '):].rstrip(';\n'))

def hav(a, b):
    p1, p2 = math.radians(a[0]), math.radians(b[0]); dp = p2 - p1; dl = math.radians(b[1] - a[1])
    h = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2*R*math.asin(math.sqrt(h))

def hm(t):
    h, m = map(int, t.split(':')); return h*60 + m

def fmt(mins):
    mins = int(round(mins)) % 1440; h, m = divmod(mins, 60); ap = 'pm' if h >= 12 else 'am'; h = h % 12 or 12
    return f"{h}:{m:02d}{ap}"

def main():
    walk, start = sys.argv[1], hm(sys.argv[2])
    W = load(walk)
    route = W['route']
    lat0 = math.radians(route[0][0]); KX = R*math.cos(lat0)*math.pi/180; KY = R*math.pi/180
    xy = [(p[1]*KX, p[0]*KY) for p in route]
    cum = [0.0]
    for i in range(1, len(xy)): cum.append(cum[-1] + math.hypot(xy[i][0]-xy[i-1][0], xy[i][1]-xy[i-1][1]))
    total = cum[-1]; MS = W['milestones']; FINAL = MS[-1]
    deadline = hm(W['deadline']) if W.get('deadline') else start + FINAL['offset'] + W['bufferMin']
    last_along = None
    for text in sys.argv[3:]:
        m = re.search(r'q=(-?\d+\.\d+),(-?\d+\.\d+)', text) or re.search(r'(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)', text)
        t = re.search(r'(\d{1,2}):(\d{2})\s*(am|pm)', text, re.I) or re.search(r'\b(\d{1,2}):(\d{2})\b', text)
        if not m or not t: print('could not read coordinates/time from:', text[:80]); continue
        lat, lng = float(m.group(1)), float(m.group(2))
        h, mi = int(t.group(1)), int(t.group(2)); ap = (t.group(3) or '').lower()
        if ap == 'pm' and h < 12: h += 12
        if ap == 'am' and h == 12: h = 0
        now = h*60 + mi
        p = (lng*KX, lat*KY)
        # nearest point on route, preferring forward progress
        best = None
        for i in range(len(xy)-1):
            a, b = xy[i], xy[i+1]; dx, dy = b[0]-a[0], b[1]-a[1]; L2 = dx*dx+dy*dy
            tt = 0 if L2 == 0 else max(0, min(1, ((p[0]-a[0])*dx + (p[1]-a[1])*dy)/L2))
            q = (a[0]+tt*dx, a[1]+tt*dy); d = math.hypot(p[0]-q[0], p[1]-q[1]); along = cum[i] + tt*(cum[i+1]-cum[i])
            score = d + (max(0, last_along - along - 150)*0.5 if last_along is not None else 0)
            if best is None or score < best[0]: best = (score, d, along)
        _, off, along = best; last_along = along
        near_all = [i for i, ms in enumerate(MS) if hav((lat, lng), (ms['lat'], ms['lng'])) < 60]
        # where two milestones share a spot (a loop), take the one that fits the progress along the route
        near = [min(near_all, key=lambda i: abs(MS[i]['along'] - along))] if near_all else []
        passed = 0
        for i, ms in enumerate(MS):
            if along >= ms['along'] - 30 or i in near: passed = i
        nxt = passed + 1 if passed < len(MS)-1 else None
        # expected minutes since start at this position
        a, b = MS[passed], (MS[passed+1] if passed < len(MS)-1 else None)
        if b:
            leg_start = a['offset'] + a['break']; frac = max(0, min(1, (along - a['along'])/max(1, b['along']-a['along'])))
            exp = leg_start + frac*(b['offset'] - leg_start)
        else: exp = a['offset']
        actual = now - start
        if near and MS[near[-1]]['break']: exp = min(max(actual, MS[near[-1]]['offset']), MS[near[-1]]['offset'] + MS[near[-1]]['break'])
        eta = now + (FINAL['offset'] - exp); buffer = deadline - eta
        print(f"{fmt(now)}  {along/1000:.2f} km along ({off:.0f} m off the line)  passed: {passed} {MS[passed]['label']}"
              + (f"  AT {MS[near[-1]]['label']}" if near else '')
              + (f"  next: {nxt} {MS[nxt]['label']} in {(MS[nxt]['along']-along)/1000:.2f} km (due {fmt(start+MS[nxt]['offset'])})" if nxt else '  FINISHED')
              + f"  | {actual:.0f} min elapsed vs {exp:.0f} planned → {'behind' if actual>exp else 'ahead'} by {abs(actual-exp):.0f} min; ETA {fmt(eta)}, buffer {buffer:.0f} min")

if __name__ == '__main__':
    main()

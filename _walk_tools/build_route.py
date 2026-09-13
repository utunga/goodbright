#!/usr/bin/env python3
"""Build data.js for a walk from a Google My Maps KML export plus a JSON timetable.

Usage: build_route.py <config.json> <out_dir>

- Every LineString in the KML (except those listed in exclude_lines) is a piece of the route.
- Pieces are chained by nearest endpoints starting from the first milestone, reversed if needed,
  trimmed where one piece overshoots into the next, and any remaining gap is bridged with a
  straight segment. Every seam is reported.
- Milestones are matched by name in the milestone folder (or given explicit coords), then
  projected onto the joined route in order (each one searched only beyond the previous one).
"""
import json, math, sys, os, re
import xml.etree.ElementTree as ET

NS = {'k': 'http://www.opengis.net/kml/2.2'}
R = 6371008.8

def to_xy(lon, lat, lat0):
    # local equirectangular metres, good enough over 30 km
    x = math.radians(lon) * R * math.cos(math.radians(lat0))
    y = math.radians(lat) * R
    return x, y

def dist(a, b):
    return math.hypot(a[0]-b[0], a[1]-b[1])

def parse_kml(path):
    t = ET.parse(path)
    root = t.getroot()
    folders = []
    for f in root.iter('{%s}Folder' % NS['k']):
        name = f.find('k:name', NS).text or ''
        items = []
        for p in f.findall('k:Placemark', NS):
            nm = (p.find('k:name', NS).text or '').strip()
            d = p.find('k:description', NS)
            desc = (d.text or '').strip() if d is not None else ''
            pt = p.find('.//k:Point/k:coordinates', NS)
            ls = p.find('.//k:LineString/k:coordinates', NS)
            if pt is not None:
                lon, lat = [float(v) for v in pt.text.strip().split(',')[:2]]
                items.append({'type': 'point', 'name': nm, 'desc': desc, 'lonlat': (lon, lat)})
            elif ls is not None:
                coords = []
                for tok in ls.text.split():
                    lon, lat = [float(v) for v in tok.split(',')[:2]]
                    coords.append((lon, lat))
                items.append({'type': 'line', 'name': nm, 'desc': desc, 'coords': coords})
        folders.append({'name': name, 'items': items})
    return folders

def project_point_on_polyline(xy, p, start_idx=0, end_idx=None):
    """Return (dist, seg_index, t, along_m) for the nearest point of polyline xy (list of (x,y),
    with cumulative lengths precomputed separately) to point p, searching segments start_idx..end_idx-1."""
    if end_idx is None:
        end_idx = len(xy) - 1
    best = None
    for i in range(start_idx, end_idx):
        a, b = xy[i], xy[i+1]
        dx, dy = b[0]-a[0], b[1]-a[1]
        L2 = dx*dx + dy*dy
        if L2 == 0:
            t = 0.0
        else:
            t = max(0.0, min(1.0, ((p[0]-a[0])*dx + (p[1]-a[1])*dy) / L2))
        q = (a[0] + t*dx, a[1] + t*dy)
        d = dist(p, q)
        if best is None or d < best[0]:
            best = (d, i, t, q)
    return best

def cumulative(xy):
    cum = [0.0]
    for i in range(1, len(xy)):
        cum.append(cum[-1] + dist(xy[i-1], xy[i]))
    return cum

def main(cfg_path, out_dir):
    cfg = json.load(open(cfg_path))
    here = os.path.dirname(os.path.abspath(cfg_path))
    folders = parse_kml(os.path.join(here, cfg['kml']))
    report = []
    log = report.append

    # ---- gather
    all_points = {}
    milestone_points = {}
    lines = []
    extra_lines = {}
    pois = []
    excl = set(cfg.get('exclude_lines', []))
    poi_folders = cfg.get('poi_folders', {})
    for f in folders:
        is_dir = f['name'].startswith('Directions from')
        for it in f['items']:
            if it['type'] == 'point':
                if f['name'] in poi_folders:
                    pois.append({'name': it['name'], 'lon': it['lonlat'][0], 'lat': it['lonlat'][1], 'kind': poi_folders[f['name']]})
                elif f['name'] == cfg['milestone_folder']:
                    milestone_points[it['name']] = it
                else:
                    all_points.setdefault(it['name'], it)
            else:
                if it['name'] in excl:
                    extra_lines[it['name']] = it
                else:
                    lines.append(it)
    lat0 = sum(c[1] for l in lines for c in l['coords']) / sum(len(l['coords']) for l in lines)

    def XY(lonlat):
        return to_xy(lonlat[0], lonlat[1], lat0)

    for l in lines:
        l['xy'] = [XY(c) for c in l['coords']]
        log(f"piece: {l['name']!r} n={len(l['coords'])} length={cumulative(l['xy'])[-1]:.0f} m")

    # ---- resolve milestone coordinates
    ms = []
    for m in cfg['milestones']:
        if 'coords' in m:
            lonlat = tuple(m['coords'])
            src = 'coords'
        else:
            p = milestone_points.get(m['kml']) or all_points.get(m['kml'])
            if p is None:
                raise SystemExit(f"milestone {m['kml']!r} not found in KML")
            lonlat = p['lonlat']
            src = 'kml'
            if p.get('desc') and 'note' not in m:
                m['note'] = p['desc']
        ms.append(dict(m, lonlat=lonlat, xy=XY(lonlat), src=src))

    # ---- chain pieces
    start_xy = ms[0]['xy']
    unused = lines[:]
    # first piece: endpoint nearest to first milestone
    def end_dist(l, rev):
        return dist(l['xy'][-1] if rev else l['xy'][0], start_xy)
    first = min(((l, rev) for l in unused for rev in (False, True)), key=lambda t: end_dist(*t))
    l, rev = first
    if rev:
        l['xy'].reverse(); l['coords'].reverse()
    chain = [l]; unused.remove(l)
    log(f"start: {l['name']!r} ({'reversed' if rev else 'as drawn'}), {end_dist(l, False):.0f} m from {ms[0]['label']!r}")
    while unused:
        cur_end = chain[-1]['xy'][-1]
        cand = min(((l, rev) for l in unused for rev in (False, True)),
                   key=lambda t: dist((t[0]['xy'][-1] if t[1] else t[0]['xy'][0]), cur_end))
        l, rev = cand
        if rev:
            l['xy'].reverse(); l['coords'].reverse()
        chain.append(l); unused.remove(l)
    log("order: " + " -> ".join(repr(l['name']) for l in chain))

    # ---- trim and bridge
    TRIM_PERP = 40.0   # m: how close a piece must pass to count as overlapping
    TRIM_ALONG = 15.0  # m: minimum overshoot worth trimming
    route = []         # list of xy
    route_ll = []      # list of (lon,lat)
    bridges = []       # (start_index, end_index) in route of straight bridge segments
    seams = []
    for idx, l in enumerate(chain):
        xy = l['xy']; ll = l['coords']
        if not route:
            route.extend(xy); route_ll.extend(ll); continue
        # A = route so far, B = this piece
        a_end = route[-1]
        # does B's start land on A's interior (A overshoots)?
        pa = project_point_on_polyline(route, xy[0], max(0, len(route) - 400))
        # does A's end land on B's interior (B starts early)?
        pb = project_point_on_polyline(xy, a_end, 0, min(len(xy) - 1, 400))
        cumA = cumulative(route); cumB = cumulative(xy)
        trimmed = ''
        overshootA = cumA[-1] - (cumA[pa[1]] + pa[2] * (cumA[pa[1]+1] - cumA[pa[1]]))
        overshootB = cumB[pb[1]] + pb[2] * (cumB[pb[1]+1] - cumB[pb[1]])
        def milestone_on(poly):
            # a milestone sitting on this stretch, at least 40 m in from its start (so a milestone
            # placed exactly at the junction does not count as "on the spur")
            if len(poly) < 2:
                return None
            cumP = cumulative(poly)
            for m in ms:
                d, seg, t, q = project_point_on_polyline(poly, m['xy'])
                along = cumP[seg] + t * (cumP[seg+1] - cumP[seg])
                if d < 60 and along > 40:
                    return m['label']
            return None
        if pa[0] < TRIM_PERP and overshootA > TRIM_ALONG:
            seg = pa[1]
            spur_ms = milestone_on(route[seg:])
            if spur_ms:
                # the overshoot leads to a milestone: keep it as an out-and-back along the same line
                back = list(reversed(route[seg+1:])) + [pa[3]]
                back_ll = list(reversed(route_ll[seg+1:]))
                a, b = route_ll[seg], route_ll[seg+1]
                back_ll.append((a[0] + pa[2]*(b[0]-a[0]), a[1] + pa[2]*(b[1]-a[1])))
                route = route + back; route_ll = route_ll + back_ll
                trimmed = f"kept the {overshootA:.0f} m spur to {spur_ms!r} and retraced it back along the same line"
            else:
                # cut A at the projection
                route = route[:seg+1] + [pa[3]]
                a, b = route_ll[seg], route_ll[seg+1]
                route_ll = route_ll[:seg+1] + [(a[0] + pa[2]*(b[0]-a[0]), a[1] + pa[2]*(b[1]-a[1]))]
                trimmed = f"trimmed {overshootA:.0f} m off the end of the previous piece"
        elif pb[0] < TRIM_PERP and overshootB > TRIM_ALONG:
            seg = pb[1]
            spur_ms = milestone_on(xy[:seg+2])
            if spur_ms:
                trimmed = f"this piece starts {overshootB:.0f} m early but that stretch holds {spur_ms!r}, so kept as drawn"
            else:
                a, b = ll[seg], ll[seg+1]
                cut_ll = (a[0] + pb[2]*(b[0]-a[0]), a[1] + pb[2]*(b[1]-a[1]))
                xy = [pb[3]] + xy[seg+1:]
                ll = [cut_ll] + ll[seg+1:]
                trimmed = f"trimmed {overshootB:.0f} m off the start of this piece"
        gap = dist(route[-1], xy[0])
        if gap > 0.5:
            bridges.append((len(route) - 1, len(route)))
        route.extend(xy); route_ll.extend(ll)
        seams.append({'to': l['name'], 'gap_m': round(gap), 'trim': trimmed})
        log(f"seam -> {l['name']!r}: gap {gap:.0f} m{(' (bridged with a straight line)' if gap > 0.5 else '')}{'; ' + trimmed if trimmed else ''}")

    cum = cumulative(route)
    total = cum[-1]
    log(f"joined route: {len(route)} vertices, {total/1000:.2f} km")

    # ---- project milestones in order
    prev_seg = 0
    out_ms = []
    for k, m in enumerate(ms):
        if k == 0:
            best = (dist(route[0], m['xy']), 0, 0.0, route[0])
        else:
            best = project_point_on_polyline(route, m['xy'], prev_seg)
        d, seg, t, q = best
        along = cum[seg] + t * (cum[seg+1] - cum[seg]) if seg < len(cum) - 1 else cum[-1]
        if m.get('finish'):
            # a finish milestone snaps to the end of the route if it is close-ish
            if dist(route[-1], m['xy']) < 300:
                along = total; seg = len(route) - 2; t = 1.0; d = dist(route[-1], m['xy'])
        prev_seg = seg
        flag = ' <-- more than 60 m off the line' if d > 60 else ''
        log(f"milestone {k:2d} {m['label']!r}: {d:.0f} m from route, {along/1000:.2f} km along, +{m['offset']} min{flag}")
        out_ms.append({
            'n': k, 'label': m['label'], 'lat': round(m['lonlat'][1], 6), 'lng': round(m['lonlat'][0], 6),
            'along': round(along), 'offset': m['offset'], 'break': m.get('break', 0),
            'note': m.get('note', ''), 'legNote': m.get('leg_note', ''), 'finish': bool(m.get('finish')),
            'offLine': round(d),
        })
    # ---- the last milestone: if the route continues past it, cut the route there (finish means finish)
    fin = out_ms[-1]
    if fin['along'] < total - 5:
        log(f"route continues {total - fin['along']:.0f} m past the finish; cut there")
        # find seg
        seg = max(i for i in range(len(cum)) if cum[i] <= fin['along'])
        t = (fin['along'] - cum[seg]) / (cum[seg+1]-cum[seg]) if seg < len(cum)-1 and cum[seg+1] > cum[seg] else 0
        a, b = route_ll[seg], route_ll[min(seg+1, len(route_ll)-1)]
        route_ll = route_ll[:seg+1] + [(a[0] + t*(b[0]-a[0]), a[1] + t*(b[1]-a[1]))]
        route = [XY(c) for c in route_ll]; cum = cumulative(route); total = cum[-1]
        bridges = [b for b in bridges if b[1] < len(route)]
        fin['along'] = round(total)
    # if the finish milestone is off the end of the route, extend the route to it
    if dist(route[-1], ms[-1]['xy']) > 5:
        bridges.append((len(route)-1, len(route)))
        route.append(ms[-1]['xy']); route_ll.append(ms[-1]['lonlat'])
        cum = cumulative(route); total = cum[-1]; fin['along'] = round(total)
        log(f"extended route {dist(route[-2], route[-1]):.0f} m to the finish with a straight line")

    # legs summary
    for k in range(1, len(out_ms)):
        a, b = out_ms[k-1], out_ms[k]
        dkm = (b['along'] - a['along']) / 1000
        mins = b['offset'] - a['offset'] - a['break']
        pace = (dkm / (mins/60)) if mins > 0 else 0
        log(f"leg {k:2d} {a['label']!r} -> {b['label']!r}: {dkm:.2f} km in {mins} min = {pace:.1f} km/h")

    landmarks = []
    for lm in cfg.get('landmarks', []):
        p = milestone_points.get(lm['kml']) or all_points.get(lm['kml'])
        if p:
            landmarks.append({'label': lm['label'], 'lat': round(p['lonlat'][1], 6), 'lng': round(p['lonlat'][0], 6), 'kind': lm.get('kind', '')})
    extras = []
    for ex in cfg.get('extra_lines', []):
        l = extra_lines.get(ex['kml'])
        if l:
            extras.append({'label': ex['label'], 'style': ex.get('style', 'dashed'),
                           'coords': [[round(c[1], 6), round(c[0], 6)] for c in l['coords']]})

    data = {
        'slug': cfg['slug'], 'title': cfg['title'], 'subtitle': cfg['subtitle'],
        'nominalStart': cfg['nominal_start'], 'bufferMin': cfg['buffer_min'],
        'deadlineLabel': cfg.get('deadline_label', ''), 'deadline': cfg.get('deadline'),
        'totalKm': round(total/1000, 2),
        'route': [[round(c[1], 6), round(c[0], 6)] for c in route_ll],
        'bridges': [list(b) for b in bridges],
        'milestones': out_ms,
        'landmarks': landmarks,
        'pois': [{'label': p['name'], 'lat': round(p['lat'], 6), 'lng': round(p['lon'], 6), 'kind': p['kind']} for p in pois],
        'extras': extras,
        'seams': seams,
    }
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'data.js'), 'w') as f:
        f.write('window.WALK = ' + json.dumps(data, separators=(',', ':')) + ';\n')
    with open(os.path.join(out_dir, 'seam_report.txt'), 'w') as f:
        f.write('\n'.join(report) + '\n')
    print('\n'.join(report))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])

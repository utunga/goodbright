#!/usr/bin/env python3
"""Assemble a deployable folder for one walk: index.html, print.html, sw.js, data.js, manifest, icons."""
import json, os, sys, shutil
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
VENDOR = os.path.join(ROOT, 'vendor', 'node_modules', 'leaflet', 'dist')

def icon(path, size, colour, glyph_colour='#ffffff'):
    im = Image.new('RGBA', (size, size), colour)
    d = ImageDraw.Draw(im)
    s = size
    # a winding path with a start dot and a finish flag
    pts = [(0.18*s, 0.80*s), (0.30*s, 0.55*s), (0.48*s, 0.62*s), (0.62*s, 0.38*s), (0.80*s, 0.30*s)]
    d.line(pts, fill=glyph_colour, width=max(2, int(s*0.09)), joint='curve')
    r = s*0.08
    d.ellipse([pts[0][0]-r, pts[0][1]-r, pts[0][0]+r, pts[0][1]+r], fill=glyph_colour)
    fx, fy = pts[-1]
    d.rectangle([fx-r*0.35, fy-r*2.4, fx+r*0.35, fy+r*0.2], fill=glyph_colour)
    d.polygon([(fx+r*0.35, fy-r*2.4), (fx+r*2.4, fy-r*1.7), (fx+r*0.35, fy-r*1.0)], fill=glyph_colour)
    im.save(path)

def main(cfg_path, out_dir, linz_key):
    cfg = json.load(open(cfg_path))
    leaflet_css = open(os.path.join(VENDOR, 'leaflet.css')).read()
    leaflet_js = open(os.path.join(VENDOR, 'leaflet.js')).read()
    # leaflet.css references images/ for layer control and markers we don't use; keep the folder anyway
    os.makedirs(out_dir, exist_ok=True)
    short = cfg['title'] if len(cfg['title']) <= 12 else cfg['title'].split()[0]
    for name in ('index.html', 'print.html', 'overview.html'):
        s = open(os.path.join(SRC, name)).read()
        s = s.replace('/*__LEAFLET_CSS__*/', leaflet_css).replace('/*__LEAFLET_JS__*/', leaflet_js)
        s = s.replace('__TITLE__', cfg['title']).replace('__SHORT_TITLE__', short).replace('__LINZ_KEY__', linz_key)
        s = s.replace('__HAS_DIRECTIONS__', 'true' if os.path.exists(os.path.join(ROOT, 'osm_runs_' + cfg['slug'] + '.txt')) else 'false')
        open(os.path.join(out_dir, name), 'w').write(s)
    open(os.path.join(out_dir, 'sw.js'), 'w').write(open(os.path.join(SRC, 'sw.js')).read().replace('__SLUG__', cfg['slug']))
    manifest = {
        'name': cfg['title'], 'short_name': short, 'start_url': './', 'scope': './', 'display': 'standalone',
        'background_color': '#1f2a37', 'theme_color': '#1f2a37', 'orientation': 'portrait',
        'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'}],
    }
    json.dump(manifest, open(os.path.join(out_dir, 'manifest.webmanifest'), 'w'), indent=1)
    colour = cfg.get('icon_colour', '#e8590c')
    for sz in (32, 180, 192, 512):
        icon(os.path.join(out_dir, f'icon-{sz}.png'), sz, colour)
    print('assembled', out_dir, 'files:', sorted(os.listdir(out_dir)))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3])

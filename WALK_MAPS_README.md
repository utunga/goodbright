# Walk maps — freyja_walk and test_walk

Two small web apps for goodbright.nz, one per walk. Each folder is self-contained
(Leaflet is inlined; nothing loads from a CDN) and is served by GitHub Pages as-is:

    goodbright.nz/freyja_walk/          the walk app (GPS, milestones, buffer, check-in)
    goodbright.nz/freyja_walk/print.html the printable A4 sheets
    goodbright.nz/test_walk/            same code, the short Roseneath loop

`freyja_walk_v1/` and `test_walk_v1/` are the first cut, kept so the two can be
compared on a phone. Delete them once you've picked.

## On the phone

1. Open the URL in Safari (iPhone) or Chrome (Android). Allow location.
2. Share → Add to Home Screen. Open it from there from now on.
3. On wifi: menu (☰) → "Save map for offline". ~400 tiles, ~10 MB for the big walk.
4. On the day: press **Start the walk** when leaving (if she forgets, it starts
   itself once she's 250 m down the route within 90 minutes of the planned start).

The header pill is the buffer: minutes in hand against the deadline (6pm at the
campsite), computed from where she is and the plan's pace from there. Green ≥ 18 min,
amber ≥ 5, red below. "Check in" opens WhatsApp with milestone, ETA and a maps link.
Add `?sim` to the URL for a slider that walks a fake position along the route.

## Rebuilding after changing the route or times

Everything in `_walk_tools/` (Jekyll ignores folders starting with `_`):

    _walk_tools/
      freyja_walk.kml, test_walk.kml     Google My Maps exports
      freyja_walk.json, test_walk.json   milestones (matched by KML pin name), minutes
                                         from the start, breaks, notes, deadline
      build_route.py                     joins the KML pieces, projects milestones,
                                         writes data.js + seam_report.txt
      assemble.py                        stamps index/print/sw with title and LINZ key
      src/                               the app sources (index.html, print.html, sw.js)
      build.sh                           runs the lot: ./build.sh  (needs python3 + Pillow,
                                         and vendor/node_modules/leaflet from `npm install leaflet@1.9.4`)

Export the map from My Maps again (⋮ → Export to KML/KMZ → entire map), drop it
over the .kml, adjust the .json, run `./build.sh`, copy `dist/<walk>/` over the
folder here. `seam_report.txt` says where pieces were joined and by how much.

Map tiles: LINZ Topo50 via the LINZ Data Service (key in the HTML, tile-only scope),
with OpenStreetMap and OpenTopoMap as fallbacks. If Topo50 tiles fail to load the
app switches itself to OpenStreetMap and says so.

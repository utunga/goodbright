# Walk maps — freyja_walk and test_walk

Two small web apps for goodbright.nz, one per walk. Each folder is self-contained
(Leaflet is inlined; nothing loads from a CDN) and is served by GitHub Pages as-is:

    goodbright.nz/freyja_walk/                the walk app (GPS, milestones, trail, buffer, check-in)
    goodbright.nz/freyja_walk/print.html      the printable A4 map sheets
    goodbright.nz/freyja_walk/overview.html   the whole route on one page (PDF or PNG)
    goodbright.nz/freyja_walk/directions.html turn-by-turn: every street, every left and right (A4, 3 pages)
    goodbright.nz/test_walk/                  same code, the short Roseneath loop

## On the phone

1. Open the URL in Safari (iPhone) or Chrome/Firefox (Android). Allow location.
2. Share → Add to Home Screen. Open it from there from now on.
3. On wifi: menu (☰) → "Save map for offline". ~400 tiles, ~10 MB for the big walk.
4. On the day: press **Start the walk** when leaving (if she forgets, it starts
   itself once she's 250 m down the route within 90 minutes of the planned start).

## How check-ins work (v3)

A **check-in** drops a point on her trail (kept on the phone, drawn as a blue dotted
line between check-ins, tap a point for its time). If she is at a milestone the
check-in ticks it green. Sending the WhatsApp message is optional and comes second.

- Green = a check-in landed within 60 m + the fix's error of that milestone, or she
  tapped "I'm here" on it in the list. Nothing else turns a milestone green.
- Grey = passed without checking in (a later milestone is ticked, or a clean GPS fix
  puts her well past it). The app then asks once: "Passed X without checking in?
  I was there / No". "At X? Check in / Not yet" appears when a clean fix has her at
  the next milestone.
- The list (Milestones) owns "next stop". The GPS owns the dot, the km and the live
  buffer, and it is gated: fixes worse than ±60 m move the dot but not the progress;
  a jump at running speed is held for a minute to see if it holds; progress never
  projects behind the last tick.
- The buffer pill sits in the bottom card next to the ETA: minutes in hand against
  the deadline (6pm at the campsite), from where she is and the plan's pace from
  there. Green ≥ 18 min, amber ≥ 5, red below.
- Menu → "Share the trail" sends every check-in as text (time, milestone, plan
  comparison, coordinates) — paste it to whoever is tracking her.

Safari gives a web app no location with the screen off, so the trail is her taps,
not a GPS log of the day. Add `?sim` to the URL for a slider that walks a fake
position along the route.

## Rebuilding after changing the route or times

Everything in `_walk_tools/` (Jekyll ignores folders starting with `_`):

    _walk_tools/
      freyja_walk.kml, test_walk.kml     Google My Maps exports
      freyja_walk.json, test_walk.json   milestones (matched by KML pin name), minutes
                                         from the start, breaks, notes, deadline
      build_route.py                     joins the KML pieces, projects milestones,
                                         writes data.js + seam_report.txt
      assemble.py                        stamps index/print/sw with title and LINZ key
      directions.py                      turn-by-turn from the route + OSM street names
      osm_runs_freyja_walk.txt           the OSM ways matched along the route (see below)
      src/                               the app sources (index.html, print.html, overview.html, sw.js)
      test_app.py, test_checkins.py      headless Playwright tests (python3 -m pip install playwright pillow;
                                         python3 -m playwright install chromium)
      build.sh                           runs the lot: ./build.sh  (needs python3 + Pillow,
                                         and vendor/node_modules/leaflet from `npm install leaflet@1.9.4`)

Export the map from My Maps again (⋮ → Export to KML/KMZ → entire map), drop it
over the .kml, adjust the .json, run `./build.sh`, copy `dist/<walk>/` over the
folder here. `seam_report.txt` says where pieces were joined and by how much.

If the route itself changes, `osm_runs_freyja_walk.txt` needs redoing: it is the list
of OpenStreetMap ways (from|to metres along|name|highway) nearest each 20 m of the
route, fetched from Overpass (`way(around:30, lat,lon,...)["highway"]`) — the query
and matching are in the header of that file's history; the sandbox that built it
could only reach Overpass through a browser. Off-road sections without OSM names are
labelled in the OVERRIDES table in directions.py.

Map tiles: OpenStreetMap (default), LINZ Topo50 via the LINZ Data Service (key in the
HTML, tile-only scope), LINZ aerial imagery via LINZ Basemaps with Esri World Imagery as
its fallback, and OpenTopoMap. If Topo50 tiles fail to load the
app switches itself to OpenStreetMap and says so.

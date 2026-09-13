#!/bin/bash
# Rebuild both walk folders from the KML + JSON here. Needs python3 with Pillow, and Leaflet:
#   cd _walk_tools && npm install leaflet@1.9.4 --prefix vendor   (once)
set -e
cd "$(dirname "$0")"
KEY="${LINZ_KEY:-1b095d00946a4967a289cff2eb6bfbd1}"
for w in freyja_walk test_walk; do
  python3 build_route.py $w.json dist/$w
  python3 assemble.py $w.json dist/$w "$KEY"
done
echo "now copy dist/freyja_walk and dist/test_walk over ../freyja_walk and ../test_walk"

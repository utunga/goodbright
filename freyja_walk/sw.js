/* Service worker: keeps the app and its map tiles available without signal. */
const SHELL = 'shell-freyja_walk-v1';
const TILES = 'tiles-freyja_walk-v1';
const SHELL_FILES = ['./', 'index.html', 'data.js', 'print.html', 'overview.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-32.png'];
const TILE_HOSTS = ['tiles-a.data-cdn.linz.govt.nz', 'tiles-b.data-cdn.linz.govt.nz', 'tiles-c.data-cdn.linz.govt.nz', 'tiles-d.data-cdn.linz.govt.nz', 'basemaps.linz.govt.nz', 'server.arcgisonline.com', 'tile.openstreetmap.org', 'tile.opentopomap.org', 'a.tile.opentopomap.org', 'b.tile.opentopomap.org', 'c.tile.opentopomap.org'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (TILE_HOSTS.includes(url.hostname)) {
    // tiles: cache first, then network (and keep what we fetch)
    e.respondWith(caches.open(TILES).then(async (c) => {
      const hit = await c.match(e.request.url);
      if (hit) return hit;
      try {
        const r = await fetch(e.request);
        if (r && r.ok) c.put(e.request.url, r.clone());   // only real (CORS) responses; opaque ones are quota-padded
        return r;
      } catch (err) {
        return new Response('', {status: 504});
      }
    }));
    return;
  }
  if (url.origin === location.origin) {
    // app files: network first so updates arrive, cache as the fallback
    e.respondWith(fetch(e.request).then((r) => {
      if (r && r.ok && e.request.method === 'GET') caches.open(SHELL).then((c) => c.put(e.request, r.clone()));
      return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true}).then((hit) => hit || (e.request.mode === 'navigate' ? caches.match('index.html') : new Response('', {status: 504})))));
  }
});

const CACHE_NAME = 'cult-tools-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  '/', // allow root fallback
  // external assets (fast-fallback) - include fonts/CDN to cache if desired
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // try network first for HTML, otherwise cache-first
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      // put a copy in cache for future (optional)
      return caches.open(CACHE_NAME).then(cache => {
        try { cache.put(req, resp.clone()); } catch (e) {}
        return resp;
      });
    }).catch(() => caches.match('./index.html')))
  );
});
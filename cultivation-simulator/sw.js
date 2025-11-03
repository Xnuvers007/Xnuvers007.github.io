const CACHE_NAME = 'cult-tools-v2';
const ASSETS = [...new Set([
  './index.html',
  './manifest.json',
  './', 
  './style.css',
  './script.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://tr.rbxcdn.com/180DAY-e3b172c999c4bbc6ef671fcad60e51d0/256/256/Image/Webp/noFilter',
  './assets/discord.png',
  './assets/wing.png',
  './assets/tailwind.min.js',
  './assets/inter.woff2.css',
  'https://placehold.co/600x100/1f2937/d1d5db?text=Wing+Example',
  'https://placehold.co/24x24/5865F2/ffffff?text=D',
    // Regular 400
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  // Medium 500
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  // Bold 700
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2',
  // Extra Bold 800
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2',
  'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2'
])];

const FALLBACK_IMAGE = 'https://placehold.co/256x256/5865F2/ffffff?text=?';
const FALLBACK_HTML = './index.html';

// Install: cache all assets aggressively
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Helper: stale-while-revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  try {
    const resp = await fetch(request);
    if (resp && resp.ok) cache.put(request, resp.clone());
    return resp;
  } catch {
    return cached;
  }
}

// Fetch: handle all requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1️⃣ Navigation / HTML pages - network-first, fallback to cache
if (request.mode === 'navigate' || request.destination === 'document') {
  event.respondWith((async () => {
    try {
      const resp = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(FALLBACK_HTML, resp.clone());
      return resp;
    } catch (err) {
      return caches.match(FALLBACK_HTML);
    }
  })());
  return;
}

  // 2️⃣ JS, CSS, Manifest - cache-first
  if (request.destination === 'script' || request.destination === 'style' || url.pathname.endsWith('manifest.json')) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      const resp = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, resp.clone());
      return resp;
    })());
    return;
  }

  // 3️⃣ Images - stale-while-revalidate, fallback
  if (request.destination === 'image') {
    event.respondWith(
      staleWhileRevalidate(request).then(res => res || caches.match(FALLBACK_IMAGE))
    );
    return;
  }

  // 4️⃣ Fonts / External assets - cache-first
  if (request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com') || request.url.includes('cdn.tailwindcss.com')) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(resp => {
        caches.open(CACHE_NAME).then(cache => cache.put(request, resp.clone()));
        return resp;
      })).catch(() => null)
    );
    return;
  }

  // 5️⃣ Other requests - stale-while-revalidate
  event.respondWith(
    staleWhileRevalidate(request).then(res => res || fetch(request).catch(() => caches.match(FALLBACK_HTML)))
  );
});

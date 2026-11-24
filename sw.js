/* Daylight service worker — offline support for GitHub Pages */
const CACHE = 'daylight-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // The page itself: network first (so app updates arrive), cached copy when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else (icons, fonts): cache first, then network
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      try {
        if (new URL(req.url).origin === location.origin) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
      } catch (err) {}
      return r;
    }))
  );
});

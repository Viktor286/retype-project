self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('retype-store').then((cache) => cache.addAll([
      '/static/',
      '/lib/',
      '/fonts/',
      '/index.html',
      '/favicon.ico',
      '/logo32.png',
      '/logo192.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v60'; // قفزة كبيرة للإصدار
const urlsToCache = [
  './',
  './index.html',
  './Nabatshia.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './control.js',
  './sw.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // إجبار السيرفس وركر الجديد على التفعيل فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // مسح شامل لكل الكاش القديم
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // استراتيجية النتوورك أولاً لملفات التحكم والبرامج لضمان التحديث
  if (event.request.url.includes('control.js') || event.request.url.includes('6.html')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
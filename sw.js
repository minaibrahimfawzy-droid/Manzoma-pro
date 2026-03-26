const CACHE_NAME = 'manzoma-cache-v8';
const urlsToCache = [
  './index.html',
  './Nabatshia.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Installing system cache...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// استراتيجية التشغيل: ابحث في الذاكرة (Cache) أولاً لضمان السرعة الأوفلاين
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
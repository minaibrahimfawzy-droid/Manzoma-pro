--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v210'; 
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
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
  return self.clients.claim();
});

// استراتيجية ذكية لـ GitHub والـ APK: حاول من النت أولاً، إذا فشل (أوفلاين) اسحب من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
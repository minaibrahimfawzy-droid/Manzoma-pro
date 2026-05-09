--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v300'; 
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

// 1. عند التثبيت: سحب كل الملفات وتخزينها في الموبايل
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. عند التفعيل: مسح أي نسخ قديمة فوراً
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. عند طلب أي ملف: ابحث في الكاش (الأوفلاين) أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // إذا وجد الملف في الكاش، افتحه فوراً (حتى بدون نت)
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يجده (ملف جديد)، اطلبه من الإنترنت
      return fetch(event.request);
    })
  );
});
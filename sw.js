--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-pro-v700';
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

// 1. تثبيت وحفظ الملفات في الموبايل
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('تم تأمين ملفات الأوفلاين في الذاكرة');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. تنشيط السيرفر وركر ومسح القديم
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

// 3. الاستراتيجية الأقوى للأوفلاين (البحث في الذاكرة أولاً)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // إذا وجد الملف في الذاكرة (أوفلاين) يفتحه فوراً
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يجده (ملف جديد) يطلبه من الإنترنت
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // تحديث الذاكرة بالملف الجديد للمرة القادمة
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // إذا النت مقطوع والملف غير مخزن (حالة نادرة)
      return caches.match('./index.html');
    })
  );
});
--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-offline-v800';
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

// تثبيت السيرفس وركر وتخزين الملفات
self.addEventListener('install', event => {
  self.skipWaiting(); // إجبار التنشيط الفوري
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// تنشيط ومسح الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// الاستراتيجية القاطعة: ابحث في الكاش أولاً (للأوفلاين)
self.addEventListener('fetch', event => {
  // إذا كان الطلب للموقع الرئيسي أو الملفات، ابحث في الكاش
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // افتح من الموبايل فوراً
      }
      
      // إذا لم يكن مخزناً، اطلبه من الإنترنت وخزنه للمرة القادمة
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // إذا النت مقطوع والملف غير موجود (حالة فشل كامل)
      return caches.match('./index.html');
    })
  );
});
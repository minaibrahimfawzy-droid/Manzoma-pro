--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v208'; 
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

// مرحلة التثبيت: حفظ الملفات فوراً
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري حفظ ملفات الأوفلاين...');
      return cache.addAll(urlsToCache);
    })
  );
});

// مرحلة التنشيط: طرد أي نسخة قديمة
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

// محرك التشغيل: يبحث في الكاش أولاً (يعمل حتى لو النت مفصول تماماً)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // إذا الملف موجود في الموبايل، افتحه فوراً
      }
      return fetch(event.request); // إذا مش موجود، اطلبه من النت
    })
  );
});
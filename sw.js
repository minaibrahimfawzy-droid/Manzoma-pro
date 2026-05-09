--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v207'; 
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

// التثبيت: تخزين كل الملفات في ذاكرة الموبايل فوراً
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// التفعيل: مسح النسخ القديمة لضمان عدم حدوث تعارض
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

// جلب الملفات: يبحث في الكاش أولاً (ليعمل الأوفلاين) ثم يبحث في النت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v204'; // رفع رقم الكاش لـ 204
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

// التثبيت وتخزين الملفات
self.addEventListener('install', event => {
  self.skipWaiting(); // إجبار النسخة الجديدة على التنشيط فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// التفعيل ومسح الكاش القديم (هنا يتم تنظيف المتصفح بالكامل)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // مسح أي كاش قديم
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// استراتيجية التشغيل: الإنترنت أولاً (للتحديث) ثم الكاش (للأوفلاين)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
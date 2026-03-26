const CACHE_NAME = 'manzoma-cache-v8';
const urlsToCache = [
  './index.html',
  './Nabatshia.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './sw.js'
];

// عند التثبيت: خزن كل الملفات فوراً
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('System Caching Enabled...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// استراتيجية (Cache First): ابحث في الذاكرة أولاً، لضمان العمل أوفلاين فوراً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // يرجع الملف من الكاش لو موجود، لو مش موجود يطلبه من النت
      return response || fetch(event.request).catch(() => {
        // لو مفيش نت خالص والملف مش في الكاش، ارجع لصفحة البداية
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// تنظيف الكاش القديم عند التحديث
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
const CACHE_NAME = 'sys2026-v97'; // عند إجراء تحديث ضخم، يفضل تغيير هذا الرقم يدوياً أيضاً

const urlsToCache = [
  './',
  './index.html',
  // أضف هنا أسماء صفحاتك الأخرى إذا أردت
];

// 1. التثبيت (Install)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. جلب الملفات (Fetch)
self.addEventListener('fetch', event => {
  // استثناء هام: لا تحفظ ملف version.json أبداً في الكاش لضمان وصول التحديث
  if (event.request.url.includes('version.json')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // لباقي الملفات: جرب النت أولاً، لو مفيش نت هات من الكاش المحفوظ
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// 3. التفعيل والتنظيف (Activate)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
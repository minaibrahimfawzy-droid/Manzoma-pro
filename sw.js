--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-pro-v2001';

// قائمة بجميع ملفاتك لضمان عدم سقوط أي برنامج
const urlsToCache = [
  './',
  './index.html',
  './Nabatshia.html',
  './1.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './control.js',
  './sw.js'
];

// مرحلة التثبيت: حفظ كل الملفات
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// مرحلة التفعيل: مسح الكاش القديم
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

// محرك التشغيل الأوفلاين: اسحب من الذاكرة أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // إذا كان الملف مخزناً، افتحه فوراً (أوفلاين)
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يكن مخزناً، اطلبه من الإنترنت
      return fetch(event.request);
    })
  );
});
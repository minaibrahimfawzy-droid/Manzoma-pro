--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-full-v1000'; // اسم كاش جديد وشامل

// قائمة بجميع ملفات المنظومة لضمان عملها أوفلاين
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

// مرحلة التثبيت: سحب وحفظ كل الملفات المذكورة أعلاه
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري حفظ جميع برامج المنظومة للعمل أوفلاين...');
      return cache.addAll(urlsToCache);
    })
  );
});

// مرحلة التنشيط: حذف أي كاش قديم وتنظيف الذاكرة
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

// محرك التشغيل: يبحث في الذاكرة أولاً (Cache First) لضمان السرعة والأوفلاين
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // إذا كان الملف مخزناً (أوفلاين)، يفتحه فوراً
      if (cachedResponse) {
        return cachedResponse;
      }
      // إذا لم يكن مخزناً، يطلبه من الإنترنت
      return fetch(event.request);
    })
  );
});
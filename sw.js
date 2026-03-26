/**
 * نظام الخدمة الخلفية (Service Worker) لعام 2026
 * يضمن تشغيل كافة البرامج والصفحات السبعة بدون إنترنت للأبد
 */

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
  './control.js',
  './sw.js'
];

// مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('--- تم تخزين ملفات النظام للأوفلاين ---');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// مرحلة جلب الملفات: استراتيجية الكاش أولاً لضمان السرعة والأوفلاين
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إذا وجد الملف في الذاكرة ارجعه، وإلا اطلبه من الشبكة
      return response || fetch(event.request);
    })
  );
});

// مرحلة التنشيط: حذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => {
          console.log('--- حذف الكاش القديم ---');
          return caches.delete(name);
        })
      );
    })
  );
});
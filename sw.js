/**
 * نظام التخزين المؤقت (Offline Worker) لعام 2026
 * يضمن عمل كافة البرامج والصفحات السبعة بدون اتصال إنترنت
 */

const CACHE_NAME = 'manzoma-cache-v8';

// قائمة الملفات المطلوبة للتشغيل الكامل بدون إنترنت
const urlsToCache = [
  './index.html',
  './control.js',
  './sw.js',
  './Nabatshia.html', // الصفحة 1
  './2.html',         // الصفحة 2
  './3.html',         // الصفحة 3
  './4.html',         // الصفحة 4
  './5.html',         // الصفحة 5
  './6.html',         // الصفحة 6
  './7.html'          // الصفحة 7
];

// تثبيت ملفات الكاش وحفظها في ذاكرة المتصفح
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Installing system cache...');
      return cache.addAll(urlsToCache);
    })
  );
});

// استدعاء الملفات من الذاكرة (Offline mode)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // يعيد الملف من الذاكرة لو وجد، وإلا يطلبه من الإنترنت
      return response || fetch(event.request);
    })
  );
});

// تنظيف الكاش القديم وتفعيل التحديثات الجديدة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => {
          console.log('Removing old system cache...');
          return caches.delete(name);
        })
      );
    })
  );
});
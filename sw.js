const CACHE_NAME = 'manzoma-cache-v8';
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

// التثبيت: سحب الملفات وتخزينها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('--- حماية الأوفلاين نشطة ---');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // تفعيل فوري للنسخة الجديدة
});

// التشغيل: استراتيجية الكاش أولاً للأوفلاين
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// التحديث: حذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
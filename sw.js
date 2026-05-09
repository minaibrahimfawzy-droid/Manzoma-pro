--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-cache-v205'; 

// إضافة ?v=205 بجانب الملفات لضمان تحميل النسخة الجديدة قسرياً
const urlsToCache = [
  './',
  './index.html',
  './Nabatshia.html',
  './2.html',
  './3.html',
  './4.html?v=205', // هنا يكمن الحل
  './5.html',
  './6.html',
  './7.html',
  './control.js',
  './sw.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

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

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // إذا فشل الإنترنت، يحاول البحث عن الملف الأصلي أو الملف برقم الفيرجن
      return caches.match(event.request) || caches.match('./4.html?v=205');
    })
  );
});
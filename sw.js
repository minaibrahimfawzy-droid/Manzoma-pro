--- START OF FILE sw.js ---
const CACHE_NAME = 'manzoma-pro-v600'; // اسم الكاش الجديد
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

// 1. مرحلة التثبيت: تخزين كل الملفات للعمل أوفلاين
self.addEventListener('install', event => {
  self.skipWaiting(); // إجبار السيرفس وركر على العمل فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري تأمين ملفات الأوفلاين...');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. مرحلة التفعيل: تدمير أي كاش قديم نهائياً لضمان ظهور التحديث
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('مسح الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); // السيطرة على المتصفح فوراً
});

// 3. استراتيجية (الشبكة أولاً): يضمن التحديث الأونلاين ويدعم الأوفلاين
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // إذا نجح الإنترنت، خذ نسخة جديدة وخزنها في الكاش
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // إذا النت مقطوع (أوفلاين)، افتح النسخة المخزنة فوراً
        return caches.match(event.request);
      })
  )
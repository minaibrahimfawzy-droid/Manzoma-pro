const CACHE_NAME = 'manzoma-pro-v2002'; // تم تغيير الاسم لمسح الكاش القديم المعطل

// القائمة الأساسية للملفات
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
  './control.js'
];

// 1. التثبيت وحفظ الملفات الأساسية (بشكل آمن لا يوقف البرنامج)
self.addEventListener('install', event => {
  self.skipWaiting(); // تفعيل النسخة الجديدة فوراً
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // نحفظ الملفات واحداً تلو الآخر حتى لا يتوقف النظام إذا كان هناك ملف مفقود
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(err => console.log('ملف لم يتم العثور عليه مؤقتاً:', url));
        })
      );
    })
  );
});

// 2. التفعيل ومسح أي كاش قديم (نسخة 2001 الفاسدة)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('تم تنظيف الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. المحرك الذكي (أونلاين / أوفلاين)
self.addEventListener('fetch', event => {
  // تجاهل الروابط الخارجية (مثل رابط تحميل الـ APK)
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // ✅ الحالة الأولى: لو قفلت النت، والملف موجود في الكاش -> شغله فوراً
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // ✅ الحالة الثانية: لو النت شغال، والملف مش في الكاش -> هاته من النت واحفظه عشان يشتغل أوفلاين بعدين
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone()); // حفظ نسخة أوفلاين
          return networkResponse;
        });
      }).catch(() => {
        // إذا كان النت مفصول والملف غير موجود نهائياً (لن تحدث غالباً لأننا حفظنا كل شيء)
        console.log('أنت أوفلاين وهذا الملف لم يتم فتحه من قبل.');
      });
    })
  );
});
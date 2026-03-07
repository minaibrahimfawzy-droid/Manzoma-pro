const CACHE_NAME = 'manzoma-cache-v1';

// 1. التثبيت الإجباري للتحديثات الجديدة فوراً (عشان ميعلقش على النسخة القديمة)
self.addEventListener("install", (event) => {
    self.skipWaiting();
});

// 2. تفعيل السيطرة على التطبيق فوراً بمجرد فتح البرنامج
self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim()); 
});

// 3. لما التطبيق يطلب أي ملف، هنجيبه من الكاش الأول عشان يشتغل أوفلاين
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // لو الملف موجود في الجهاز (الكاش) هاته، لو مش موجود هاته من النت
            return response || fetch(event.request);
        })
    );
});
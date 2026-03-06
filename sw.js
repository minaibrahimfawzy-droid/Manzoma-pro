const CACHE_NAME = 'manzoma-cache-v1';

// لما التطبيق يطلب أي ملف، هنجيبه من الكاش الأول عشان يشتغل أوفلاين
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // لو الملف موجود في الجهاز (الكاش) هاته، لو مش موجود هاته من النت
            return response || fetch(event.request);
        })
    );
});
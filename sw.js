const CACHE_NAME = 'manzoma-cache-v1';

// إجبار التحديث الفوري بمجرد نزوله
self.addEventListener("install", (event) => {
    self.skipWaiting(); 
});

// السيطرة على التطبيق فوراً
self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim()); 
});

// لما الموبايل يطلب ملف، هنجيبه من الكاش حتى لو مساره متغير
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            // ignoreSearch: true هو السر لتجاهل أي اختلافات في روابط الموبايل
            return cache.match(event.request, { ignoreSearch: true }).then(response => {
                return response || fetch(event.request);
            });
        })
    );
});
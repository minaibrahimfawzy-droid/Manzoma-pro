// ==========================================
// ملف Service Worker (التخزين المزدوج لضمان الأوفلاين)
// ==========================================

const CACHE_NAME = 'manzoma-pro-v32'; // رقم جديد لكسر أي كاش قديم

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // مسح أي ذاكرة قديمة عشان نفضي مكان للجديد
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // 🟢 في حالة وجود إنترنت:
                if (networkResponse && networkResponse.status === 200) {
                    const cacheCopy1 = networkResponse.clone();
                    const cacheCopy2 = networkResponse.clone();
                    
                    caches.open(CACHE_NAME).then((cache) => {
                        // 1. احفظ الملف بالرابط كامل (بالرقم ?v=32)
                        cache.put(event.request, cacheCopy1);
                        
                        // 2. احفظ نفس الملف برابط نظيف (من غير أرقام) لضمان الأوفلاين
                        const cleanUrl = event.request.url.split('?')[0];
                        cache.put(cleanUrl, cacheCopy2);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // 🔴 في حالة انقطاع الإنترنت (أوفلاين):
                // تجاهل أي أرقام في الرابط وهات أحدث ملف متخزن
                return caches.match(event.request, { ignoreSearch: true });
            })
    );
});
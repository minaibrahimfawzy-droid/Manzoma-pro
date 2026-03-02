// ==========================================
// ملف Service Worker الذكي (الإنترنت أولاً ثم الأوفلاين)
// ==========================================

const CACHE_NAME = 'manzoma-dynamic-v31';

// 1. التثبيت
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. التفعيل ومسح أي كاش قديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. الاعتراض (السحر كله هنا)
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // لو النت شغال والملف جه سليم: خده، اعمله نسخة، واحفظه في الكاش للأوفلاين
                if (response && response.status === 200) {
                    let responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response; // واعرضه للمستخدم
            })
            .catch(() => {
                // لو النت مقفول: روح دور في الكاش وهات آخر نسخة اتخزنت (وتجاهل رقم التحديث ?v=31)
                return caches.match(event.request, { ignoreSearch: true });
            })
    );
});
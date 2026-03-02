const CACHE_NAME = 'manzoma-safe-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

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

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // لو النت شغال: احفظ النسخة الجديدة
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });
                return networkResponse;
            })
            .catch(() => {
                // لو مفيش نت: شغل النسخة المحفوظة (مع تجاهل أي أرقام إصدارات في الرابط)
                return caches.match(event.request, { ignoreSearch: true });
            })
    );
});

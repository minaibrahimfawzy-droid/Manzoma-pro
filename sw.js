// ==========================================
// ملف Service Worker (نظام الرابط النظيف للأوفلاين)
// ==========================================

const CACHE_NAME = 'manzoma-pro-v33';

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

    // دي الحركة السحرية: بننظف الرابط من أي أرقام تحديث (?v=33)
    const urlObject = new URL(event.request.url);
    const cleanUrl = urlObject.origin + urlObject.pathname;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // 🟢 لو النت شغال: خد التحديث الجديد، واخفيه في الذاكرة بالاسم النظيف
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(cleanUrl, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // 🔴 لو النت مقفول: هات الملف بالاسم النظيف من الذاكرة
                return caches.match(cleanUrl).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                });
            })
    );
});
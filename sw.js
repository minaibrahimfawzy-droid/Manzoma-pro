// ⚠️ تم تغيير الكاش إلى v6 لضمان مسح الذاكرة القديمة وسحب التحديث الجديد
const CACHE_NAME = 'manzoma-cache-v6';

// قائمة بالملفات التي يجب حفظها فوراً لتعمل أوفلاين
const FILES_TO_CACHE = [
    './',
    './index.html',
    './control.js',
    './Nabatshia.html',
    './2.html',
    './3.html',
    './4.html',
    './5.html',
    './6.html'
];

self.addEventListener("install", (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("جاري حفظ الملفات للعمل أوفلاين...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim()); 
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            return caches.match('./index.html'); 
        })
    );
});
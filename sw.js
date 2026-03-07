const CACHE_NAME = 'manzoma-cache-v3';

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

// إجبار التحديث وحفظ الملفات في الكاش عند التثبيت
self.addEventListener("install", (event) => {
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("جاري حفظ الملفات للعمل أوفلاين...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// السيطرة على التطبيق ومسح الكاش القديم إن وجد
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

// جلب الملفات من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            // إذا وجد الملف في الكاش يعرضه، وإذا لم يجده يحاول جلبه من النت ثم يحفظه
            return response || fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            // إذا لم يكن هناك نت ولم يجد الملف في الكاش (احتياطي)
            return caches.match('./index.html'); 
        })
    );
});
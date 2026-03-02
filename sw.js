const CACHE_NAME = 'manzoma-v100';

const ASSETS = [
    './',
    './index.html',
    './4.html',
    './control.js'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((k) => {
                if (k !== CACHE_NAME) return caches.delete(k);
            })
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        // 1. طول ما في نت، هات من النت وحدث الذاكرة
        fetch(e.request).then((res) => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
            return res;
        }).catch(() => {
            // 2. لو النت اتقفل، هات من الذاكرة (وتجاهل أي أرقام زي ?v=100 عشان يشتغل أوفلاين)
            return caches.match(e.request, { ignoreSearch: true });
        })
    );
});
// ==========================================
// ملف Service Worker النهائي (sw.js)
// ==========================================

// 1. استدعاء ملف الكنترول لقراءة الإصدار وقائمة البرامج
importScripts('./control.js');

// 2. اسم الكاش بيتحدث أوتوماتيك برقم الإصدار
const CACHE_NAME = 'manzoma-cache-v' + HTML_VERSION; 

// 3. الملفات الأساسية جداً
let ASSETS_TO_CACHE = [
    './',
    './index.html',
    './control.js'
];

// 4. السحر هنا: قراءة كل البرامج اللي إنت ضايفها في control.js وتخزينها أوتوماتيك
if (typeof remoteApps !== 'undefined') {
    remoteApps.forEach(app => {
        ASSETS_TO_CACHE.push(app.url); // بيسحب رابط البرنامج (الورديات، اللمات، التدفق.. الخ)
    });
}

// 5. التثبيت والتخزين في الموبايل
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

// 6. مسح الذاكرة القديمة لما الرقم يتغير
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 7. التشغيل (لو في نت يجيب الجديد ويحدث الذاكرة، مفيش نت يشغل المتخزن)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const resClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
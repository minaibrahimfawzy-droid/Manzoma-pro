// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. إعدادات الـ APK (التحديث الجذري الإجباري)
var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/file/wavgumgx0e4xrk5/Manzoma+Pro33.apk/file"; 

// 🟢 2. رقم إصدار البرامج (التحديث الهوائي الداخلي - OTA)
// ⚠️ كلما قمت بتعديل أي شيء في التطبيق على Github، اجعل هذا الرقم أكبر (مثلاً 116، ثم 117 وهكذا)
var HTML_VERSION = "115"; 

// 🔵 3. روابط البرامج (يجب أن تظل كما هي للعمل أوفلاين)
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "Nabatshia.html"},
    {name: "الورديات", icon: "🌙", url: "2.html"},
    {name: "التصفيات", icon: "⚖️", url: "3.html"},
    {name: "اللمات", icon: "📝", url: "4.html"},
    {name: "التدفق", icon: "🌊", url: "5.html"},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "6.html"}
];
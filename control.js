// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. إعدادات الـ APK (ميديا فاير)
// رجعنا الرقم لـ 1.0 عشان التطبيق ما يطلبش ميديا فاير
var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/file/cmpkyqefy9mvu82/Manzoma+pro32.apk/file"; 

// 🟢 2. رقم إصدار البرامج (التحديث الهوائي)
// رفعنا الرقم لـ 120 عشان يسحب التصميم الجديد في الخلفية
var HTML_VERSION = "120"; 

// 🔵 3. روابط البرامج
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "Nabatshia.html"},
    {name: "الورديات", icon: "🌙", url: "2.html"},
    {name: "التصفيات", icon: "⚖️", url: "3.html"},
    {name: "اللمات", icon: "📝", url: "4.html"},
    {name: "التدفق", icon: "🌊", url: "5.html"},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "6.html"}
];
// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. إعدادات الـ APK (ميديا فاير)
// رفعنا الإصدار لـ 1.2 عشان يجبر التطبيق يفتح ميديا فاير ويحمل النسخة pro32
var APK_REQUIRED_VERSION = "1.2"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/file/cmpkyqefy9mvu82/Manzoma+pro32.apk/file"; 

// 🟢 2. رقم إصدار البرامج (التحديث الهوائي)
// رفعناه لـ 117 عشان لو فيه أي تعديل في الصفحات يسحبه بالمرة
var HTML_VERSION = "117"; 

// 🔵 3. روابط البرامج (يجب أن تظل كما هي للعمل أوفلاين)
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "Nabatshia.html"},
    {name: "الورديات", icon: "🌙", url: "2.html"},
    {name: "التصفيات", icon: "⚖️", url: "3.html"},
    {name: "اللمات", icon: "📝", url: "4.html"},
    {name: "التدفق", icon: "🌊", url: "5.html"},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "6.html"}
];
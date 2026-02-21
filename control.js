// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// يتم سحبه من GitHub فور اتصال الجهاز بالإنترنت
// ==========================================

// 1. إعدادات التحديث الإجباري للتطبيق بالكامل
// غيّر هذا الرقم لـ 1.2 مثلاً إذا أردت إجبار الجميع على تحميل APK جديد
var REMOTE_VERSION = "1.3"; 
var UPDATE_LINK = "https://t.me/YourChannel"; // رابط التحميل الجديد

// 2. قائمة البرامج الديناميكية (أضف أو احذف برامج من هنا بدون تحديث الـ APK)
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "Nabatshia.html"},
    {name: "الورديات", icon: "🌙", url: "2.html"},
    {name: "التصفيات", icon: "⚖️", url: "3.html"},
    {name: "اللمات", icon: "📝", url: "4.html"},
    {name: "التدفق", icon: "🌊", url: "5.html"},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "6.html"}
    // مثال لإضافة زر جديد مستقبلاً:
    // ,{name: "برنامج جديد", icon: "🚀", url: "new.html"}
];

// 3. تنفيذ الأوامر فور تحميل هذا الملف
(function executeRemoteCommands() {
    // التحقق من التحديث الإجباري
    if (typeof CURRENT_VERSION !== "undefined" && parseFloat(REMOTE_VERSION) > parseFloat(CURRENT_VERSION)) {
        document.getElementById("update-screen").style.display = "flex";
        document.getElementById("updateBtn").onclick = function() {
            window.location.href = UPDATE_LINK;
        };
        return; // إيقاف باقي العمليات لإجبار التحديث
    }

    // تحديث الأزرار (البرامج) فوراً في التطبيق وتخزينها للأوفلاين
    localStorage.setItem("_cached_apps", JSON.stringify(remoteApps));
    if (typeof renderApps === "function") {
        renderApps(remoteApps);
    }
})();
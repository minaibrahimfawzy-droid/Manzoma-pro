// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 1. إعدادات التحديث الإجباري
var REMOTE_VERSION = "1.0"; // لو خليت الرقم ده 1.1 في المستقبل، التطبيق هيقفل ويطلب تحديث
var UPDATE_LINK = "https://t.me/YourChannel"; // رابط تحميل التحديث الجديد

// فحص التحديث
if (typeof CURRENT_VERSION !== "undefined" && REMOTE_VERSION > CURRENT_VERSION) {
    document.getElementById("update-screen").style.display = "flex";
    document.getElementById("updateBtn").onclick = function() {
        window.location.href = UPDATE_LINK;
    };
}

// 2. قائمة البرامج (تقدر تضيف أو تمسح برامج من هنا في أي وقت)
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "Nabatshia.html"},
    {name: "الورديات", icon: "🌙", url: "2.html"},
    {name: "التصفيات", icon: "⚖️", url: "3.html"},
    {name: "اللمات", icon: "📝", url: "4.html"},
    {name: "التدفق", icon: "🌊", url: "5.html"},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "6.html"}
    // لإضافة برنامج جديد احذف الشرطتين اللي في السطر الجاي واكتب اسم صفحتك
    // ,{name: "اسم البرنامج الجديد", icon: "🚀", url: "7.html"}
];

// 3. تحديث البرامج في التطبيق فوراً
localStorage.setItem("_cached_apps", JSON.stringify(remoteApps));
if (typeof renderApps === "function") {
    renderApps(remoteApps);
}
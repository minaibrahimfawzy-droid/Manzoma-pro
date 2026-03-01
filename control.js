// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. رقم إصدار التطبيق (APK) - لا تغيره إلا لو عايز الشاشة الحمراء تظهر
var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/رابط_التطبيق_الجديد_هنا"; 

// 🟢 2. رقم إصدار البرامج الـ 6 - (غيّر هذا الرقم في كل مرة تعدل فيها أي برنامج على جيت هب)
var HTML_VERSION = "25"; 

// ==========================================

// رابط موقعك على جيت هب (الأساسي)
var GITHUB_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/";

// قائمة البرامج مربوطة برقم التحديث (عشان الموبايل يمسح الكاش القديم ويجيب الجديد فوراً)
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: GITHUB_LINK + "Nabatshia.html?v=" + HTML_VERSION},
    {name: "الورديات", icon: "🌙", url: GITHUB_LINK + "2.html?v=" + HTML_VERSION},
    {name: "التصفيات", icon: "⚖️", url: GITHUB_LINK + "3.html?v=" + HTML_VERSION},
    {name: "اللمات", icon: "📝", url: GITHUB_LINK + "4.html?v=" + HTML_VERSION},
    {name: "التدفق", icon: "🌊", url: GITHUB_LINK + "5.html?v=" + HTML_VERSION},
    {name: "المهيئ والمواسير", icon: "🏗️", url: GITHUB_LINK + "6.html?v=" + HTML_VERSION}
];

// تنفيذ الأوامر
(function executeRemoteCommands() {
    
    // 1. هل أنت تطلب تحديث إجباري للـ APK؟ (فحص الشاشة الحمراء)
    if (typeof CURRENT_VERSION !== "undefined" && parseFloat(APK_REQUIRED_VERSION) > parseFloat(CURRENT_VERSION)) {
        document.getElementById("update-screen").style.display = "flex";
        document.getElementById("updateBtn").onclick = function() {
            window.location.href = APK_DOWNLOAD_LINK;
        };
        return; // إيقاف كل شيء وعرض الشاشة الحمراء
    }

    // 2. إخفاء شاشة التحديث (في حالة عدم وجود تحديث APK)
    let updateScreen = document.getElementById("update-screen");
    if(updateScreen) updateScreen.style.display = "none";

    // 3. تحديث روابط البرامج فوراً بالإصدار الجديد (لتعمل أونلاين)
    if (typeof renderApps === "function") {
        renderApps(remoteApps);
    }
    
})();
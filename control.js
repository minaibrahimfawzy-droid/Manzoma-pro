// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. رقم إصدار التطبيق (APK)
var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/رابط_التطبيق_الجديد_هنا"; 

// 🟢 2. رقم إصدار البرامج الـ 6 (غيّر الرقم ده بس لأي تحديث جديد)
var HTML_VERSION = "29"; 

// ==========================================
// تم إلغاء رابط الجيت هاب واستبداله بمسارات محلية (./) لضمان عمل الأوفلاين
var remoteApps = [
    {name: "النبطشية", icon: "📅", url: "./Nabatshia.html?v=" + HTML_VERSION},
    {name: "الورديات", icon: "🌙", url: "./2.html?v=" + HTML_VERSION},
    {name: "التصفيات", icon: "⚖️", url: "./3.html?v=" + HTML_VERSION},
    {name: "اللمات", icon: "📝", url: "./4.html?v=" + HTML_VERSION},
    {name: "التدفق", icon: "🌊", url: "./5.html?v=" + HTML_VERSION},
    {name: "المهيئ والمواسير", icon: "🏗️", url: "./6.html?v=" + HTML_VERSION}
];

// سطر الأمان: عشان الملف ده يقدر يشتغل كـ "ريموت" و كـ "مخزن أوفلاين"
if (typeof window !== 'undefined') {
    (function executeRemoteCommands() {
        if (typeof CURRENT_VERSION !== "undefined" && parseFloat(APK_REQUIRED_VERSION) > parseFloat(CURRENT_VERSION)) {
            document.getElementById("update-screen").style.display = "flex";
            document.getElementById("updateBtn").onclick = function() {
                window.location.href = APK_DOWNLOAD_LINK;
            };
            return; 
        }

        let updateScreen = document.getElementById("update-screen");
        if(updateScreen) updateScreen.style.display = "none";

        if (typeof renderApps === "function") {
            renderApps(remoteApps);
        }
    })();
}
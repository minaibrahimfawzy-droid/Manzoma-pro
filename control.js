// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

// 🔴 1. رقم إصدار التطبيق (APK)
var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/رابط_التطبيق_الجديد_هنا"; 

// 🟢 2. رقم إصدار البرامج الـ 6 (غيّر الرقم ده لأي تحديث جديد)
var HTML_VERSION = "31"; 

// ==========================================
// رجعنا روابط جيت هب زي ما كانت عشان التطبيق يسحب التحديثات منها
var GITHUB_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/";

var remoteApps = [
    {name: "النبطشية", icon: "📅", url: GITHUB_LINK + "Nabatshia.html?v=" + HTML_VERSION},
    {name: "الورديات", icon: "🌙", url: GITHUB_LINK + "2.html?v=" + HTML_VERSION},
    {name: "التصفيات", icon: "⚖️", url: GITHUB_LINK + "3.html?v=" + HTML_VERSION},
    {name: "اللمات", icon: "📝", url: GITHUB_LINK + "4.html?v=" + HTML_VERSION},
    {name: "التدفق", icon: "🌊", url: GITHUB_LINK + "5.html?v=" + HTML_VERSION},
    {name: "المهيئ والمواسير", icon: "🏗️", url: GITHUB_LINK + "6.html?v=" + HTML_VERSION}
];

// سطر الأمان
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
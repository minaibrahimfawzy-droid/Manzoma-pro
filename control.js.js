// ==========================================
// ملف التحكم عن بعد لنظام 2026 (control.js)
// ==========================================

var APK_REQUIRED_VERSION = "1.0"; 
var APK_DOWNLOAD_LINK = "https://www.mediafire.com/رابط_التطبيق_الجديد_هنا"; 

var HTML_VERSION = "35"; 

var GITHUB_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/";

var remoteApps = [
    {name: "النبطشية", icon: "📅", url: GITHUB_LINK + "Nabatshia.html?v=" + HTML_VERSION},
    {name: "الورديات", icon: "🌙", url: GITHUB_LINK + "2.html?v=" + HTML_VERSION},
    {name: "التصفيات", icon: "⚖️", url: GITHUB_LINK + "3.html?v=" + HTML_VERSION},
    // 👇 ده السطر اللي اتغير عشان يكسر الذاكرة القديمة 👇
    {name: "اللمات", icon: "📝", url: GITHUB_LINK + "Lamat.html?v=" + HTML_VERSION},
    {name: "التدفق", icon: "🌊", url: GITHUB_LINK + "5.html?v=" + HTML_VERSION},
    {name: "المهيئ والمواسير", icon: "🏗️", url: GITHUB_LINK + "6.html?v=" + HTML_VERSION}
];

if (typeof window !== 'undefined') {
    (function executeRemoteCommands() {
        if (typeof CURRENT_VERSION !== "undefined" && parseFloat(APK_REQUIRED_VERSION) > parseFloat(CURRENT_VERSION)) {
            let updateScreen = document.getElementById("update-screen");
            if (updateScreen) updateScreen.style.display = "flex";
            let updateBtn = document.getElementById("updateBtn");
            if (updateBtn) updateBtn.onclick = function() { window.location.href = APK_DOWNLOAD_LINK; };
            return; 
        }
        let updateScreen = document.getElementById("update-screen");
        if (updateScreen) updateScreen.style.display = "none";
        
        if (typeof renderApps === "function") {
            renderApps(remoteApps);
        }
    })();
}
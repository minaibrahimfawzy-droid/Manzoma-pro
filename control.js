var APK_REQUIRED_VERSION = "1.0"; 
var HTML_VERSION = "2006"; // التحديث الجديد 2006
var APK_DOWNLOAD_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/app.apk";

// كود تسجيل نظام الأوفلاين
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js')
      .then(function(reg) {
        console.log('تم تفعيل نظام الأوفلاين بنجاح ✔️');
      }).catch(function(err) {
        console.error('خطأ في تسجيل الأوفلاين:', err);
      });
  });
}
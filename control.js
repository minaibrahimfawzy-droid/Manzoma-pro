--- START OF FILE control.js ---
var APK_REQUIRED_VERSION = "1.0"; 
var HTML_VERSION = "1000"; // رقم إصدار جديد للمنظومة بالكامل
var APK_DOWNLOAD_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/app.apk";

/* 
  كود تفعيل الأوفلاين الشامل:
  بمجرد أن يفتح المستخدم أي صفحة مرتبطة بهذا الملف، 
  سيتم تخزين كامل المنظومة (كل الملفات) للعمل بدون إنترنت.
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js?v=1000')
      .then(function(reg) {
        console.log('تم تفعيل وضع الأوفلاين لجميع برامج المنظومة');
      }).catch(function(err) {
        console.log('فشل تفعيل الأوفلاين:', err);
      });
  });
}
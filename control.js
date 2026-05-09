--- START OF FILE control.js ---
var APK_REQUIRED_VERSION = "1.0"; 
var HTML_VERSION = "2001"; 
var APK_DOWNLOAD_LINK = "https://minaibrahimfawzy-droid.github.io/Manzoma-pro/app.apk";

// كود تسجيل نظام الأوفلاين - يعمل على كل الصفحات (1-7)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(function(reg) {
      console.log('تم تفعيل الحماية أوفلاين للمنظومة');
    }).catch(function(err) {
      console.error('خطأ في التسجيل:', err);
    });
}
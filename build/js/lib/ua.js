/**
 * ======================================
 *
 * - Framework - UserAgent Detector
 * 
 * ======================================
 */
(function (root, ua) {
  var UA = root.UA = {};

  if (/MSIE ([\d.]+);/.test(ua)) {
    UA.ie = RegExp.$1; // ie6 7 是没有trident版本信息的

    if (/Trident\/([\d.]+)/.test(ua)) UA.trident = RegExp.$1;
  } else if (/AppleWebKit\/([\d.]+)/.test(ua)) {
    UA.webkit = RegExp.$1;
    if (/Chrome\/([\d.]+)/.test(ua)) UA.chrome = RegExp.$1;else if (/Version\/([\d.]+)/.test(ua)) UA.safari = RegExp.$1;
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    UA.firefox = RegExp.$1;
    if (/rv:([\d.]+)/.test(ua)) UA.gecko = RegExp.$1;
  } else if (window.opera) {
    // > opera7.6
    UA.opera = window.opera.version();
    if (/Presto\/([\d.]+)/.test(ua)) UA.presto = RegExp.$1;
  } // os detection


  if (/(?:Android);?[\s\/]+([\d.]+)?/.test(ua)) {
    UA.android = RegExp.$1;
  } else if (/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/.test(ua)) {
    UA.ios = RegExp.$1.replace(/_/g, '.');
  }

  UA.mobile = UA.android || UA.ios; // numeralize version

  for (var p in UA) {
    UA[p] = parseFloat(UA[p]);
  }
})(this, navigator.userAgent);
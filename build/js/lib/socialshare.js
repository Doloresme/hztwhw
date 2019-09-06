(function () {
  var SocialShare = window.SocialShare = function (name, data) {
    SocialShare[name](data || window.SocialShareContent || {});
  };

  function isUndef(v, f) {
    return v === undefined;
  }

  function ifUdef(v, f) {
    return isUndef(v) ? f() : v;
  }

  function ifEmpty(arr, f) {
    return arr.length == 0 ? f() : arr;
  }

  function defaultUrl() {
    return location.href;
  }

  function defaultTitle() {
    var elem = document.getElementById('SocialShareTitle');
    return elem && elem.innerText || document.title;
  }

  function defaultImage() {
    var elem = document.getElementById('SocialShareImage');
    return elem && elem.src;
  }

  function constructUrl(url, o) {
    var pairs = [];

    function addPair(n, v) {
      pairs.push(n + '=' + encodeURIComponent(v));
    }

    for (var k in o) {
      if (!isUndef(o[k])) if (Array.isArray(o[k])) o[k].forEach(function (item) {
        addPair(k, item);
      });else addPair(k, o[k]);
    }

    return url + '?' + pairs.join('&');
  }

  function extractImages(data) {
    var images = data.images || [];
    if (data.image) images.push(data.image);
    return images;
  }

  SocialShare.QQ = function (data) {
    var URL = "http://connect.qq.com/widget/shareqq/index.html";
    window.open(constructUrl(URL, {
      url: ifUdef(data.url, defaultUrl),
      title: ifUdef(data.title, defaultTitle),
      summary: data.summary,
      desc: data.desc,
      site: data.site,
      pics: ifEmpty(extractImages(data), defaultImage),
      showcount: undefined
    }));
  };

  SocialShare.Qzone = function (data) {
    var URL = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
    window.open(constructUrl(URL, {
      url: ifUdef(data.url, defaultUrl),
      title: ifUdef(data.title, defaultTitle),
      summary: data.summary,
      desc: data.desc,
      site: data.site,
      pics: ifEmpty(extractImages(data), defaultImage)
    }));
  };

  SocialShare.Weibo = function (data) {
    var URL = "http://service.weibo.com/share/share.php";
    window.open(constructUrl(URL, {
      url: ifUdef(data.url, defaultUrl),
      title: ifUdef(data.title, defaultTitle),
      text: data.summary,
      pic: ifEmpty(extractImages(data), defaultImage) // appkey:

    }));
  };

  SocialShare.Baidu = function (data) {
    var URL = "http://tieba.baidu.com/f/commit/share/openShareApi";
    window.open(constructUrl(URL, {
      url: ifUdef(data.url, defaultUrl),
      title: ifUdef(data.title, defaultTitle),
      desc: data.desc,
      pic: ifEmpty(extractImages(data), defaultImage)
    }));
  };

  SocialShare.Douban = function (data) {
    var URL = "http://shuo.douban.com/!service/share";
    window.open(constructUrl(URL, {
      href: ifUdef(data.url, defaultUrl),
      name: ifUdef(data.title, defaultTitle),
      text: data.summary,
      image: ifEmpty(extractImages(data), defaultImage)
    }));
  };

  var share_on_moments = '分享到微信朋友圈',
      share_wechat_tip = '打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。';

  SocialShare.Weixin = function (data) {
    openQrPopover('wxPop', share_on_moments, share_wechat_tip, data.qrcode);
  };

  function openQrPopover(id, title, footnote, qrImageUrl) {
    if (window[id]) {
      return window[id];
    }

    var element = $('<div class="QR_popover"><div class="head_">' + '<a class="close_" >×</a><h3>' + title + '</h3></div>' + '<div class="content_"><img src="../img/logo.png" data-init="0" class="qr-logo"></div>' + '<div class="footer_"><div>' + footnote + '</div></div></div>');
    element.find('.close_').click(function () {
      element.remove();
      window[id] = null;
    });
    element.find('.content_').qrcode({
      text: qrImageUrl || location.href,
      width: 220,
      height: 220,
      render: UA.ie && UA.ie < 9 ? 'table' : 'canvas'
    });
    window[id] = element.appendTo(document.body);
  }
})();
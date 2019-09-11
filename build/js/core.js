template.defaults.imports.dateFormat = function (timestamp, format) {
  function add0(m) {
    return m < 10 ? '0' + m : m;
  }

  ;
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
};

(function () {
  var headerCallback = function headerCallback() {
    var keyword = '',
        $searchBox = $('#header').find('.search-box');
    $('#header').find('.search').on('click', function () {
      if ($searchBox.hasClass('hide')) {
        console.log(true);
        $searchBox.removeClass('hide');
      } else {
        console.log(false);
        $searchBox.addClass('hide');
      }
    });
    $(document).mouseup(function (e) {
      var oTarget = $searchBox;

      if (!oTarget.is(e.target) && oTarget.has(e.target).length === 0) {
        oTarget.addClass('hide');
      }
    });
    $('#header').find('.search-input').blur(function () {
      keyword = $(this).val();
    });
  };

  $('#header').load('../inc/header.html', headerCallback);
  $('#footer').load('../inc/footer.html');
  Image.BLINK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
})();
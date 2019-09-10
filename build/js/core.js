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
(function () {
  //单对象编程；
  // bind
  Image.BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  var bannerBox = document.getElementById('banner-box');
  var opt = {
    image: ['../img/slider.jpg'],
    fatherNode: bannerBox
  };
  var sliderBoxW = $('#banner-box').width();
  new Slider(opt);
  $('#banner-box .sliderBox li').css('width', sliderBoxW);
})();
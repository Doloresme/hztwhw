(function () {
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

  var data = {
    coverImgUrl: '../img/1.png',
    name: '马云老师',
    edu: '启明教育',
    desc: '这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介',
    title: '带你解开企业管理的奥秘-基本管理法则',
    date: 1568094793625,
    detail: '在中国，重庆机场的人脸识别系统成功匹配到'
  };
  var html = template('tpl-person-view', data);
  $('.container .wrapper').html(html);
})();
(function(){
    var data = {bannerCoverImg: '../img/slider1.jpg',
        desc: '这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介',
        title: '带你解开企业管理的奥秘-基本管理法则',
        date: 1568094793625,
        detail: '在中国，重庆机场的人脸识别系统成功匹配到在中国，重庆机场的人脸识别系统成功匹配到在中国，重庆机场的人脸识别系统成功匹配到',
        attachment: [{name: '1.word', href="http://f.saihuitong.com/8/attachment/22/15c62bf277f.ini?attname=DataConfig.ini"}]
    }

    var html = template('tpl-event-view', data);
    $('.container').html(html);
}())
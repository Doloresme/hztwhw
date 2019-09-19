(function(){
    var data = {avatar: '../img/1.png',
        type: '微型企业',
        viewAmount: 6222,
        employeeAmount: 20,
        reservationAmount: 365,
        rating: 4,
        ratingRate: 0.9,
        serviceType: ['文艺演出类','文艺演出类'],
        desc: '这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介',
        name: '杭州市青蓝文化有限公司',
        date: 1568094793625,
        detail: '在中国，重庆机场的人脸识别系统成功匹配到在中国，重庆机场的人脸识别系统成功匹配到在中国，重庆机场的人脸识别系统成功匹配到'
    }

    var html = template('tpl-enterprise-view', data);
    $('.container .enterprise-view').html(html);
}())
(function(){
    var data = {list : [{avatar: '../img/left-arrow.png',name: '黄志芳', title:'第十七届徐霞客开游节开幕式暨浙江省文旅惠民消费季启动仪式举行', edu: '启明教育CEO', desc:'这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介'},
    {avatar: '../img/right-arrow.png',name: '黄志芳', title:'第十七届徐霞客开游节开幕式暨浙江省文旅惠民消费季启动仪式举行', edu: '启明教育CEO', desc:'这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介这里是大咖简介'}]};

    var html = template('tpl-college-list', data);
    $('.contanier .wrapper').html(html);
}())
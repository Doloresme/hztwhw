(function(){
    var data = {list : [{avatar: '../img/11.png', title:'第十七届徐霞客开游节开幕式暨浙江省文旅惠民消费季启动仪式举行', date: 1568166333887},
    {avatar: '../img/12.png', title:'第十七届徐霞客开游节开幕式暨浙江省文旅惠民消费季启动仪式举行', date: 1568166333887}] };

    var html = template('tpl-enterprise-list', data);
    $('.container .enterprise-view').html(html);

    new Pagination({page: 1, items: 53});
}())
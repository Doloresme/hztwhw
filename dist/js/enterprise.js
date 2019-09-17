(function(){
    var data = {list : [{avatar: '../img/11.png', name:'杭州市青兰演艺公司', isMark: false, tags: ['创意策划类', '文艺演出类']},
    {avatar: '../img/12.png', name:'杭州市青兰演艺公司', isMark: true, tags: ['创意策划类', '文艺演出类', '文艺演出类']}] };

    var html = template('tpl-enterprise-list', data);
    $('.container .enterprise-view').html(html);

    new Pagination({page: 1, items: 53});

    // new Rating({num: 4, parentNode: $('.rating')});
}())
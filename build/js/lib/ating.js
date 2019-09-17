(function () {
    var Rating = window.Rating = function (options) {
        this.starNum = optios.num || 1;
        this.parentNode = options.parentNode || $('.ratting');
        this.len = options.len || 5; //默认评分等级长度
        this.init();
    }
    Rating.prototype.view = function (num) {
        var ul = $('ul');
        var num = num || this.starNum; //num代表红星数量
        var liStr = '';
        for (var i = 0; i < this.len; i++) {
            if(i < num){
                liStr += '<li data-score= "'+ i +'" ></li>';
            }else{
                liStr += '<li class="on" data-score= "'+ i +'" ></li>';
            }
        }
        ul.html(liStr);
        this.parentNode.html(ul);
    }
    Rating.prototype.event = function(){

        
    }
    
    Rating.prototype.init = function(){
        this.view();
        
    }

}())
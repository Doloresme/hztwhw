(function () {
    var Rating = window.Rating = function (options) {
        this.starNum = options.num || 1;
        this.parentNode = options.parentNode || document.getElementsByClassName('rating');
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
        // this.parentNode.appendChild(ul);
        console.log(this.parentNode);
    }
    Rating.prototype.event = function(){

        
    }
    
    Rating.prototype.init = function(){
        this.view();
        
    }

    // new Rating({num: 4});
     
}())
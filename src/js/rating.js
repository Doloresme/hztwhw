(function () {
    function Rating(options) {
        this.starNum = optios.num;
    }
    Rating.prototype.view = function () {
        var num = finalnum = tempnum = 0;
        var lis = document.getElementsByTagName("li");
        //num:传入点亮星星的个数
        //finalnum:最终点亮星星的个数
        //tempnum:一个中间值
        function fnShow(num) {
            finalnum = num || tempnum;//如果传入的num为0，则finalnum取tempnum的值
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = i < finalnum ? "light" : "";//点亮星星就是加class为light的样式
            }
        }
        for (var i = 1; i <= lis.length; i++) {
            lis[i - 1].index = i;
            lis[i - 1].onmouseover = function () { //鼠标经过点亮星星。
                fnShow(this.index);//传入的值为正，就是finalnum
            }
            lis[i - 1].onmouseout = function () { //鼠标离开时星星变暗
                fnShow(0);//传入值为0，finalnum为tempnum,初始为0
            }
            lis[i - 1].onclick = function () { //鼠标点击,同时会调用onmouseout,改变tempnum值点亮星星
                tempnum = this.index;
            }
        }
    }
    return new Rating;
}())
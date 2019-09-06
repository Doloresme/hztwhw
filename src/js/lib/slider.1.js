
(function(){
    var Slider = window.Slider = function (option){
        this.timer = null;
        this.key = true;
        this.isBtn = option.isBtn || true;
        this.image = option.image;
        this.isImg = true; //是否是图片轮播
        this.isSidesBox = option.isSidesBox || false;
        this.contentArr = option.contentArr || [];
        if(!this.image || this.contentArr.length){
            this.isImg = false;
        }
        if(this.isImg){
            this.len = this.image.length;
        }else{
            this.len = this.contentArr.length;
        }
        this.wrap = option.fatherNode || document.getElementsByTagName('body')[0];
        this.time = option.time || 2000; //轮播间隔时间
        this.index = 0;
        this.w = option.w;
        this.h = option.h;
        this.wrapW = option.wrapW;
        
        this.init();
    }
    Slider.prototype.init = function(){
        this.domOperation();
        if(this.len > 1){
            this.bindEvent();
            this.autoMove();
        }
    }
    Slider.prototype.domOperation = function(){
        var sliderBox = this.wrap.getElementsByClassName('sliderBox')[0],
            sliderIndex = this.wrap.getElementsByClassName('sliderIndex')[0],
            sliderLeftBtn = this.wrap.getElementsByClassName('sliderBtn')[0],
            sliderRightBtn = this.wrap.getElementsByClassName('sliderBtn')[1];
        if(this.isSidesBox){
            var leftBox = this.wrap.getElementsByClassName('sliderSidesBox')[0],
                rightBox = this.wrap.getElementsByClassName('sliderSidesBox')[1];
            this.leftBox = leftBox;
            this.rightBox = rightBox;
        }
        var str = '',
            spanStr = '';
        if(this.isImg){
            for(let i = 0; i < this.len; i++){
                str +=  '<li style="background:url(\'' + this.image[i] + '\') no-repeat center">' +
                '</li>';
            }
            str += '<li style="background:url(\'' + this.image[0] + '\') no-repeat center"> </li>'
        }else{
            var itemStrEnd = '';
            for(let i = 0; i < this.len; i++){
                var item = this.contentArr[i];
                var itemStr = '';
                for(k in item){
                    if(k == 'img' || k == 'avatar' || k == 'image' || k == 'cover'){
                        itemStr += '<img class="'+ k +'" src="' + item[k] + '"> '
                    } else{
                        itemStr += '<div class="' + k + '">' + item[k] + '</div>';
                    }
                }
                if(i == (this.len - 1)){
                    itemStrEnd = itemStr;
                }
                str += '<li><div class="bg"><div class="border-top left"></div><div class="border-top right"></div>' + itemStr + '</div></li>';
            }
            str = '<li><div class="bg"><div class="border-top left"></div><div class="border-top right"></div>' + itemStrEnd + '</div></li>' + str;
        }
        if(sliderIndex){
            for(let i = 0; i < this.len; i++){
                if(i == 0){
                    spanStr += '<span class="active" data-index="'+ i +'"></span>';
                }else{
                    spanStr += '<span data-index="'+ i +'"></span>';
                }
            }
            sliderIndex.innerHTML = spanStr;
        }
       

        sliderBox.innerHTML = str;
        if(!this.w || !this.h){
            this.wrapW = this.w = this.wrap.clientWidth;
            this.h = this.wrap.clientHeight;
        }
        sliderBox.style.height = this.h + 'px';
        sliderBox.style.width = this.wrapW * (this.len + 1) + 'px';

        this.sliderBox = sliderBox;
        this.sliderIndex = sliderIndex || null;
        this.leftBtn = sliderLeftBtn;
        this.rightBtn = sliderRightBtn;
    }

    Slider.prototype.bindEvent = function(){
        var that = this;
        this.changeActive(this.index);
        var sliderIndexSpan = this.sliderIndex.getElementsByTagName('span');
        for(var i = 0; i < this.len; i++){
            addEvent(sliderIndexSpan[i], 'click', function(e){
                if(that.key){
                    var i = e.target.getAttribute('data-index');
                    that.startMove(i); 
                }
            })
        }
        
        addEvent(this.leftBtn, 'click', function(e){
            if(that.key){
                that.startMove('left');
            }
        })
        addEvent(this.rightBtn, 'click', function(e){
            if(that.key){
                that.startMove('right');
            }
        })
        if(this.isSidesBox){
            addEvent(this.leftBox, 'click', function(e){
                if(that.key){
                    that.startMove('left');
                }
            })
            addEvent(this.rightBox, 'click', function(e){
                if(that.key){
                    that.startMove('right');
                }
            })
        }
    }

    Slider.prototype.autoMove = function(dir){
        var that = this;
        this.timer = setTimeout(function(){
            that.startMove(dir);
        }, this.time)
    }

    Slider.prototype.startMove = function(dir){
        var that = this;
        // 默认向右滑动
        var iSpeed, iCur;
        clearInterval(this.timer);
        if(that.key){
            this.key = false;
            if(!dir || dir == 'right'){
                this.index++;
            }else if(dir == 'left'){
                if(this.index == 0){
                    this.index = this.len;
                    that.sliderBox.style.left = -that.index * that.w + 'px';
                }
                this.index--;

            }else{
                this.index = dir;
            }
            if(this.sliderIndex){
                this.changeIndexActive(this.index);
            }
            this.changeActive(this.index);
            move(this);
        }
        function move(that){
            that.timer = setInterval(function(){
                iCur = parseInt(that.sliderBox.offsetLeft);
                iSpeed = (that.w * that.index + iCur) / 8;
                // console.log(iCur, iSpeed);
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                that.sliderBox.style.left = iCur - iSpeed + 'px';
                if(!iSpeed){
                    that.key = true;
                    clearInterval(that.timer);
                    if((!dir || dir=='right') && that.index == that.len){
                        that.index = 0;
                        that.sliderBox.style.left = 0;
                    }
                    that.autoMove();
                }
            }, 30)
        }
        
    }
    Slider.prototype.changeActive = function(index){
        var sliderLiArr = this.sliderBox.children;
        for(let i = 0; i < sliderLiArr.length; i++){
            sliderLiArr[i].classList.remove('active');
            sliderLiArr[i].classList.remove('text-right');
        }
        if(index && this.isSidesBox){
            sliderLiArr[index - 1].setAttribute('class','text-right');
        }
        if(index == this.len){
            sliderLiArr[index].setAttribute('class','active');
            index = 0;
        } 
        sliderLiArr[index].setAttribute('class','active');
    }

    Slider.prototype.changeIndexActive = function(index){
        var indexSpanArr = this.sliderIndex.children;
        for(let i = 0; i < indexSpanArr.length; i++){
            indexSpanArr[i].classList.remove('active');
        }
        if(index == this.len) index = 0;
        indexSpanArr[index].setAttribute('class','active');
    }

})()
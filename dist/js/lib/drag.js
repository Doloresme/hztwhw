
    function addEvent(elem, type, fn){
        if (elem.addEventListener) {
            elem.addEventListener(type, fn, false)
        }else if (elem.attachEvent) {
            elem.attachEvent('on' + type, function(){
                fn.call(elem);
            });
        }else{
                elem['on' + type] = fn;
        }
    }
    function removeEvent(elem, type, fn){
        if (elem.removeEventListener) {
            elem.removeEventListener(type, fn, false);
        }else{
            elem.detachEvent('on' + type, fn);
        }
    }
    
    function getStyle(elem, prop){
        if (getComputedStyle) {
            return window.getComputedStyle(elem, null)[prop];
        }else{
            return elem.currentStyle[prop];
        }
    }
    
    function drag(elem, fatherElem, dir, maxLeft, maxRight){
        var fatherElem = fatherElem || elem;
        var dir = dir || 'both';
        addEvent(elem, 'mousedown', select);
        function select(e){
            var event = e || window.event,
                disX = event.pageX - parseInt(getStyle(fatherElem, 'left')),
                disY = event.pageY - parseInt(getStyle(fatherElem, 'top'));
            if(event.button == 0){
                addEvent(document, 'mousemove', move);
                addEvent(document, 'mouseup', function(){
                    removeEvent(document, 'mousemove', move);
                    elem.style.cursor = 'auto';
                }); 
            }
            function move(event){
                elem.style.cursor = 'move';
                if(dir == 'x'){
                    if(maxLeft && maxRight){
                        if((event.pageX - disX) >= parseInt(maxLeft)){
                            fatherElem.style.left = maxLeft;
                        }else if((event.pageX - disX) < -parseInt(maxRight)){
                            fatherElem.style.left = -parseInt(maxRight) + 'px';
                        }else{
                            fatherElem.style.left = event.pageX - disX + 'px';
                        }
                    }else{
                        fatherElem.style.left = event.pageX - disX + 'px';
                    }
                }else if(dir == 'y'){
                    fatherElem.style.top = event.pageY - disY + 'px';
                }else{
                    fatherElem.style.left = event.pageX - disX + 'px';
                    fatherElem.style.top = event.pageY - disY + 'px';
                }
            }
        }
        
    }
 
function addEvent(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,function(){n.call(e)}):e["on"+t]=n}function removeEvent(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)}function getStyle(e,t){return getComputedStyle?window.getComputedStyle(e,null)[t]:e.currentStyle[t]}function drag(u,l,p,r,s){l=l||u,p=p||"both";addEvent(u,"mousedown",function(e){var t=e||window.event,n=t.pageX-parseInt(getStyle(l,"left")),o=t.pageY-parseInt(getStyle(l,"top"));0==t.button&&(addEvent(document,"mousemove",a),addEvent(document,"mouseup",function(){removeEvent(document,"mousemove",a),u.style.cursor="auto"}));function a(e){u.style.cursor="move","x"==p?r&&s?e.pageX-n>=parseInt(r)?l.style.left=r:e.pageX-n<-parseInt(s)?l.style.left=-parseInt(s)+"px":l.style.left=e.pageX-n+"px":l.style.left=e.pageX-n+"px":("y"==p||(l.style.left=e.pageX-n+"px"),l.style.top=e.pageY-o+"px")}})}
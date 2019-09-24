template.defaults.imports.dateFormat = function (timestamp, format) {
    function add0(m) { return m < 10 ? '0' + m : m };
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
};

(function () {
    window.userData = {
        isLogin: false
    };

    var headerCallback = function () {
        var keyword = '',
            $searchBox = $('#header').find('.search-box');
        $('#header').find('.search').on('click', function () {
            if ($searchBox.hasClass('hide')) {
                console.log(true);
                $searchBox.removeClass('hide');
            } else {
                console.log(false);
                $searchBox.addClass('hide');
            }
        });

        $(document).mouseup(function (e) {
            var oTarget = $searchBox;
            if (!oTarget.is(e.target) && oTarget.has(e.target).length === 0) {
                oTarget.addClass('hide');
            }
        });


        $('#header').find('.search-input').blur(function () {
            keyword = $(this).val();
        })

        $('#login').click(function () {
            if ($('#login-window').hasClass('hide')) {
                $('#login-window').removeClass('hide');
                $('.ui-mask').css('display', 'block');
            }
        })

        $('#register').click(function () {
            location.href = '/register.html' + '?href=' + location.href;
        })

        function getLoginState(){
            var user = {
                avatarUrl : '../img/share_wechat.png',
                nickname: 'test15',
                phone: '18838717585',
                email: '2872956129@qq.com',
                password: '********'
            }
            window.userData = user;
            window.userData.isLogin = true;
            window.userData.isLogout = false;
            if(window.userData.isLogin && !window.userData.isLogout){
                $('#header .login').addClass('hide');
                $('#header .user').removeClass('hide')
                    .find('img').attr('src', userData.avatarUrl)
                    // .end().find('.nickname').html(userData.nickname);
            }else{
                $('#header .login').removeClass('hide');
                $('#header .user').addClass('hide');
            }
        }
        getLoginState();


    };

    $('#header').load('../inc/header.html', headerCallback);
    $('#footer').load('../inc/footer.html');
    $('#loginBox').load('../inc/loginForm.html', uiWindowFn);
    Image.BLINK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    // 弹框拖拽
    function uiWindowFn() {
        var $UIWindow = document.getElementById('login-window'),
            $windowHeader = $UIWindow.getElementsByClassName('ui-window-header')[0];
        drag($windowHeader, $UIWindow);
        var $UIBindWindow = document.getElementById('bindPhone-window'),
            $bindWindowHeader = $UIBindWindow.getElementsByClassName('ui-window-header')[0];
        drag($bindWindowHeader, $UIBindWindow);

        $('.ui-window-close').click(function () {
            $('.ui-mask').css('display', 'none');
            $(this).closest('.ui-window').addClass('hide');
        })
        $('.register').click(function () {
            location.href = '/register.html' + '?href=' + location.href;
        })

        $('#login-window').on('submit', function (e) {
            e.preventDefault();
            var name = $('#login-window').find($('#name')).val().trim(),
                password = $('#login-window').find($('#password')).val().trim();
            console.log(name, password);
            if (!name) {
                $('#login-window').find('.err-msg').html('请输入手机号或邮箱');
                return;
            }
            if (!password) {
                $('#login-window').find('.err-msg').html('请输入密码');
                return;
            }

            $.post('/rest/user/login', {
                name: name,
                password: password
            }, function (resp) {
                if (resp.code === 200) {
                    loginPostCallback('登录成功', 'suc')
                } else {
                    loginPostCallback(resp.result, 'err');
                }
            })

            function loginPostCallback(msg, tipClass) {
                var successWindow = $('#success-window');
                successWindow.find('.tip').addClass(tipClass).html(msg);
                successWindow.fadeIn();
                $('#login-window').addClass('hide');
                $('.ui-mask').css('display', 'none');
                successWindow.fadeOut(2000);
            }
        });
    }

    
}())
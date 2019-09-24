(function () {
    var step = location.searchMap().step || 0,
        href = location.searchMap().href || '/';
        console.log(href)
    changeProgress(step);

    function changeProgress(step) {
        step = step.toString();
        var $stepCircle = $('.progress .step-circle');
        var $line = $('.progress .line');
        $('.step').addClass('hide').eq(step).removeClass('hide');
        $stepCircle.removeClass('active');
        $line.removeClass('active').removeClass('hover');
        switch (step) {
            case "0":
                $line.eq(0).addClass('hover');
                $stepCircle.eq(0).addClass('active');
                return;
            case "1":
                $line.eq(0).addClass('active').end().eq(1).addClass('hover');
                $stepCircle.eq(0).add($stepCircle.eq(1)).addClass('active');
                return;
            case "2":
                $line.addClass('active');
                $stepCircle.addClass('active');
                return;
            return;
        }
    }

    var register = (function () {
        var phoneNumber = $('#phoneNumber').val().trim(),
            phoneCode = $('#phoneCode').val().trim(),
            nickname = $('#nickname').val().trim(),
            avatarUrl = '',
            email = $('#email').val().trim(),
            password = $('#password').val().trim(),
            rePassword = $('#rePassword').val().trim(),
            identityType = 'N';
        // console.log(phoneNumber, 1, phoneCode, 2, nickname, 3, avatarUrl, 4, email, 5, password);

        function initRegister() {
            registerPhone();
            fillInInformation();
            selectRole();
        }

        function addInputErrorMsg($wrap) {
            $wrap.addClass('warning')
                .closest('.form-group').find('.error-msg').removeClass('hide');
        }
        function removeInputErrorMsg($wrap) {
            $wrap.removeClass('warning')
                .closest('.form-group').find('.error-msg').addClass('hide');
        }
        function addFormatRule($wrap, reg) {
            var value = $wrap.closest('.form-group').find('input').val().trim();
            if (reg.test(value) === false) {
                $wrap.addClass('warning')
                    .closest('.form-group').find('.error-msg').removeClass('hide')
                    .find('.format-err').removeClass('hide').end().find('.null').addClass('hide');
                return false;
            }
            return true;
        }

        $('.form-group input').on('blur', function () {
            var val = $(this).val();
            if (!val) {
                addInputErrorMsg($(this));
            }
        }).on('focus', function () {
            removeInputErrorMsg($(this));
        })

        function registerPhone() {
            $('#phoneNumber').on('change', function () {
                phoneNumber = $(this).val().trim();
            });
            $('#phoneCode').on('change', function () {
                phoneCode = $(this).val().trim();
            });

            $('.btn-code').click(function () {
                if (!phoneNumber) {
                    addInputErrorMsg($('#phoneNumber'));
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
                    var isErrNumber = addFormatRule($('#phoneNumber'), phoneReg);
                    if (!isErrNumber) return;
                }
                getPhoneCode();
            });

            $('.btn-step.getCode').click(function () {
                if (!phoneNumber) {
                    addInputErrorMsg($('#phoneNumber'));
                    return;
                } else {
                    var phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
                    var isErrNumber = addFormatRule($('#phoneNumber'), phoneReg);
                    if (!isErrNumber) return;
                }

                if (!phoneCode) {
                    addInputErrorMsg($('#phoneCode'));
                    return;
                }
                if (!$('#protocol').prop('checked')) {
                    addInputErrorMsg($('#protocol'));
                    return;
                }
                verifyCode();
            })
        }

        function getPhoneCode() {
            $.post('/rest/send/code', { phone: phoneNumber }, function (resp) {
                if (resp.code === 200) {
                    console.log(resp);
                } else {
                    $('.error-message').html(resp.result);
                    return;
                }
            })
        }
        function verifyCode() {
            $.post('/rest/register/verify/code', { phone: phoneNumber, code: phoneCode }, function (resp) {
                if (resp.code !== 200) {
                    console.log(resp);
                    step = parseInt(step);
                    step++;
                    changeProgress(step);
                } else {
                    $('.error-message').html(resp.result);
                    return;
                }
            })
        }
        function fillInInformation() {
            uploadAvatar();
            $('#nickname').on('change', function () {
                nickname = $(this).val().trim();
            });
            $('#email').on('change', function () {
                email = $(this).val().trim();
            });
            $('#password').on('change', function () {
                password = $(this).val().trim();
            });
            $('#rePassword').on('change', function () {
                rePassword = $(this).val().trim();
            });
            
            $('.btn-step.register').click(function () {
                uploadAvatar();
                if (!nickname) {
                    addInputErrorMsg($('#nickname'));
                    return;
                }

                if (!avatarUrl) {
                    addInputErrorMsg($('#avatar'));
                    return;
                }
                if (!email) {
                    addInputErrorMsg($('#email'));
                    return;
                } else {
                    var emailReg = /^\w+@[A-z0-9]+\.[A-z]+$/; /*邮箱格式：**一串英文、数字、下划线 @ 一串英文、数字 . 一串英文***/
                    var isErrEmail = addFormatRule($('#email'), emailReg);
                    if (!isErrEmail) return;
                }

                if (!password) {
                    addInputErrorMsg($('#password'));
                    return;
                } else {
                    var passwordReg = /^[A-z0-9]{6,18}$/;
                    var isErrPassword = addFormatRule($('#password'), passwordReg);
                    if (!isErrPassword) return;
                }
                if (!rePassword) {
                    addInputErrorMsg($('#rePassword'));
                    return;
                }
                if (password && rePassword && (password !== rePassword)) {
                    $('#rePassword').addClass('warning')
                        .closest('.form-group').find('.error-msg').removeClass('hide')
                        .find('.format-err').removeClass('hide').end().find('.null').addClass('hide');
                    return;
                }

                registerPost();
            })
        }
        function uploadAvatar() {
            var uploader = WebUploader.create({
                server: '/rest/upload/image',
                pick: '#add-btn',
                fileSingleSizeLimit: 1024 * 1024 * 30,
                swf: '../img/Uploader.swf', // swf文件路径
                auto: true,
                duplicate: true,
                multiple: false, //是否可同时选择多个
                accept: {
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            });

            uploader.on('uploadSuccess', function (file, res) {
                if (res.code == 200) {
                    var imgSrc = res.result;
                    var $imgBtn = $('.img-btn');
                    avatarUrl = 'http://image.fanhai-cloud.com/' + imgSrc;
                    $imgBtn.addClass('no-border').find('img').attr({
                        'src': avatarUrl,
                        'class': 'uploaded'
                    }).end().find('.add-btn').addClass('hide');
                    removeInputErrorMsg($('#avatar'));

                    // 上传图片后
                    $imgBtn.on('mouseover', function () {
                        $(this).find('.add-btn').removeClass('hide');
                    }).on('mouseleave', function () {
                        $(this).find('.add-btn').addClass('hide');
                    })
                } else {
                    alert(res.result);
                }
            })
        }

        function registerPost(){
            $.post('/rest/user/register',{
                phone: phoneNumber,
                code: phoneCode,
                nickname: nickname,
                avatarUrl: avatarUrl,
                email: email,
                password: password
            },function(resp){
                if (resp.code !== 200) {
                    console.log(resp);
                    step = parseInt(step);
                    step++;
                    changeProgress(step);
                } else {
                    $('.error-message').html(resp.result);
                    return;
                }
            })
        }

        function selectRole(){
            $('.role').click(function(){
                var index = $(this).index() - 2;
                $('.role').find('.btn').removeClass('active').end().eq(index).find('.btn').addClass('active');
                console.log(index);
                if(index == 0){
                    identityType = 'U';
                }else if(index == 1){
                    identityType = 'C';
                }
            })

            $('.certification').click(function(){
                if(identityType == 'U'){
                    location.href = '/unionCertify.html';
                }else if(identityType == 'C'){
                    location.href = '/companyCertify.html';
                }
                return;
            })

            $('.step3 .more').click(function(){
                location.href = href;
            })
        }

        return function () {
            initRegister();
        };
    }());

    register();
}())
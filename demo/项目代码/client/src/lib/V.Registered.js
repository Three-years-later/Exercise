// 分析需求
// 001-表单验证
// 002-图形验证码
// 003-点击注册
$(() => {
    // 设置初始默认值，便于验证
    // $("#usernameID").val("kong");
    // $("#passwordA,#passwordB").val("000000");
    // $("#phoneID").val("13726905506");
    // console.log("#usernameID");
    /*用户表单验证*/
    $("#usernameID").blur(function () { //当元素失去焦点时发生 blur 事件。
        let val = $.trim($(this).val()); //$.trim()函数从提供的字符串的开头和结尾删除所有换行符，空格（包括不间断空格）和制表符。如果这些空格字符出现在字符串的中间，则将保留它们。
        if (/^[a-zA-Z]{4,16}$/.test(val)) { //test()检查val值是否正确，返回布尔值
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text("用户名不规范！");
            $(this).parents(".form-item").addClass("form-group-error");
        }
    })
    /*手机号码*/
    $("#phoneID").blur(function () {
        let val = $.trim($(this).val());
        if (/^1[3-9]\d{9}/.test(val)) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text("手机号码不规范！");
            $(this).parents(".form-item").addClass("form-group-error");
        }
    })
    /*密码*/
    $("#passwordA").blur(function () {
        let val = $.trim($(this).val());
        if (/^[a-zA-Z0-9]{6,12}$/.test(val)) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text("密码不规范！");
            $(this).parents(".form-item").addClass("form-group-error");
        }
    })
    /*确认密码*/
    $("#passwordB").blur(function () {
        let val = $.trim($(this).val());
        if ($.trim($("#passwordA").val()) == val) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text("两次输入的密码不一致！");
            $(this).parents(".form-item").addClass("form-group-error");
        }
    })
    /*确认密码*/
    // 001-先下载和引用插件
    // 002-在页面中置顶的位置提供canvas标签
    // 003-在js代码中调用插件中提供的构造函数创建实例对象，并且调用draw方法
    let imgCodeTarget;
    let captcha = new Captcha({
        lineNum: 15,
        dotNum: 20,
        fontSize: 30,
        length: 4,
        content: "0123456789"
    });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
        // console.log(r, '验证码1');
        /* 当用户点击图形变化验证码的时候需要重新校验 */
        $("#imageCode").trigger("blur");
    });
    /*图形验证码检校*/
    $("#imageCode").blur(function () {
        let val = $.trim($(this).val());
        if (imgCodeTarget == val) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            $(this).next().text("输入的验证码不正确！");
            $(this).parents(".form-item").addClass("form-group-error");
        }
    })
    /* 注册按钮的点击事件 */
    $("#registerBtn").click(function () {
        // 001-检查用户是否输入正确的信息并且验证通过，如果没通过那么就返回
        $("#usernameID,#phoneID,#imageCode,#passwordB,#passwordA").trigger("blur");
        if ($(".form-group-error").length != 0) {
            return;
        }
        /* 002-发送网络请求把注册相关的信息提交给服务器 */
        let data = {
            username: $.trim($("#usernameID").val()),
            password: md5($.trim($("#passwordA").val())).substr(0, 10),
            phone: $.trim($("#phoneID").val())
        }
        $.ajax({
            data,
            type: "post",
            url: "http://127.0.0.1/demo/server/register.php",
            dataType: "json",
            success(response) {
                /* 如果注册成功，那么就先提示用户然后再跳转 */
                if (response.status == "success") {
                    alert(response.msg);
                    window.location.href = "http://127.0.0.1/demo/client/src/html/home.html";
                } else {
                    alert(response.msg);
                }
            }
        });
    })
})
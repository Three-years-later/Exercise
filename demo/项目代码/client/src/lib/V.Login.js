$(() => {
    /*001-先处理切换功能*/
    $(".tabs-nav").on("click", "li", function () {
        // console.log(this);
        // console.log($(this).index());

        // 设置当前标签选中状态并做排他处理
        $(this).children("a").addClass("tabulous_active");
        $(this).siblings().children("a").removeClass("tabulous_active");

        console.log(this.children)
        //设置让内容区域切换
        $(".tabs-content").eq($(this).index()).addClass("showflip").siblings().removeClass("showflip");
    })
    /* 002-点击登录按钮 */
    $("#submit").click(function (e) {

        e.preventDefault();
        // console.log("++++");

        let username = $.trim($("#user_name").val());
        let password = $.trim($("#password").val());
        if (username.length == 0) {
            alert("请输入用户名");
            return;
        }
        if (password.length == 0) {
            alert("请输入密码");
            return;
        }
        let data = {
            username,
            password: md5(password).substr(0, 10)
        };



        $.ajax({
            data,
            type: "post",
            url: "http://127.0.0.1/demo/server/login.php",
            dataType: "json",
            success: function (response) {
                // console.log(response.id)
                if (response.status == "success") {
                    /* 把用户名和用户的id保存起来(存到Cookie中)，并且跳转到列表页面 */
                    Cookie.setItem("user_name", $("#user_name").val());
                    Cookie.setItem("user_id", response.id);
                    window.location.href = "http://127.0.0.1/demo/client/src/html/home.html";
                } else {
                    alert(response.msg);
                }
            }
        });
    })
})
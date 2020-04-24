$(() => {
    /* 当页面加载完检查用户的登录状态 */
    let user_name = Cookie.getItem("user_name");
    let user_id = Cookie.getItem("user_id");
    if (user_name && user_id) {
        // console.log(user_name);
        $(".user-entry").html("当前用户: " + user_name + ` <span class="off">注销</span>`);
        $("#rtoobar_cart_count").css("display", "block");
    }

    /* 注销的功能 */
    $(".off").click(function () {
        /* 删除本地存储的账户信息 */
        Cookie.removeItem("user_name");
        Cookie.removeItem("user_id");

        /* 重新刷新整个页面 */
        window.location.reload();

    })

    $.getJSON("http://127.0.0.1/demo/server/carousel.json", function (data) {
        // console.log(data.nav);
        let main = data.nav.map((ele, index) => {
            let tpl_1 = ele.con.map((e) => {
                let values = e.val.map((x) => {
                    return `<a href="">${x}</a>`
                }).join("");
                return `<dl>
                    <dt>
                        <h3><a href="">${e.key}</a></h3>   
                    </dt>
                    <dd class="goods-class">
                        ${values}
                    </dd>
                </dl>`
            }).join("");
            let tpl_2 = ele.rec.map((o) => {
                return `<span><a title=${o}>${o}</a></span>`
            }).join("");
            return `<li class="${index%2==0?"even":"odd"}">
                <div class="class">
                    <span class="arrow"></span>
                    <h4><a href="">${ele.h4}</a></h4>
                </div>
                <div class="sub-class" cat_menu_id="1" style="display: none; top: -1px;">
                    <div class="sub-class-content">
                        <div class="recommend-class">
                        ${tpl_2}
                        </div>
                        ${tpl_1}
                    </div>
                    <div class="sub-class-right">
                        <div class="adv-promotions"></div>
                    </div>
                </div>
            </li>`
        }).join("");
        $(".menu").html(main);
    });
    getMousenter();

    function getMousenter() {

        $(".menu").on("mouseenter", "li", function () {
            let index = $(this).index();
            // console.log(index);
            $(this).addClass("hover").siblings().removeClass("hover");
            $(this).children(".sub-class").css({
                display: "block",
                top: -(index * 34 + 1) + "px"
            })
        })
        $(".menu").on("mouseleave", "li", function () {
            let index = $(this).index();
            // console.log(index);
            $(this).removeClass("hover");
            $(this).children(".sub-class").css({
                display: "none",
                top: -(index * 34 + 1) + "px"
            })
        })
        $(".searchMenu").on("mouseenter", "#search-tip", function () {
            $(this).css("display", "block");
        });
        $(".searchMenu").on("mouseleave", "#search-tip", function () {
            $(this).css("display", "none");
        });
    }
})
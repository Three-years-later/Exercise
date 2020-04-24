$(() => {
    // console.log("+++++++++");
    /* 当页面加载完检查用户的登录状态 */
    let user_name = Cookie.getItem("user_name");
    let user_id = Cookie.getItem("user_id");
    if (user_name && user_id) {
        // console.log(user_name);
        $(".user-entry").html("当前用户: " + user_name + ` <span class="off">注销</span>`);
        getCartData();
        updateData();
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

    let type = "default";
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/demo/server/getPage.php",
        dataType: "json",
        success: function (response) {
            let count = response.count;
            let tpl = "";
            for (let i = 0; i < count; i++) {
                tpl += `<a>${i+1}</a>`;
            }
            $("#sort").html(tpl);
            getDataWithPage(1, type);
        }
    });

    /*分页点击事件*/

    $("#sort").on("click", "a", function () {
        // console.log($(this));
        let index = $(this).index();

        getDataWithPage(index + 1, type);
    })

    /*排序功能*/
    $(".nch-sortbar-array-index").on("click", "li", function () {
        // console.log($(this).data("type"));
        type = $(this).data("type");
        getDataWithPage(1, type);
        $(this).addClass("selected").siblings().removeClass("selected");
    })

    function getDataWithPage(index, type) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/demo/server/details.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                renderUI(response, index);
                //点击跳转详情页
                $(".list_pic.search_ul").on("click", ".goods-pic", function () {
                    console.log($(this).parents("li").index());
                    let data = response[$(this).parents("li").index()]
                    window.location.href = "../html/list.html?" + obj2string(data);
                })

                function obj2string(obj) {
                    let arr = [];
                    for (let key in obj) {
                        arr.push(`${key}=${obj[key]}`)
                    }
                    return arr.join("&")
                }
            }
        });
    }

    function renderUI(_data, index) {
        // console.log(_data);
        let tpl = _data.map((ele) => {
            return `<li class="item">
            <div class="goods-content" data-goods-id=${ele.ID}>

                <div class="goods-pic">
                    <a href="" target="_blank"
                        title=${ele.title_1}"><img
                            src=${ele.src_1}
                            title=${ele.title_1}
                            alt=${ele.title_1}></a>
                </div>
                <div class="goods-info" style="top: 230px;">
                    <div class="goods-pic-scroll-show">
                        <ul>
                            <li class="selected"><a href="javascript:void(0);"><img src=${ele.src_1}></a>
                            </li>
                            <li><a href="javascript:void(0);"><img src=${ele.src_2}></a>
                            </li>
                        </ul>
                    </div>
                    <div class="goods-name"><a href=""
                            target="_blank"
                            title=${ele.title_2}>${ele.title_1}<em>${ele.title_2}</em></a>
                    </div>
                    <div class="goods-price"> <em class="sale-price" title="">¥${ele.price_1}</em>
                        <em class="market-price" title="">¥${ele.price_1}</em>
                        <div class="goods-cti">
                            <span title="100%正品保证">
                                <img
                                    src="../img/zhengpin.gif">
                            </span>
                            <span title="30天无忧售后">
                                <img
                                    src="../img/shouhou.gif">
                            </span>
                            <span title="跨境商品">
                                <img
                                    src="../img/kuajing.gif">
                            </span>
                        </div>
                    </div>
                    <div class="goods-sub">
                        <span class="goods-compare"><i></i>加入对比</span>
                    </div>
                    <div class="sell-stat">
                        <ul>
                            <li><a href="" target="_blank" class="status">0</a>
                                <p>商品销量</p>
                            </li>
                            <li><a href="" target="_blank">0</a>
                                <p>用户评论</p>
                            </li>
                            <li><em member_id="1">&nbsp;</em></li>
                        </ul>
                    </div>
                    <div class="store"><a href=""
                            title="百洋健康官方自营店" class="name">百洋健康官方自营店</a></div>
                    <div class="add-cart">
                        <a href="javascript:void(0);" nctype="add_cart">加入购物车</a>
                    </div>
                </div>
            </div>
        </li>`
        }).join("");
        let mainA = `${tpl}<div class="clear"></div>`;
        $(".list_pic.search_ul").html(mainA);
        $("#sort").children("a").eq(index - 1).addClass("active").siblings().removeClass("active");
    }

    getMousenter();

    function getMousenter() {
        $(".list_pic.search_ul").on("mouseenter", ".goods-content", function () {
            // let index=$(this).index();
            $(this).find(".goods-info").stop().animate({
                top: "180px"
            }, 500)
        })
        $(".list_pic.search_ul").on("mouseleave", ".goods-content", function () {
            // let index=$(this).index();
            $(this).find(".goods-info").stop().animate({
                top: "230px"
            }, 300)
        })
    }




    /*商品加入购物车*/
    $(".list_pic.search_ul").on("click", ".add-cart", function () {
        // console.log(this);
        /* 1.没有登录 */
        if (!user_name || !user_id) {
            window.location.href = "http://127.0.0.1/demo/client/src/html/login.html#default";
        }
        /* 2.已经登录 */
        else {
            let goods_ID = $(this).parents(".goods-content").data("goods-id");
            // console.log(goods_ID);
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/demo/server/cart.php",
                data: `type=add&goods_ID=${goods_ID}&user_id=${user_id}`,
                dataType: "json",
                success: function (response) {

                    if (response.status == "success") {
                        // alert("加入成功");
                        getCartData();
                        updateData();
                    }
                }
            });
        }
    })

    /* 封装函数来获取购物车中所有的商品信息 */
    function getCartData() {
        /* 1.发请求获取最新的数据 */
        /* 2.请求成功了，渲染UI */
        /* 接口：cart.php?type=get&user_id=xxx*/
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/demo/server/cart.php",
            data: `type=get&user_id=${user_id}`,
            dataType: "json",
            success: function (data) {
                // console.log(1, data);
                cartRenderUI(data);
            }
        });
    }
    /* 封装渲染购物车的函数 */
    function cartRenderUI(_data) {
        // console.log(_data);
        let html = _data.map(ele => {
            // console.log(ele);
            return `
                <li class="g-cart-td" data-item-id=${ele.ID}>
                    <div class="goods-pic">
                        <a href="" title=${ele.title_1} target="_blank" ;="">
                            <img src=${ele.src_1} alt=${ele.title_1}>
                        </a>
                    </div>
                    <dl>
                        <dt class="goods-name">
                            <a href="" title=${ele.title_1} target="_blank" ;="">${ele.title_1}</a>
                        </dt>
                        <dd>
                            <em class="goods-price">¥${ele.price_1}</em>
                            ×<em class="g-cart-cout-text l">${ele.num}</em>
                        </dd>
                    </dl>
                    <a href="javascript:(${ele.ID});" class="del" title="删除">X</a>
                </li>`
        }).join("");
        let Settlement = `
                <div nctype="rtoolbar_total_price" class="total-price">
                    共计金额：
                    <em class="goods-price"></em>
                </div>
                <a href="javascript:void(0);" onclick="javascript:window.location.href=">结算购物车中的商品</a>`;
        $("#cart-list").html(html);
        $(".btn-box").html(Settlement);
    }



    /* 实现删除功能 */
    /* 1.获取goods_id */
    /* 2.发送网络请求 */
    /* 3.请求成功重新刷新购物车 */
    $(".cart-list").on("click", ".del", function () {
        // console.log("22222");

        let goods_id = $(this).parents(".g-cart-td").data("item-id");
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/demo/server/cart.php",
            data: `type=delete&user_id=${user_id}&goods_id=${goods_id}`,
            dataType: "json",
            success: function (data) {
                if (data.status == "success") {
                    getCartData();
                    updateData();
                    computedTotalCountAndTotalPrice();
                }

            }
        });
    })

    /* 更新数量 */
    function updateData(ele, count) {
        let goods_id = $(ele).parents(".g-cart-td").data("item-id");
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/demo/server/cart.php",
            data: `type=update&user_id=${user_id}&goods_id=${goods_id}&count=${count}`,
            dataType: "json",
            success: function (data) {
                if (data.status == "success") {
                    getCartGoodsNumber();
                    computedTotalCountAndTotalPrice();
                }
            }
        });
    }

    /* *********** */
    /* 封装函数获取购物车中商品的数量 */
    function getCartGoodsNumber() {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/demo/server/cart.php",
            data: `type=getCount&user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $("#rtoobar_cart_count").text(response.count);
                    computedTotalCountAndTotalPrice();
                }
            }
        });
    }


    /* 封装提供一个函数(计算总数量和总价格) */
    /* 逻辑：先获取所有商品标签，遍历这些标签，每循环一次就检查当前标签是否被勾选如果被勾选那么就累加数量和价格 */


    function computedTotalCountAndTotalPrice() {
        let totalPrice = 0;

        $("#cart-list").find(".g-cart-td").each(function () {
            let currentNum = $(this).find(".g-cart-cout-text").text() * 1;
            let currentPrice = $(this).find(".goods-price").text().slice(1) * 1;
            totalPrice += currentNum * currentPrice;
            console.log(totalPrice);
        })
        $("#btn-box-price").find(".goods-price").text("￥" + totalPrice);
    }
})
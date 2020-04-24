$(() => {
    let querysring = decodeURI(window.location.search.slice(1));
    // console.log(querysring);
    let data = string2obj(querysring);
    // console.log(data);
    $("#midimg")[0].src = data.src_1;
    $("#bigView img")[0].src = data.src_1;
    $(".cost-price").find("strong").text(data.price_2);
    $(".price").find("strong").text(data.price_1);
    $(".name").find("h1").text(data.title_1);
    $(".name").find("strong").text(data.title_2);
    $("title").text(data.title_1);

    function string2obj(str) {
        let obj = {};
        let arr = str.split("&")
        for (let i = 0; i < arr.length; i++) {
            let arr1 = arr[i].split("=");
            obj[arr1[0]] = arr1[1]
        }
        return obj;
    }


    
    // 放大镜功能
    // 1.鼠标移入事件
    $("#vertical").on("mouseenter", function () {
        $("#bigView").css({
            display: "block"
        });
        $("#winSelector").css({
            display: "block"
        })
    })

    $("#vertical").on("mousemove", function (e) {
        let x = e.pageX - $("#vertical").offset().left - $("#winSelector").width() / 2;
        let y = e.pageY -$("#vertical").offset().top - $("#winSelector").height() / 2;
        // 鼠标的最大移动距离
        let maxX = $("#vertical").width() - $("#winSelector").width();
        let maxY = $("#vertical").height() - $("#winSelector").height();
        // console.log("maxX", maxX, "maxY", maxY);
        //设置最大可移动距离
        if (x > maxX) {
            x = maxX;
        }
        if (y > maxY) {
            y = maxY;
        }
        //设置最小可移动距离
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        // console.log("x", x, "y", y);
        $("#winSelector").css({
            left: x + "px",
            top: y + "px"
        })
        // console.log(x, y);
        let ratioX = (1280 - $("#bigView").width()) / maxX;
        let ratioY = (1280 - $("#bigView").height()) / maxY;
        // console.log(ratioX);
        // console.log("ratioX", ratioX, "ratioY", ratioY);
        $("#bigView").children("img").css({
            left: -x * ratioX + "px",
            top: -y * ratioY + "px"
        })

    })

    // 1.鼠标移出事件
    $("#vertical").on("mouseleave", function () {
        $("#bigView").css({
            display: "none"
        });
        $("#winSelector").css({
            display: "none"
        })
    })
})
class Floor {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.timer = null;
        this.index = 0;
        this.len = this.data.carouselIII.length;
        this.isUlItemWidth = 247;
    }
    init() {
        this.renterUI();
        this.autoPlayer();
        this.thirdCarousel();
    }
    renterUI() {
        let tpl_4 = this.data.floor.map((ele) => {
            let tpl_1 = ele.crumbs.map((ele) => `<a href=${ele.href}>${ele.title}</a>`).join("");
            let tpl_3 = ele.goodslist.map((ele) => {
                return `<li>
                    <a href=${ele.href}>
                        <img src=${ele.src} />
                    </a>
                </li>`
            }).join("");
            return `<div class="home_floor_pc"><div class="home_lchead_pc home_yy_head"><h3>${ele.h3}</h3>
            <div class="home_pc_crumbs">
            ${tpl_1}<a href=${ele.href} class="home_look_more">${ele.see}</a></div></div>
            <div class="home_yy_img"><a href=${ele.href}><img src=${ele.src}></a></div>
            <div class="home_yy_goodslist"><ul>${tpl_3}</ul></div></div>`
        }).join("");
        let mainA = `<div class="home_yy_pc">${tpl_4}</div>`;
        let tpl_5 = this.data.carouselIII.map((ele) => {
            return `<li class="index-slider-list-item">
                <a href=${ele.href}>
                    <img src=${ele.src} />
                </a>
            <div class="swiper-slide-des">
                <p class="index-title">
                    <a href=${ele.href}>${ele.title}</a>
                </p>
                <p><em class="index-price">${ele.Rmb}</em><span class="index-price">${ele.price}</span><i class="del">${ele.Org}</i></p>
            </div>
        </li>`
        }).join("");
        let mainB = `<div class="home_pc_recommend">
        <div class="home_lchead_pc">
            <h3>为你推荐</h3>
            <span>根据浏览记录推荐的商品</span>
        </div>
        <div class="index-content home_recommend_goods">
            <div class="index-slider">
                <ul class="index-slider-list">${tpl_5}</ul>
            </div>
            <div>
                <span class="swiper-button-next home_recommend_next banner_next"></span>
                <span class="swiper-button-prev home_recommend_prev banner_prev"></span>
            </div>   
        </div>`;
        this.root = $(mainA + mainB);
        $(".home_main_pc").append(this.root);
    }
    autoPlayer() {
        this.timer = setInterval(() => this.next(), 3000);
    }
    next() {
        this.index++;
        if (this.index == this.len - 4) {
            this.index = 1;
            $(".index-slider-list").css({
                left: "0px"
            })
        }
        // console.log(this.index);
        $(".index-slider-list").animate({
            "left": -this.index * this.isUlItemWidth + "px"
        }, 1000);
    }
    thirdCarousel() {
        $(".index-slider-list").mouseenter(() => {
            // let index=$(this).index();
            $(".swiper-button-next.home_recommend_next.banner_next").stop().css("display", "block");
            $(".swiper-button-prev.home_recommend_prev.banner_prev").stop().css("display", "block");
        })
        $(".index-slider-list").mouseleave(() => {
            // let index=$(this).index();
            $(".swiper-button-next.home_recommend_next.banner_next").css("display", "none");
            $(".swiper-button-prev.home_recommend_prev.banner_prev").css("display", "none");
        })
    }
}
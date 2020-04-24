class Banner {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.index = 0;
        this.len = this.data.length;
        this.isUlItemWidth = 1200;
    }
    init() {
        this.renderUI();
        // this.eventClickHandler();
    }
    renderUI() {
        let tpl_1 = this.data.banner.map((ele) => `<li>
            <a href=${ele.herf}><img src=${ele.src}></a>
        </li>`).join("");
        let mainA = `<div class="home_gg_pc">
            <ul class="home_gg_pc_ul">${tpl_1}</ul>
        </div>`;
        let tpl_2 = this.data.carouselII.map((ele, index) => {
            return `<div class="swiper-slide" style="width: 232px;margin-right: 10px;"><div class="swiper-slide-img">
                    <a href=${ele.href}>
                        <img src=${ele.src}>
                    </a>
                </div>
                <div class="swiper-slide-des">
                    <p>
                        <a href=${ele.href}>${ele.title}</a>
                    </p>
                    <p><span>${ele.price}</span></p>
                </div>
                <div class="swiper-slide-buy">
                    <a href=${ele.href}>${ele.shop}</a>
                </div></div>`;
        }).join("");
        let mainB = `<div class="home_hot_bdan">
            <div class="home_lchead_pc home_hot_head">
                <h3>热销榜单</h3>
                <span>千万妈妈 精选超值好货</span>
            </div>
            <div>
                <div class="swiper-container swiper-container-hot">
                    <div class="swiper-wrapper home_hotbd home-hero-main-two" style="height:380px;">${tpl_2}</div>
                    <div class="swiper-pagination home_hot_pagination swiper-pagination-clickable swiper-pagination-bullets">
                    <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span><span class="swiper-pagination-bullet"></span></div>
                </div>
            </div>
        </div>`;
        this.root = $(mainA + mainB);
        $(".home_main_pc").append(this.root);
    }
    eventClickHandler() {

    }
    switchNavItem() {
        Array.from(this.dianJi.children).forEach((ele => ele.classList.remove("swiper-pagination-bullet-active")));
        this.isDivB.children[this.index].classList.add("swiper-pagination-bullet-active");
    }
}
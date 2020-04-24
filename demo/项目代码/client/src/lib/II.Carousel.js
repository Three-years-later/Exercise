class Carousel {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.timer = null;
        this.index = 0;
        this.len = this.data.carouselI.length;
        this.isUlItemWidth = 1458;
    }
    init() {
        this.renderUI();
        this.autoPlayer();
        this.eventClickHandler();
        // this.eventMouseHandler();
        this.eventClickWithSliderNav();
    }
    renderUI() {
        let tpl_1 = this.data.carouselI.map((ele) => `<li class="slider"><img src=${ele}></li>`).join("");
        let mainA = `<div class="box2"><ul class="home-hero-main">${tpl_1}</ul></div>`;
        let mainB = `<div class="slider-control"><p class="prev"></p> <p class="next"></p></div>`;
        // let tpl_2 = this.data.map((ele, index) => `<span class="slider-nav-item ${index==0?"active":""}"></span>`).join("");
        let tpl_2 = "";
        for (let i = 0, len = this.len - 1; i < len; i++) {
            tpl_2 += `<span class="slider-nav-item ${i == 0 ? "active" : "" }"></span>`;
        }
        let mainC = `<div class="slider-nav">${tpl_2}</div>`;
        this.root = $(mainA + mainB + mainC);
        $(".box1").append(this.root);
        this.isUl = $(".home-hero-main").get(0);
        this.isDivB = $(".slider-nav").get(0);
        // console.log(this.isUl);
    }
    autoPlayer() {
        this.timer = setInterval(() => this.next(), 5000);
    }
    eventClickHandler() {
        $(".slider-control").on("click", "p", (x) => {
            x = x || window.event;
            let tag = x.target || x.srcElement;
            if (tag.className == "prev") {
                // this.eventMouseHandler();
                clearInterval(this.timer);
                this.prev();
                this.autoPlayer();
            } else if (tag.className == "next") {
                // this.eventMouseHandler();
                clearInterval(this.timer);
                this.next();
                this.autoPlayer();
            }
            console.log(this.index);
        })
    }
    eventMouseHandler() {
        $(".slider-control").mouseenter(() => clearInterval(this.timer));
        $(".slider-control").mouseleave(() => this.autoPlayer());
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = 0;
            // console.log(this.len);
            $(".home-hero-main").css({
                "left": -(this.len - 1) * this.isUlItemWidth + "px"
            })
        }

        $(".home-hero-main").animate({
            "left": -this.index * this.isUlItemWidth + "px"
        }, 1500);
        this.switchNavItem();
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 1;
            $(".home-hero-main").css({
                "left": "0px"
            })
        }
        $(".home-hero-main").animate({
            "left": -this.index * this.isUlItemWidth + "px"
        }, 1500)
        this.switchNavItem();
    }
    switchNavItem() {
        Array.from(this.isDivB.children).forEach((ele => ele.classList.remove("active")));
        let index = this.index;
        if (index == 1) {
            index = 0;
        }
        this.isDivB.children[index].classList.add("active");
    }
    eventClickWithSliderNav() {
        $(".slider-nav").on("click", "span", () => {
            $(".home-hero-main").animate({
                "left": "0px"
            }, 1000)
        })
    }
    secondCarousel() {
        $(".home_main_pc").on("click", ".swiper-pagination-bullet", () => {
            $(".swiper-wrapper.home_hotbd.home-hero-main-two").animate({
                "left": "0px"
            }, 1000)
        });
        $(".home_main_pc").on("click", ".swiper-pagination-bullet", () => {
            $(".swiper-wrapper.home_hotbd.home-hero-main-two").animate({
                "left": "0px"
            }, 1000)
        });
    }
}
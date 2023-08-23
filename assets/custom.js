Drupal.behaviors.overrideSwiper = {
    attach: function(context, settings) {
        var swipers = drupalSettings.swiper_formatter && drupalSettings.swiper_formatter.swipers ? drupalSettings.swiper_formatter.swipers : null;
        
        if (swipers) {
            for (const key in swipers) {
                let swiper = swipers[key];                
                if (swiper.label == 'Products swiper custom') {
                    swiper.slidesPerView = 1.35
                    swiper.breakpoints = {
                        500: {
                            slidesPerView: 2.35,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1000: {
                            slidesPerView: 4,
                        },
                    };
                }
                if (key == 'swiper-baner-block-1'){
                    swiper.pagination = {
                        el: ".swiper-pagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + ( index < 9 ? '0' + (index + 1) : (index + 1)) + "</span>";
                        },
                    }
                }
                if (key == 'swiper-ostatnie-artykuly-block-1') {
                    swiper.slidesPerView = 1.35
                    swiper.spaceBetween = 20
                    swiper.enabled = true
                    swiper.breakpoints = {
                        500: {
                            slidesPerView: 2.35,
                            enabled: true,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            enabled: false,
                            spaceBetween: 0
                        },
                    };
                }
                if (key == 'swiper-blok-ikon-pod-banerem-block-1') {
                    swiper.slidesPerView = 1.35
                    swiper.spaceBetween = 20
                    swiper.enabled = true
                    swiper.breakpoints = {
                        500: {
                            slidesPerView: 2.35,
                            enabled: true,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            enabled: false,
                            spaceBetween: 0
                        },
                    };
                }
                if (swiper.id == 'swiper-podkategorie-block-4') {
                    swiper.slidesPerView = 3,
                    swiper.breakpoints = {
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    };
                }
            }
        }
    }
};

window.addEventListener('DOMContentLoaded',() => {
    const scrollDownBtn = document.querySelector('[data-scroll-down]');
    const breadcrumbEl = document.querySelector('.breadcrumb');
    if (scrollDownBtn && breadcrumbEl) {
        scrollDownBtn.addEventListener('click',()=>{
            let yOffset = breadcrumbEl.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                behavior: 'smooth',
                top: yOffset
            })
        })
    }
})
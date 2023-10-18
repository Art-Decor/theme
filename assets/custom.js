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
                if (swiper.id == 'swiper-podkategorie-block-4' || swiper.id == 'swiper-podkategorie-block-3' ) {
                    swiper.slidesPerView = 3,
                    swiper.spaceBetween = 6
                    swiper.centerInsufficientSlides = true,
                    swiper.watchOverflow = true,
                    swiper.watchSlidesProgress = true,
                    swiper.navigation = {
                        enabled: true,
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                    swiper.breakpoints = {
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 8,
                            navigation: {
                                enabled: true,
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 8,
                            navigation: {
                                enabled: true,
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }
                        },
                    };
                }
                if (key == 'swiper-processes-swiper-block-1') {
                    swiper.slidesPerView = 'auto',
                    swiper.spaceBetween = 5
                    swiper.navigation = {
                        enabled: true,
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },                    
                    swiper.pagination = {
                        enabled: false,
                    },
                    swiper.breakpoints = {
                        768: {
                            spaceBetween: 8,
                        },
                    };
                }
                if (key == 'swiper-wall-art-seo-tiles-block-1' || key == 'swiper-wall-art-seo-tiles-block-2') {
                    swiper.slidesPerView = 1.35
                    swiper.spaceBetween = 20
                    swiper.navigation = {
                        enabled: false,
                    },                    
                    swiper.pagination = {
                        enabled: false,
                    },
                    swiper.enabled = true
                    swiper.breakpoints = {
                        768: {
                            enabled: false,
                            spaceBetween: 0
                        },
                    },
                    swiper.on ={
                        navigationPrev: function () {
                          console.log('swiper prev btn click');
                          this.slideTo(0)
                          return
                        },
                      };
                }
            }
        }
    }
};

window.addEventListener('DOMContentLoaded',() => {
    const scrollDownBtn = document.querySelector('[data-scroll-down]');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click',()=>{
            let yOffset = scrollDownBtn.getBoundingClientRect().top + 30 + window.scrollY
            window.scrollTo({
                behavior: 'smooth',
                top: yOffset
            })
        })
    }
})
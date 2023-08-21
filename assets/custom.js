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
                    swiper.enabled = true
                    swiper.breakpoints = {
                        500: {
                            slidesPerView: 2.35,
                            enabled: true,
                        },
                        768: {
                            slidesPerView: 3,
                            enabled: false,
                        },
                    };
                }
            }
        }
    }
};
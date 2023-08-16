Drupal.behaviors.overrideSwiper = {
    attach: function(context, settings) {
        var swipers = drupalSettings.swiper_formatter && drupalSettings.swiper_formatter.swipers ? drupalSettings.swiper_formatter.swipers : null;
        
        if (swipers) {
            for (const key in swipers) {
                let swiper = swipers[key];                
                if (swiper.label == 'Products swiper custom') {
                    swiper.slidesPerView = 1.5
                    swiper.breakpoints['500'] = {
                        slidesPerView: 2.5,
                    };
                }
            }
        }
    }
};
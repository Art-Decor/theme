Drupal.behaviors.overrideSwiper = {
attach: function(context, settings) {
    var swipers = drupalSettings.swiper_formatter && drupalSettings.swiper_formatter.swipers ? drupalSettings.swiper_formatter.swipers : null;
    
    if (swipers) {
        swipers.forEach((swiper)=>{
            if (swiper.label =- 'Products swiper custom') {
                swiperSettings.slidesPerView = 1.5
                swiperSettings.breakpoints['500'] = {
                    slidesPerView: 2.5,
                };
            }
        })
    }
}
};
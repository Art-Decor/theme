Drupal.behaviors.overrideSwiper = {
attach: function(context, settings) {
    var swiperSettings = drupalSettings.swiper_formatter_settings && drupalSettings.swiper_formatter_settings.swipers['swiper-slider-produktow-block-1--5'] ? drupalSettings.swiper_formatter_settings.swipers['swiper-slider-produktow-block-1--5'] : null;
    
    if (swiperSettings) {
    swiperSettings.slidesPerView = 1.5
    swiperSettings.breakpoints = {
        540: {
        slidesPerView: 2.5,
        },
    };
    }
}
};
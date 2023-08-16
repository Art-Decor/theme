document.addEventListener("DOMContentLoaded", () => {
    const swiperEl = document.querySelector('.view-id-slider_produktow .swiper-container');
    if(swiperEl){
      swiperEl.swiper.params.slidesPerView = 1.5
      swiperEl.swiper.params.breakpoints['540'] = {slidesPerView: 2.5}
      swiperEl.swiper.update()
    }
  });

  Drupal.behaviors.overrideSwiper = {
    attach: function(context, settings) {
      var swiperSettings = drupalSettings.swiper_formatter_settings && drupalSettings.swiper_formatter_settings.swipers['swiper-slider-produktow-block-1'] ? drupalSettings.swiper_formatter_settings.swipers['swiper-featured-watches-block-1'] : null;
      
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
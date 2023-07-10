(function ($) {

  "use strict";

  $.fn.mobileMenu = function (options) {
    var settings = $.extend({
      targetWrapper: '.navbar-we-mega-menu',
      accordionMenu: 'true',
      toggledClass: 'menu-active',
      pageSelector: 'body',
      headerSelector: '[data-header-main]',
      headerContainerSelector: '[data-header-container]'
    }, options);

    function _calcOffsetTop() {
      if ($(window).width() > 991) {
        return 0
      }
      let offsetTop = 0
      if ($(settings.headerContainerSelector).length) {
        offsetTop = document.querySelector(settings.headerContainerSelector).getBoundingClientRect().top + $(settings.headerContainerSelector).height()
      }
      return offsetTop
    }

    if ($(window).width() <= 991) {
      $(settings.targetWrapper).addClass('mobile-main-menu');
      $(settings.targetWrapper).css('top',`${_calcOffsetTop()}px`)
    }else{
      $(settings.targetWrapper).css('top','')
    }

    var toggleButton = this;
    

    $(window).resize(function () {
      if ($(window).width() <= 991) {
        $(settings.targetWrapper).addClass('mobile-main-menu');
        $(settings.targetWrapper).css('top',`${_calcOffsetTop()}px`)
      } else {
        $(settings.targetWrapper).removeClass('mobile-main-menu');
        $(settings.targetWrapper).css('top','')
        $('body').css('overflow', '');
        $('body').css('height', '');
        $('body').css('position', '');
        $(settings.pageSelector).removeClass(settings.toggledClass);
        $(settings.pageSelector).find('.overlay').remove();
        $(settings.pageSelector).css('position', '');
        item.removeClass('open');
        item.find('ul').css('display', '');
      }
    });

    function _weMegaMenuClear() {
      var wrapper = $(settings.pageSelector);
      var overlay = wrapper.find('.overlay');
      overlay.remove();
      wrapper.css({
        'width': '',
        'position': ''
      });
      wrapper.removeClass(settings.toggledClass);
      wrapper.find('div.region-we-mega-menu nav').removeClass('we-mobile-megamenu-active');

      if (overlay.length > 0) {
        wrapper.find('.btn-close').remove();
        overlay.remove();
        $('body').css('overflow', '');
        $('body').css('height', '');
        $('body').css('position', '');
      }
    }

    this.off('click.mobileMenu');
    this.on('click.mobileMenu', function (e) {
      var targetWrapper = $(this).closest('div.region-we-mega-menu').find('nav.navbar-we-mega-menu');
      var wrapper = $(settings.pageSelector);
      if (!wrapper.hasClass(settings.toggledClass)) {
        wrapper.addClass(settings.toggledClass).css('position', 'relative');
        $(settings.targetWrapper).addClass('mobile-main-menu');
        $(settings.targetWrapper).css('top',`${_calcOffsetTop()}px`)
        targetWrapper.addClass('we-mobile-megamenu-active');
        if (wrapper.find('.overlay').length == 0) {
          var overlay = $(`<div class="overlay" style="top: ${_calcOffsetTop()}px"></div>`);
          overlay.prependTo(wrapper);
          overlay.click(function () {
            _weMegaMenuClear();
          });
          $('body').css('overflow', 'hidden');
          $('body').css('btn-close', 'hidden');
          $('body').css('height', '100%');
          $('body').css('position', 'relative');
        }
        if (wrapper.find('.btn-close').length == 0) {
          var btnClose = $('<span class="btn-close"></span>');
          btnClose.prependTo(wrapper);

          $('.btn-close').on('click', function (e) {
            _weMegaMenuClear();
            e.preventDefault();
            return false;
          });
        }

      } else {
        _weMegaMenuClear();
      }
      e.preventDefault();
      e.stopPropagation();
    });

    if (settings.accordionMenu == 'true') {
      var targetWrapper = $(this).closest('div.region-we-mega-menu').find('nav.navbar-we-mega-menu');
      var menu = $(targetWrapper).find('ul.we-mega-menu-ul').first();
      var item = menu.find('> li[data-submenu=1]');
      var item_active = menu.find('> li[data-submenu=1].active');
      if ($(window).width() <= 991) {
        item_active.addClass('open');
        item_active.find('> ul').css('display', 'block');
      }
      item.click(function (e) {
        if ($(window).width() <= 991) {
          var $this = $(this);
          var $sub_menu_inner = $this.find('> .we-mega-menu-submenu');
          if (!$this.hasClass('open')) {
            $(item).not($this).removeClass('open');
            item.find('> .we-mega-menu-submenu').slideUp();
            $this.toggleClass('open');
            if ($this.hasClass('open')) {
              // $sub_menu_inner.slideDown();
              console.log('open ?');
              return false         
            }
          }else {
            // $sub_menu_inner.slideUp();
            console.log('close ? ');
            return false
          }
          return false         
        }
      });
    }


    let scrollState = 0 

    window.addEventListener('scroll',()=>{

      if (window.scrollY < 100) {
        $(settings.headerContainerSelector).removeClass('nav-collapsed')
      }else if(scrollState > window.scrollY) {
        $(settings.headerContainerSelector).removeClass('nav-collapsed')        
      }else if(!$(settings.pageSelector).hasClass(settings.toggledClass)){
        $(settings.headerContainerSelector).addClass('nav-collapsed')
      }

      scrollState = window.scrollY
    })
  }

}(jQuery));
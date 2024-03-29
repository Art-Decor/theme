;(function ($) {
	'use strict'

	$.fn.mobileMenu = function (options) {
		var settings = $.extend(
			{
				targetWrapper: '.navbar-we-mega-menu',
				accordionMenu: 'true',
				toggledClass: 'menu-active',
				pageSelector: 'body',
				headerSelector: '[data-header-main]',
				headerContainerSelector: '[data-header-container]',
				closeButtonsSelector: '[data-submenu-close-btn]',
			},
			options
		)

		function _calcOffsetTop() {
			if ($(window).width() > 991) {
				return 0
			}
			let offsetTop = 0
			if ($(settings.headerContainerSelector).length) {
				offsetTop =
					document
						.querySelector(settings.headerContainerSelector)
						.getBoundingClientRect().top +
					$(settings.headerContainerSelector).height()
			}
			return offsetTop
		}

		if ($(window).width() <= 991) {
			$(settings.targetWrapper).addClass('mobile-main-menu')
			$(settings.targetWrapper).css('top', `${_calcOffsetTop()}px`)
		} else {
			$(settings.targetWrapper).css('top', '')
		}

		var toggleButton = this

		$(window).resize(function () {
			if ($(window).width() <= 991) {
				$(settings.targetWrapper).addClass('mobile-main-menu')
				$(settings.targetWrapper).css('top', `${_calcOffsetTop()}px`)
				$(settings.targetWrapper).css(
					'height',
					`calc(100vh - ${_calcOffsetTop()}px)`
				)
			} else {
				$(settings.targetWrapper).removeClass('mobile-main-menu')
        $(settings.targetWrapper).removeClass('we-mobile-megamenu-active')
				$(settings.targetWrapper).css('top', '')
				$(settings.targetWrapper).css('height', '')
				$(settings.targetWrapper).css('overflow', '')
				$('body').css('overflow', '')
				$('body').css('height', '')
				$('body').css('position', '')
				$(settings.pageSelector).removeClass(settings.toggledClass)
				$(settings.pageSelector).find('.overlay').remove()
				$(settings.pageSelector).css('position', '')
				item.removeClass('open')
				item.find('ul').css('display', '')
			}
		})

		function _weMegaMenuClear() {
			var wrapper = $(settings.pageSelector)
			var overlay = wrapper.find('.overlay')
			overlay.remove()
			wrapper.css({
				width: '',
				position: '',
			})
			wrapper.removeClass(settings.toggledClass)
			wrapper
				.find('div.region-we-mega-menu nav')
				.removeClass('we-mobile-megamenu-active')
			$(settings.targetWrapper)
				.find('.we-mega-menu-li.open')
				.removeClass('open')

      $(settings.targetWrapper).css('overflow','')

			if (overlay.length > 0) {
				wrapper.find('.btn-close').remove()
				overlay.remove()
				$('body').css('overflow', '')
				$('body').css('height', '')
				$('body').css('position', '')
			}
		}

		this.off('click.mobileMenu')
		this.on('click.mobileMenu', function (e) {
			var targetWrapper = $(this)
				.closest('div.region-we-mega-menu')
				.find('nav.navbar-we-mega-menu')
			var wrapper = $(settings.pageSelector)
			if (!wrapper.hasClass(settings.toggledClass)) {
				wrapper.addClass(settings.toggledClass).css('position', 'relative')
				$(settings.targetWrapper).addClass('mobile-main-menu')
				$(settings.targetWrapper).css('top', `${_calcOffsetTop()}px`)
				$(settings.targetWrapper).css(
					'height',
					`calc(100vh - ${_calcOffsetTop()}px)`
				)
				targetWrapper.addClass('we-mobile-megamenu-active')
				if (wrapper.find('.overlay').length == 0) {
					var overlay = $(
						`<div class="overlay" style="top: ${_calcOffsetTop()}px"></div>`
					)
					overlay.prependTo(wrapper)
					overlay.click(function () {
						_weMegaMenuClear()
					})
					$('body').css('overflow', 'hidden')
					$('body').css('btn-close', 'hidden')
					$('body').css('height', '100%')
					$('body').css('position', 'relative')
				}
				if (wrapper.find('.btn-close').length == 0) {
					var btnClose = $('<span class="btn-close"></span>')
					btnClose.prependTo(wrapper)

					$('.btn-close').on('click', function (e) {
						_weMegaMenuClear()
						e.preventDefault()
						return false
					})
				}
			} else {
				_weMegaMenuClear()
			}
			e.preventDefault()
			e.stopPropagation()
		})

		if (settings.accordionMenu == 'true') {
			var targetWrapper = $(this)
				.closest('div.region-we-mega-menu')
				.find('nav.navbar-we-mega-menu')
			var menu = $(targetWrapper).find('ul.we-mega-menu-ul').first()
			var item = menu.find('> li[data-submenu=1]')
			var item_active = menu.find('> li[data-submenu=1].active')
			if ($(window).width() <= 991) {
				item_active.addClass('open')
				item_active.find('> ul').css('display', 'block')
			}
			item.click(function (e) {
				if ($(window).width() <= 991) {
					var $this = $(this)
					if (!$this.hasClass('open')) {
						$(item).not($this).removeClass('open')
						$this.toggleClass('open')
						let scrollOffset = $(settings.targetWrapper).scrollTop()
						$(settings.targetWrapper).css('overflow', 'hidden')
						$this
							.find('.we-mega-menu-submenu')
							.css('top', `${scrollOffset}px`)
					}
					return false
				}
			})
		}

		$(settings.closeButtonsSelector).on('click', function () {
			let parentId = $(this).attr('data-parent-id')
			let $parentItem = $(`[data-id="${parentId}"].we-mega-menu-li`)
			$parentItem.removeClass('open')
			setTimeout(() => {
				$(settings.targetWrapper).css('overflow', '')
				$parentItem.find('.we-mega-menu-submenu').css('top', '')
			}, 300)

			return false
		})

		let scrollState = 0

		window.addEventListener('scroll', () => {
			if (window.scrollY < 100) {
				$(settings.headerContainerSelector).removeClass('nav-collapsed')
			} else if (scrollState > window.scrollY) {
				$(settings.headerContainerSelector).removeClass('nav-collapsed')
			} else if (!$(settings.pageSelector).hasClass(settings.toggledClass)) {
				$(settings.headerContainerSelector).addClass('nav-collapsed')
			}

			scrollState = window.scrollY
		})
	}
})(jQuery)

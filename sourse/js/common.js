const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".nav-wrap"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			eforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); 
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '06.jpg';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}
	
		
	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });
	
	whenResize();
	
	if (window.matchMedia("(max-width: 768px)").matches) {
		setTimeout(() => {
			var myDiv = $(".sPresentationHead");
			var myDivInner = $(".sPresentationHead__inner");
			var scrollto = myDiv.offset().left + (myDiv.width() / 2);
			myDiv.animate({ scrollLeft: scrollto });
			// console.log(scrollto);

		}, 100);
	}

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
	
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	// modal window
	$(".sLogos__col-page, .sLogos__col ").on('click', '.link-modal', function () {
		setTimeout(() => {
			const swiper5 = new Swiper('.modal-content .modal-row__slider--js', {
				// slidesPerView: 5,
				...defaultSl,
				slidesPerView: '1', 
			spaceBetween: 30,
			navigation: {
				nextEl: '.modal-content .swiper-button-next',
				prevEl: '.modal-content .swiper-button-prev',
				},
			
				breakpoints: { 
					576: {
						slidesPerView: '2', 
					} 
				}
		});
			
		}, 100);
})
	// modal window

	const swiper6 = new Swiper('.sMembers__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: '1',
		spaceBetween: 30,
		navigation: {
			nextEl: '.sMembers .swiper-button-next',
			prevEl: '.sMembers .swiper-button-prev',
		},

		breakpoints: {
			576: {
				slidesPerView: '2',
			},
			
			992: {
				slidesPerView: '3',
			},
			1200: {
				slidesPerView: '4',
			},

		}
	});

	const swiper14 = new Swiper('.canvas-block__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		effect: 'fade',
		navigation: {
			nextEl: '.canvas-block__slider--js .swiper-button-next',
			prevEl: '.canvas-block__slider--js .swiper-button-prev',
		},

	});

	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated',
	});
	wow.init();


	let dropdownToggle = document.querySelectorAll(".dropdown-toggle-js");
	if (dropdownToggle) {
		dropdownToggle.forEach(function (el) {
			el.addEventListener('click', function() {
				this.classList.toggle('active');
				let next = this.nextElementSibling;
				next.classList.toggle('active');
			})
		})
	}

	// табы на радиокнопках
	$('input[data-tab-radio]').change(function () {
		var th = $(this),
			tabRadio = th.data('tab-radio');
		$('.' + tabRadio).fadeIn(100).addClass("active")
			.siblings('.tab-radio-content').removeClass('active').hide();
	})

	//  если радио таб выбран показать блок
	$('input[data-tab-radio]').each(function () {
		var th = $(this),
			tabRadio = th.data('tab-radio');
		if (th.is(":checked")) {

			$('.' + tabRadio).fadeIn(100).addClass("active")
				.siblings('.tab-radio-content').removeClass('active').hide();
		}
	})
	//  $(".tab-radio-content-close").click(function(){
	// 	 var thpar = $(this).parents('.tab-radio-content'),
	// 			thtab = thpar.attr('id');

	// 			thpar.fadeOut(100).removeClass("active");
	// 			$('[data-tab-rad='+thtab+']').prop('checked', false);
	//  })
	// /табы на радиокнопках
	$(document).on('click', '[href="#modal-content"]', function () {
		$('#modal-content .modal-inner').html($(this).next().html());
	});


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

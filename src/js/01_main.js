window.onload = () => {
	const isMobile = document.documentElement.clientWidth < 768;

	/** Hero menu */
	const sliderMenuWrapper = document.querySelector('.slider__menu')
	const sliderMenuButtons = document.querySelectorAll('.slider-menu__elem');
	const sliderSlidesWrapper = document.querySelector('.slider__slides');
	const slides = document.querySelectorAll('.slider__slide');
	const sliderArticle = document.querySelector('.slider-menu__article');
	const firstRow = document.querySelector('.hero__first-row');

	function mobileHiddenMenuButtons(){
		sliderMenuButtons.forEach((button) => {
			button.classList.add('slider-menu__elem_invisible');
			button.classList.remove('slider-menu__elem_active');
		})
		sliderArticle.classList.add('slider-menu__article_invisible');
	}

	let activeSlide = null;

	if(!isMobile){
		slides[0].classList.add('slider-slide_active');
		sliderMenuButtons[0].classList.add('slider-menu__elem_active');
		sliderMenuButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				let slideNumber = button.getAttribute('data-target');
				sliderSlidesWrapper.querySelector('.slider-slide_active').classList.remove('slider-slide_active');
				slides[slideNumber - 1].classList.add('slider-slide_active');
				sliderMenuWrapper.querySelector('.slider-menu__elem_active').classList.remove('slider-menu__elem_active');
				button.classList.add('slider-menu__elem_active');
			})
		})
	}
	else{
		

		sliderMenuButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				if(event.target.classList.contains('slider-menu__close')){
					return;
				}
				let slideNumber = button.getAttribute('data-target');

				if(activeSlide != null){
					sliderSlidesWrapper.querySelector('.slider-slide_active').classList.remove('slider-slide_active');
					activeSlide = null;
				}

				slides[slideNumber - 1].classList.add('slider-slide_active');
				activeSlide = slides[slideNumber - 1];

				mobileHiddenMenuButtons();
				button.classList.add('slider-menu__elem_active');
				button.classList.remove('slider-menu__elem_invisible');

				button.querySelector('.slider-menu__close').classList.remove('slider-menu__close_hidden');

				firstRow.classList.add('hero__first-row_hidden');
				
			})
		})

		const closeMenuButtons = sliderMenuWrapper.querySelectorAll('.slider-menu__close');
		closeMenuButtons.forEach((closeButton) => {
			closeButton.addEventListener('click', (event) => {
				sliderMenuButtons.forEach((button) => {
					button.classList.remove('slider-menu__elem_invisible');
					button.classList.remove('slider-menu__elem_active');
				})
				sliderArticle.classList.remove('slider-menu__article_invisible');
				if(activeSlide != null){
					sliderSlidesWrapper.querySelector('.slider-slide_active').classList.remove('slider-slide_active');
					activeSlide = null;
				}
				closeButton.classList.add('slider-menu__close_hidden');
				firstRow.classList.remove('hero__first-row_hidden');
			})
		})
	}





		

	/* Header menu */
	const burgerButton = document.querySelector('.burger-button').parentElement;
	const headerMenu = document.querySelector('.menu');
	burgerButton.addEventListener('click', (event) => {
		headerMenu.classList.toggle('menu_active');
		burgerButton.querySelector('.burger-button').classList.toggle('burger-button_active');
	})

	const headerMenuButtons = document.querySelectorAll('.menu-elem__header');
	
	headerMenuButtons.forEach((button) => {
			
		button.addEventListener('click', (event) => {
				headerMenu.querySelector('.menu-elem_active').classList.remove('menu-elem_active');
				button.parentElement.classList.add('menu-elem_active');
		})
	});

	function changeNumber(swiper){
		const numbers = swiper.el.previousElementSibling.querySelectorAll('.numbering__elem');
		swiper.el.previousElementSibling.querySelector('.numbering__elem_active').classList.remove('numbering__elem_active');
		numbers[swiper.activeIndex].classList.add('numbering__elem_active');
	}

	const swiper = new Swiper('.swiper', {
		// Optional parameters
		
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},
	
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	
		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		}
	});
	swiper.on('slideChange', (swiper) => {
		changeNumber(swiper);
	});


	document.querySelector('.preloader').classList.add('preloader_hidden');
}
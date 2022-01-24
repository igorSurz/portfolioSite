
$(document).ready(function(){
		$('.carousel__inner').slick({
				speed: 1200,
				// adaptiveHeight: true,
				prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
				responsive: [
						{
								breakpoint: 992,
								settings: {
									dots: true,
									arrows: false
								}
						},
				]
			});

			$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
				$(this)
					.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
					.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
			});
			
			function toggleSlide(item) {
				$(item).each(function(i){
					$(this).on('click', function(e) {
						e.preventDefault();
						$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
						$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
					})
				});
			};

			toggleSlide('.catalog-item__link');
			toggleSlide('.catalog-item__back');

			//Modal 

			$('[data-modal=consultation]').on('click', function(){
				$('.overlay, #consultation').fadeIn('slow');
			});
			$('.modal__close').on('click',function() {
				$('.overlay, #consultation, #thanks, #order').fadeOut('slow')
			});
		 

			$('.button_mini').each(function(i) {
				$(this).on('click',function() {
					$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
					$('.overlay, #order').fadeIn('slow');
				})
			});     

			function valideForms(form){
				$(form).validate({
					rules: {
						name: "required",
						phone: "required",
						email: {
							required: true,
							email: true
						} 
					},
					messages: {
						name: "Please pay attention",
						email: {
							required: "We need your email address to contact you",
							email: "Your email address must be in the format of name@mashegu.co.il"
						}
					}
				});
			};

			valideForms('#consultation-form');
			valideForms('#consultation form');
			valideForms('#order form');

			$('input[name=phone]').mask("+999(99) 999-99-99");

			$('form').submit(function(e){
				e.preventDefault();
				$.ajax({
					type: "POST",
					url: "mailer/smart.php",
					data: $(this).serialize()
				}).done(function() {
						$(this).find("input").val("");
						$('#consultation, #order').fadeOut();
						$('.overlay, #thanks').fadeIn('slow');

						$('form').trigger('reset');

				}); 
				return false;
			});

			//smooth scroll and page up
			$(window).scroll(function(){
				if ($(this).scrollTop() > 1000) {
					$('.pageup').fadeIn('slow');
				} else {
					$('.pageup').fadeOut('slow');
				}
			});

			$("a[href=#up]").click(function(){
				const _href = $(this).attr("href");
				$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
				return false;
			});

			new WOW().init();
	 });
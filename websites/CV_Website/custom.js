$("document").ready(function($){
	 $(".scroll-top").click(function() {
        $("html, body").animate({ 
            scrollTop: 0 
        }, "slow");
        return false;
    });
    var nav = $('.header_section');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            nav.addClass("Sticky-nav");
             $("#hide").addClass("bottom_button");
        } else {
            nav.removeClass("Sticky-nav");
             $("#hide").removeClass("bottom_button");
        }

  //      var scrollDistance = $(window).scrollTop();

		// $('.page-section').each(function(i) {
		// 		if ($(this).position().top <= scrollDistance) {
		// 				$('.navbar-nav .nav-link').removeClass('active');
		// 				$('.navbar-nav .nav-link').eq(i).addClass('active');
		// 		}
		// });


    });

    $('.navbar-nav .nav-link').click(function(){
    $('.navbar-nav .nav-link').removeClass('active');
    $(this).addClass('active');

    
});


    $(".filter-button").click(function () {
    	 var value = $(this).attr('data-filter');

    	 if(value == "all"){
    	 	$(".all").show('1000');
    	 }
    	  else
        {
            $(".all").not('.'+value).hide('3000');
            $('.all').filter('.'+value).show('3000');
            
        }
        if ($(".filter-button").removeClass("active")) {
			$(this).removeClass("active");
			}
			$(this).addClass("active");
			    })

    function testimonials_slider() {
		if ($('.testi_slider').length) {
			$('.testi_slider').owlCarousel({
				loop: true,
				margin: 30,
				items: 2,
				autoplay: true,
				smartSpeed: 2500,
				dots: true,
				responsiveClass: true,
				responsive: {
					0: {
						items: 1
					},
					991: {
						items: 2
					}
				}
			});
		}
	}
	testimonials_slider();

});
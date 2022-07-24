$(document).ready(function(){
      $('.card').on('show.bs.collapse', function () {
         $(this).addClass('active1').removeClass('tex_col');
        
    });

    $('.card').on('hide.bs.collapse', function () {
         $(this).removeClass('active1').addClass('tex_col');
    });
     $("#news-slider2").owlCarousel({
        items:3,
        itemsDesktop:[1199,2],
        itemsDesktopSmall:[980,2],
        itemsMobile:[600,1],
        pagination:false,
        navigationText:false,
        autoPlay:true
    });
    });


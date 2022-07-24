

 $(function(){
  new WOW().init();

 /*-----------------------------------
     * STICKY MENU - HEADER
     *-----------------------------------*/

var $navmenu = $('.nav-menu');
     var $nav=$('.nav-link');
     
    $(window).on('scroll', function() {
        if ($navmenu.hasClass('not-sticky')) {
            return false;
        }
        if ($(window).scrollTop() > 0) {
//            $navmenu.addClass('sticky-top');
          $nav.addClass('color change');
           
        } else {
//            $navmenu.removeClass("sticky-top");
            $nav.removeClass('color change');
          
        }
    });
    // $(window).on('scroll', function() {
       
    //     if ($(window).scrollTop() >0) {
        
    //  $(".nav-menu").addClass("scroll");
          
           
    //     } 
        
        
    // });


 
 })
 

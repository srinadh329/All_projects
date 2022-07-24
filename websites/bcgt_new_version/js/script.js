   wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();

    document.getElementById("year").innerHTML = new Date().getFullYear();
  //   $("ul li").on("click", function() {
  //   $("li").removeClass("active");
  //   $(this).addClass("active");
  // });


// $(window).scroll(function() {
//     var windscroll = $(window).scrollTop();
//     if (windscroll >= 500) {
//         $('.wrapper section').each(function(i) {
//             if ($(this).position().top <= windscroll - 200) {
//                 $('ul li.active').removeClass('active');
//                 $('ul li').eq(i).addClass('active');
//             }
//         });

//     } else {

//         $('ul li.active').removeClass('active');
//         $('ul li:first').addClass('active');
//     }

// }).scroll();

$(document).ready(function($){
    setTimeout(function(){
        $('.trans--grow').addClass('grow');
    }, 275);
});
var $navmenu = $('.nav-menu');
     var $nav=$('.nav-link');
     // var $navbarTogglerIcon=$('.navbar-toggler-icon');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
           $navmenu.addClass('sticky-top');
           $nav.addClass('text-color');
           // $navbarTogglerIcon.addClass('togglebar');
           $(".navbar .navbar-brand img").attr("src","images/home-logo.svg");
        } else {
           $navmenu.removeClass("sticky-top");
          $nav.removeClass('text-color');
           // $navbarTogglerIcon.removeClass('togglebar');
           $(".navbar .navbar-brand img").attr("src","images/logo.png");
        }
   

 
 })

var $service =$('.service-sticky');
$(window).on('scroll', function(){
  if ($(window).scrollTop() >100) {
     var data=window.innerWidth;
      if(data>750){
        $service.addClass('service-add-sticky');
      }
    

  }
 //  else if($(window).scrollTop() >10)
 //  {
 // if($("#banking-section" ).is('.test') )
 //    $("#banking-section").removeClass('test')
 //  }
  else{
    $service.removeClass('service-add-sticky');
   
  }
})

$(document).ready(function(){
  $("#banking").click(function(){
    $("#healthcare ,#supply-section,#ewallet,#port,#agricultural,#customer,#energy,#artificial").removeClass('service_active');
    $("#banking").addClass('service_active');
     $("html, body").animate({
        scrollTop: 300
    },);
  });
   $("#healthcare").click(function(){
   $("#banking ,#supply-section,#ewallet,#port,#agricultural,#customer,#energy,#artificial").removeClass('service_active');
     $("#healthcare").addClass('service_active');
     $("html, body").animate({
        scrollTop: 860
    },);
  });
   $("#supply-section").click(function(){
     $("#banking ,#healthcare,#ewallet,#port,#agricultural,#customer,#energy,#artificial").removeClass('service_active');
    $("#supply-section").addClass('service_active');
     $("html, body").animate({
        scrollTop: 1500
    },);
  });
    $("#ewallet").click(function(){
      $("#banking ,#healthcare,#supply-section,#port,#agricultural,#customer,#energy,#artificial").removeClass('service_active');
      $("#ewallet").addClass('service_active');
     $("html, body").animate({
        scrollTop: 2030
    },);
  });
     $("#port").click(function(){
      $("#banking ,#healthcare,#supply-section,#ewallet,#agricultural,#customer,#energy,#artificial").removeClass('service_active');
      $("#port").addClass('service_active');
     $("html, body").animate({
        scrollTop: 2600
    },);
  });
       $("#agricultural").click(function(){
        $("#banking ,#healthcare,#supply-section,#ewallet,#port,#customer,#energy,#artificial").removeClass('service_active');
        $("#agricultural").addClass('service_active');
     $("html, body").animate({
        scrollTop: 3220
    },);
  });
    $("#customer").click(function(){
       $("#banking ,#healthcare,#supply-section,#ewallet,#port,#agricultural,#energy,#artificial").removeClass('service_active');
      $("#customer").addClass('service_active');
     $("html, body").animate({
        scrollTop: 3800
    },);
  });
     $("#energy").click(function(){
       $("#banking ,#healthcare,#supply-section,#ewallet,#port,#agricultural,#customer,#artificial").removeClass('service_active');
      $("#energy").addClass('service_active');
     $("html, body").animate({
        scrollTop: 4400
    },);
  });
    $("#artificial").click(function(){
      $("#banking ,#healthcare,#supply-section,#ewallet,#port,#agricultural,#customer,#energy").removeClass('service_active');
      $("#artificial").addClass('service_active');
     $("html, body").animate({
        scrollTop: 5000
    },);
  });
})

$(window).on('load', function () {
      var data=window.innerWidth;
      if(data<=750){
         $service.removeClass('service-add-sticky');
      }
 });

// $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
// $(window).on('load', function(){
//   setTimeout(removeLoader, 2000); 
// });
// function removeLoader(){
//     $( "#loadingDiv" ).fadeOut(500, function() {
//       $( "#loadingDiv" ).remove();
//   });  
// }
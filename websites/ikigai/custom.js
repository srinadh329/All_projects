$("document").ready(function($){
    new WOW().init();
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
             $("#topheader").addClass("topheader-add");
              $(".navbar .navbar-brand img").attr("src","images/footer_image.png");
        } else {
            nav.removeClass("Sticky-nav");
             $("#hide").removeClass("bottom_button");
              $("#topheader").removeClass("topheader-add");
               $(".navbar .navbar-brand img").attr("src","images/logo.png");
        }
    });
    $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

//     $('.navbar-nav .nav-link').click(function(){
//     $('.navbar-nav .nav-link').removeClass('active');
//     $(this).addClass('active');

// });

// Cache selectors
var lastId,
    topMenu = $("#menu-center"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

// window.onload = function(){  

//     var url = document.location.toString();
//     if (url.match('#')) {
//         $('.nav-fill a[href="#' + url.split('#')[1] + '"]').tab('show');
//     }

//     //Change hash for page-reload
//     $('.nav-fill a[href="#' + url.split('#')[1] + '"]').on('shown', function (e) {
//         window.location.hash = e.target.hash;
//     }); 
// } 
 document.getElementById("year").innerHTML = new Date().getFullYear();
});

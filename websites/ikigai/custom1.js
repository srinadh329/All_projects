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
             $("#topheader").addClass("topheader-add");
              $(".navbar .navbar-brand img").attr("src","images/footer_image.png");
        } else {
            nav.removeClass("Sticky-nav");
             $("#hide").removeClass("bottom_button");
              $("#topheader").removeClass("topheader-add");
               $(".navbar .navbar-brand img").attr("src","images/logo.png");
        }
    });
    
    window.onload = function(){  

    var url = document.location.toString();
    if (url.match('#')) {
        $('.nav-fill a[href="#' + url.split('#')[1] + '"]').tab('show');
    }

    //Change hash for page-reload
    $('.nav-fill a[href="#' + url.split('#')[1] + '"]').on('shown', function (e) {
        window.location.hash = e.target.hash;
    }); 
} 

//     $('.navbar-nav .nav-link').click(function(){
//     $('.navbar-nav .nav-link').removeClass('active');
//     $(this).addClass('active');

// });
document.getElementById("year").innerHTML = new Date().getFullYear();
});

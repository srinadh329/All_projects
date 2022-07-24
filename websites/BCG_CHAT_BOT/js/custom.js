

 $(function(){
  new WOW().init();
 /*-----------------------------------
     * STICKY MENU - HEADER
     *-----------------------------------*/

     document.getElementById("year").innerHTML = new Date().getFullYear();

        $('a[class*="read_more"]').each(function () {
            var particles = new Particles(this);
            this.onclick = function (e) {
                e.preventDefault()
                var el = this, $el = $(el);
                var color = el.dataset.color || false;
                if (!color) {
                    color = $el.hasClass('module-particles') ? '#3d00b4' : '#0095d7';
                }
                particles.disintegrate({
                    complete: function () {
                        location.href = el.href;
                    },
                    color: color
                });

            }

        })

 
 })


$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});

 $(document).ready(function(){
      $('.carousel').carousel();
    });

 
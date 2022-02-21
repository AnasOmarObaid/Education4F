

$(document).ready(function(){
   

    // owl setup

    $('.owl-carousel').owlCarousel({
        center: true,
        loop:true,
        margin:30,
        nav:false,
        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:6
            }
        }
    });
});
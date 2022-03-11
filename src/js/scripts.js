jQuery(document).ready(function ($) {

    "use strict";

    // owl setup
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });

    // NProgress
    $('body').show();
	NProgress.start();
});

$(window).on('load', function () {
    setTimeout(function() { NProgress.done()}, 2000);
});
 
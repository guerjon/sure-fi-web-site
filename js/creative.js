(function($) {
  "use strict"; // Start of use strict

 var owl = $(".owl-carousel").owlCarousel(
      {
        nav : true,
        navText: ['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],
        autoplay : false,
        autoplayTimeout:3000,
        autoplaySpeed: 200,
        loop: true,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:3, 
            },
            992:{
                items:6,
            }
        }
      });

  $('#back-button').click(function() {
      owl.trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('#front-button').click(function() {
      // With optional speed parameter
      // Parameters has to be in square bracket '[]'
      owl.trigger('prev.owl.carousel', [300]);
  })

})(jQuery); // End of use strict

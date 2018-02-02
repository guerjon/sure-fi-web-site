(function($) {
  "use strict"; // Start of use strict

 



  // Scroll reveal calls
  var sr_icons = {
    duration: 600,
    scale: 0.3,
    distance: '0px'    
  }

  window.sr = ScrollReveal();
  sr.reveal('.sr-icons',sr_icons,200);
  sr.reveal('.sr-icons-2',sr_icons,200);
  sr.reveal('.sr-icons-3',sr_icons,200);
  sr.reveal('.sr-icons-4',sr_icons,200);

  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  sr.reveal('.show-on-scroll',{
    origin: 'right',
    distance: '0px',
    duration: 500,
    mobile: true
  })

  sr.reveal('.bunker-busting-animation',{
    duration: 1200,
    scale: 0.3,
    distance: '0px'
  },200)


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

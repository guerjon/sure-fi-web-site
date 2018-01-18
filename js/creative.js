(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

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
    distance: '800px',
    duration: 500,
    mobile: true
  })

  sr.reveal('.bunker-busting-animation',{
    duration: 1200,
    scale: 0.3,
    distance: '0px'
  },200)


  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });


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

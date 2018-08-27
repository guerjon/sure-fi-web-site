function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


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

  var item_1 = '<a href="http://www.southwestautomated.com/"><img src="images/southwest_automated.png" class="img-fluid" id="southwest_automated"></a>'
  var item_2 = '<a href="https://jamiesonfence.com/"><img src="images/jamieson_fence.png" class="img-fluid" id="jamieson_fence" ></a>'
  var item_3 = '<a href="https://www.controlledproducts.com/" ><img src="images/controlled_product_systems.png" class="img-fluid"></a>'
  var items_array = [item_1,item_2,item_3]
  var shuffle_array = shuffle(items_array)
  

  $("#southwest_automated_container").append(shuffle_array[0]);
  $("#jamieson_fence_container").append(shuffle_array[1]);
  $("#controller_product_systems_container").append(shuffle_array[2])

  // Scroll reveal calls
  var sr_icons = {
    duration: 600,
    scale: 0.3,
    distance: '0px'    
  }
  try{
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


    sr.reveal('.show-on-scroll', {
      duration: 600,
      scale: 0.3,
      distance: '0px'
    }, 300);

    sr.reveal('.bunker-busting-animation',{
      duration: 1200,
      scale: 0.3,
      distance: '0px'
    },200)
  }catch(e){
    console.log("e on creative js",e)
  }
  var myArray = [0, 1, 2];   
  var rand = myArray[Math.floor(Math.random() * myArray.length)];


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


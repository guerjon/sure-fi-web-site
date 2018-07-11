(function($) {
  "use strict"; // Start of use strict

    $(".dropdown-toggle-products").click(function(event) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if(width > 992){ // the nav bar is shrunken
        let location_array = window.location.pathname.split("/")
      
        location_array[location_array.length - 1] = "products.html"
        const result = location_array.reduce((acomulator,current_value) => acomulator + "/" + current_value )
        console.log("result")
        window.location = result
      }

  })

})(jQuery); // End of use strict  
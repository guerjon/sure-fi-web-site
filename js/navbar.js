function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


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

  $(".black-logo-background").click(function(event){ 
    event.preventDefault();
    
    const url = $(this).attr("href") 

    var xhr = createCORSRequest('GET',url);
    if (!xhr) {
      throw new Error('CORS not supported');
    }

    xhr.onload = function() {
     var responseText = xhr.responseText;
     console.log(responseText);
     // process the response.
    };

    xhr.onerror = function() {
      console.log('There was an error!');
    };

    xhr.send();

  })


})(jQuery); // End of use strict  
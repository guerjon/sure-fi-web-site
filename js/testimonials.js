/*(function($) {
    var origAppend = $.fn.append;

    $.fn.append = function () {
        return origAppend.apply(this, arguments).trigger("append");
    };
})(jQuery);
*/

$(function() {
    
	var container = $('.testimonials-carouse');
	var testimonials = ["string 1", "string 2", "string 3"];
	var testimonials_objects = []

	for(let i = testimonials.length; i--;){
		container.append(
			"<div>" +
                "<div class='testimonials-carouse-item'>" + 
                    "<div class='testimonials-image-container'>" +
                       	"<div class='testimonials-image-item'>" +
                            "<img src='images/Long.png' class='img-responsive-header'/>" +
                        "</div>" +
                    "</div>" +
                    "<div class='testimonials-text'>" +
                        "<p>" + 
                           	"Sure-Fi is Awesome, Incredible, Fabulous, Astonishing, Astounding, Breathtaking, Fantastic but over all is Sure." +
                        "</p>" +
                    "</div>" +
                    "<div class='testimonial-people'>" +
                        "<h6>" +
                        	"- Sure-Fi Lover" +
                        "</h6>" +
                    "</div>" +
                "</div>" +
            "</div>" 
		);
	}
	container.slick({
	    autoplay: false,
	    autoplaySpeed: 4000,
	    arrows:false,
	    dots:true
	}); 
	
});



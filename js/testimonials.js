/*(function($) {
    var origAppend = $.fn.append;

    $.fn.append = function () {
        return origAppend.apply(this, arguments).trigger("append");
    };
})(jQuery);
*/


function getTestimionals(type){
    let data = {
        method : "POST",
        headers :{
        'Accept': 'application/json',
        'Content-Type': 'application/json',             
        },
        body : JSON.stringify({
            type : type
        })
    }
    fetch("http://admin.sure-fi.com/api/get_testimonials",data)
    .then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error)
    })
}

$(function() {
    'use strict';
	var container = $('.testimonials-carouse');
	var testimonials = ["string 1", "string 2", "string 3"];
	var testimonials_objects = []
    getTestimionals();
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



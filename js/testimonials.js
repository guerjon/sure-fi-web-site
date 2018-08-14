const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://admin.sure-fi.com/api/get_testimonials";
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
    fetch(proxyurl + url ,data)
    .then(response => response.text())
    .then(contents =>  {
        let results = JSON.parse(contents)
        console.log(results)
        if(results.status == "success"){
            let testimonials = results.data;
            appendTestimonials(testimonials)
        }else{
            $('#testimonials-section').hide()
        }

    }).catch(error => {
        console.error(error)
    })
}

    function appendTestimonials(testimonials){
        var container = $('.testimonials-carouse');

        for(let i = testimonials.length; i--;){
            const testimonial =  testimonials[i]

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
                                testimonial.testimonial_text +
                            "</p>" +
                        "</div>" +
                        "<div class='testimonial-people'>" +
                            "<h6>" +
                                testimonial.testimonial_name +
                            "</h6>" +
                        "</div>" +
                    "</div>" +
                "</div>" 
            );
        }

        startSlick(container);
    }

    function startSlick(container){
        container.slick({
            autoplay: false,
            autoplaySpeed: 4000,
            arrows:false,
            dots:true
        }); 
    }

$(function() {
    'use strict';

    const testimonials = getTestimionals();

	
});



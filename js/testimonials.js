const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://admin.sure-fi.com/api/get_testimonials";
const object_types = {
    "WIEGAND" : 4,
    "HVAC" : 7,
    "RELAY" : 9,
    "MODULE": 0,
    "ALL": 9000
}

function getTestimionals(type){
    let data = {
        method : "POST",
        headers :{
        'Accept': 'application/json',
        },
        body : JSON.stringify({
            type : type
        })
    }
    
    fetch(url ,data)
    .then(response => response.text())
    .then(contents =>  {
        let results = JSON.parse(contents) 
        console.log("results");   
        if(results.status == "success"){
            let testimonials = results.data;

            testimonials = filterTestimonials(testimonials,type)
            if(testimonials.length > 0){
                $('#testimonials-section').show()    
                appendTestimonials(testimonials);    
            }
            
        }else{
            $('#testimonials-section').hide()
        }

    }).catch(error => {
        console.error(error)
    })
}

function filterTestimonials(testimonials,type){
    let new_testimonias = [];
    for(let i = testimonials.length; i--;){
        
        const testimonial = testimonials[i];
        const testimonial_type = testimonial.testimonial_product
        const object_type =  object_types[type]
        
        if(object_type != null){
            if(object_type == 9000)
                return testimonials

            if(testimonial_type == object_type)
                new_testimonias.push(testimonial);
        }
    }

    return new_testimonias
}

function appendTestimonials(testimonials){
    var container = $('.testimonials-carouse');
    /*
                    "<div class='testimonials-image-container'>" +
                        "<div class='testimonials-image-item'>" +
                            "<img src='images/Long.png' class='img-responsive-header'/>" +
                        "</div>" +
                    "</div>" +
    */
    
    for(let i = testimonials.length; i--;){
        const testimonial =  testimonials[i]
        const company = testimonial.testimonial_company.toUpperCase()

        container.append(
            "<div>" +
                "<div class='testimonials-carouse-item'>" + 
                    
                    "<div class='testimonials-text'>" +
                        "<p>" + 
                            testimonial.testimonial_text +
                        "</p>" +
                    "</div>" +
                    "<div class='testimonial-people'>" +
                        "<h6>" +
                            testimonial.testimonial_name + "<br> " + company  +
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
        autoplay: true,
        autoplaySpeed: 4000,
        arrows:false,
        dots:true
    }); 
}

$(function() {
    'use strict';
    var type = $('.testimonials-carouse').attr("type");    
    const testimonials = getTestimionals(type);
});
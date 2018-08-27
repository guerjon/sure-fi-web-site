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


function orderList(list){
    
    if(list.length == 2){

    }else{
        const list_half = Math.round(list.length / 2);
        const first_part = list.slice(0,list_half)
        const second_part = list.slice(list_half,list.length)
    }

}

$(function() {
    'use strict';
    var type = $('.testimonials-carouse').attr("type");    
    const testimonials = getTestimionals(type);
    const list = [1,3,5,2,4,6,8];

});
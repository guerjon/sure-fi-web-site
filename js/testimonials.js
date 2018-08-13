$(function(){
	var elements = $('.testimonials-carouse')
	if(elements){
		if(typeof elements.slick === 'function'){
		  elements.slick({
		    autoplay: false,
		    autoplaySpeed: 4000,
		    arrows:false,
		    dots:true
		  });          
		}
	}
})
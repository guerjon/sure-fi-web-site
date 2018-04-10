
var myArray = [0, 1, 2,3,4];   
var rand = myArray[Math.floor(Math.random() * myArray.length)];

$(document).ready(function(){
  $('.vertical-carousel').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToMove: 1,
    arrows: false,
    initialSlide : rand,
    respondTo: 'slider'
  });
});



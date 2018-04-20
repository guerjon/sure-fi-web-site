var doc = window.document,
  context = doc.querySelector('.js-loop'),
  clones = context.querySelectorAll('.is-clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  flag = true,
  didScroll = false,
  i = 0;
var myArray = [0, 250, 500,750];   
var rand = myArray[Math.floor(Math.random() * myArray.length)];

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}


function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(rand); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate () {
  console.log("scrollUpdate")
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
      logic = 0
    }, 300);
  }
}

function goToTheTop(){
  console.log("work")
  $("#go-to-the-top-button").hide()
  requestAnimationFrame(function (){
    setScrollPos(0)
    scrollPos = 0
  })
}


function getClonesHeight () {
  clonesHeight = 0;
  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }
  return clonesHeight;
}

function init(){
  var os = getMobileOperatingSystem()
  if(os == "iOS")  {
    handleIOS()
  }else{
    window.requestAnimationFrame(reCalc);
    handleAndroid()
  }
}
function handleIOS(){
  console.log("handleIOS()")
  $("#android-and-web-section").hide()

  window.requestAnimationFrame(function(){
    setScrollPos(rand); // Scroll 1 pixel to allow upwards scrolling
  })

  scrollPos = rand;

  if(scrollPos > 250){
    $("#go-to-the-top-button").show()
  }else{
    $("#go-to-the-top-button").hide()
  }

  context.addEventListener('scroll', function (pos) {    
    console.log("scrollPos",scrollPos)
    scrollPos = rand + getScrollPos();
    if(scrollPos > 250){
      $("#go-to-the-top-button").show()
    }else{
      $("#go-to-the-top-button").hide()
    }
  })
}

function getElements(){
  var elements = $(".no-clone")
  var clone_elements = []
  for (var i = elements.length - 1; i >= 0; i--) {
    var element = elements[i].cloneNode(true)
    clone_elements.push(element)
  }
  return clone_elements
}

function handleAndroid(){
    $("#ios-section").hide()
    context.addEventListener('scroll', function (pos) {  
      window.requestAnimationFrame(scrollUpdate);  
    }, false);        
}



// Just for this demo: Center the middle block on page load
window.onload = function () {
  $("#go-to-the-top-button").hide()
  init()

};
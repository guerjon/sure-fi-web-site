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
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
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



function scrollIOSUpdate(){
  console.log("scrollIOSUpdate",scrollPos,scrollHeight)
  if(flag){
    flag = false
    scrollPos = getScrollPos();

    if (scrollPos > scrollHeight -100) {
      //var elements = getElements()
      if(scrollPos != 0){
        setScrollPos(0)  
      }
      
      flag = true
     /* for(var i = elements.length; i >= 0; i--){
          var element = elements[i]
          context.appendChild(element)
      }**/

    } else if (scrollPos <= 0) {
      flag = true
      setScrollPos(scrollHeight - clonesHeight);
    }else{
      flag =true
    }
  }
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
  var clonesHeight = getClonesHeight()
  deleteClones()
  scrollHeight = context.scrollHeight - clonesHeight;

  context.addEventListener('scroll', function (pos) {    
    window.requestAnimationFrame(scrollIOSUpdate)
  })
}

function deleteClones(){
  $('.is-clone').remove()
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
    context.addEventListener('scroll', function (pos) {  
      window.requestAnimationFrame(scrollUpdate);  
    }, false);        
}



// Just for this demo: Center the middle block on page load
window.onload = function () {
  init()
};
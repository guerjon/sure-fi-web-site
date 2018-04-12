var doc = window.document,
  context = doc.querySelector('.js-loop'),
  childs = []
  clone_childs = []
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  useless_variable = 0,
  i = 0;

var myArray = [0, 1, 2,3,4];   
var rand = myArray[Math.floor(Math.random() * myArray.length)];

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

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
  
  console.log("scrollPos",scrollPos)
  console.log("scrollHeight",scrollHeight)


  if (scrollPos <= 0) {
    setScrollPos(rand); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate () {
  
  if (!disableScroll) {
    scrollPos = getScrollPos();
    console.log("scrollPos",scrollPos)
    console.log("scrollHeight",scrollHeight)
    if ((scrollPos + rand) >= scrollHeight) {
      setScrollPos(rand);
      disableScroll = true;
    } else if (scrollPos <= 0) {
      
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

//window.requestAnimationFrame(reCalc);

/*context.addEventListener('scroll', function () {
  if(getMobileOperatingSystem() == "Android"){
    window.requestAnimationFrame(scrollUpdate);  
  }
}, false);
*/

function getElements(){
  var elements = $(".company-image-movil-container")
  var clone_elements = []
  for (var i = elements.length - 1; i >= 0; i--) {
    var element = elements[i].cloneNode(true)
    clone_elements.push(element)
  }
  return clone_elements
}

function removeChilds(){
  while(context.firstChild){
    context.removeChild(context.firstChild)
  }
}

function selectNewFirstChild(){
  var myArray = [0, 1, 2,3,4];   
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  
  clone_childs[rand]
}

// Just for this demo: Center the middle block on page load
window.onload = function () {
  clone_childs = getElements()
  removeChilds()

};
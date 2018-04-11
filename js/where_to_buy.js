var doc = window.document,
  context = doc.querySelector('.js-loop'),
  clones = context.querySelectorAll('.is-clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  keys = {37: 1, 38: 1, 39: 1, 40: 1},
  i = 0;
  

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScrollFunction() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScrollFunction() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}


function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getClonesHeight () {
  clonesHeight = 0;

  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  console.log("scrollPos",scrollPos)
  console.log("scrollHeight",scrollHeight)
  console.log("clonesHeight",clonesHeight)

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}


function scrollUpdate () {  
  if (!disableScroll) {
    scrollPos = getScrollPos();
    console.log("scrollPos",scrollPos)
    if (clonesHeight + scrollPos >= scrollHeight) {
    //if(scrollPos == 1239){
      setScrollPos(1); 
      disableScroll = true;
      disableScrollFunction()
    } else if (scrollPos <= 0) {
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
      disableScrollFunction()
    }
  }

  if (disableScroll) {
    window.setTimeout(function () {
      enableScrollFunction()
      disableScroll = false;
    }, 40);
  }
}


window.requestAnimationFrame(reCalc);

context.addEventListener('scroll', function () {
  
  window.requestAnimationFrame(scrollUpdate);

}, false);

// Just for this demo: Center the middle block on page load
window.onload = function () {

};
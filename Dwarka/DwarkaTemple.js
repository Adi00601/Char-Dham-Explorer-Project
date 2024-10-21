gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", function () {
  const slides = gsap.utils.toArray(".slide06");
  const activeSlideImages = gsap.utils.toArray(".active-slide img");

  function getInitialTranslateZ(slide) {
    const style = window.getComputedStyle(slide);
    const matrix = style.transform.match(/matrix3d\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      return parseFloat(values[14]) || 0;
    }
    return 0;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  slides.forEach((slide, index) => {
    const initialZ = getInitialTranslateZ(slide);

    ScrollTrigger.create({
      trigger: ".container06",
      start: "-=45%",
      end: "+=600%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const zIncrement = progress * 22500;
        const currentZ = initialZ + zIncrement;

        let opacity;

        if (currentZ >= -2500) {
          opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
        } else {
          opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
        }

        slide.style.opacity = opacity;

        slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

        if (currentZ < 100) {
          gsap.to(activeSlideImages[index], 1.5, {
            opacity: 1,
            ease: "power3.out",
          });
        } else {
          gsap.to(activeSlideImages[index], 1.5, {
            opacity: 0,
            ease: "power3.out",
          });
        }
      },
    });
  });
});



//slideshow code

let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})

// End of slideshow code 



const gallery = document.getElementById("gallery");

window.onmousemove = e => {
  const mouseX = e.clientX,
        mouseY = e.clientY;
  
  const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;
  
  const maxX = gallery.offsetWidth - window.innerWidth,
        maxY = gallery.offsetHeight - window.innerHeight;
  
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
  gallery.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })
}



const text = document.getElementById('h11');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  text.style.left = mouseX + 'px';
  text.style.top = mouseY + 'px';
});


let circle = new CircleType(document.getElementById('Circle-Txt'));
circle.raduis(360);








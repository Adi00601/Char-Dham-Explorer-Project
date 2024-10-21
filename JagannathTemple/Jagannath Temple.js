Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });


  // Animation 

gsap.to(" .lefttxt ", {
    scrollTrigger:{
        trigger: "#main1",
        pin:true,
        start: "top , top ",
        end: " bottom, bottom",
        endTrigger:".last",
        scrub : 1 
    },
    y: "-200%",
    ease: Power1
})





let sections = document.querySelectorAll(".lefttxt");
Shery.imageEffect(".images", {
  style: 5,
  config: { onMouse: { value: 1 } },
  slideStyle: (setScroll) => {
    sections.forEach(function (section, index) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        scrub: 1,
        onUpdate: function (prog) {
          setScroll(prog.progress + index);
        },
      });
    });
  },
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


// Design Based on this site https://grege-interieurs.com/
//========================================================================
//========================== VARIABLES ===================================
//========================================================================

const banner = document.querySelector(".banner");
const bannerImages = [...document.querySelectorAll(".banner__img")];
const bannerImageText = [...document.querySelectorAll(".banner__img-name > *")];
const bannerImageTextNumber = [
  ...document.querySelectorAll(".banner__img-number > *")
];
const magnetCursor = document.querySelector(".scroll");

let currentImageIndex = bannerImages.length - 1;
let wheelIndex = 0;
let reverse = false;

//========================================================================
//========================== MAIN CONTENT ================================
//========================================================================

const throwImage = () => {
  const animationDuration = 600;
  reverse ? currentImageIndex++ : currentImageIndex--;

  // at init - this is the last img in the array
  const firedImage = bannerImages.splice(
    reverse ? 0 : bannerImages.length - 1,
    1
  )[0]; // popping out last img

  if (bannerImages.length) {
    reverse ? bannerImages.push(firedImage) : bannerImages.unshift(firedImage);
  }

  handleTranslation(firedImage);

  // changing the z-index of all images right after throwing
  setTimeout(() => handleZindex(bannerImages), animationDuration / 3);
  // rotating the image at the time it stacks at the back
  setTimeout(() => handleTranslationBack(firedImage), 400);

  // preparing for the next throwing image - un-rotating
  const lastImage = bannerImages[reverse ? 0 : bannerImages.length - 1];
  const rotatingImage = bannerImages[bannerImages.length - 2];
  reverse
    ? setTimeout(() => handleRotation(rotatingImage), 100)
    : setTimeout(
        () => (lastImage.style.transform = "rotate(0) scale(1)"),
        animationDuration
      );

  if (currentImageIndex > bannerImages.length - 1) {
    currentImageIndex = 0;
  }

  if (currentImageIndex < 0) {
    currentImageIndex = bannerImages.length - 1;
  }

  handleTextAnimation(bannerImageText);
  handleTextAnimation(bannerImageTextNumber);
};

const handleTextAnimation = (arr) => {
  arr.forEach((item) => handleClass(item, "fade-in", "remove"));
  const currentImgTxt = imageText(currentImageIndex, arr);
  setTimeout(() => handleClass(currentImgTxt, "fade-in"), 200);
};

const handleMagnetCursor = (e) => {
  const { x, y } = e;
  magnetCursor.style.transform = `translate(${x}px, ${y}px)`;

  const ifMagnetIsToHide = e.target.classList.contains("hide-magnet")
    ? "add"
    : "remove";

  handleClass(magnetCursor, "fade-out", ifMagnetIsToHide);
  handleClass(magnetCursor, "hidden", "remove");
};

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
const throttledThrowImage = throttle(throwImage, 800);

window.addEventListener("mousemove", handleMagnetCursor);
banner.addEventListener("mousewheel", function (e) {
  const { deltaY } = e;
  wheelIndex++;
  deltaY < 0 ? (reverse = true) : (reverse = false);
  wheelIndex % 10 === 0 ? throttledThrowImage() : 0;
});

//========================================================================
//========================== UTILITIES ===================================
//========================================================================

function handleClass(node, className, type = "add") {
  node.classList[type](className);
}

const handleZindex = (arr) => arr.forEach((item, i) => (item.style.zIndex = i));

const handleTranslationBack = (img) => {
  img.style.transition = ".3s ease-out";
  img.style.transform = reverse
    ? `translateX(0) rotate(0deg)`
    : handleRotation(img);
  img.classList.remove("img-size");
};

const handleTranslation = (img) => {
  const translateValue =
    document.documentElement.clientWidth > 1400 ? -500 : -432;
  img.style.transform = `translateX(${translateValue}px) rotate(-16deg)`;
  img.classList.add("img-size");
  img.style.transition = ".3s ease";
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleRotation = (img) => {
  const min = getRandomInt(0, -8);
  const max = getRandomInt(8, 0);
  const randomDeg = getRandomInt(0, 1) ? min : max;
  img.style.transform = `rotate(${randomDeg}deg) scale(0.9)`;
};

const lastImageIndex = () => bannerImages.length - 1;

const imageText = (index, arr) => arr[index];

//========================================================================
//========================== AT - INIT ========================================
//========================================================================

bannerImages.forEach((img, index) => {
  // rotating all images except the current one
  if (index !== lastImageIndex()) handleRotation(img);
});

// showing the animating text
handleClass(imageText(lastImageIndex(), bannerImageText), "fade-in");
handleClass(imageText(lastImageIndex(), bannerImageTextNumber), "fade-in");




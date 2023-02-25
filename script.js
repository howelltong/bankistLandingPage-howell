'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}
);

//Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  }
})

//EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //----REMOVE CURRENT SETTINGS
  //remove height to non-selected tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  //remove active class for all content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  //----ACTIVATE TAB
  clicked.classList.add('operations__tab--active')


  //----SHOW CONTENT AREA
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")


})



/////////IMPLEMENTING SMOOTH SCROLLING/////////

// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' })
})



//NAV MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.clsoest('.nav').querySelector('img')
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this


  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))


//sticky navigation => active when header moves out of view
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
// console.log(navHeight); //getting the dynamic height of the nav to appear from the start of the section1 (target element)
const stickyNav = function (entries) {
  const [entry] = entries //general function, assume array will be passed through (although no array is passed in this instance)
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px` //number of pixels outside of target element (positive means away from the top of the view port (adding extra threshold))
});
headerObserver.observe(header);

///////REVEALING ELEMENTS ON SCROLL///////////

const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry); //target element of entry becomes important (entry => target => className) => make the target section visible ONLY and not the other sections 
  //target becomes necessary as observer is observing ALL sections; need to differentiate
  //remove class when target is actually intersecting
  if (!entry.isIntersecting) return; //guard clause 
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target) //unobserve to improve performance
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15 //reveal section when x% visible
})
allSections.forEach(function (section) { //looping over sections to add the oserve method for for each of them
  sectionObserver.observe(section);
  //add section--hidden programmatically to the elements via this function rather than manually in the html
  // section.classList.add('section--hidden')
})


//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`
})

imgTargets.forEach(img => imgObserver.observe(img))

//SLIDER COMPONENT
const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots') //empty div element for dots

  //set start position
  let curSlide = 0

  //set max end position
  const maxSlide = slides.length

  ///FUNCTIONS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  }

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    goToSlide(0)
    createDots();
    activateDot(0)
  }

  init()

  //EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)


  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  })



  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains("dots__dot")) {

      const { slide } = e.target.dataset;
      goToSlide(slide)
      activateDot(slide)
    }
  })
}

slider();

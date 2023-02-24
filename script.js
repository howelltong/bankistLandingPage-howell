'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
//GOOD PRACTICE TO HAVE HTML ELEMENT VARIABLES AT THE TOP 
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')

///////////////////////////////////////
// Modal window


const openModal = function (e) {
  //prevent default scrolling to top on click
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

  ;

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

  ;

//Node list => has forEach() attached => querySelectorAll
//attaching modal button event handler to each of the buttons simultaneously 
//adding event listener to the button
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)) //outdated method using for() loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}

);

//Page Navigation

//-----------WITHOUT event delegation
//on click of nav links => navigates to respective sections via anchors in the element attribute (HTML initiated) ====> in order to implement smooth scrolling, must prevent default behavior of the html anchors 
// document.querySelectorAll('.nav__link').forEach(function (el) { //using the forEach method adds same callback function to each of the three nav links (inefficient)
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //prevent default of anchor links (removes the immediate navigation to section)
//     //implement smooth scrolling
//     //using the href attribute of the anchor to set the coordinates of scrolling function
//     const id = this.getAttribute('href'); //using getAttribute() instead of this.href because requires relative URL and not absolute
//     console.log(id); //#section--1, #section--2, #section--3 <== looks like an id selector => can be used for querySelector()
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" })
//   })
// })

//----------WITH event delegation 
//placing the event handler into a common parent of the three siblings (c: nav__link; p: nav__links)
//TWO STEPS:
//1: Add the event listener to a common parent element of all the elements that we are interested in 
//2: In that event listener, determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target); //e.target useful because the information can be used to see where that event happened (can separate between clicks on the links and clicks on the container)
  //match event handler with only the interested elements 

  //matching strategy
  if (e.target.classList.contains('nav__link')) { //selecting interested element itself
    // console.log(link);
    const id = e.target.getAttribute('href'); //'this' does not exist as function is tied to the element itself (no over-arching object for a 'this' keyword to exist)
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  }
})




//add event handlers to tab buttons

//forEach method (inefficient)
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); //BAD PRACTICE DUE TO POTENTIAL NUMBER OF EVENT HANDLERs

//EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  //figure out which element triggered event
  const clicked = e.target.closest('.operations__tab'); //note that e.target can be any elements (including spans, etc) => e.target will not provide element of the button itself => use closest method (finds closest parent with the given class name)
  // console.log(clicked);

  //clicking on container itself => Error: Cannot read property 'classList' of null => no matching parent element of closest of '.operations__tab' => SOLUTION: Ignore clicks on area with the result of 'null'
  //-----GUARD CLAUSE
  if (!clicked) return; // <== if statement that returns early if some condition is matched; i.e. if nothing is clicked (null result), end function
  // opposite of guard clause => if(clicked) {}
  // guard clause => modern practice => limits number of conditional statements and keeps code clean


  //----REMOVE CURRENT SETTINGS
  //remove height to non-selected tab
  tabs.forEach(t => t.classList.remove('operations__tab--active')) //=> remove all before adding
  //add height to selected tab

  //remove active class for all content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))


  //----ACTIVATE TAB
  clicked.classList.add('operations__tab--active') //adds height to selected tab to show active


  //----SHOW CONTENT AREA
  // console.log(clicked.dataset.tab);
  //data attribute matched to respective content (data attribute is encoded to the tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
  //CSS => operations__content => display none; operations__content => display grid


})



/////////IMPLEMENTING SMOOTH SCROLLING/////////
//btn--scroll-to => auto scroll to #section--1


// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
  //Old Method
  //1. get coordinates of elements to be scrolled to
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords); //DOMRect {x: 0, y: 621, width: 1497, height: 1650.4765625, top: 621, …}
  // console.log(e.target.getBoundingClientRect()); //DOMRect {x: 173.5, y: 425.0859375, width: 112.4609375, height: 28.5, top: 425.0859375, …}
  // //boundingClientRect is relative to view port (x, y coordinates) 
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); //0, 0 (relative to the top of the page); 0, 227 when clicked after scrolling => where y is the current view port pixels relative to the top of the WEBPAGE (and not the browser)

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // ); //height/width viewport 621 1497 <= current visible height/width of the viewport of browser (what can be visible seen of the webpage)

  // //scrolling
  // // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset) //first argument: left position; second argument: top position
  // //top is relative to the viewport and not to the page therefore must add the current scroll position to the top (i.e. top from viewport to section 1 + top of webpage to scroll point = top of webpage to section 1)

  // //making the animation smooth => adding an object for properties
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  //modern method 
  section1.scrollIntoView({ behavior: 'smooth' })
})



//NAV MENU FADE ANIMATION
//Refactoring
//NOTE EVENT HANDLERS CAN ONLY PASS THROUGH JUST ONE ARGUMENT
const handleHover = function (e) { //before bind => function(e, opacity)
  // console.log(this); //0.5 or 1
  //match targeted element: nav__link
  if (e.target.classList.contains('nav__link')) { //contains used instead as no other potential child elements will trigger event (like with the tabs and the button/span elements => closest())
    const link = e.target; //storing into variable
    //going to common parent => must move up twice (nav__link => nav__item ==> nav) => go directly to common parent via closest() and query for specific class
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //=> parent.child => selecting sibling elements (all)
    const logo = link.clsoest('.nav').querySelector('img') //=> parent.child => selecting closest specific img element 

    //change opacity of siblings and logo
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this //this => passed it through the function via bind
    })
    logo.style.opacity = this


  }
}


//event delegation => common parent of nav buttons + logo => nav element
//add event listener to delegation
//mouseover => bubble phase; mouseenter => no bubble phase
//mouse over => bubble to reach navigation element 
// nav.addEventListener('mouseover', function (e) { //must pass in values into handleHover function (e, opacity) => addEventListener() expects a function for the second parameter => cannot pass arguments through function directly and call function otherwise it'll return a value and not a function => write standard CB function and call handleHover from within that function
// handleHover(e, 0.5)
// })

//bind method => creates a copy of the function that it's called on, and set the 'this' keyword in this function call to whatever value is passed into bind
nav.addEventListener('mouseover', handleHover.bind(0.5)) //bind returns a new function where the 'this' variable will be set to the value passed

//mouseout => opposite of mouseover
nav.addEventListener('mouseout', handleHover.bind(1))

// Alternate way to pass arguments to handleHover() in the event handler:

// const handleHover = function (o) {
//   return function (e) {
//     if (e.target.classList.contains('nav__link')) {
//       const link = e.target;
//       const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//       const logo = link.closest('.nav').querySelector('img');

//       siblings.forEach(el => {
//         if (el !== link) el.style.opacity = o;
//       });
//       logo.style.opacity = o;
//     }
//   };
// };

// // you can log the handleHover(0.1) to see that it returns a function which  // has access to the argument(opacity value) passed to handleHover() due to   // closures 

// nav.addEventListener('mouseover', handleHover(0.5));

// nav.addEventListener('mouseout', handleHover(1));
// With closures we can pass as many arguments as we want like we normally pass to a function.

// And this works as addEventListener() expects a function which our handleHover() returns   
/*
This method works as addEventListener() expects a callback(anonymous) function as its second argument which our handleHover() returns.

You can confirm this by logging handleHover() to the console console.log(handleHover(0.5))

The main or the part which is most confusing and interesting at the same time is that how this function returned by handleHover() still has access to the arguments passed to handleHover().

This becomes possible only with the help of CLOSURES.

There is a lecture on this in section 10 where jonas talks about closures in detail.If you like you can review that, but still here's my take on closures

A function always retains the access to variables that they had at the time of their creation(birth) no matter where the are called.

 OR

A function always remembers all the variable available to it at it's birthplace.

This means that our anonymous function that we return will always have access to all the variables and function declared inside the handleHover()(including the arguments) as the birthplace of our anonymous function is handleHover().

This ability of the function to "remember" becomes possible due to scope chain.

When a function is declared a scope chain is established with the First level being the variables declared inside it and argument  passed to it.The Second level will be the scope of its ancestor(in our case the handleHover) till it reaches the global scope(window object) with the final level being null.

This is an important point that just like prototypal chain the final level for any scope chain is null

When a function starts to look for a variable it will first start to look at its local scope(First Level).If it found the desired variable it will stop looking any further down the scope chain.If no variable is found it will start to look in the next level and repeat the same process either till it finds the variable or it reaches null(in this case we get an error).
*/

// ///////////////////STICKY NAVIGATION = SCROLL EVENT//////////////
// //method 1 => scroll event (outdated) => not efficient, should be avoided
// const initialCoords = section1.getBoundingClientRect()
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY); //getting current scroll position from the top of the page to the top of the viewport 

//   //adding "sticky" class to nav to be beginning of #section--1
//   //calculate position dynamically
//   if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky') 
//   else nav.classList.remove('sticky')
// })

// ///////////////////STICKY NAVIGATION = INTERSECTION OBSERVER API//////////////
//Intersection observer api => observe changes to the way that a certain target element intersects another element or the way it intersects the viewport

// //step 3 - callback function 
// //whenever the target element (section1) is intersecting the viewport (root: null) at threshold%, then the following function will get called (regardless if scroll up or down)
// const obsCallback = function (entries, observer) { //function gets called each time the observed element is intersecting the root element at the threshold that was defined in the options
//   //usually only interested in entries, but observer can be useful
//   //entries => array of the threshold entires
//   entries.forEach(entry => {
//     console.log(entry); //logs moment when isIntersection changes between false <=> true
//     //intersectionRatio: (intersection at >= threshold)
//     //isIntersection: true/false (depending on viewport)
//   })



// }

// //step 2 - create options
// const obsOptions = {
//   root: null, // first property -> root property: element that the target is intersecting => can either select element or as an alternative, 'null' (where null => observe target element intersecting the entire viewport)
//   threshold: [0, 0.2], // percentage of intersection at which the observer callback will be called => threshold is how much of the viewport is visible
//   //can have multiple thresholds (as an array)
//   // 0 => target element moves completely out of view and as soon as it enters into view (isIntersecting t/f)
// }

// //step 1 - start by creating a new intersection observer
// const observer = new IntersectionObserver(obsCallback, obsOptions) //pass in cb and object of options
// observer.observe(section1) //use observer to observe a cerain target => section1 is the target

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


//////////LAZY LOADING IMAGES///////
// performance => load low resolution images first and upon viewport display, replace low resolution image with actual image
//requires two image sources (src and data-src) => src: lazy image, data-src: actual image
//added blur filter css to image to hide the low resolution
//NOTE: not all images will be lazy loaded (e.g. logo); therefore must find according to data-src attribute
const imgTargets = document.querySelectorAll('img[data-src]') //searching for img element with x attribute
// console.log(imgTargets); //nodelist => three image elements with lazy-img

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src; // setting current src to the data-src 
  //removing filter right away will remove filter before new image is loaded (will display low resolution photo) <= important for users with slow internet
  //NOTE: upon replacement => loads new image which emits 'load event' <= can be listened for and handled (filter removed upon load and not before)
  entry.target.addEventListener('load', function () {
    //remove blur filter
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px` //load image BEFORE it reaches the viewport => user does not have to wait for image to load in their viewport
})

imgTargets.forEach(img => imgObserver.observe(img))

////////BUILDING A SLIDER COMPONENT///////////

//1. ESTABLISH INITIAL CONDITION: Slide--n side by side (transform: translateX(0, 100%, or 200%))
//---current condition: slides stack on top of each other

const slider = function () { //creating a separate function to not pollute global namespace (GOOD PRACTICE)

  //working with images first (commenting out slide testimonials and using images as an example)
  const slides = document.querySelectorAll('.slide')
  // const slider = document.querySelector('.slider') //temporarily set scale smaller for better visibility
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots') //empty div element for dots


  //set start position
  let curSlide = 0

  //set max end position
  const maxSlide = slides.length //can read length on nodeList of slides 

  // /////TEMPORARILY SET SCALE SMALLER FOR BETTER VISIBILITY 
  // slider.style.transform = 'scale(0.5) translateX(-1200px)'
  // slider.style.overflow = 'visible'; //overflow visible => show all images side by side



  ///FUNCTIONS
  //each dot will be a button with class "dots__dot" and attriute data-slide="x" where "x" will be the slide it'll go to
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  //separate active-class function for dots as it'll be necessary for click (dots), click (arrows), and keydown events =
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    // activate dot for current slide via data attribute
    // `.dots__dot[data-slide="${slide}"]` <== selecting element with class and attribute query
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  const goToSlide = function (slide) {
    //IF curSlide = 1 => translate all slides to right => positions: -100%, 0%, 100%, 200% => WHERE 0% is current image
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  }

  // //setting the start position of the slides
  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`) //use of positional index to set the percentage
  // // 4 images => translateX(0%, 100%, 200%, or 300%)

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) { //maxSlide - 1 => 0 positional index
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) { //maxSlide - 1 => 0 positional index
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  //refactor => initial conditions
  const init = function () {
    goToSlide(0) // slide => 0 => translateX(0%, 100%, 200%, 300%)
    createDots();
    activateDot(0)
  }

  init()

  //EVENT HANDLERS

  //going to next slide => change percentage values of the translateX %
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  //add keyboard handler events to handle left and right keydowns
  document.addEventListener('keydown', function (e) {
    // console.log(e); //code: 'ArrowRight' and code: 'ArrowLeft' => finding what the code is for left and right arrow keys
    //method 1: if statement
    if (e.key === 'ArrowLeft') prevSlide();
    //method 2: short circuiting
    e.key === 'ArrowRight' && nextSlide();
  })



  //DOTS => eventHandler via event delegation
  //common parent: dotContainer
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // console.log(DOT);
      //get slide ===> data-slide of dot === positional index of slide
      const { slide } = e.target.dataset; //destructuring as name is equal to property
      goToSlide(slide) //pass in the data-slide number of dot where dot(i) === slide(i)
      activateDot(slide)
    }
  })

}

slider();

/*

////////////HOW THE DOM REALLY WORKS//////////

What is the DOM ?
  DOM => interface between JS and the browser(i.e.HTML documents that are rendered in and by the browser)
    - Allows us to make JS interact with the browser
      - Can write JS to create, modify, and delete HTML elements; set styles, classes, and attributes; and listen and respond to events
        - DOM tree is generated from an HTML document, which can then be interacted with
- DOM tree is a tree - like structure made out of nodes
  - DOM has different types of nodes(e.g.html elements, text, etc)
    - DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree



how the DOM works behind the scenes


how the DOM is organised internally
  - Every single node in the DOM tree is type Node
- Each node is represented in JS by an object
---> object gets access to special node methods and properties, such as text content, child nodes, parent nodes, clone nodes, etc

NODE TYPES
  - Node has child nodes of different types => Element; Text; Comment; Document

INHERITANCE
  ====> Inheritance of Methods and Properties => child type will have access to all of their parent node type methods (E.g.HTMLElement will have access to all of the Element node type methods)

TYPES
  - Element => <p></p>
---> This kind of node gives each HTML access to a variety of properties / methods
---> Element type itself has exactly one child type(HTML ELEMENT)
---> HTML Element has a variety of child types(HTMLButtonElement...HTMLDivElement... <= one different type if HTMLElement per HTML element)
---> Each of these HTMLElements can have unique properties(e.g. <a a ></a > => HREF element); required different ways of storing these different attributes => different types of HTML elements were created in the DOM API

  - Text => <p>Paragraph</p>

    - Comment => < !--Comment -->

      - Document => e.g.querySelector(), createElement(), getElementById();
---> note that querySelector() can be accessed by both Document type nodes and Element type nodes

EVENT TARGET
DOM API needes a method of allowing all node types to listen to events
  - Done by the special node type "EventTarget" => .addEventListener(), .removeEventListener()
    - Event target => parent of both the node type and the window node type(global objects, lots of methods and properties, many unrelated to the DOM)
      - therefore can call event listeners on every different node type of the DOM API(as all nodes are childs)
        - Note that we NEVER manually create an eventTarget object


////////SELECTING CREATING AND DELETING ELEMENTS//////////

//selecting entire document (webpage)
console.log(document.documentElement); //logs entire html document in console
//document => is not the real document element (insufficient to make alterations)
//document element => what is used to make alterations to entire page
console.log(document.header);
console.log(document.body);

const header = document.querySelector('.header') //return the first element that matches this selector
const allSections = document.querySelectorAll('.section') //returns all elements
console.log(allSections); //NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up] <= returns node list
//removal of node from document will not remove node from nodeList (no automatic immediate update) as the variable was created when all of the nodes still existed

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button')
console.log(allButtons); //HTMLCollection [...] <= returns HTMLCollections and not node list
//HTMLCollection => 'live' collection => If DOM changes, collection is also immediately updated automatically
//useful to remove things programmatically

console.log(document.getElementsByClassName('btn')); //HTMLCollection [...]

//Creating and Inserting Elements
// .insertAdjacentHTML => quick and easy way of creating elements

const message = document.createElement('div') //pass in string of tag name
//DOM is not yet stored anywhere; simply is a DOM object that we can now use to do something on it but it is not yet in the DOM itself (i.e. object that represents a DOM element)

//able to add classes
message.classList.add('cookie-message');

//use both of these properties (textContent, innerHTML) to read and set content
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

//CHILD ELEMENT
//newly created DOM element must be manually inserted into the page to be used
// header.prepend(message); //prepend => adds the element as the first child to whatever element it is attached to
header.append(message) //note that prepended message is removed and appended message is added (live element, therefore cannot be at multiple places simultaneously) => moved elements (from first child to last child)

//creating multiple copies of the same element
// header.append(message.cloneNode(true)) //cloneNode() => true -> pass through all the child elements as well

//SIBLING ELEMENT
// header.before(message) //before header element
// header.after(message) //after header element

//delete element
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove() //old method (before remove())
  // message.parentElement.removeChild(message) //DOM traversing => moving up and down the DOM tree
}

) ///////////STYLES ATTRIBUTES AND CLASSES///////////

//STYLES
//setting inline styles via JS
message.style.backgroundColor = '#37383D'
message.style.width = '120%'

console.log(message.style.height); //nothing => using style property only works for the properties that were manually set via the style property
console.log(message.style.backgroundColor); //rgb(55, 56, 61)

console.log(message.style.height); //within the CSS but cannot be accessed via style property
//to access non-js manually set styles => getComputedStyle
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
console.log(getComputedStyle(message).height); //49px



message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//as restult of getComputedStyle(message).height is a string => convert to number without unit via parseFloat()

//working with CSS custom propeties (CSS variables)
//CSS root === documentElement
document.documentElement.style.setProperty('--color-primary', 'orangered')

//ATTRIBUTES
//attributes of HTML elements
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:60096/img/logo.png <= absolute URL (where as HTML file => relative URL (relative to the folder))
console.log(logo.className); //nav__logo <= must use 'className' and not 'class'

//setting attributes
logo.alt = 'Beautiful minimalist logo'

//non-standard
//if attributes exist within the HTML element, JS will automatically create these properties on the object
//if attribute added is non-standard, it will not be added to the object
//invalid method
console.log(logo.designer); //undefined
//valid method
console.log(logo.getAttribute('designer')); //Howell
//setting non-standard attributes
logo.setAttribute('company', 'Bankist')

//absolute vs relative => href, src, etc
console.log(logo.src); //http://127.0.0.1:60096/img/logo.png <= absolute URL (where as HTML file => relative URL (relative to the folder))
//to retrieve relative URL and not the absolute URL, must use getAttribute
console.log(logo.getAttribute('src')); //img/logo.png

//Data attributes
// special kind of attributes that start with the word 'data'
console.log(logo.dataset.versionNumber); //3.0
//use data attributes a lot when working with UI (especially when storing data in user interface i.e. html code)

//classes
//USE
//can pass in multiple classes (working with current class name)
logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c', 'j')
logo.classList.contains('c', 'j') //not includes

//DO NOT USE
//==> will override all other classes, can only pass in one class name
//using className to set class name
logo.clasName = 'jonas'



//////////TYPES OF EVENTS AND EVENT HANDLERS////////////////
// EVENT => signal that is generated by a certain DOM node where the signal indicates event occurence
// ==> anything that is of importance that occurs on the webpage => data stored and can be accessed via eventListeners
//mdn JS event reference => list of different events

//mouseenter event

//remove event handlers
//1. export the function into a named function
const alertH1 = function (e) { //whenever a mouse enters a certain element
  alert('addEventListener: Great! You are reading the heading.')

  //2. removal method
  // h1.removeEventListener('mouseenter', alertH1) //does not have to be within the function
}


//MODERN METHOD
//advantage: able to add multiple event listeners to the same event (multiple event listeners => multiple different functions)
//advantage: able to remove event handler in case it becomes unnecessary
const h1 = document.querySelector('h1')
h1.addEventListener('mouseenter', alertH1)


setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000) //removing eventListener after x amount of time


//OLD METHOD
//disadvange: adding a new function will override previous one
//another method of attaching eventListener to element
//using on'Event name' property directly on the element
// h1.onmouseenter = function (e) { //whenever a mouse enters a certain element
//   alert('onmouseenter: Great! You are reading the heading.')
// }


//third way of handling events
//using HTML attribute
//SHOULD NOT BE USED
//add attribute directly into html => onclick = "alert('HTML alert')"



/////////EVENT PROPAGATION: BUBBLING AND CAPTURING///////////////
JS Events => important property: Capturing phase and Bubbling phase => propagating(from one place to another)

assuming a click event occurred in a nested element(can be at multiple levels)
1. click event is generated immediately on click HOWEVER this event is not generated at the target element
2. click event is generated at the root of the document(top of DOM tree, overarching element of the entire document)
3. Initiate CAPTURING PHASE => click event travels down the DOM tree to the target element(passing through all the parent elements and predecessors of the target element)
4. Upon reaching target element, initiate TARGET PHASE => events can be handled right at the target(via event listeners) and runs the callback function
5. After function executed, initate BUBBLING PHASE(event travels back up the DOM to the document root) => passes through all of the parent elements

Therefore, all of the elements between document root and target element experiences the click event(sibling elements not included)
  ==> attaching eventListeners to parent elements will also handle the same event

BY DEFAULT => events can only be handled in the target and bubbling phase but can set up event listeners in a way that they listen to events in the capturing phase instead
not all events have a capturing and bubbling phase(where some of them are created directly in the target element)



//////EVENT PROPAGATION IN PRACTICE////////

//rgb( 0 - 255, 0 - 255, 0 - 255)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

//adding event handler to 'features' target element and its predecessors
// nav__link => nav__links => nav

document.querySelector('.nav__link').addEventListener('click', function (e) { //addEventListener() => only listening for events on the BUBBLE phase and not the CAPTURE phase => the capture phase is usually irrelevant; bubble phase is useful for EVENT DELEGATION
  this.style.backgroundColor = randomColor();

  console.log('Link', e.target, e.currentTarget);
  //e.target => where the event ORIGINATED but not where the handler is attached
  //e.currentTarget => element on which the event handler is attached i.e. the element which is triggering the function
  console.log(e.currentTarget === this); //true

  //stop propagation
  e.stopPropagation(); //no bubbling phase
  //NOTE: In practice, it is NOT good to stop propagation
})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //click event occurs in target element but also registers as a event for the parent element => executes its own event handler function => handling the SAME event with different functions
  //clicking on (parent element) will not trigger event for child element, only executes function for the parent element

  console.log('Container', e.target, e.currentTarget);
})

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //click event occurs in target element but also registers as a event for the parent element => executes its own event handler function => handling the SAME event with different functions

  console.log('Nav', e.target, e.currentTarget);
},
  // true <= default is set to false
) //addEventListener() third parameter => true/false => true: listen to capture phase and not bubble phase (event order becomes reversed as it is listening for the event as it travels DOWN the DOM and NOT UP)



////////////////DOM TRAVERSING////////////
//Selecting one DOM based on the position of another DOM
//I.e. selecting elements relative to other elements

const h1 = document.querySelector('h1')


/////////////////////
//going DOWNWARDS: child
// first method: querySelector() <= works on elements, not only document
console.log(h1.querySelectorAll('.highlight')); //NodeList(2) [span.highlight, span.highlight] <= although in this case the highlight element is a direct child of the h1, it doesn't necessarily have to be direct descendents (can go down deeper)
//selects children no matter how far down the DOM tree

// second method: childNodes <= direct descendents (nodes can be anything, not just html elements)
//note: due to variety of different nodes, this method is not often used
console.log(h1.childNodes); //[text, comment, text, span.highlight, text, br, text, span.highlight, text]

// third method: children <= direct descendent elements
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

//fourth method: firstElementChild, lastElementChild
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'


/////////////////////
//going UPWARDS: parents

// first method: parentNode <= direct parents
console.log(h1.parentNode); //<div class="header__title">...</div>

//second method: parentElement <= direct parents
console.log(h1.parentElement); //<div class="header__title">...</div>

//third method: closest() <= not necessarily a direct parent but possible further up the DOM tree
// selects parent, no matter how far up the DOM tree
//selects closeest element with the same selector and applies the inline styling
// used most often, particularly with event delegation
h1.closest('.header').style.background = 'var(--gradient-secondary)' //receuves a query string
h1.closest('h1').style.background = 'var(--gradient-primary)' //closest one will be itself (h1) that will be returned


/////////////////////
//going SIDEWAYS: siblings
//NOTE: in JS, can only access direct siblings (cannot go from 1st sibling directly to 3rd sibling)

//first method: previousElementSibling and nextElementSibling <= elements (usually used)
console.log(h1.previousElementSibling); //null <=h1 is first child of parent element, no previous sibling hence null
console.log(h1.nextElementSibling); //<h4>A simpler banking experience for a simpler life.</h4>

//second method: previousSibling and nextSibling <= nodes (not usually used)
console.log(h1.previousSibling); //#text
console.log(h1.nextSibling); //#text

//traversing to access all siblings
console.log(h1.parentElement.children); //HTMLCollection(4)[h1, h4, button.btn--text.btn--scroll - to, img.header__img] <= includes the h1 itself as it is a child of its parent

//as it is an iterable, can use spread operator and other functions
[...h1.parentElement.children].forEach(function (el) { //<= working will all the sibling elements of one element
  if (el !== h1) el.style.transform = 'scale(0.5)'
})

//Conclusion:
//UP: querySelector()
//Down: children
//Sideways: previousElementSibling/nextElementSibling or DOM Traversing


/////////////LIFECYCLE DOM EVENTS//////////////
//Life cycle: moment when user first accesses the page until the user leaves it

//three events that can potentially be of help in certain situations

//first event: DOM content loaded
//fired by the document as soon as the HTML is completely parsed (which means that the HTML has been downloaded and been converted to the DOM tree)
//all scripts must be downloaded and executed before the "DOM content loaded" event can happen

document.addEventListener('DOMContentLoaded', function (e) {
  //this event does not wait for images and other external resources to load (i.e. only HTML and JS needs to be loaded)
  console.log('HTML parsed and DOM tree built', e); //HTML parsed and DOM tree built Event {isTrusted: true, type: 'DOMContentLoaded', target: document, currentTarget: document, eventPhase: 2, …}
  //observing Network => first JS and HTML loaded, then other code loads (e.g. images)
  //therefore => can execute code that should only be executed after the DOM is available
  //NOTE: we want all our code only to be executed after the DOM is ready
  //done via script tag that imports JS to HTML => <script src="script.js"></script> WHERE JS is loaded AFTER the rest of the HTML is already parsed (hence why it is at the end of the code body)
  //Not necessary to manually listen for the DOM content loaded event (via event listener)
  //jQuery => document.addEventListener('DOMContentLoaded') === document.ready
})



//second event: load event
//fired by the window as soon as HTML is parsed && all images + external resources (e.g. CSS files) are loaded 
//I.E. ==> complete webpage finished loading
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e); //Page fully loaded Event {isTrusted: true, type: 'load', target: document, currentTarget: Window, eventPhase: 2, …} => regular Event object
})



//final event: before unload event
//NOTE => SHOULD ONLY BE USED WHEN NECESSARY => message alert is intrusive
//use when data can be potentially lost by exiting page
// window.addEventListener('beforeunload', function (e) {
//   //created immediately before a user is about to leave a page (e.g. close tab)
//   e.preventDefault() //some browsers requires preventDefault (not chrome)
//   e.returnValue = ''; //read event requires returnVale = '' (for historical reasons) 
//   //pop up alert ("are you sure you want to leave this page?")
//   //note '' cannot be altered (as people in the past abused this), will result in the same page
// })

//////////////EFFICIENT SCRIPT LOADING: DEFER AND ASYNC/////////////////

Defer and Async script loading
//attribute that influence the way the JS file is fetched
//only modern browsers support async and defer 

//check different load times in console network tab => check stall times

---------
  Regular method: <script src="script.js"></script>
Attaching script tag to the:
HTML HEAD:

Pasrsing HTML => Waiting(FETCH SCRIPT AND EXECUTE) => Finishing parsing HTML(DOMContentLoaded)

  - Not ideal as the waiting period will have the browser doing nothing
    - affects performance
      - script will be executed before the DOM is ready

HTML BODY:

Parsing HTML => Fetch script => execute(DOMContentLoaded)

  - Better method of executing and loading script
    - Still imperfect as the script could have been downloaded before while the HTML was still being parsed

      ===> scripts are fetched and executed after the HTML is completely parsed
        ===> use if you need to support old browsers => HTML5 feature

---------
  Async: <script async src="script.js"></script>
    - adding async attribute to the script tag
Attaching script tag to the:
HTML HEAD:

Parsing HTML(Fetch script) => waiting(execute) => finish parsing HTML(DOMContentLoaded)

  - script is loaded at the same time as the HTML being parsed(asynchronously)
    - advantage over regular + body
      - still exists a waiting period(inefficient) as the script is executed immediately after fetching, executing in a synchronous way

        ===> scripts are fetched asynchronously and executed immediately
          ===> Usually the DOMContentLoaded event waits for ALL scripts to execute, except for async scripts.So, DOMContentLoaded does not wait for an async script(i.e.DOMContentLoaded event after the HTML is fully parsed)
            ===> if the script is large and fetching JS takes longer than parsing HTML, DOMContentLoaded event appears before the completion of fetching the JS
              ===> ASYNC scripts are not guaranteed to execute in order(i.e.scripts that arrive first gets executed first)
                ===> use for 3rd - party scripts where order doesn't matter (e.g. Google Analytics)

HTML BODY:
- makes no sense
  - no practical effect of adding async


---------
  Defer: <script defer src="script.js"></script>
    - adding defer attribute to the script tag
Attaching script tag to the:
HTML HEAD:

parsing HTML(fetch script) => execute(DOMContentLoaded)

  - script loaded asynchronously
    - execution is deferred until the end of the HTML parsing
      - similar to async + head but script execution deferred to the end
        - IDEAL METHOD

          ===> scripts are fetched asynchronously and executed after the HTML is completely parsed
            ===> DOMContentLoaded event fires AFTER defer script is executed
              ===> even if the script is large, DOMContentLoad event will appear only after the the running of the script(always after HTML is parsed)
                ===> defer scripts are executed in order
                  ===> This is overall the best solution.Use for own scripts and when order matters(e.g.including a library) => including library before own script so that own script can use the library's code

HTML BODY:
- makes no sense
  - no practical effect of adding defer



*/

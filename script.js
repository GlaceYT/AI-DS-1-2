document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelector('.landing-content').style.display = 'block';
    }, 1000); 
  });
  
  const learnMoreBtn = document.getElementById('learnmore');
  
  // Add a click event listener
  learnMoreBtn.addEventListener('click', function() {
    // Redirect to about.html when the button is clicked
    window.location.href = this.getAttribute('href');
  });


const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');




openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}
function toggleMenu() {
  var menu = document.querySelector('nav .mainMenu');
  menu.classList.toggle('open');
}


document.querySelector('nav .mainMenu .closeMenu').addEventListener('click', function() {

  toggleMenu();
});


// 

document.addEventListener('DOMContentLoaded', function() {
  var readMoreBtn = document.getElementById('readMoreBtn');

  readMoreBtn.addEventListener('click', function(event) {
     
      if (isMobileDevice()) {
       
          window.location.href = 'https://sriindu.ac.in/';
      } else {
     
          var scrollAmount = 900; 
          window.scrollTo({
              top: window.pageYOffset + scrollAmount,
              behavior: 'smooth'
          });
      }
    
      event.preventDefault();
  });


  function isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
});

function goToTop() {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
}

// Show the "Go to Top" button when scrolling down
window.addEventListener('scroll', function() {
var goToTopBtn = document.getElementById('goToTopBtn');
if (window.scrollY > 300) { 
    goToTopBtn.style.display = 'block';
} else {
    goToTopBtn.style.display = 'none';
}
});
window.addEventListener('scroll', function() {
var scrollBar = document.getElementById('scrollProgress');
var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
var progress = (window.pageYOffset / maxScroll) * 100;
scrollBar.style.width = progress + '%';
});

// Set your target numbers here
const targetNumbers = [60, 200, 40, 10];

// Get the counter elements
const counterElements = document.querySelectorAll('.counter');

let counts = [0, 0, 0, 0];
let timers = [];

// Function to increment the counter
function incrementCounter(index) {
  const increment = targetNumbers[index] / 100; 

  timers[index] = setInterval(() => {
    counts[index] += increment;
    counterElements[index].textContent = Math.round(counts[index]) + "+";

    if (counts[index] >= targetNumbers[index]) {
      clearInterval(timers[index]);
      counterElements[index].textContent = targetNumbers[index] + "+"; 
    }
  }, 20);
}


const options = {
  root: null, 
  rootMargin: '0px', 
  threshold: 0.5 
};


function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
     
      for (let i = 0; i < targetNumbers.length; i++) {
        incrementCounter(i);
      }

      observer.disconnect();
    }
  });
}


const observer = new IntersectionObserver(callback, options);


const targetSection = document.querySelector('.bgstatcolor');


if (targetSection) {
  observer.observe(targetSection);
}

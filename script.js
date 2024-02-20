(function() {
  if (document.querySelector(".top-bar__nav-toggle")) {
    var navToggle = document.querySelector(".top-bar__nav-toggle");

    function watchNavClose(e) {
      var topNav = document.querySelector(".top-bar");
      if (!e.path.includes(topNav)) {
        openCloseNav();
        document.documentElement.removeEventListener("click", watchNavClose);
      }
    }

    function openCloseNav() {
      var navToggle = document.querySelector(".top-bar__nav-toggle");

      if (!navToggle.classList.contains("closed")) {
        navToggle.classList.add("closed");
        document.querySelector(".top-bar__nav").classList.remove("collapsed");
        document.querySelector("html").addEventListener("click", watchNavClose);
      } else {
        navToggle.classList.remove("closed");
        document.querySelector(".top-bar__nav").classList.add("collapsed");
        document.documentElement.removeEventListener("click", watchNavClose);
      }
    }

    navToggle.addEventListener("click", openCloseNav);
  }
})();

let slideIndex = 0;
showSlides();

function showSlides() {
let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
for (i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";  
}
slideIndex++;
if (slideIndex > slides.length) {slideIndex = 1}    
for (i = 0; i < dots.length; i++) {
  dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";  
dots[slideIndex-1].className += " active";
setTimeout(showSlides, 3000); // Change image every 3 seconds
}

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
  itemActive = itemActive + 1;
  if(itemActive >= countItem){
      itemActive = 0;
  }
  showSlider();
}
//event prev click
prev.onclick = function(){
  itemActive = itemActive - 1;
  if(itemActive < 0){
      itemActive = countItem - 1;
  }
  showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 5000)
function showSlider(){
  // remove item active old
  let itemActiveOld = document.querySelector('.slider .list .item.active');
  let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
  itemActiveOld.classList.remove('active');
  thumbnailActiveOld.classList.remove('active');

  // active new item
  items[itemActive].classList.add('active');
  thumbnails[itemActive].classList.add('active');

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
      next.click();
  }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
      itemActive = index;
      showSlider();
  })
})

auth0.createAuth0Client({
domain: "dev-wx0wzhodkgnv7da8.us.auth0.com",
clientId: "WXABgo1dR1R1q8kYAOPXK1xc8ck6jqjK",
authorizationParams: {
  redirect_uri: "https://neha2003-me.github.io/Nourish360/"
}
}).then(async (auth0Client) => {
// Assumes a button with id "login" in the DOM
const loginButton = document.getElementById("login");
const registerButton = document.getElementById("register");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth0Client.loginWithRedirect();
});
// registerButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   // Specify the redirect URI for registration
//   auth0Client.loginWithRedirect({
//     redirect_uri: "http://127.0.0.1:5501/registerPage.html"
//   });
// });

if (location.search.includes("state=") && 
    (location.search.includes("code=") || 
    location.search.includes("error="))) {
  await auth0Client.handleRedirectCallback();
  window.history.replaceState({}, document.title, "/");
}

const signupButton = document.getElementById("signup");
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth0Client.logout();
});

const isAuthenticated = await auth0Client.isAuthenticated();
const userProfile = isAuthenticated ? await auth0Client.getUser() : null;

const profileElement = document.getElementById("profile");
console.log(userProfile);
if (isAuthenticated) {
  loginButton.style.display = "none";
  logoutButton.style.display = "block";
  signupButton.style.display = "none";
  profileElement.innerHTML = `
    <p>${userProfile.name}</p>
    <img src="${userProfile.picture}" />
  `;
} else {
  loginButton.style.display = "block";
  signupButton.style.display = "block";
  logoutButton.style.display = "none";
}
});

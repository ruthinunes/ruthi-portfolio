// open menu mobile
const displayMenu = () => {
  const navMenu = document.getElementById("nav-menu");
  const openButton = document.getElementById("nav-toggle");

  openButton.addEventListener("click", () => {
    addClass(navMenu, "show-menu");
    removeMenu(navMenu);
    removeMenuOnClick(navMenu);
  });
};

// remove menu mobile
const removeMenu = (navMenu) => {
  const closeButton = document.getElementById("nav-close");

  closeButton.addEventListener("click", () => {
    removeClass(navMenu, "show-menu");
  });
};

// change background header
const scrollHeader = () => {
  const nav = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
};

// remove menu when a nav link is clicked
const removeMenuOnClick = (navMenu) => {
  const navlinks = document.querySelectorAll(".nav__link");

  navlinks.forEach((link) => {
    link.addEventListener("click", () => {
      removeClass(navMenu, "show-menu");
    });
  });
};

const setFooterYear = () => {
  const year = new Date().getFullYear();
  document.getElementById("footer-year").innerHTML = `&#169 ${year}`;
};

// reusable functions
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

window.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  displayMenu();
});

window.addEventListener("scroll", scrollHeader);

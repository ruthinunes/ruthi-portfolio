// *** NAV
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

// remove menu mobile when a nav link is clicked
const removeMenuOnClick = (navMenu) => {
  const navlinks = document.querySelectorAll(".nav__link");

  navlinks.forEach((link) => {
    link.addEventListener("click", () => {
      removeClass(navMenu, "show-menu");
    });
  });
};

// active nav section link when scroll
const activeNavLink = () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    updateSections(current, scrollY);
  });
};

// add menu shadow when scroll
const setHeaderShadow = () => {
  const nav = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
};

const updateSections = (current, scrollY) => {
  const sectionId = current.getAttribute("id");
  const isActive = isSectionActive(current, scrollY);
  toggleActiveClass(sectionId, isActive);
};

const isSectionActive = (current, scrollY) => {
  const sectionHeight = current.offsetHeight;
  const sectionTop = current.offsetTop - 50;
  return scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
};

const toggleActiveClass = (sectionId, isActive) => {
  const link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

  if (isActive) {
    addClass(link, "active-link");
  } else {
    removeClass(link, "active-link");
  }
};

// form
const processForm = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const project = document.getElementById("project");
  const message = document.getElementById("message");
  const sendBtn = document.getElementById("form-button");

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      name.value !== "" &&
      project.value !== "" &&
      message.value !== "" &&
      validateEmail(email.value)
    ) {
      const contactForm = {
        name: name.value,
        email: email.value,
        project: project.value,
        message: message.value,
      };
      sendForm(contactForm);
      clearFields(name, email, project, message);
      clearPlaceholders(name, email, project, message);
    } else {
      showError(name, email, project, message);
    }
  });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const showError = (name, email, project, message) => {
  name.setAttribute("placeholder", "Please enter your name");
  project.setAttribute("placeholder", "Please enter your project idea");
  message.setAttribute("placeholder", "Please enter your message");
  if (!validateEmail(email.value)) {
    email.value = "";
    email.setAttribute("placeholder", "Please enter a valid email");
  }
};

const sendForm = async (contactForm) => {
  await axios
    .post("https://ruthi-portfolio.onrender.com/api/contacts", contactForm)
    .then((res) => console.log(res.data));
};

const clearFields = (name, email, project, message) => {
  name.value = "";
  email.value = "";
  project.value = "";
  message.value = "";
};

const clearPlaceholders = (name, email, project, message) => {
  name.removeAttribute("placeholder");
  email.removeAttribute("placeholder");
  project.removeAttribute("placeholder");
  message.removeAttribute("placeholder");
};

// *** FOOTER
// automatically update footer year
const setFooterYear = () => {
  const year = new Date().getFullYear();
  document.getElementById("footer-year").innerHTML = `&#169 ${year}`;
};

// *** reusable functions
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

window.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  displayMenu();
  processForm();
});

window.addEventListener("scroll", () => {
  activeNavLink();
  setHeaderShadow();
});

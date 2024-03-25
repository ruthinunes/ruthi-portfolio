// --- NAV ---
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

// --- FORM ---
const setFormButton = () => {
  const sendBtn = document.getElementById("form-button");

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    processForm();
  });
};

const processForm = () => {
  const { name, email, project, message } = getFormElements();

  if (
    name.value !== "" &&
    project.value !== "" &&
    message.value !== "" &&
    validateEmail(email.value)
  ) {
    const contactData = {
      name: name.value,
      email: email.value,
      project: project.value,
      message: message.value,
    };

    sendData(contactData);
    clearFields();
    clearPlaceholders();
  } else {
    displayError();
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendData = async (contactData) => {
  await axios
    .post("https://ruthi-portfolio.onrender.com/api/contacts", contactData)
    .then((res) => console.log(res.data));
};

const displayError = () => {
  const { name, email, project, message } = getFormElements();

  if (!validateEmail(email.value)) {
    email.value = "";
    email.setAttribute("placeholder", "Please enter a valid email");
  }
  name.setAttribute("placeholder", "Please enter your name");
  project.setAttribute("placeholder", "Please enter your project idea");
  message.setAttribute("placeholder", "Please enter your message");
};

const clearFields = () => {
  const { name, email, project, message } = getFormElements();

  name.value = "";
  email.value = "";
  project.value = "";
  message.value = "";
};

const clearPlaceholders = () => {
  const { name, email, project, message } = getFormElements();

  name.removeAttribute("placeholder");
  email.removeAttribute("placeholder");
  project.removeAttribute("placeholder");
  message.removeAttribute("placeholder");
};

const getFormElements = () => {
  const elements = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    project: document.getElementById("project"),
    message: document.getElementById("message"),
  };
  return elements;
};

// --- FOOTER ---
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

// events
window.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  setFormButton();
  setFooterYear();
  // processForm();
});

window.addEventListener("scroll", () => {
  activeNavLink();
  setHeaderShadow();
});

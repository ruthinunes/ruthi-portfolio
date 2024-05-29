// function to active server and avoid delay requests
const activeServer = async () => {
  try {
    await axios.get("https://ruthi-portfolio.onrender.com/api/ping");
    // console.log("Fisrt request send to server.");
  } catch (error) {
    console.error("Error in send first request:", error);
  }
};

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

// theme
const setChangeTheme = () => {
  const themeButton = document.getElementById("theme-button");

  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
  });
};

// --- HOME BUTTON ---
const setHomeButton = () => {
  const homeButton = document.querySelector("#home-button");
  const closeModal = document.querySelector("#modal-close");
  const modal = document.querySelector("#button-modal");

  homeButton.addEventListener("click", (e) => {
    e.preventDefault();
    addClass(modal, "show-modal");
  });

  closeModal.addEventListener("click", (e) => {
    e.stopPropagation();
    removeClass(modal, "show-modal");
  });
};

const displayModal = () => {
  const modal = document.getElementById("button-modal");

  addClass(modal, "show");
  removeModal(modal);
};

const removeModal = (modal) => {
  const closeButton = document.getElementById("modal-close");

  closeButton.addEventListener("click", () => {
    removeClass(modal, "show");
  });
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
  } else {
    displayError();
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sendData = async (contactData) => {
  try {
    await axios.post(
      "https://ruthi-portfolio.onrender.com/api/contacts",
      contactData
    );
    // .then((res) => console.log(res.data));
    setSuccedStatus();
  } catch (error) {
    setErrorStatus();
    // console.log(error);
  }
};

const setSuccedStatus = () => {
  const modal = document.querySelector(".form__modal");

  modal.style.display = "block";

  setTimeout(() => {
    modal.style.display = "none";
  }, 2000);
  clearFields();
  clearPlaceholders();
};

const setErrorStatus = () => {
  const modal = document.querySelector(".form__modal");
  const description = document.querySelector(".form__modal p");

  modal.style.display = "block";
  description.style.color = "#fe99ac";
  description.innerHTML = `Error! Try send again.`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
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

// --- SCROLL TOP PAGE---
const scrollTopPage = () => {
  const scrollUp = document.getElementById("scroll-up");
  const scrollY = window.scrollY;

  if (scrollY >= 160) {
    addClass(scrollUp, "show-scroll");
  } else {
    removeClass(scrollUp, "show-scroll");
  }
};

// *** reusable functions
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

// events
window.onload = () => {
  activeServer();
  setInterval(activeServer, 30000);
};

window.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  setChangeTheme();
  setHomeButton();
  setFormButton();
  setFooterYear();
});

window.addEventListener("scroll", () => {
  activeNavLink();
  setHeaderShadow();
  scrollTopPage();
});

/* ----------------------------- */
/* MENU TOGGLE vezérlése         */
/* ----------------------------- */
const menuToggle = document.querySelector("nav .toggle");
const menuList = document.querySelector("nav .menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("menu-active");
  menuList.classList.toggle("menu-active");
});

/* ----------------------------- */
/* MENU ACTIVE LINK vezérlése    */
/* ----------------------------- */
const sections = document.querySelectorAll("section");
const menuitems = document.querySelectorAll("nav .menu li a.menu-ref");
const menulinks = document.querySelectorAll("a.secondary-ref");

menuitems.forEach((menuitem) => {
  menuitem.addEventListener("click", (menuevent) => {
    menuevent.preventDefault();
    let actualmenuitem = document.querySelector(".actual");
    actualmenuitem.classList.remove("actual");
    menuitem.classList.add("actual");
    let actualsection = document.querySelector(".actualsection");
    actualsection.classList.remove("actualsection");
    let nextsection = document.querySelector(
      "." + menuitem.getAttribute("data-text"),
    );
    nextsection.classList.add("actualsection");
  });
});

menulinks.forEach((menulink) => {
  menulink.addEventListener("click", (menuevent) => {
    menuevent.preventDefault();
    let actualmenuitem = document.querySelector(".actual");
    actualmenuitem.classList.remove("actual");
    let nextmenuitem = document.querySelector(
      "#" + menulink.getAttribute("data-text"),
    );
    nextmenuitem.classList.add("actual");
    let actualsection = document.querySelector(".actualsection");
    actualsection.classList.remove("actualsection");
    let nextsection = document.querySelector(
      "." + menulink.getAttribute("data-text"),
    );
    nextsection.classList.add("actualsection");
  });
});

/* ----------------------------- */
/* PHONE LINK vezérlése        */
/* ----------------------------- */
const phoneLink = document.querySelector("p.phone-number");
const phoneIcon = document.querySelector("a.phone-icon");
const phoneModal = document.querySelector(".phone-modal");
let informed = false;

phoneLink.addEventListener("mouseover", (event) => {
  if (!informed) {
    informed = true;
    phoneModal.showModal();
  }
});

phoneIcon.addEventListener("mouseover", (event) => {
  if (!informed) {
    informed = true;
    phoneModal.showModal();
  }
});

/* ----------------------------- */
/* CONTACT FORM vezérlése        */
/* ----------------------------- */
const submitButton = document.querySelector("form .submit-button");
const form = document.querySelector(".contact-form");
const items = document.querySelectorAll(".form-item");
const noticeModal = document.querySelector(".notice-modal");
const noticeParagraph = document.querySelector(".notice-modal p.message");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (Array.from(items).every((item) => item.checkValidity())) {
    sendEmail();
  } else {
    let invalidItems = Array.from(items).filter(
      (item) => !item.checkValidity(),
    );
    invalidItems.map((invalidItem) => {
      if (invalidItem.value === "") {
        invalidItem.classList.add("blank");
        invalidItem.parentElement.classList.add("blank");
      } else {
        invalidItem.classList.add("error");
        invalidItem.parentElement.classList.add("error");
      }
      invalidItem.addEventListener("keyup", (event) => {
        if (invalidItem.checkValidity()) {
          invalidItem.classList.remove("blank");
          invalidItem.parentElement.classList.remove("blank");
          invalidItem.classList.remove("error");
          invalidItem.parentElement.classList.remove("error");
        }
      });
    });
  }
});

const sendEmail = async () => {
  const formData = new FormData(form);
  let emailObject = {};
  for (const [key, value] of formData) {
    emailObject[key] = value.trim();
  }
  if (emailObject.phone) return;
  emailObject.site = "sonovic";
  try {
    const response = await fetch("https://hunmetdataapi.hu/contact/siteemail", {
      method: "POST",
      body: JSON.stringify(emailObject),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (data.status !== "success") throw new Error();
    noticeParagraph.textContent = "Üzenetét megkaptuk, hamarosan válaszolunk!";
    noticeModal.showModal();
  } catch (error) {
    noticeParagraph.textContent = `Az üzenet elküldése nem sikerült. Kérjük, próbálja meg később!`;
    noticeModal.showModal();
  } finally {
    form.reset();
  }
};

/* ----------------------------- */
/* COOKIE MODAL vezérlése        */
/* ----------------------------- */
const cookieModal = document.querySelector(".cookie-modal");

window.addEventListener("load", (event) => {
  cookieModal.showModal();
});

/* ----------------------------- */
/* NOTICE MODAL vezérlése        */
/* ----------------------------- */
/* const noticeModal = document.querySelector(".notice-modal"); */

/* window.addEventListener("load", (event) => {
  noticeModal.showModal();
}); */

/* ----------------------------- */
/* VACATION MODAL vezérlése        */
/* ----------------------------- */
/* const vacationModal = document.querySelector(".vacation-modal");

window.addEventListener("load", (event) => {
  vacationModal.showModal();
}); */

/* ----------------------------- */
/* BOOOKING MODAL vezérlése      */
/* ----------------------------- */
const bookingModal = document.querySelector(".booking-modal");
const bookingLinks = document.querySelectorAll("a.highlighted");

bookingLinks.forEach((bookingLink) => {
  bookingLink.addEventListener("click", (event) => {
    bookingModal.showModal();
  });
});


/* =========================================
   NOIR — SCRIPT
========================================= */


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================================
   CURSOR HOVER
========================================= */

const hoverElements = document.querySelectorAll(
    "a, button, .work-item, .studio-image, .hero-image"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        if (cursor) {
            cursor.classList.add("cursor-large");
        }

    });

    element.addEventListener("mouseleave", () => {

        if (cursor) {
            cursor.classList.remove("cursor-large");
        }

    });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("menu-open");

        const isOpen = navigation.classList.contains("menu-open");

        menuButton.textContent = isOpen ? "Fechar" : "Menu";

    });

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("menu-open");

            menuButton.textContent = "Menu";

        });

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".intro-content, .work-item, .studio-content, .booking-content"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (!heroImage) {
        return;
    }

    const scrollPosition = window.scrollY;

    const heroSection = document.querySelector(".hero");

    if (!heroSection) {
        return;
    }

    const heroHeight = heroSection.offsetHeight;

    if (scrollPosition <= heroHeight) {

        const movement = scrollPosition * 0.12;

        heroImage.style.transform = `translateY(${movement}px)`;

    }

});


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   IMAGE LOAD EFFECT
========================================= */

const images = document.querySelectorAll("img");

images.forEach((image) => {

    if (image.complete) {

        image.classList.add("loaded");

    } else {

        image.addEventListener("load", () => {

            image.classList.add("loaded");

        });

    }

});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach((element) => {

    element.textContent = new Date().getFullYear();

});


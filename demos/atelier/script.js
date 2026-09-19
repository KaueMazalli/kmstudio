/* =========================================================
   ATELIER
   JavaScript
========================================================= */


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("menu-open");

        const isOpen =
            navigation.classList.contains("menu-open");

        menuButton.textContent =
            isOpen ? "Fechar" : "Menu";

    });


    const navigationLinks =
        navigation.querySelectorAll("a");


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("menu-open");

            menuButton.textContent = "Menu";

        });

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });


    function updateCursor() {

        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;

        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        requestAnimationFrame(updateCursor);

    }


    updateCursor();


    const hoverElements =
        document.querySelectorAll(
            "a, button, .editorial-item, .hero-image"
        );


    hoverElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursor.style.transform =
                "translate(-50%, -50%) scale(2.5)";

        });


        element.addEventListener("mouseleave", () => {

            cursor.style.transform =
                "translate(-50%, -50%) scale(1)";

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro-content, .editorial-item, .concept-copy, .concept-detail, .contact-content"
);


if (revealElements.length) {

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(".hero-image img");


if (heroImage &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    let ticking = false;


    function updateHeroParallax() {

        const scrollY = window.scrollY;

        const heroSection =
            document.querySelector(".hero");

        if (!heroSection) {
            return;
        }


        const heroHeight =
            heroSection.offsetHeight;


        if (scrollY <= heroHeight) {

            const movement =
                scrollY * 0.08;

            heroImage.style.transform =
                `translateY(${movement}px)`;

        }

        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroParallax
            );

            ticking = true;

        }

    });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');


anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        if (!targetId || targetId === "#") {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        const header =
            document.querySelector(".header");


        const headerHeight =
            header ? header.offsetHeight : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   IMAGE LOAD
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    if (image.complete) {

        image.classList.add("loaded");

    } else {

        image.addEventListener(
            "load",
            () => {
                image.classList.add("loaded");
            },
            { once: true }
        );

    }

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements =
    document.querySelectorAll("[data-year]");


yearElements.forEach((element) => {

    element.textContent =
        new Date().getFullYear();

});


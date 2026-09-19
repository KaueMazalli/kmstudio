/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

    });


    /* Fechar menu ao clicar em um link */

    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.querySelector(".header");

if (header) {

    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

}


/* =========================================================
   REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .process-item, .about-content, .intro-content"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    /* Fallback para navegadores sem IntersectionObserver */

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}

/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

    const closeMenu = () => {

        nav.classList.remove("active");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    };


    const openMenu = () => {

        nav.classList.add("active");

        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );

    };


    menuButton.addEventListener("click", () => {

        const isOpen =
            nav.classList.contains("active");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    /* Fechar menu ao clicar em um link */

    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* Fechar menu com ESC */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.querySelector(".header");

if (header) {

    const updateHeader = () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

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
    [
        ".service-card",
        ".benefit-card",
        ".project-card",
        ".projects-cta",
        ".process-item",
        ".faq-item",
        ".about-content",
        ".intro-content"
    ].join(", ")
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

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

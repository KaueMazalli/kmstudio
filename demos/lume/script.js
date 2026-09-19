/* =========================================
   LUME — SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".main-nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");
            menuButton.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuButton.textContent = isOpen
                ? "Fechar"
                : "Menu";

        });


        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.textContent = "Menu";

            });

        });

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

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
       HEADER SCROLL
    ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 80) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();

    }


    /* =========================================
       IMAGE REVEAL
    ========================================= */

    const images = document.querySelectorAll(
        ".hero-image img, .project-image img"
    );

    images.forEach(image => {

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


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year = document.querySelector("[data-year]");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       ESC — CLOSE MOBILE MENU
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        if (!nav || !menuButton) {
            return;
        }

        nav.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.textContent = "Menu";

    });

});
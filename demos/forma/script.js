/* =========================================
   FORMA — SCRIPT
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

        });

        /* Fecha o menu ao clicar em um link */

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

            });

        });

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

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
       HEADER — SCROLL
    ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        let lastScroll = 0;

        window.addEventListener("scroll", () => {

            const currentScroll = window.scrollY;

            if (currentScroll > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            lastScroll = currentScroll;

        });

    }


    /* =========================================
       PROJECT IMAGES
    ========================================= */

    const projectImages = document.querySelectorAll(
        ".project-image img"
    );

    projectImages.forEach(image => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year = document.querySelector("[data-year]");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
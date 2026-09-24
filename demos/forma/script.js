/* =========================================
   FORMA — SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");
    const header = document.querySelector(".header");


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = menuButton.classList.toggle("active");

            nav.classList.toggle("active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            document.body.style.overflow = isOpen
                ? "hidden"
                : "";

        });


        /* Fecha o menu ao clicar em um link */

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");
                nav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                document.body.style.overflow = "";

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

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };


        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }


    /* =========================================
       PROJECT IMAGES
    ========================================= */

    const projectImages = document.querySelectorAll(
        ".project-image img"
    );

    projectImages.forEach(image => {

        const showImage = () => {
            image.classList.add("loaded");
        };


        /*
         * Caso a imagem já esteja carregada
         * quando o script for executado.
         */

        if (image.complete) {
            showImage();
        } else {
            image.addEventListener(
                "load",
                showImage,
                { once: true }
            );
        }


        /*
         * Caso a imagem não consiga carregar,
         * ela continua visível sem a animação.
         */

        image.addEventListener(
            "error",
            showImage,
            { once: true }
        );

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year = document.querySelector("[data-year]");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});

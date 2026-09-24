/* =========================================
   LUME — SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTOS
    ========================================= */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".main-nav");
    const header = document.querySelector(".site-header");


    /* =========================================
       MENU MOBILE
    ========================================= */

    if (menuButton && nav) {

        const openMenu = () => {

            nav.classList.add("active");
            menuButton.classList.add("active");

            menuButton.textContent = "Fechar";

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Fechar menu"
            );

            document.body.style.overflow = "hidden";
        };


        const closeMenu = () => {

            nav.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.textContent = "Menu";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            document.body.style.overflow = "";
        };


        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* Fecha ao clicar em um link */

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        /* Fecha com ESC */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    /* =========================================
       ROLAGEM SUAVE
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
       CARREGAMENTO DAS IMAGENS
    ========================================= */

    const images = document.querySelectorAll(
        ".hero-image img, .project-image img"
    );

    images.forEach(image => {

        const showImage = () => {
            image.classList.add("loaded");
        };


        if (image.complete) {

            showImage();

        } else {

            image.addEventListener(
                "load",
                showImage,
                { once: true }
            );

        }


        /* Evita que a imagem fique invisível
           caso o arquivo não carregue. */

        image.addEventListener(
            "error",
            showImage,
            { once: true }
        );

    });


    /* =========================================
       ANO ATUAL
    ========================================= */

    const year = document.querySelector("[data-year]");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});

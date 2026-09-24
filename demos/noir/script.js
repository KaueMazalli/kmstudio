/* =========================================
   NOIR — SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CUSTOM CURSOR
    ========================================= */

    const cursor = document.querySelector(".cursor");

    const canUseCustomCursor =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (cursor && canUseCustomCursor) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let cursorX = mouseX;
        let cursorY = mouseY;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {

            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

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
                cursor.classList.add("cursor-large");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("cursor-large");
            });

        });

    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav");

    if (menuButton && navigation) {

        const openMenu = () => {

            navigation.classList.add("menu-open");

            menuButton.textContent = "Fechar";

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Fechar menu"
            );

            document.body.classList.add("menu-open");
        };


        const closeMenu = () => {

            navigation.classList.remove("menu-open");

            menuButton.textContent = "Menu";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            document.body.classList.remove("menu-open");
        };


        menuButton.addEventListener("click", () => {

            const isOpen =
                navigation.classList.contains("menu-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        window.addEventListener("resize", () => {

            if (
                window.innerWidth > 700 &&
                navigation.classList.contains("menu-open")
            ) {
                closeMenu();
            }

        });

    }


    /* =========================================
       SMOOTH ANCHOR SCROLL
    ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

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
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".intro-content, .work-item, .studio-content, .booking-content"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

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

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       HERO PARALLAX
    ========================================= */

    const heroImage =
        document.querySelector(".hero-image img");

    const heroSection =
        document.querySelector(".hero");


    if (
        heroImage &&
        heroSection &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        let ticking = false;

        const updateParallax = () => {

            const scrollPosition =
                window.scrollY;

            const heroHeight =
                heroSection.offsetHeight;

            if (scrollPosition <= heroHeight) {

                const movement =
                    scrollPosition * 0.08;

                heroImage.style.transform =
                    `translateY(${movement}px)`;

            } else {

                heroImage.style.transform =
                    "translateY(0)";

            }

            ticking = false;
        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;
                }

            },
            {
                passive: true
            }
        );

    }


    /* =========================================
       IMAGE LOAD EFFECT
    ========================================= */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        const showImage = () => {
            image.classList.add("loaded");
        };


        if (image.complete) {

            showImage();

        } else {

            image.addEventListener(
                "load",
                showImage,
                {
                    once: true
                }
            );

            image.addEventListener(
                "error",
                showImage,
                {
                    once: true
                }
            );

        }

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const year =
        document.querySelector(".current-year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }

});

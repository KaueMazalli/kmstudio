/* =========================================================
   ATELIER
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

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


        navigation
            .querySelectorAll("a")
            .forEach((link) => {

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


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");

    const canUseCursor =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (cursor && canUseCursor && !reducedMotion) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        const updateCursor = () => {

            currentX +=
                (mouseX - currentX) * 0.18;

            currentY +=
                (mouseY - currentY) * 0.18;

            cursor.style.left = `${currentX}px`;
            cursor.style.top = `${currentY}px`;

            requestAnimationFrame(updateCursor);

        };


        updateCursor();


        const hoverElements =
            document.querySelectorAll(
                "a, button, .editorial-item, .hero-image"
            );


        hoverElements.forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursor.classList.add("cursor-large");
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {
                    cursor.classList.remove("cursor-large");
                }
            );

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".intro-content, .editorial-item, .concept-copy, .concept-detail, .contact-content"
        );


    if (revealElements.length) {

        revealElements.forEach((element) => {

            element.classList.add("reveal");

        });


        if (
            "IntersectionObserver" in window &&
            !reducedMotion
        ) {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach((entry) => {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -60px 0px"
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

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image img");

    const heroSection =
        document.querySelector(".hero");


    if (
        heroImage &&
        heroSection &&
        !reducedMotion &&
        canUseCursor
    ) {

        let ticking = false;


        const updateHeroParallax = () => {

            const scrollPosition =
                window.scrollY;

            const heroHeight =
                heroSection.offsetHeight;


            if (scrollPosition <= heroHeight) {

                const movement =
                    scrollPosition * 0.08;

                heroImage.style.transform =
                    `translate3d(0, ${movement}px, 0)`;

            } else {

                heroImage.style.transform =
                    "translate3d(0, 0, 0)";

            }


            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


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


            const header =
                document.querySelector(".header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


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


    /* =====================================================
       IMAGE LOAD
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            const markAsLoaded = () => {
                image.classList.add("loaded");
            };


            if (image.complete) {

                markAsLoaded();

            } else {

                image.addEventListener(
                    "load",
                    markAsLoaded,
                    { once: true }
                );

                image.addEventListener(
                    "error",
                    markAsLoaded,
                    { once: true }
                );

            }

        });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll("[data-year]")
        .forEach((element) => {

            element.textContent =
                new Date().getFullYear();

        });

});

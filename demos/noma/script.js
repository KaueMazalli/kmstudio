/* =========================================================
   NOMA
   Catálogo Digital — Projeto Conceitual
========================================================= */

/*
    SUBSTITUA PELO NÚMERO DO WHATSAPP DO CLIENTE.

    Formato:
    55 + DDD + número

    Exemplo:
    5511999999999
*/

const whatsappNumber = "5511999999999";


/* =========================================================
   DOM
========================================================= */

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");


/* =========================================================
   HEADER
========================================================= */

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
   MOBILE MENU
========================================================= */

if (menuToggle && nav) {

    const closeMenu = () => {

        menuToggle.classList.remove("active");
        nav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        document.body.classList.remove("menu-open");
    };


    const openMenu = () => {

        menuToggle.classList.add("active");
        nav.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fechar menu"
        );

        document.body.classList.add("menu-open");
    };


    menuToggle.addEventListener("click", () => {

        const isOpen =
            nav.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    nav.querySelectorAll("a").forEach((link) => {

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

        if (window.innerWidth > 700) {
            closeMenu();
        }

    });

}


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(productName = "") {

    let message;

    if (productName) {

        message =
            `Olá! Tenho interesse no produto "${productName}". ` +
            `Gostaria de saber mais sobre disponibilidade e pagamento.`;

    } else {

        message =
            "Olá! Gostaria de conhecer melhor os produtos do catálogo.";

    }

    const encodedMessage =
        encodeURIComponent(message);

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   PRODUCT BUTTONS
========================================================= */

const productButtons =
    document.querySelectorAll(".product-button");

productButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productName =
            button.dataset.product || "";

        openWhatsApp(productName);

    });

});


/* =========================================================
   MAIN WHATSAPP
========================================================= */

const whatsappLink =
    document.querySelector("#whatsapp-link");

if (whatsappLink) {

    whatsappLink.addEventListener("click", (event) => {

        event.preventDefault();

        openWhatsApp();

    });

}


/* =========================================================
   FOOTER WHATSAPP
========================================================= */

const footerWhatsApp =
    document.querySelector("#footer-whatsapp");

if (footerWhatsApp) {

    footerWhatsApp.addEventListener("click", (event) => {

        event.preventDefault();

        openWhatsApp();

    });

}


/* =========================================================
   SMOOTH ANCHOR
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

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

        if (nav && nav.classList.contains("open")) {

            nav.classList.remove("open");

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.classList.remove("menu-open");
        }

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
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".intro-content, " +
        ".category-card, " +
        ".product-card, " +
        ".contact-inner"
    );


if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

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


    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${Math.min(index * 0.06, 0.3)}s`;

        observer.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================================
   IMAGE LOAD
========================================================= */

document.querySelectorAll("img").forEach((image) => {

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
    document.querySelectorAll(
        "#current-year, [data-year]"
    );

yearElements.forEach((element) => {

    element.textContent =
        new Date().getFullYear();

});

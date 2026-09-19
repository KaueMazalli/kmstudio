/* =========================================================
   ÉLAN
   Clínica de Estética — Projeto Conceitual
========================================================= */




/* =========================================================
   HEADER
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
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro-content, .treatment-card, .experience-content, .philosophy-content, .faq-list, .contact-inner"
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

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   SMOOTH ANCHOR
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight = header
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


/* =========================================================
   IMAGE LOAD
========================================================= */

document.querySelectorAll("img").forEach((image) => {

    if (image.complete) {
        image.classList.add("loaded");
    } else {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

    }

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements = document.querySelectorAll("[data-year]");

yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
});

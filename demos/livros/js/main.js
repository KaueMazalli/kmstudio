/* =========================================================
   ENTRELINHAS — MAIN
========================================================= */


/* =========================================================
   LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {
        lucide.createIcons();
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (window.lucide) {
                    lucide.createIcons();
                }

            });

        });

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.querySelector(".cart-count");

    if (!cartCount) {
        return;
    }

    const cart =
        JSON.parse(
            localStorage.getItem("entrelinhas-cart")
        ) || [];

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

    cartCount.textContent = totalItems;

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();
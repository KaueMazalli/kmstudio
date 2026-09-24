/* =========================================================
   NOBRE DETAIL
   SCRIPT
========================================================= */


/* =========================================================
   LUCIDE
========================================================= */

lucide.createIcons();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

menuButton.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("active");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

    lucide.createIcons();

});


document.querySelectorAll(".mobile-nav a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.innerHTML =
            '<i data-lucide="menu"></i>';

        lucide.createIcons();

    });

});


/* =========================================================
   HEADER ON SCROLL
========================================================= */

const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        siteHeader.style.background =
            "rgba(10,11,12,.96)";

    } else {

        siteHeader.style.background =
            "rgba(10,11,12,.88)";

    }

});


/* =========================================================
   BEFORE / AFTER
========================================================= */

const comparison =
    document.getElementById("comparison");

const comparisonAfter =
    document.getElementById("comparisonAfter");

const comparisonHandle =
    document.getElementById("comparisonHandle");

let dragging = false;


function updateComparison(clientX) {

    const rect =
        comparison.getBoundingClientRect();

    let position =
        ((clientX - rect.left) / rect.width) * 100;

    position =
        Math.max(0, Math.min(100, position));

    comparisonAfter.style.width =
        `${position}%`;

    comparisonHandle.style.left =
        `${position}%`;

}


comparison.addEventListener("mousedown", () => {

    dragging = true;

});


window.addEventListener("mouseup", () => {

    dragging = false;

});


window.addEventListener("mousemove", event => {

    if (!dragging) return;

    updateComparison(event.clientX);

});


comparison.addEventListener(
    "touchstart",
    event => {

        dragging = true;

        updateComparison(
            event.touches[0].clientX
        );

    },
    { passive: true }
);


window.addEventListener(
    "touchmove",
    event => {

        if (!dragging) return;

        updateComparison(
            event.touches[0].clientX
        );

    },
    { passive: true }
);


window.addEventListener("touchend", () => {

    dragging = false;

});


/* =========================================================
   CALCULATOR
========================================================= */

let vehicleMultiplier = 1.2;


function setVehicle(button) {

    document
        .querySelectorAll(".vehicle-option")
        .forEach(option => {

            option.classList.remove("active");

        });

    button.classList.add("active");

    vehicleMultiplier =
        Number(button.dataset.multiplier);

    calculateTotal();

}


function calculateTotal() {

    let total = 0;

    document
        .querySelectorAll(
            ".calculator-service input:checked"
        )
        .forEach(input => {

            total += Number(input.value);

        });

    const finalValue =
        Math.round(total * vehicleMultiplier);

    document.getElementById("totalPrice").textContent =
        finalValue.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}


/* =========================================================
   BOOKING MODAL
========================================================= */

const bookingModal =
    document.getElementById("bookingModal");

const serviceSelect =
    document.getElementById("serviceSelect");


function openBookingModal() {

    bookingModal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeBookingModal() {

    bookingModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


function selectService(service) {

    serviceSelect.value = service;

    openBookingModal();

}


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        bookingModal.classList.contains("active")
    ) {

        closeBookingModal();

    }

});


/* =========================================================
   BOOKING FORM
========================================================= */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            document
                .getElementById("clientName")
                .value
                .trim();

        const phone =
            document
                .getElementById("clientPhone")
                .value
                .trim();

        const car =
            document
                .getElementById("clientCar")
                .value
                .trim();

        const service =
            serviceSelect.value;


        const message =
            `Olá! Gostaria de solicitar um orçamento na Nobre Detail.%0A%0A` +
            `Nome: ${encodeURIComponent(name)}%0A` +
            `WhatsApp: ${encodeURIComponent(phone)}%0A` +
            `Veículo: ${encodeURIComponent(car)}%0A` +
            `Serviço: ${encodeURIComponent(service)}`;


        const whatsappNumber =
            "5517999999999";


        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            "_blank"
        );


        closeBookingModal();

        showToast(
            "Abrindo WhatsApp..."
        );

        bookingForm.reset();

    }
);


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp() {

    const whatsappNumber =
        "5517999999999";

    const message =
        "Olá! Gostaria de conhecer os serviços da Nobre Detail.";

    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

}
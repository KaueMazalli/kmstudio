/* =========================================================
   NOBRE DETAIL
   SCRIPT
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const WHATSAPP_NUMBER = "5517999999999";


/* =========================================================
   LUCIDE
========================================================= */

if (typeof lucide !== "undefined") {

    lucide.createIcons();

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");


if (menuButton && mobileNav) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileNav.classList.toggle(
                    "active"
                );


            menuButton.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );


            menuButton.innerHTML =
                isOpen
                    ? '<i data-lucide="x"></i>'
                    : '<i data-lucide="menu"></i>';


            if (typeof lucide !== "undefined") {

                lucide.createIcons();

            }

        }
    );


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "active"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuButton.innerHTML =
                        '<i data-lucide="menu"></i>';


                    if (typeof lucide !== "undefined") {

                        lucide.createIcons();

                    }

                }
            );

        });

}


/* =========================================================
   HEADER ON SCROLL
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");


if (siteHeader) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 40) {

                siteHeader.style.background =
                    "rgba(10, 11, 12, .96)";

            } else {

                siteHeader.style.background =
                    "rgba(10, 11, 12, .88)";

            }

        }
    );

}


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

    if (
        !comparison ||
        !comparisonAfter ||
        !comparisonHandle
    ) {

        return;

    }


    const rect =
        comparison.getBoundingClientRect();


    let position =
        (
            (clientX - rect.left) /
            rect.width
        ) * 100;


    position =
        Math.max(
            0,
            Math.min(
                100,
                position
            )
        );


    comparisonAfter.style.width =
        `${position}%`;


    comparisonHandle.style.left =
        `${position}%`;

}


if (comparison) {

    comparison.addEventListener(
        "mousedown",
        () => {

            dragging = true;

        }
    );


    window.addEventListener(
        "mouseup",
        () => {

            dragging = false;

        }
    );


    window.addEventListener(
        "mousemove",
        event => {

            if (!dragging) return;

            updateComparison(
                event.clientX
            );

        }
    );


    comparison.addEventListener(
        "touchstart",
        event => {

            dragging = true;

            updateComparison(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        event => {

            if (!dragging) return;

            updateComparison(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        () => {

            dragging = false;

        }
    );

}


/* =========================================================
   CALCULATOR
========================================================= */

let vehicleMultiplier = 1.2;

let selectedVehicle =
    "Sedan / SUV Médio";


/* =========================================================
   SELECIONAR VEÍCULO
========================================================= */

function setVehicle(button) {

    if (!button) return;


    document
        .querySelectorAll(
            ".vehicle-option"
        )
        .forEach(option => {

            option.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    vehicleMultiplier =
        Number(
            button.dataset.multiplier
        ) || 1;


    selectedVehicle =
        button.dataset.vehicle ||
        button.textContent
            .trim();


    calculateTotal();

}


/* =========================================================
   CALCULAR TOTAL
========================================================= */

function calculateTotal() {

    let total = 0;


    document
        .querySelectorAll(
            '.calculator-service input[type="checkbox"]:checked'
        )
        .forEach(input => {

            total +=
                Number(
                    input.value
                ) || 0;

        });


    const finalValue =
        Math.round(
            total *
            vehicleMultiplier
        );


    const totalPrice =
        document.getElementById(
            "totalPrice"
        );


    if (totalPrice) {

        totalPrice.textContent =
            finalValue.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }


    return finalValue;

}


/* =========================================================
   PEGAR SERVIÇOS SELECIONADOS
========================================================= */

function getSelectedCalculatorServices() {

    const services = [];


    document
        .querySelectorAll(
            '.calculator-service input[type="checkbox"]:checked'
        )
        .forEach(input => {

            const serviceName =
                input.dataset.service ||
                "Serviço";


            const price =
                Number(
                    input.value
                ) || 0;


            services.push({

                name:
                    serviceName,

                price:
                    price

            });

        });


    return services;

}


/* =========================================================
   SIMULADOR → WHATSAPP
========================================================= */

function openBookingModalWithSimulatedData() {

    const services =
        getSelectedCalculatorServices();


    /* -----------------------------------------------------
       Nenhum serviço selecionado
    ----------------------------------------------------- */

    if (services.length === 0) {

        showToast(
            "Selecione pelo menos um serviço."
        );

        return;

    }


    /* -----------------------------------------------------
       Calcula o total novamente
    ----------------------------------------------------- */

    const total =
        calculateTotal();


    /* -----------------------------------------------------
       Monta lista dos serviços
    ----------------------------------------------------- */

    const servicesText =
        services
            .map(service => {

                const price =
                    service.price.toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL"
                        }
                    );


                return (
                    `• ${service.name} — ${price}`
                );

            })
            .join("\n");


    /* -----------------------------------------------------
       Formata o total
    ----------------------------------------------------- */

    const formattedTotal =
        total.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );


    /* -----------------------------------------------------
       Mensagem
    ----------------------------------------------------- */

    const message =
`Olá, Nobre Detail!

Gostaria de solicitar um orçamento com base no simulador.

*Porte do veículo:*
${selectedVehicle}

*Serviços selecionados:*
${servicesText}

*Valor estimado:*
${formattedTotal}

Gostaria de confirmar o orçamento e verificar a disponibilidade.`;


    /* -----------------------------------------------------
       Abre WhatsApp
    ----------------------------------------------------- */

    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* =========================================================
   BOOKING MODAL
========================================================= */

const bookingModal =
    document.getElementById(
        "bookingModal"
    );


const serviceSelect =
    document.getElementById(
        "serviceSelect"
    );


function openBookingModal() {

    if (!bookingModal) return;


    bookingModal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeBookingModal() {

    if (!bookingModal) return;


    bookingModal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   SERVIÇO → MODAL
========================================================= */

function selectService(service) {

    if (serviceSelect) {

        serviceSelect.value =
            service;

    }


    openBookingModal();

}


/* =========================================================
   ESC → FECHAR MODAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            bookingModal &&
            bookingModal.classList.contains(
                "active"
            )
        ) {

            closeBookingModal();

        }

    }
);


/* =========================================================
   CLICK FORA DO MODAL
========================================================= */

if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                bookingModal
            ) {

                closeBookingModal();

            }

        }
    );

}


/* =========================================================
   BOOKING FORM
========================================================= */

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "clientName"
                    )
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById(
                        "clientPhone"
                    )
                    ?.value
                    .trim() || "";


            const car =
                document
                    .getElementById(
                        "clientCar"
                    )
                    ?.value
                    .trim() || "";


            const service =
                serviceSelect?.value ||
                "Não informado";


            if (
                !name ||
                !phone ||
                !car
            ) {

                showToast(
                    "Preencha todos os campos."
                );

                return;

            }


            const message =
`Olá, Nobre Detail!

Gostaria de solicitar um orçamento.

*Nome:* ${name}
*WhatsApp:* ${phone}
*Veículo:* ${car}
*Serviço:* ${service}

Gostaria de saber a disponibilidade e o valor do serviço.`;


            const whatsappUrl =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappUrl,
                "_blank"
            );


            closeBookingModal();


            showToast(
                "Abrindo WhatsApp..."
            );


            bookingForm.reset();

        }
    );

}


/* =========================================================
   ORÇAMENTO RÁPIDO
========================================================= */

function openQuickQuoteWhatsApp() {

    const message =
`Olá, Nobre Detail!

Gostaria de solicitar um orçamento para meu veículo.

Gostaria de conhecer os serviços disponíveis, valores e horários para atendimento.`;


    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* =========================================================
   WHATSAPP GERAL
========================================================= */

function openWhatsApp() {

    const message =
        "Olá! Gostaria de conhecer os serviços da Nobre Detail.";


    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* =========================================================
   SERVIÇO → ORÇAMENTO
========================================================= */

function selectServiceForQuote(
    serviceName
) {

    if (!serviceSelect) {

        openQuickQuoteWhatsApp();

        return;

    }


    for (
        let i = 0;
        i < serviceSelect.options.length;
        i++
    ) {

        const option =
            serviceSelect.options[i];


        if (
            option.text
                .toLowerCase()
                .includes(
                    serviceName.toLowerCase()
                )
        ) {

            serviceSelect.selectedIndex =
                i;

            break;

        }

    }


    openBookingModal();

}


/* =========================================================
   CONTACT FORM → WHATSAPP
========================================================= */

function handleContactSubmit(event) {

    event.preventDefault();


    const form =
        event.target;


    const name =
        form.querySelector(
            '[name="name"]'
        )?.value.trim() || "";


    const phone =
        form.querySelector(
            '[name="phone"]'
        )?.value.trim() || "";


    const messageField =
        form.querySelector(
            '[name="message"]'
        )?.value.trim() || "";


    const message =
`Olá, Nobre Detail!

Gostaria de entrar em contato.

*Nome:* ${name}
*WhatsApp:* ${phone}

*Mensagem:*
${messageField}`;


    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );


    showToast(
        "Abrindo WhatsApp..."
    );


    form.reset();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (
        !toast ||
        !toastMessage
    ) {

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* =========================================================
   CALCULADORA — EVENTOS
========================================================= */

document
    .querySelectorAll(
        '.calculator-service input[type="checkbox"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            calculateTotal
        );

    });


/* =========================================================
   CALCULADORA — INICIALIZAÇÃO
========================================================= */

calculateTotal();
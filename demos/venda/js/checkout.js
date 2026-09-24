/* =========================================================
   CHECKOUT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCheckout();

        setupListeners();

    }
);


/* =========================================================
   RENDERIZAR PEDIDO
========================================================= */

function renderCheckout() {

    const orderSummary =
        document.getElementById(
            "order-summary"
        );


    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    let subtotal = 0;


    /* =====================================================
       CARRINHO VAZIO
    ===================================================== */

    if (
        !cart ||
        cart.length === 0
    ) {

        orderSummary.innerHTML = `

            <div class="empty-checkout">

                <p>
                    Seu carrinho está vazio.
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary"
                >
                    Voltar para produtos
                </a>

            </div>

        `;


        if (checkoutForm) {

            checkoutForm.style.display =
                "none";

        }


        return;

    }


    /* =====================================================
       PRODUTOS
    ===================================================== */

    let summaryHtml = `

        <ul class="checkout-products">

    `;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal += itemTotal;


        summaryHtml += `

            <li class="checkout-product">

                <div class="checkout-product-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        ${item.quantity}x
                    </span>

                </div>


                <strong>
                    R$
                    ${itemTotal
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>

            </li>

        `;

    });


    summaryHtml += `

        </ul>

    `;


    orderSummary.innerHTML =
        summaryHtml;


    updateTotals(subtotal);

}


/* =========================================================
   ATUALIZAR TOTAIS
========================================================= */

function updateTotals(subtotal) {

    const selectedDelivery =
        document.querySelector(
            'input[name="deliveryMethod"]:checked'
        );


    /*
     * Se não houver uma opção selecionada,
     * considera retirada.
     */

    const deliveryMethod =
        selectedDelivery
            ? selectedDelivery.value
            : "retirada";


    let fee = 0;


    if (
        deliveryMethod === "entrega" &&
        SHOP_CONFIG.delivery.enabled
    ) {

        fee =
            Number(
                SHOP_CONFIG.delivery.fee
            ) || 0;

    }


    const total =
        subtotal + fee;


    /* =====================================================
       VALORES
    ===================================================== */

    const subtotalDisplay =
        document.getElementById(
            "subtotal-display"
        );


    const feeDisplay =
        document.getElementById(
            "fee-display"
        );


    const totalDisplay =
        document.getElementById(
            "total-display"
        );


    if (subtotalDisplay) {

        subtotalDisplay.textContent =
            formatMoney(subtotal);

    }


    if (feeDisplay) {

        feeDisplay.textContent =
            formatMoney(fee);

    }


    if (totalDisplay) {

        totalDisplay.textContent =
            formatMoney(total);

    }


    /* =====================================================
       ELEMENTOS DE ENTREGA
    ===================================================== */

    const paymentStore =
        document.getElementById(
            "pay-store"
        );


    const paymentDelivery =
        document.getElementById(
            "pay-delivery"
        );


    const addressFields =
        document.getElementById(
            "address-fields"
        );


    const deliveryInput =
        document.querySelector(
            'input[name="deliveryMethod"][value="entrega"]'
        );


    const pickupInput =
        document.querySelector(
            'input[name="deliveryMethod"][value="retirada"]'
        );


    /* =====================================================
       ENTREGA DESATIVADA
    ===================================================== */

    if (
        !SHOP_CONFIG.delivery.enabled &&
        deliveryInput
    ) {

        deliveryInput.checked =
            false;


        deliveryInput.disabled =
            true;


        const deliveryLabel =
            deliveryInput.closest(
                ".radio-card"
            );


        if (deliveryLabel) {

            deliveryLabel.style.display =
                "none";

        }


        if (pickupInput) {

            pickupInput.checked =
                true;

        }

    }


    /* =====================================================
       RETIRADA
    ===================================================== */

    if (
        deliveryMethod === "retirada"
    ) {

        if (paymentStore) {

            paymentStore.style.display =
                "block";

        }


        if (paymentDelivery) {

            paymentDelivery.style.display =
                "none";

        }


        if (addressFields) {

            addressFields.style.display =
                "none";

        }


        disableAddressFields(true);


        /*
         * Se PIX ou pagamento na entrega
         * estiver selecionado, mantém PIX
         * como opção válida para retirada.
         */

        const selectedPayment =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (
            selectedPayment &&
            selectedPayment.value ===
                "pagamento_entrega"
        ) {

            const pix =
                document.querySelector(
                    'input[name="paymentMethod"][value="pix"]'
                );


            if (pix) {

                pix.checked =
                    true;

            }

        }

    }


    /* =====================================================
       ENTREGA
    ===================================================== */

    else {

        if (paymentStore) {

            paymentStore.style.display =
                "none";

        }


        if (paymentDelivery) {

            paymentDelivery.style.display =
                "block";

        }


        if (addressFields) {

            addressFields.style.display =
                "block";

        }


        disableAddressFields(false);


        /*
         * Se "Pagar na loja" estiver selecionado
         * e o cliente mudar para entrega,
         * volta para PIX.
         */

        const selectedPayment =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (
            selectedPayment &&
            selectedPayment.value ===
                "pagamento_loja"
        ) {

            const pix =
                document.querySelector(
                    'input[name="paymentMethod"][value="pix"]'
                );


            if (pix) {

                pix.checked =
                    true;

            }

        }

    }


    /* =====================================================
       MÍNIMO PARA ENTREGA
    ===================================================== */

    showMinimumOrderMessage(
        subtotal,
        deliveryMethod
    );

}


/* =========================================================
   CAMPOS DE ENDEREÇO
========================================================= */

function disableAddressFields(
    disabled
) {

    const fields = [

        document.getElementById(
            "address-street"
        ),

        document.getElementById(
            "address-number"
        ),

        document.getElementById(
            "address-city"
        )

    ];


    fields.forEach(field => {

        if (!field) {
            return;
        }


        field.disabled =
            disabled;


        field.required =
            !disabled;

    });

}


/* =========================================================
   MÍNIMO DO PEDIDO
========================================================= */

function showMinimumOrderMessage(
    subtotal,
    deliveryMethod
) {

    const existing =
        document.querySelector(
            ".minimum-order-message"
        );


    if (existing) {

        existing.remove();

    }


    if (
        deliveryMethod !== "entrega"
    ) {

        return;

    }


    const minimum =
        Number(
            SHOP_CONFIG.delivery.minimumOrder
        ) || 0;


    if (
        minimum <= 0 ||
        subtotal >= minimum
    ) {

        return;

    }


    const form =
        document.getElementById(
            "checkout-form"
        );


    if (!form) {
        return;
    }


    const message =
        document.createElement(
            "div"
        );


    message.className =
        "minimum-order-message";


    message.textContent =
        `O valor mínimo para entrega é ${formatMoney(minimum)}.`;


    form.insertBefore(
        message,
        form.firstChild
    );

}


/* =========================================================
   EVENTOS
========================================================= */

function setupListeners() {

    const deliveryOptions =
        document.querySelectorAll(
            'input[name="deliveryMethod"]'
        );


    deliveryOptions.forEach(
        option => {

            option.addEventListener(
                "change",
                () => {

                    const subtotal =
                        calculateSubtotal();

                    updateTotals(
                        subtotal
                    );

                }
            );

        }
    );


    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    if (!checkoutForm) {
        return;
    }


    checkoutForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            finalizeOrder();

        }
    );

}


/* =========================================================
   SUBTOTAL
========================================================= */

function calculateSubtotal() {

    return cart.reduce(
        (total, item) => {

            return (
                total +
                (
                    item.price *
                    item.quantity
                )
            );

        },
        0
    );

}


/* =========================================================
   FINALIZAR PEDIDO
========================================================= */

function finalizeOrder() {

    if (
        !cart ||
        cart.length === 0
    ) {

        return;

    }


    /* =====================================================
       DADOS DO CLIENTE
    ===================================================== */

    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    /* =====================================================
       RECEBIMENTO
    ===================================================== */

    const deliveryOption =
        document.querySelector(
            'input[name="deliveryMethod"]:checked'
        );


    const paymentOption =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (
        !deliveryOption ||
        !paymentOption
    ) {

        alert(
            "Selecione as opções de recebimento e pagamento."
        );

        return;

    }


    const deliveryMethod =
        deliveryOption.value;


    const paymentMethod =
        paymentOption.value;


    /* =====================================================
       SUBTOTAL
    ===================================================== */

    let subtotal = 0;

    let orderItemsText = "";


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal +=
            itemTotal;


        orderItemsText +=
            `• ${item.name} × ${item.quantity} — ${formatMoney(itemTotal)}\n`;

    });


    /* =====================================================
       ENTREGA
    ===================================================== */

    const fee =
        deliveryMethod === "entrega"
            ? Number(
                SHOP_CONFIG.delivery.fee
            ) || 0
            : 0;


    const total =
        subtotal + fee;


    /* =====================================================
       VALOR MÍNIMO
    ===================================================== */

    if (
        deliveryMethod === "entrega"
    ) {

        const minimum =
            Number(
                SHOP_CONFIG.delivery.minimumOrder
            ) || 0;


        if (
            minimum > 0 &&
            subtotal < minimum
        ) {

            alert(
                `O valor mínimo para entrega é ${formatMoney(minimum)}.`
            );

            return;

        }

    }


    /* =====================================================
       ENDEREÇO
    ===================================================== */

    let addressText = "";


    if (
        deliveryMethod === "entrega"
    ) {

        const street =
            document.getElementById(
                "address-street"
            ).value.trim();


        const number =
            document.getElementById(
                "address-number"
            ).value.trim();


        const city =
            document.getElementById(
                "address-city"
            ).value.trim();


        addressText =

            `\n*ENDEREÇO DE ENTREGA*\n` +

            `${street}, ${number}\n` +

            `${city}`;

    }


    else {

        addressText =

            `\n*RECEBIMENTO*\n` +

            `Retirar na loja\n` +

            `${SHOP_CONFIG.storeAddress}`;

    }


    /* =====================================================
       PAGAMENTO
    ===================================================== */

    let paymentText = "";


    switch (paymentMethod) {

        case "pix":

            paymentText =
                "PIX";

            break;


        case "pagamento_entrega":

            paymentText =
                "Pagar na entrega";

            break;


        case "pagamento_loja":

            paymentText =
                "Pagar na loja";

            break;


        default:

            paymentText =
                paymentMethod;

    }


    /* =====================================================
       MENSAGEM WHATSAPP
    ===================================================== */

    let message =

        `Olá! Gostaria de confirmar meu pedido.\n\n` +


        `*CLIENTE*\n` +

        `Nome: ${name}\n` +

        `WhatsApp: ${phone}\n\n` +


        `*PEDIDO*\n` +

        `${orderItemsText}\n` +


        `Subtotal: ${formatMoney(subtotal)}\n` +

        `Entrega: ${formatMoney(fee)}\n` +


        `*TOTAL: ${formatMoney(total)}*` +


        `${addressText}\n\n` +


        `*PAGAMENTO*\n` +

        `${paymentText}`;


    /* =====================================================
       PIX
    ===================================================== */

    if (
        paymentMethod === "pix" &&
        SHOP_CONFIG.pixKey
    ) {

        message +=

            `\n\n*CHAVE PIX*\n` +

            `${SHOP_CONFIG.pixKey}`;

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    const encodedMessage =
        encodeURIComponent(
            message
        );


    const whatsappUrl =
        `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`;


    /* =====================================================
       LIMPAR CARRINHO
    ===================================================== */

    localStorage.removeItem(
        "km_cart"
    );


    /* Atualiza a variável em memória */

    cart = [];


    /* =====================================================
       REDIRECIONAR
    ===================================================== */

    window.location.href =
        whatsappUrl;

}


/* =========================================================
   FORMATAÇÃO DE DINHEIRO
========================================================= */

function formatMoney(value) {

    return (

        "R$ " +

        Number(value)
            .toFixed(2)
            .replace(".", ",")

    );

}
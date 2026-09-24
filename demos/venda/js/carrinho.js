/* =========================================================
   CARRINHO — PÁGINA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();

    }
);


/* =========================================================
   RENDERIZAR CARRINHO
========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cart-content"
        );


    if (!container) {
        return;
    }


    /* =====================================================
       CARRINHO VAZIO
    ===================================================== */

    if (
        !cart ||
        cart.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Seu carrinho está vazio
                </h2>

                <p>
                    Adicione alguns produtos
                    para continuar.
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary"
                >
                    Ver produtos
                </a>

            </div>

        `;

        return;

    }


    /* =====================================================
       SUBTOTAL
    ===================================================== */

    let subtotal = 0;


    let itemsHtml = `

        <div class="cart-items">

    `;


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal +=
            itemTotal;


        itemsHtml += `

            <article
                class="cart-item"
                data-id="${item.id}"
            >

                <a
                    href="produto.html?id=${item.id}"
                    class="cart-item-image"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </a>


                <div class="cart-item-info">

                    <span class="cart-item-category">
                        ${item.category}
                    </span>


                    <a
                        href="produto.html?id=${item.id}"
                        class="cart-item-name"
                    >
                        ${item.name}
                    </a>


                    <div class="cart-item-price">

                        ${formatMoney(item.price)}
                        cada

                    </div>

                </div>


                <div class="cart-item-controls">

                    <div class="quantity-control">

                        <button
                            type="button"
                            onclick="changeCartQuantity(
                                ${item.id},
                                -1
                            )"
                            aria-label="Diminuir quantidade"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            onclick="changeCartQuantity(
                                ${item.id},
                                1
                            )"
                            aria-label="Aumentar quantidade"
                        >
                            +
                        </button>

                    </div>


                    <div>

                        <div class="cart-item-total">

                            ${formatMoney(itemTotal)}

                        </div>


                        <button
                            type="button"
                            class="remove-item"
                            onclick="removeCartItem(${item.id})"
                        >
                            Remover
                        </button>

                    </div>

                </div>

            </article>

        `;

    });


    itemsHtml += `

        </div>

    `;


    /* =====================================================
       RESUMO
    ===================================================== */

    const deliveryFee =
        SHOP_CONFIG.delivery.enabled
            ? Number(
                SHOP_CONFIG.delivery.fee
            ) || 0
            : 0;


    itemsHtml += `

        <aside class="cart-summary">

            <h2>
                Resumo do pedido
            </h2>


            <div class="summary-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${formatMoney(subtotal)}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Entrega
                </span>

                <strong>
                    A calcular no checkout
                </strong>

            </div>


            <div class="summary-row summary-total">

                <span>
                    Total
                </span>

                <strong>
                    ${formatMoney(subtotal)}
                </strong>

            </div>


            <a
                href="checkout.html"
                class="btn btn-primary checkout-button"
            >
                Finalizar pedido
            </a>


            <a
                href="index.html"
                class="continue-shopping"
            >
                Continuar comprando
            </a>

        </aside>

    `;


    container.innerHTML =
        itemsHtml;

}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity +=
        change;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                item =>
                    item.id !== productId
            );

    }


    saveCart();

    renderCart();

}


/* =========================================================
   REMOVER ITEM
========================================================= */

function removeCartItem(
    productId
) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

    renderCart();

}


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatMoney(value) {

    return (

        "R$ " +

        Number(value)
            .toFixed(2)
            .replace(".", ",")

    );

}
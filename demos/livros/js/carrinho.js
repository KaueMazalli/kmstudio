/* =========================================================
   ENTRELINHAS — CARRINHO
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const cartLayout =
    document.getElementById("cart-layout");

const cartItems =
    document.getElementById("cart-items");

const cartSummary =
    document.getElementById("cart-summary");

const cartEmpty =
    document.getElementById("cart-empty");

const cartSubtotal =
    document.getElementById("cart-subtotal");

const summaryItems =
    document.getElementById("summary-items");

const checkoutButton =
    document.getElementById("checkout-button");


/* =========================================================
   CART
========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "entrelinhas-cart"
        )
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "entrelinhas-cart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cart = getCart();


    if (!cart.length) {

        if (cartLayout) {
            cartLayout.hidden = true;
        }

        if (cartEmpty) {
            cartEmpty.hidden = false;
        }

        return;

    }


    if (cartLayout) {
        cartLayout.hidden = false;
    }

    if (cartEmpty) {
        cartEmpty.hidden = true;
    }


    cartItems.innerHTML = "";


    let subtotal = 0;

    let totalItems = 0;


    cart.forEach((item) => {

        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(item.preco) || 0;


        subtotal +=
            price * quantity;


        totalItems +=
            quantity;


        const article =
            document.createElement("article");


        article.className =
            "cart-item";


        article.innerHTML = `

            <a
                href="produto.html?id=${item.id}"
                class="cart-item-image"
            >

                <img
                    src="${item.imagem}"
                    alt="${item.titulo}"
                >

            </a>


            <div class="cart-item-info">

                <p class="cart-item-category">
                    Livro
                </p>


                <h2 class="cart-item-title">

                    <a
                        href="produto.html?id=${item.id}"
                    >
                        ${item.titulo}
                    </a>

                </h2>


                <p class="cart-item-author">
                    ${item.autor}
                </p>


                <p class="cart-item-price">
                    ${formatPrice(price)}
                </p>

            </div>


            <div class="cart-item-actions">

                <div class="quantity-control">

                    <button
                        type="button"
                        class="quantity-button"
                        data-action="decrease"
                        data-id="${item.id}"
                        aria-label="Diminuir quantidade"
                    >

                        <i data-lucide="minus"></i>

                    </button>


                    <span
                        class="quantity-value"
                    >
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-button"
                        data-action="increase"
                        data-id="${item.id}"
                        aria-label="Aumentar quantidade"
                    >

                        <i data-lucide="plus"></i>

                    </button>

                </div>


                <button
                    type="button"
                    class="remove-button"
                    data-action="remove"
                    data-id="${item.id}"
                    aria-label="Remover ${item.titulo}"
                >

                    <i data-lucide="trash-2"></i>

                </button>

            </div>

        `;


        cartItems.appendChild(article);

    });


    cartSubtotal.textContent =
        formatPrice(subtotal);


    summaryItems.textContent =
        `${totalItems} ${
            totalItems === 1
                ? "item"
                : "itens"
        }`;


    if (window.lucide) {
        lucide.createIcons();
    }


    bindCartActions();

}


/* =========================================================
   CART ACTIONS
========================================================= */

function bindCartActions() {

    document
        .querySelectorAll(
            "[data-action]"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const action =
                        button.dataset.action;


                    updateCartItem(
                        id,
                        action
                    );

                }
            );

        });

}


/* =========================================================
   UPDATE ITEM
========================================================= */

function updateCartItem(
    id,
    action
) {

    const cart = getCart();


    const item =
        cart.find(
            (product) =>
                product.id === id
        );


    if (!item) {
        return;
    }


    if (action === "increase") {

        item.quantity += 1;

    }


    if (action === "decrease") {

        item.quantity -= 1;


        if (item.quantity <= 0) {

            const index =
                cart.findIndex(
                    (product) =>
                        product.id === id
                );


            cart.splice(
                index,
                1
            );

        }

    }


    if (action === "remove") {

        const index =
            cart.findIndex(
                (product) =>
                    product.id === id
            );


        cart.splice(
            index,
            1
        );

    }


    saveCart(cart);


    if (
        typeof updateCartCount ===
        "function"
    ) {

        updateCartCount();

    }


    renderCart();

}


/* =========================================================
   INITIALIZE
========================================================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        handleCheckout
    );

}


renderCart();
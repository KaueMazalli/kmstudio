/* =========================================================
   KM STUDIO — CARRINHO
========================================================= */

let cart =
    JSON.parse(
        localStorage.getItem("km_cart")
    ) || [];


/* =========================================================
   SALVAR
========================================================= */

function saveCart() {

    localStorage.setItem(
        "km_cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* =========================================================
   ADICIONAR PRODUTO
========================================================= */

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        products.find(
            product =>
                product.id === productId
        );


    if (!product) {
        return;
    }


    /* Garante que a quantidade seja válida */

    quantity =
        Math.max(
            1,
            Number(quantity) || 1
        );


    const existingItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }


    saveCart();


    showCartNotification(
        `${product.name} adicionado ao carrinho.`
    );

}


/* =========================================================
   REMOVER PRODUTO
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

}


/* =========================================================
   ALTERAR QUANTIDADE
========================================================= */

function updateCartQuantity(
    productId,
    quantity
) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );


    if (!item) {
        return;
    }


    quantity =
        Number(quantity);


    if (
        !Number.isFinite(quantity) ||
        quantity <= 0
    ) {

        removeFromCart(productId);

        return;

    }


    item.quantity =
        Math.floor(quantity);


    saveCart();

}


/* =========================================================
   CALCULAR SUBTOTAL
========================================================= */

function getCartSubtotal() {

    return cart.reduce(
        (total, item) => {

            return (
                total +
                item.price *
                item.quantity
            );

        },
        0
    );

}


/* =========================================================
   CONTADOR DO CARRINHO
========================================================= */

function updateCartCount() {

    const countElements =
        document.querySelectorAll(
            ".cart-count"
        );


    const totalItems =
        cart.reduce(
            (total, item) =>
                total +
                item.quantity,
            0
        );


    countElements.forEach(
        element => {

            element.textContent =
                totalItems;

        }
    );

}


/* =========================================================
   NOTIFICAÇÃO
========================================================= */

function showCartNotification(
    message
) {

    let notification =
        document.querySelector(
            ".cart-notification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );


        notification.className =
            "cart-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    notification.classList.add(
        "active"
    );


    clearTimeout(
        window.cartNotificationTimeout
    );


    window.cartNotificationTimeout =
        setTimeout(
            () => {

                notification.classList.remove(
                    "active"
                );

            },
            2800
        );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

    }
);
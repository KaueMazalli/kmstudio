/* =========================================================
   PATA & CIA
   KM STUDIO — SCRIPT
========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,

        name: "Ração Golden Fórmula Cães Adultos",

        category: "Cães",

        price: 139.90,

        image:
            "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=85",

        description:
            "Ração premium especial para cães adultos, desenvolvida para uma alimentação completa e equilibrada."
    },


    {
        id: 2,

        name: "Ração Premier Gatos Castrados",

        category: "Gatos",

        price: 219.90,

        image:
            "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=700&q=85",

        description:
            "Fórmula desenvolvida para gatos castrados, com nutrientes selecionados para uma alimentação equilibrada."
    },


    {
        id: 3,

        name: "Ração Pedigree Filhotes",

        category: "Cães",

        price: 24.90,

        image:
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85",

        description:
            "Alimentação completa para filhotes, com nutrientes importantes para a fase de crescimento."
    },


    {
        id: 4,

        name: "Mistura Premium para Calopsitas",

        category: "Pássaros",

        price: 19.90,

        image:
            "https://images.unsplash.com/photo-1522858547137-f1d52d274431?auto=format&fit=crop&w=700&q=85",

        description:
            "Seleção de sementes para complementar a alimentação de calopsitas e outros pequenos pássaros."
    },


    {
        id: 5,

        name: "Alcon Goldfish",

        category: "Peixes",

        price: 16.50,

        image:
            "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=700&q=85",

        description:
            "Alimento em flocos desenvolvido para peixes ornamentais de água fria."
    },


    {
        id: 6,

        name: "Areia Higiênica para Gatos",

        category: "Gatos",

        price: 28.90,

        image:
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85",

        description:
            "Granulado sanitário de alta absorção desenvolvido para facilitar a rotina de higiene."
    },


    {
        id: 7,

        name: "Ração Royal Canin Sênior",

        category: "Cães",

        price: 98.00,

        image:
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=700&q=85",

        description:
            "Alimentação desenvolvida para cães em fase sênior, com nutrientes selecionados."
    },


    {
        id: 8,

        name: "Brinquedo Mordedor Osso",

        category: "Acessórios",

        price: 34.90,

        image:
            "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=700&q=85",

        description:
            "Mordedor resistente para cães, ideal para momentos de diversão e entretenimento."
    }

];


/* =========================================================
   STATE
========================================================= */

let cart = [];

let activeFilter = "todos";



/* =========================================================
   DOM
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const emptyProducts =
    document.getElementById("emptyProducts");

const searchInput =
    document.getElementById("searchInput");

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const productModal =
    document.getElementById("productModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalBody =
    document.getElementById("modalBody");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");



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
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product => {

            const matchesCategory =
                activeFilter === "todos" ||
                product.category === activeFilter;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    productGrid.innerHTML = "";


    if (filtered.length === 0) {

        emptyProducts.classList.add("visible");

        return;

    }


    emptyProducts.classList.remove("visible");


    filtered.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div
                class="product-image"
                data-product="${product.id}"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-category">
                    ${product.category}
                </span>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>


                    <button
                        class="add-product"
                        data-add="${product.id}"
                        aria-label="Adicionar produto"
                    >

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}



/* =========================================================
   PRODUCT FILTER
========================================================= */

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-button")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                button.classList.add("active");


                activeFilter =
                    button.dataset.filter;


                renderProducts();

            }
        );

    });



/* =========================================================
   CATEGORY FILTER
========================================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                activeFilter =
                    card.dataset.category;


                document
                    .querySelectorAll(".filter-button")
                    .forEach(button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.filter === activeFilter
                        );

                    });


                renderProducts();


                document
                    .getElementById("produtos")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });



/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    renderProducts
);



/* =========================================================
   ADD TO CART
========================================================= */

productGrid.addEventListener(
    "click",
    event => {

        const addButton =
            event.target.closest(
                "[data-add]"
            );


        const image =
            event.target.closest(
                "[data-product]"
            );


        if (addButton) {

            const id =
                Number(
                    addButton.dataset.add
                );


            addToCart(id);

            return;

        }


        if (image) {

            const id =
                Number(
                    image.dataset.product
                );


            openProductModal(id);

        }

    }
);



function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} adicionado ao carrinho.`
    );

}



/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        formatPrice(total);


    renderCart();

}



/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <p>
                    Seu carrinho está vazio.
                </p>

                <span>
                    Adicione produtos para continuar.
                </span>

            </div>

        `;

        return;

    }


    cartItems.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >


                <div class="cart-item-content">

                    <h4>
                        ${item.name}
                    </h4>

                    <span class="cart-item-price">
                        ${formatPrice(item.price)}
                    </span>


                    <div class="quantity">

                        <button
                            data-minus="${item.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-plus="${item.id}"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

}



/* =========================================================
   CART QUANTITY
========================================================= */

cartItems.addEventListener(
    "click",
    event => {

        const plus =
            event.target.closest(
                "[data-plus]"
            );


        const minus =
            event.target.closest(
                "[data-minus]"
            );


        if (plus) {

            changeQuantity(
                Number(plus.dataset.plus),
                1
            );

        }


        if (minus) {

            changeQuantity(
                Number(minus.dataset.minus),
                -1
            );

        }

    }
);



function changeQuantity(id, amount) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    updateCart();

}



/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);



/* =========================================================
   CHECKOUT
========================================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Adicione produtos ao carrinho primeiro."
            );

            return;

        }


        let message =
            "Olá! Gostaria de fazer um pedido na Pata & Cia:%0A%0A";


        cart.forEach(item => {

            message +=
                `${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}%0A`;

        });


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        message +=
            `%0ATotal: ${formatPrice(total)}`;


        window.open(
            `https://wa.me/5514997778899?text=${message}`,
            "_blank"
        );

    }
);



/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    modalBody.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            class="modal-product-image"
        >


        <div class="modal-product-info">

            <span class="modal-product-category">
                ${product.category}
            </span>

            <h2>
                ${product.name}
            </h2>

            <p class="modal-product-description">
                ${product.description}
            </p>


            <div class="modal-product-bottom">

                <strong class="modal-product-price">
                    ${formatPrice(product.price)}
                </strong>


                <button
                    class="modal-add"
                    data-modal-add="${product.id}"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        </div>

    `;


    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}



function closeProductModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


modalClose.addEventListener(
    "click",
    closeProductModal
);


modalOverlay.addEventListener(
    "click",
    closeProductModal
);


modalBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-modal-add]"
            );


        if (!button) return;


        addToCart(
            Number(
                button.dataset.modalAdd
            )
        );


        closeProductModal();

    }
);



/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle(
            "active"
        );

    }
);


mobileNav
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

            }
        );

    });



/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "active"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            2800
        );

}



/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        closeCartDrawer();

        closeProductModal();

    }
);



/* =========================================================
   INITIALIZATION
========================================================= */

renderProducts();

updateCart();
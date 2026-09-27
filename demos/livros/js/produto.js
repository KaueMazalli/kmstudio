/* =========================================================
   ENTRELINHAS — PÁGINA DO PRODUTO
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const productContent =
    document.getElementById("product-content");

const productDetails =
    document.getElementById("product-details");

const relatedBooks =
    document.getElementById("related-books");

const productNotFound =
    document.getElementById("product-not-found");


/* =========================================================
   URL
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(
        params.get("id")
    );


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatProductPrice(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================================================
   FIND PRODUCT
========================================================= */

const produto =
    livros.find(
        (livro) =>
            livro.id === productId
    );


/* =========================================================
   PRODUCT NOT FOUND
========================================================= */

if (!produto) {

    if (productContent) {
        productContent.hidden = true;
    }

    if (productDetails) {
        productDetails.hidden = true;
    }

    if (relatedBooks) {
        relatedBooks.parentElement.parentElement.hidden = true;
    }

    if (productNotFound) {
        productNotFound.hidden = false;
    }

}


/* =========================================================
   PRODUCT RENDER
========================================================= */

function renderProduct() {

    if (!produto || !productContent) {
        return;
    }


    document.title =
        `${produto.titulo} — Entrelinhas`;


    const description =
        document.getElementById(
            "product-description"
        );


    if (description) {

        description.setAttribute(
            "content",
            `${produto.titulo}, de ${produto.autor}. Confira informações, estado de conservação e preço no Entrelinhas.`
        );

    }


    productContent.innerHTML = `

        <div class="product-image-wrapper">

            <div class="product-image">

                <img
                    src="${produto.imagem}"
                    alt="${produto.titulo}"
                >

            </div>

        </div>


        <div class="product-info">

            <p class="book-category">
                ${produto.categoria}
            </p>


            <h1>
                ${produto.titulo}
            </h1>


            <p class="product-author">
                ${produto.autor}
            </p>


            <div class="product-price">

                ${formatProductPrice(produto.preco)}

            </div>


            <div class="product-condition">

                <span>
                    Estado do exemplar
                </span>

                <strong>
                    ${produto.estado}
                </strong>

            </div>


            <p class="product-intro">
                Um exemplar disponível em nosso acervo,
                pronto para encontrar uma nova estante.
            </p>


            <button
                type="button"
                class="button button-dark product-add-button"
                id="product-add-button"
            >

                <i data-lucide="shopping-bag"></i>

                Adicionar ao carrinho

            </button>


            <a
                href="carrinho.html"
                class="product-cart-link"
            >

                Ver carrinho

                <i data-lucide="arrow-right"></i>

            </a>

        </div>

    `;


    productDetails.innerHTML = `

        <div class="details-intro">

            <p class="eyebrow">
                Sobre o exemplar
            </p>

            <h2>
                Informações do livro
            </h2>

        </div>


        <div class="details-table">

            <div>
                <span>
                    Autor
                </span>

                <strong>
                    ${produto.autor}
                </strong>
            </div>


            <div>
                <span>
                    Categoria
                </span>

                <strong>
                    ${produto.categoria}
                </strong>
            </div>


            <div>
                <span>
                    Editora
                </span>

                <strong>
                    Exemplo Editora
                </strong>
            </div>


            <div>
                <span>
                    Ano
                </span>

                <strong>
                    ${produto.ano}
                </strong>
            </div>


            <div>
                <span>
                    Páginas
                </span>

                <strong>
                    ${produto.paginas}
                </strong>
            </div>


            <div>
                <span>
                    Conservação
                </span>

                <strong>
                    ${produto.estado}
                </strong>
            </div>

        </div>

    `;


    if (window.lucide) {
        lucide.createIcons();
    }


    bindProductCartButton();

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function bindProductCartButton() {

    const button =
        document.getElementById(
            "product-add-button"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "entrelinhas-cart"
                    )
                ) || [];


            const existing =
                cart.find(
                    (item) =>
                        item.id === produto.id
                );


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push({

                    id: produto.id,

                    titulo: produto.titulo,

                    autor: produto.autor,

                    preco: produto.preco,

                    imagem: produto.imagem,

                    quantity: 1

                });

            }


            localStorage.setItem(
                "entrelinhas-cart",
                JSON.stringify(cart)
            );


            if (
                typeof updateCartCount ===
                "function"
            ) {

                updateCartCount();

            }


            button.classList.add("added");

            button.innerHTML = `
                <i data-lucide="check"></i>
                Adicionado ao carrinho
            `;


            if (window.lucide) {
                lucide.createIcons();
            }


            setTimeout(() => {

                button.classList.remove(
                    "added"
                );

            }, 1800);

        }
    );

}


/* =========================================================
   RELATED BOOKS
========================================================= */

function renderRelatedBooks() {

    if (!produto || !relatedBooks) {
        return;
    }


    const related =
        livros
            .filter(
                (livro) =>
                    livro.categoria ===
                    produto.categoria &&
                    livro.id !== produto.id
            )
            .slice(0, 4);


    relatedBooks.innerHTML = "";


    related.forEach((livro) => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "book-card";


        card.innerHTML = `

            <a
                href="produto.html?id=${livro.id}"
                class="book-image"
            >

                <img
                    src="${livro.imagem}"
                    alt="${livro.titulo}"
                    loading="lazy"
                >

                <span class="book-status">
                    ${livro.estado}
                </span>

            </a>


            <div class="book-info">

                <p class="book-category">
                    ${livro.categoria}
                </p>


                <h3>

                    <a
                        href="produto.html?id=${livro.id}"
                    >
                        ${livro.titulo}
                    </a>

                </h3>


                <p class="book-author">
                    ${livro.autor}
                </p>


                <div class="book-bottom">

                    <strong>
                        ${formatProductPrice(livro.preco)}
                    </strong>


                    <button
                        type="button"
                        class="add-button"
                        data-related-cart="${livro.id}"
                        aria-label="Adicionar ${livro.titulo} ao carrinho"
                    >

                        <i data-lucide="plus"></i>

                    </button>

                </div>

            </div>

        `;


        relatedBooks.appendChild(card);

    });


    if (window.lucide) {
        lucide.createIcons();
    }


    bindRelatedCartButtons();

}


/* =========================================================
   RELATED CART BUTTONS
========================================================= */

function bindRelatedCartButtons() {

    document
        .querySelectorAll(
            "[data-related-cart]"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    const id =
                        Number(
                            button.dataset
                                .relatedCart
                        );


                    const livro =
                        livros.find(
                            (item) =>
                                item.id === id
                        );


                    if (!livro) {
                        return;
                    }


                    let cart =
                        JSON.parse(
                            localStorage.getItem(
                                "entrelinhas-cart"
                            )
                        ) || [];


                    const existing =
                        cart.find(
                            (item) =>
                                item.id === livro.id
                        );


                    if (existing) {

                        existing.quantity += 1;

                    } else {

                        cart.push({

                            id: livro.id,

                            titulo: livro.titulo,

                            autor: livro.autor,

                            preco: livro.preco,

                            imagem: livro.imagem,

                            quantity: 1

                        });

                    }


                    localStorage.setItem(
                        "entrelinhas-cart",
                        JSON.stringify(cart)
                    );


                    if (
                        typeof updateCartCount ===
                        "function"
                    ) {

                        updateCartCount();

                    }


                    button.classList.add(
                        "added"
                    );


                    setTimeout(() => {

                        button.classList.remove(
                            "added"
                        );

                    }, 500);

                }
            );

        });

}


/* =========================================================
   INITIALIZE
========================================================= */

if (produto) {

    renderProduct();

    renderRelatedBooks();

}
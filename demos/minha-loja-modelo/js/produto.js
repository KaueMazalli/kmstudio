/* =========================================================
   PRODUTO — PÁGINA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProduct();

    }
);


/* =========================================================
   CARREGAR PRODUTO
========================================================= */

function loadProduct() {

    const container =
        document.getElementById(
            "product-detail-content"
        );


    if (!container) {
        return;
    }


    /* =====================================================
       PEGAR ID DA URL
    ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    /* =====================================================
       ENCONTRAR PRODUTO
    ===================================================== */

    const product =
        products.find(
            item =>
                item.id === productId
        );


    /* =====================================================
       PRODUTO NÃO ENCONTRADO
    ===================================================== */

    if (!product) {

        container.innerHTML = `

            <div class="product-not-found">

                <h1>
                    Produto não encontrado
                </h1>


                <p>
                    O produto que você procura
                    não está disponível.
                </p>


                <a
                    href="index.html"
                    class="btn btn-primary"
                >
                    Voltar para produtos
                </a>

            </div>

        `;

        return;

    }


    /* =====================================================
       TÍTULO DA PÁGINA
    ===================================================== */

    document.title =
        `${product.name} — ${SHOP_CONFIG.storeName}`;


    /* =====================================================
       PREÇO ANTIGO
    ===================================================== */

    const oldPrice =
        product.oldPrice
            ? `

                <span class="detail-old-price">

                    R$
                    ${product.oldPrice
                        .toFixed(2)
                        .replace(".", ",")}

                </span>

              `
            : "";


    /* =====================================================
       HTML
    ===================================================== */

    container.innerHTML = `

        <!-- ===============================================
             IMAGEM
        ================================================ -->

        <div class="product-detail-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <!-- ===============================================
             INFORMAÇÕES
        ================================================ -->

        <div class="product-detail-info">


            <span class="product-detail-category">

                ${product.category}

            </span>


            <h1>

                ${product.name}

            </h1>


            <div class="product-detail-price">

                R$
                ${product.price
                    .toFixed(2)
                    .replace(".", ",")}

                ${oldPrice}

            </div>


            <div class="product-description">

                <h2>
                    Descrição
                </h2>


                <p>
                    ${product.description}
                </p>

            </div>


            <div class="product-purchase">


                <div class="quantity-control">

                    <button
                        type="button"
                        id="quantity-minus"
                        aria-label="Diminuir quantidade"
                    >
                        −
                    </button>


                    <span id="quantity">
                        1
                    </span>


                    <button
                        type="button"
                        id="quantity-plus"
                        aria-label="Aumentar quantidade"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="btn btn-primary buy-button"
                    id="add-product"
                >
                    Comprar
                </button>

            </div>


            <a
                href="carrinho.html"
                class="cart-secondary-link"
            >
                Ver carrinho
            </a>


        </div>

    `;


    /* =====================================================
       QUANTIDADE
    ===================================================== */

    let quantity = 1;


    const quantityDisplay =
        document.getElementById(
            "quantity"
        );


    const minusButton =
        document.getElementById(
            "quantity-minus"
        );


    const plusButton =
        document.getElementById(
            "quantity-plus"
        );


    const addButton =
        document.getElementById(
            "add-product"
        );


    /* =====================================================
       DIMINUIR
    ===================================================== */

    minusButton.addEventListener(
        "click",
        () => {

            if (quantity <= 1) {
                return;
            }


            quantity--;


            quantityDisplay.textContent =
                quantity;

        }
    );


    /* =====================================================
       AUMENTAR
    ===================================================== */

    plusButton.addEventListener(
        "click",
        () => {

            quantity++;


            quantityDisplay.textContent =
                quantity;

        }
    );


    /* =====================================================
       ADICIONAR AO CARRINHO
    ===================================================== */

    addButton.addEventListener(
        "click",
        () => {

            for (
                let i = 0;
                i < quantity;
                i++
            ) {

                addToCart(
                    product.id
                );

            }

        }
    );

}
/* =========================================================
   ENTRELINHAS — CATÁLOGO
========================================================= */


/* =========================================================
   DADOS DE DEMONSTRAÇÃO
========================================================= */

const livros = [

    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        categoria: "Literatura",
        preco: 28,
        estado: "Bom estado",
        ano: 1985,
        paginas: 256,
        imagem: "assets/livros/dom-casmurro.jpg"
    },

    {
        id: 2,
        titulo: "O Hobbit",
        autor: "J. R. R. Tolkien",
        categoria: "Fantasia",
        preco: 35,
        estado: "Muito bom",
        ano: 2012,
        paginas: 336,
        imagem: "assets/livros/o-hobbit.jpg"
    },

    {
        id: 3,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Literatura",
        preco: 24,
        estado: "Bom estado",
        ano: 2008,
        paginas: 96,
        imagem: "assets/livros/o-pequeno-principe.jpg"
    },

    {
        id: 4,
        titulo: "1984",
        autor: "George Orwell",
        categoria: "Ficção",
        preco: 32,
        estado: "Bom estado",
        ano: 2019,
        paginas: 416,
        imagem: "assets/livros/1984.jpg"
    },

    {
        id: 5,
        titulo: "A Metamorfose",
        autor: "Franz Kafka",
        categoria: "Literatura",
        preco: 22,
        estado: "Muito bom",
        ano: 2016,
        paginas: 96,
        imagem: "assets/livros/a-metamorfose.jpg"
    },

    {
        id: 6,
        titulo: "O Nome da Rosa",
        autor: "Umberto Eco",
        categoria: "Ficção",
        preco: 38,
        estado: "Bom estado",
        ano: 2010,
        paginas: 592,
        imagem: "assets/livros/o-nome-da-rosa.jpg"
    },

    {
        id: 7,
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        categoria: "História",
        preco: 42,
        estado: "Muito bom",
        ano: 2018,
        paginas: 464,
        imagem: "assets/livros/sapiens.jpg"
    },

    {
        id: 8,
        titulo: "O Mundo de Sofia",
        autor: "Jostein Gaarder",
        categoria: "Filosofia",
        preco: 30,
        estado: "Bom estado",
        ano: 2015,
        paginas: 560,
        imagem: "assets/livros/o-mundo-de-sofia.jpg"
    },

    {
        id: 9,
        titulo: "A História da Arte",
        autor: "E. H. Gombrich",
        categoria: "Arte",
        preco: 55,
        estado: "Bom estado",
        ano: 2009,
        paginas: 688,
        imagem: "assets/livros/historia-da-arte.jpg"
    },

    {
        id: 10,
        titulo: "Grande Sertão: Veredas",
        autor: "João Guimarães Rosa",
        categoria: "Literatura",
        preco: 45,
        estado: "Regular",
        ano: 2006,
        paginas: 624,
        imagem: "assets/livros/grande-sertao.jpg"
    },

    {
        id: 11,
        titulo: "O Estrangeiro",
        autor: "Albert Camus",
        categoria: "Filosofia",
        preco: 26,
        estado: "Muito bom",
        ano: 2014,
        paginas: 128,
        imagem: "assets/livros/o-estrangeiro.jpg"
    },

    {
        id: 12,
        titulo: "Cem Anos de Solidão",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        preco: 40,
        estado: "Bom estado",
        ano: 2011,
        paginas: 448,
        imagem: "assets/livros/cem-anos-de-solidao.jpg"
    }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const catalogGrid =
    document.getElementById("catalog-grid");

const resultsCount =
    document.getElementById("results-count");

const emptyState =
    document.getElementById("empty-state");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");

const conditionFilter =
    document.getElementById("condition-filter");

const minPrice =
    document.getElementById("min-price");

const maxPrice =
    document.getElementById("max-price");

const sortFilter =
    document.getElementById("sort-filter");

const clearFilters =
    document.getElementById("clear-filters");

const emptyClear =
    document.getElementById("empty-clear");

const filterMobileButton =
    document.getElementById("filter-mobile-button");

const catalogFilters =
    document.getElementById("catalog-filters");


/* =========================================================
   FORMATAÇÃO
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
   RENDER
========================================================= */

function renderBooks(lista) {

    if (!catalogGrid) {
        return;
    }

    catalogGrid.innerHTML = "";


    lista.forEach((livro) => {

        const card =
            document.createElement("article");

        card.className = "book-card";


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
                    <a href="produto.html?id=${livro.id}">
                        ${livro.titulo}
                    </a>
                </h3>

                <p class="book-author">
                    ${livro.autor}
                </p>


                <div class="book-bottom">

                    <strong>
                        ${formatPrice(livro.preco)}
                    </strong>

                    <button
                        type="button"
                        class="add-button"
                        data-add-cart="${livro.id}"
                        aria-label="Adicionar ${livro.titulo} ao carrinho"
                    >
                        <i data-lucide="plus"></i>
                    </button>

                </div>

            </div>

        `;


        catalogGrid.appendChild(card);

    });


    if (window.lucide) {
        lucide.createIcons();
    }


    bindCartButtons();

}


/* =========================================================
   FILTER
========================================================= */

function filterBooks() {

    const search =
        searchInput?.value
            .trim()
            .toLowerCase() || "";


    const category =
        categoryFilter?.value || "";


    const condition =
        conditionFilter?.value || "";


    const min =
        Number(minPrice?.value) || 0;


    const max =
        Number(maxPrice?.value) || Infinity;


    let filtered =
        livros.filter((livro) => {

            const matchesSearch =
                !search ||
                livro.titulo
                    .toLowerCase()
                    .includes(search) ||
                livro.autor
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                !category ||
                livro.categoria === category;


            const matchesCondition =
                !condition ||
                livro.estado === condition;


            const matchesPrice =
                livro.preco >= min &&
                livro.preco <= max;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesCondition &&
                matchesPrice
            );

        });


    filtered =
        sortBooks(filtered);


    updateResultsCount(filtered.length);

    renderBooks(filtered);

}


/* =========================================================
   SORT
========================================================= */

function sortBooks(lista) {

    const sort =
        sortFilter?.value || "relevance";


    const sorted =
        [...lista];


    if (sort === "price-low") {

        sorted.sort(
            (a, b) =>
                a.preco - b.preco
        );

    }


    if (sort === "price-high") {

        sorted.sort(
            (a, b) =>
                b.preco - a.preco
        );

    }


    if (sort === "name") {

        sorted.sort(
            (a, b) =>
                a.titulo.localeCompare(
                    b.titulo,
                    "pt-BR"
                )
        );

    }


    return sorted;

}


/* =========================================================
   RESULTS
========================================================= */

function updateResultsCount(total) {

    if (!resultsCount) {
        return;
    }


    resultsCount.textContent =
        total === 1
            ? "1 livro encontrado"
            : `${total} livros encontrados`;


    if (emptyState) {

        emptyState.hidden =
            total !== 0;

    }

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function resetFilters() {

    if (searchInput) {
        searchInput.value = "";
    }

    if (categoryFilter) {
        categoryFilter.value = "";
    }

    if (conditionFilter) {
        conditionFilter.value = "";
    }

    if (minPrice) {
        minPrice.value = "";
    }

    if (maxPrice) {
        maxPrice.value = "";
    }

    if (sortFilter) {
        sortFilter.value = "relevance";
    }


    filterBooks();

}


/* =========================================================
   CART
========================================================= */

function getCart() {

    return (
        JSON.parse(
            localStorage.getItem(
                "entrelinhas-cart"
            )
        ) || []
    );

}


function saveCart(cart) {

    localStorage.setItem(
        "entrelinhas-cart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    const livro =
        livros.find(
            (item) =>
                item.id === Number(id)
        );


    if (!livro) {
        return;
    }


    const cart =
        getCart();


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


    saveCart(cart);


    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

}


/* =========================================================
   CART BUTTONS
========================================================= */

function bindCartButtons() {

    document
        .querySelectorAll("[data-add-cart]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    const id =
                        button.dataset.addCart;

                    addToCart(id);

                    button.classList.add("added");

                    setTimeout(() => {

                        button.classList.remove("added");

                    }, 500);

                }
            );

        });

}


/* =========================================================
   MOBILE FILTER
========================================================= */

if (
    filterMobileButton &&
    catalogFilters
) {

    filterMobileButton.addEventListener(
        "click",
        () => {

            const isOpen =
                catalogFilters.classList.toggle(
                    "is-open"
                );


            filterMobileButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


/* =========================================================
   EVENTS
========================================================= */

searchInput?.addEventListener(
    "input",
    filterBooks
);

categoryFilter?.addEventListener(
    "change",
    filterBooks
);

conditionFilter?.addEventListener(
    "change",
    filterBooks
);

minPrice?.addEventListener(
    "input",
    filterBooks
);

maxPrice?.addEventListener(
    "input",
    filterBooks
);

sortFilter?.addEventListener(
    "change",
    filterBooks
);

clearFilters?.addEventListener(
    "click",
    resetFilters
);

emptyClear?.addEventListener(
    "click",
    resetFilters
);


/* =========================================================
   URL CATEGORY
========================================================= */

function loadCategoryFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("categoria");


    if (
        category &&
        categoryFilter
    ) {

        const option =
            [...categoryFilter.options]
                .find(
                    (item) =>
                        item.value.toLowerCase() ===
                        category.toLowerCase()
                );


        if (option) {

            categoryFilter.value =
                option.value;

        }

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

loadCategoryFromURL();

filterBooks();
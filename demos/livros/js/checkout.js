/* =========================================================
   ENTRELINHAS — CHECKOUT
========================================================= */

const WHATSAPP_NUMBER = "5511999999999";

function getCart() {
    return JSON.parse(localStorage.getItem("entrelinhas-cart")) || [];
}

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function renderOrder() {
    const cart = getCart();
    const itemsContainer = document.getElementById("checkout-items");
    const totalElement = document.getElementById("checkout-total");
    const countElement = document.getElementById("summary-items");
    const form = document.getElementById("checkout-form");

    if (!cart.length) {
        window.location.href = "carrinho.html";
        return;
    }

    let total = 0;
    let quantityTotal = 0;

    itemsContainer.innerHTML = cart.map((item) => {
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.preco) || 0;
        const itemTotal = price * quantity;

        total += itemTotal;
        quantityTotal += quantity;

        return `
            <article class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.imagem}" alt="${item.titulo}">
                </div>
                <div>
                    <h3 class="checkout-item-title">${item.titulo}</h3>
                    <p class="checkout-item-meta">
                        ${item.autor}<br>
                        ${quantity}x · ${formatPrice(itemTotal)}
                    </p>
                </div>
            </article>
        `;
    }).join("");

    totalElement.textContent = formatPrice(total);
    countElement.textContent = `${quantityTotal} ${quantityTotal === 1 ? "item" : "itens"}`;
}

function onlyDigits(value) {
    return value.replace(/\D/g, "");
}

function formatCep(value) {
    const digits = onlyDigits(value).slice(0, 8);
    return digits.length > 5
        ? `${digits.slice(0, 5)}-${digits.slice(5)}`
        : digits;
}

function formatCpf(value) {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length > 9) {
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    }

    if (digits.length > 6) {
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    }

    if (digits.length > 3) {
        return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    }

    return digits;
}

function formatPhone(value) {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length > 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    if (digits.length > 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    if (digits.length > 2) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    return digits;
}

function value(id) {
    return document.getElementById(id).value.trim();
}

function handleCheckout(event) {
    event.preventDefault();

    const form = document.getElementById("checkout-form");
    const error = document.getElementById("checkout-error");
    const requiredFields = form.querySelectorAll("[required]");

    let valid = true;

    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            field.classList.add("field-invalid");
            valid = false;
        } else {
            field.classList.remove("field-invalid");
        }
    });

    if (!valid) {
        error.hidden = false;
        const firstInvalid = form.querySelector(".field-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    error.hidden = true;

    const cart = getCart();

    const items = cart.map((item) => {
        const quantity = Number(item.quantity) || 1;
        const total = (Number(item.preco) || 0) * quantity;
        return `• ${item.titulo} — ${quantity}x — ${formatPrice(total)}`;
    }).join("\n");

    const total = cart.reduce((sum, item) => {
        return sum + ((Number(item.preco) || 0) * (Number(item.quantity) || 1));
    }, 0);

    const complement = value("customer-complement");
    const note = value("customer-note");

    const address = [
        `${value("customer-address")}, ${value("customer-number")}`,
        complement ? `Complemento: ${complement}` : "",
        `Bairro: ${value("customer-neighborhood")}`,
        `${value("customer-city")} - ${value("customer-state")}`,
        `CEP: ${value("customer-cep")}`
    ].filter(Boolean).join("\n");

    const message = [
        "Olá! Gostaria de fazer um pedido pelo Entrelinhas.",
        "",
        "*DADOS PARA ENVIO*",
        `Nome: ${value("customer-name")}`,
        `CPF: ${value("customer-cpf")}`,
        `Telefone: ${value("customer-phone")}`,
        "",
        "*ENDEREÇO DE ENTREGA*",
        address,
        "",
        "*LIVROS*",
        items,
        "",
        `*TOTAL DOS LIVROS:* ${formatPrice(total)}`,
        "*FRETE:* A combinar",
        note ? `*OBSERVAÇÃO:* ${note}` : ""
    ].filter(Boolean).join("\n");

    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

document.getElementById("customer-cep").addEventListener("input", (event) => {
    event.target.value = formatCep(event.target.value);
});

document.getElementById("customer-cpf").addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
});

document.getElementById("customer-phone").addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value);
});

document.getElementById("checkout-form").addEventListener("submit", handleCheckout);

renderOrder();

if (window.lucide) {
    lucide.createIcons();
}
/* =========================================================
   ENTRELINHAS — CHECKOUT / E-COMMERCE DEMO
========================================================= */

const WHATSAPP_NUMBER = "5511999999999";

const checkoutForm = document.getElementById("checkout-form");
const checkoutLayout = document.getElementById("checkout-layout");
const orderSuccess = document.getElementById("order-success");
const shippingMethod = document.getElementById("shipping-method");
const checkoutError = document.getElementById("checkout-error");

function getCart() {
    return JSON.parse(localStorage.getItem("entrelinhas-cart")) || [];
}

function formatPrice(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function onlyDigits(value) {
    return value.replace(/\D/g, "");
}

function formatCep(value) {
    const digits = onlyDigits(value).slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

function formatCpf(value) {
    const digits = onlyDigits(value).slice(0, 11);
    if (digits.length > 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    if (digits.length > 6) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    if (digits.length > 3) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    return digits;
}

function formatPhone(value) {
    const digits = onlyDigits(value).slice(0, 11);
    if (digits.length > 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return digits;
}

function getField(id) {
    return document.getElementById(id);
}

function getValue(id) {
    const field = getField(id);
    return field ? field.value.trim() : "";
}

function getSelectedPayment() {
    const selected = document.querySelector('input[name="payment-method"]:checked');
    return selected ? selected.value : "";
}

function getShipping() {
    const option = shippingMethod ? shippingMethod.options[shippingMethod.selectedIndex] : null;
    return {
        name: option ? option.textContent.split(" · ")[0] : "",
        price: option ? Number(option.dataset.price || 0) : 0
    };
}

function calculateSubtotal(cart) {
    return cart.reduce((sum, item) => {
        return sum + (Number(item.preco) || 0) * (Number(item.quantity) || 1);
    }, 0);
}

function renderOrder() {
    const cart = getCart();

    if (!cart.length) {
        window.location.href = "carrinho.html";
        return;
    }

    const itemsContainer = getField("checkout-items");
    const countElement = getField("summary-items");
    const subtotalElement = getField("checkout-subtotal");
    const shippingElement = getField("checkout-shipping");
    const totalElement = getField("checkout-total");

    let quantityTotal = 0;

    itemsContainer.innerHTML = cart.map((item) => {
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.preco) || 0;
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
                        ${quantity}x · ${formatPrice(price * quantity)}
                    </p>
                </div>
            </article>
        `;
    }).join("");

    const subtotal = calculateSubtotal(cart);
    const shipping = getShipping().price;
    const total = subtotal + shipping;

    countElement.textContent = `${quantityTotal} ${quantityTotal === 1 ? "item" : "itens"}`;
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = shippingMethod && shippingMethod.value ? formatPrice(shipping) : "A calcular";
    totalElement.textContent = formatPrice(total);
}

function validateForm() {
    let valid = true;

    checkoutForm.querySelectorAll("[required]").forEach((field) => {
        let fieldValid = field.type === "radio"
            ? document.querySelector('input[name="payment-method"]:checked') !== null
            : Boolean(field.value.trim());

        if (field.type === "radio") {
            document.querySelectorAll('input[name="payment-method"]').forEach((radio) => {
                radio.closest(".payment-option").classList.toggle("field-invalid", !fieldValid);
            });
        } else {
            field.classList.toggle("field-invalid", !fieldValid);
        }

        if (!fieldValid) valid = false;
    });

    checkoutError.hidden = valid;
    return valid;
}

function buildWhatsAppMessage(orderNumber) {
    const cart = getCart();
    const shipping = getShipping();
    const subtotal = calculateSubtotal(cart);
    const total = subtotal + shipping.price;
    const complement = getValue("customer-complement");
    const note = getValue("customer-note");

    const items = cart.map((item) => {
        const quantity = Number(item.quantity) || 1;
        const itemTotal = (Number(item.preco) || 0) * quantity;
        return `• ${item.titulo} — ${quantity}x — ${formatPrice(itemTotal)}`;
    }).join("\n");

    const address = [
        `${getValue("customer-address")}, ${getValue("customer-number")}`,
        complement ? `Complemento: ${complement}` : "",
        `Bairro: ${getValue("customer-neighborhood")}`,
        `${getValue("customer-city")} - ${getValue("customer-state")}`,
        `CEP: ${getValue("customer-cep")}`
    ].filter(Boolean).join("\n");

    return [
        "Olá! Gostaria de confirmar meu pedido no Entrelinhas.",
        "",
        `*PEDIDO ${orderNumber}*`,
        "",
        "*CLIENTE*",
        `Nome: ${getValue("customer-name")}`,
        `CPF: ${getValue("customer-cpf")}`,
        `Telefone: ${getValue("customer-phone")}`,
        "",
        "*ENTREGA*",
        `Forma: ${shipping.name}`,
        address,
        "",
        "*PAGAMENTO*",
        `Forma escolhida: ${getSelectedPayment()}`,
        "",
        "*LIVROS*",
        items,
        "",
        `Subtotal: ${formatPrice(subtotal)}`,
        `Entrega: ${formatPrice(shipping.price)}`,
        `*TOTAL: ${formatPrice(total)}*`,
        note ? `Observação: ${note}` : ""
    ].filter(Boolean).join("\n");
}

function createDemoOrderNumber() {
    return `ENT-${String(Math.floor(1000 + Math.random() * 9000))}`;
}

function showOrderSuccess() {
    const orderNumber = createDemoOrderNumber();
    const numberElement = getField("success-order-number");
    const whatsappButton = getField("whatsapp-order");

    numberElement.textContent = orderNumber;
    checkoutForm.hidden = true;
    checkoutLayout.querySelector(".order-summary").hidden = true;
    orderSuccess.hidden = false;

    whatsappButton.onclick = () => {
        const message = buildWhatsAppMessage(orderNumber);
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    if (window.lucide) lucide.createIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleCheckout(event) {
    event.preventDefault();

    if (!validateForm()) {
        const firstInvalid = checkoutForm.querySelector(".field-invalid, input:invalid, select:invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    showOrderSuccess();
}

shippingMethod.addEventListener("change", renderOrder);

getField("customer-cep").addEventListener("input", (event) => {
    event.target.value = formatCep(event.target.value);
});

getField("customer-cpf").addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
});

getField("customer-phone").addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value);
});

checkoutForm.addEventListener("submit", handleCheckout);

renderOrder();

if (window.lucide) {
    lucide.createIcons();
}

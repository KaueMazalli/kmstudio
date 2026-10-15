document.addEventListener("DOMContentLoaded", renderCart);

function escapeCartHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(char) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}

function renderCart() {
  const container = document.getElementById("cart-content");
  if (!container) return;
  if (!Array.isArray(cart) || !cart.length) {
    container.innerHTML = '<div class="empty-cart"><h2>Seu carrinho está vazio</h2><p>Explore o catálogo e adicione os produtos que deseja consultar.</p><a href="index.html#produtos" class="btn btn-primary">Explorar produtos</a></div>';
    return;
  }
  const itemsHtml = cart.map(function(item) {
    const id = Number(item.id);
    const safeId = Number.isSafeInteger(id) ? id : 0;
    const link = "produto.html?id=" + safeId;
    return '<article class="cart-item" data-id="' + safeId + '"><a href="' + link + '" class="cart-item-image"><img src="' + escapeCartHtml(item.image) + '" alt="' + escapeCartHtml(item.name) + '"></a><div class="cart-item-info"><span class="cart-item-category">' + escapeCartHtml(item.category) + '</span><a href="' + link + '" class="cart-item-name">' + escapeCartHtml(item.name) + '</a><p>Preço e disponibilidade a confirmar com a loja.</p></div><div class="cart-item-controls"><div class="quantity-control"><button type="button" data-action="decrease" data-id="' + safeId + '" aria-label="Diminuir quantidade">−</button><span>' + Number(item.quantity) + '</span><button type="button" data-action="increase" data-id="' + safeId + '" aria-label="Aumentar quantidade">+</button></div><button type="button" class="remove-item" data-action="remove" data-id="' + safeId + '">Remover</button></div></article>';
  }).join("");
  const totalItems = cart.reduce(function(total, item) { return total + (Number(item.quantity) || 0); }, 0);
  container.innerHTML = '<div class="cart-items">' + itemsHtml + '</div><aside class="cart-summary"><h2>Confira seu carrinho</h2><p>' + totalItems + ' item(ns) selecionado(s). Ao continuar, seu pedido será enviado pelo WhatsApp para consultar valores, estoque e condições de retirada ou entrega.</p><button type="button" class="btn btn-primary checkout-button" data-action="whatsapp">Consultar pelo WhatsApp ↗</button><a href="index.html#produtos" class="continue-shopping">Adicionar mais produtos</a></aside>';
}

document.addEventListener("click", function(event) {
  const button = event.target.closest("#cart-content button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "whatsapp") return sendWhatsAppOrder();
  const id = Number(button.dataset.id);
  if (!Number.isSafeInteger(id)) return;
  if (action === "increase") changeCartQuantity(id, 1);
  if (action === "decrease") changeCartQuantity(id, -1);
  if (action === "remove") removeCartItem(id);
});

function changeCartQuantity(productId, change) {
  const item = cart.find(function(entry) { return Number(entry.id) === Number(productId); });
  if (!item) return;
  item.quantity = (Number(item.quantity) || 0) + change;
  if (item.quantity <= 0) cart = cart.filter(function(entry) { return Number(entry.id) !== Number(productId); });
  saveCart();
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter(function(item) { return Number(item.id) !== Number(productId); });
  saveCart();
  renderCart();
}

function sendWhatsAppOrder() {
  if (!cart.length) return;
  const lines = cart.map(function(item) { return "• " + item.name + " — quantidade: " + item.quantity; });
  const message = "Olá, Unishop Vital Clean! Gostaria de consultar preço e disponibilidade destes produtos:" + String.fromCharCode(10,10) + lines.join(String.fromCharCode(10)) + String.fromCharCode(10,10) + "Poderiam me informar os valores e as opções de retirada/entrega?";
  const phone = String(SHOP_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "");
  if (!phone) { alert("O WhatsApp da loja ainda precisa ser configurado."); return; }
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}

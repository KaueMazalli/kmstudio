document.addEventListener("DOMContentLoaded", renderCart);
function renderCart() {
  const container = document.getElementById("cart-content");
  if (!container) return;
  if (!cart || cart.length === 0) {
    container.innerHTML = '<div class="empty-cart"><h2>Sua lista ainda está vazia</h2><p>Explore o catálogo e adicione os produtos que deseja consultar.</p><a href="index.html#produtos" class="btn btn-primary">Explorar produtos</a></div>';
    return;
  }
  const itemsHtml = cart.map(function(item) {
    return '<article class="cart-item" data-id="'+item.id+'"><a href="produto.html?id='+item.id+'" class="cart-item-image"><img src="'+item.image+'" alt="'+item.name+'"></a><div class="cart-item-info"><span class="cart-item-category">'+item.category+'</span><a href="produto.html?id='+item.id+'" class="cart-item-name">'+item.name+'</a><p>Preço e disponibilidade a confirmar com a loja.</p></div><div class="cart-item-controls"><div class="quantity-control"><button type="button" onclick="changeCartQuantity('+item.id+',-1)" aria-label="Diminuir quantidade">−</button><span>'+item.quantity+'</span><button type="button" onclick="changeCartQuantity('+item.id+',1)" aria-label="Aumentar quantidade">+</button></div><button type="button" class="remove-item" onclick="removeCartItem('+item.id+')">Remover</button></div></article>';
  }).join("");
  const totalItems = cart.reduce(function(total,item){return total+item.quantity;},0);
  container.innerHTML = '<div class="cart-items">'+itemsHtml+'</div><aside class="cart-summary"><h2>Confira sua lista</h2><p>'+totalItems+' item(ns) selecionado(s). Ao continuar, sua lista será enviada pelo WhatsApp para consultar valores, estoque e condições de retirada ou entrega.</p><button type="button" class="btn btn-primary checkout-button" onclick="sendWhatsAppOrder()">Consultar pelo WhatsApp ↗</button><a href="index.html#produtos" class="continue-shopping">Adicionar mais produtos</a></aside>';
}
function changeCartQuantity(productId,change) {
  const item=cart.find(function(entry){return entry.id===productId;});
  if(!item)return;
  item.quantity+=change;
  if(item.quantity<=0)cart=cart.filter(function(entry){return entry.id!==productId;});
  saveCart();renderCart();
}
function removeCartItem(productId) {
  cart=cart.filter(function(item){return item.id!==productId;});
  saveCart();renderCart();
}
function sendWhatsAppOrder() {
  if(!cart.length)return;
  const lines=cart.map(function(item){return "• "+item.name+" — quantidade: "+item.quantity;});
  const message="Olá, Unishop Vital Clean! Gostaria de consultar preço e disponibilidade destes produtos:\\n\\n"+lines.join("\\n")+"\\n\\nPoderiam me informar os valores e as opções de retirada/entrega?";
  const phone=String(SHOP_CONFIG.whatsappNumber||"").replace(/\\D/g,"");
  if(!phone){alert("O WhatsApp da loja ainda precisa ser configurado.");return;}
  window.open("https://wa.me/"+phone+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
}
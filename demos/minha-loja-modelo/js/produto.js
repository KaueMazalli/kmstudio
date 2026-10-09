document.addEventListener("DOMContentLoaded",loadProduct);
function loadProduct() {
  const container=document.getElementById("product-detail-content");
  if(!container)return;
  const productId=Number(new URLSearchParams(window.location.search).get("id"));
  const product=products.find(function(item){return item.id===productId;});
  if(!product){container.innerHTML='<div class="product-not-found"><h1>Produto não encontrado</h1><p>Esse item não está disponível no catálogo.</p><a href="index.html" class="btn btn-primary">Voltar ao catálogo</a></div>';return;}
  document.title=product.name+" | "+SHOP_CONFIG.storeName;
  container.innerHTML='<div class="product-detail-image"><img src="'+product.image+'" alt="'+product.name+'"></div><div class="product-detail-info"><span class="product-detail-category">'+product.category+'</span><h1>'+product.name+'</h1><div class="product-detail-price">Consulte preço e disponibilidade</div><div class="product-description"><h2>Sobre o produto</h2><p>'+product.description+'</p><p class="image-disclaimer">Imagem ilustrativa. Consulte a equipe sobre marca, tamanho e disponibilidade.</p></div><div class="product-purchase"><div class="quantity-control"><button type="button" id="quantity-minus" aria-label="Diminuir quantidade">−</button><span id="quantity">1</span><button type="button" id="quantity-plus" aria-label="Aumentar quantidade">+</button></div><button type="button" class="btn btn-primary buy-button" id="add-product">Adicionar à lista</button></div><a href="carrinho.html" class="cart-secondary-link">Ver minha lista ↗</a></div>';
  let quantity=1;const display=document.getElementById("quantity");
  document.getElementById("quantity-minus").addEventListener("click",function(){if(quantity>1)quantity--;display.textContent=quantity;});
  document.getElementById("quantity-plus").addEventListener("click",function(){quantity++;display.textContent=quantity;});
  document.getElementById("add-product").addEventListener("click",function(){addToCart(product.id,quantity);const button=document.getElementById("add-product");button.textContent="Adicionado à lista ✓";window.setTimeout(function(){if(button.isConnected)button.textContent="Adicionar à lista";},1500);});
}
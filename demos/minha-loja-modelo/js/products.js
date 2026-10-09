const SHOP_CONFIG = {
  storeName: "Unishop Vital Clean",
  heroTitle: "Limpeza de verdade para sua casa e seu negócio.",
  heroDescription: "Encontre produtos de limpeza para o dia a dia e fale com nossa equipe para consultar valores e disponibilidade.",
  whatsappNumber: "5517996149320",
  storeAddress: "Rua Dez, 2186 — Jales, SP"
};

/* Catálogo demonstrativo: confirme marcas, embalagens e estoque com a loja. */
const products = [
  {id:1,name:"Água sanitária",category:"Limpeza doméstica",description:"Para a limpeza de diferentes áreas da casa. Consulte embalagens e indicações de uso disponíveis.",image:"https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:2,name:"Desinfetante",category:"Limpeza doméstica",description:"Opção para a rotina de limpeza de pisos e superfícies, conforme as instruções do rótulo.",image:"https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:3,name:"Detergente",category:"Cozinha",description:"Produto para a limpeza cotidiana de utensílios e superfícies compatíveis.",image:"https://images.unsplash.com/photo-1603905179139-d6f7e3d4a6c3?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:4,name:"Limpador multiuso",category:"Limpeza doméstica",description:"Praticidade para a limpeza de superfícies compatíveis. Consulte opções disponíveis.",image:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:5,name:"Amaciante de roupas",category:"Lavanderia",description:"Para completar a rotina de cuidados com as roupas. Consulte fragrâncias e tamanhos disponíveis.",image:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:6,name:"Sabão para roupas",category:"Lavanderia",description:"Alternativas para a lavagem de roupas. Consulte tipos, marcas e embalagens com a loja.",image:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:7,name:"Esponjas e panos",category:"Acessórios",description:"Acessórios úteis para as tarefas de limpeza do dia a dia.",image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85",stock:true},
  {id:8,name:"Limpeza profissional",category:"Uso profissional",description:"Soluções para rotinas de limpeza de empresas e estabelecimentos. Consulte nossa equipe.",image:"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=85",stock:true}
];
document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll("[data-store-name]").forEach(function(el){el.textContent=SHOP_CONFIG.storeName;});
  document.querySelectorAll("[data-store-address]").forEach(function(el){el.textContent=SHOP_CONFIG.storeAddress;});
  var title=document.querySelector("[data-hero-title]"),description=document.querySelector("[data-hero-description]");
  if(title)title.textContent=SHOP_CONFIG.heroTitle;
  if(description)description.textContent=SHOP_CONFIG.heroDescription;
});
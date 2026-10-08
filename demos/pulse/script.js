const header=document.querySelector("header");
if(header){
  const update=()=>header.classList.toggle("is-scrolled",window.scrollY>30);
  update();
  window.addEventListener("scroll",update,{passive:true});
}
const header=document.querySelector(".header");
const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");

function updateHeader(){if(header) header.classList.toggle("scrolled",window.scrollY>50)}
updateHeader();window.addEventListener("scroll",updateHeader,{passive:true});

if(menu&&nav){
  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("active");
    menu.classList.toggle("active",open);
    menu.setAttribute("aria-expanded",String(open));
    menu.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
    document.body.classList.toggle("menu-open",open);
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    nav.classList.remove("active");menu.classList.remove("active");
    menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Abrir menu");
    document.body.classList.remove("menu-open");
  }));
}

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const id=link.getAttribute("href");
    if(!id||id==="#")return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    const offset=header?header.offsetHeight:0;
    window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-offset,behavior:"smooth"});
  });
});

const reveal=document.querySelectorAll(".intro-content,.service-card,.experience-content,.philosophy-content,.faq-list,.contact-inner");
if("IntersectionObserver"in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
  }),{threshold:.12});
  reveal.forEach(el=>{el.classList.add("reveal");observer.observe(el)});
}else reveal.forEach(el=>el.classList.add("visible"));

document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
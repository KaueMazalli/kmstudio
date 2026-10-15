document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".aura-intro");
  const introPetals = document.querySelector(".intro-petals");
  const petalField = document.querySelector(".aura-petal-field");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const toast = document.querySelector(".toast");
  const whatsapp = (document.body.dataset.whatsappNumber || "").replace(/\D/g, "");
  let toastTimer;

  function addPetals(target, count, kind) {
    if (!target || reducedMotion) return;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = kind;
      petal.style.left = (Math.random() * 100) + "%";
      petal.style.setProperty("--fall-delay", (Math.random() * 2.1).toFixed(2) + "s");
      petal.style.setProperty("--fall-time", (3.1 + Math.random() * 2.2).toFixed(2) + "s");
      petal.style.setProperty("--delay", (-Math.random() * 14).toFixed(2) + "s");
      petal.style.setProperty("--duration", (10 + Math.random() * 9).toFixed(2) + "s");
      petal.style.setProperty("--drift", ((Math.random() - .5) * 180).toFixed(0) + "px");
      target.appendChild(petal);
    }
  }

  if (intro) {
    const dismiss = () => intro.classList.add("is-gone");
    intro.addEventListener("animationend", event => {
      if (event.animationName === "intro-curtain-out") dismiss();
    });
    window.setTimeout(dismiss, reducedMotion ? 350 : 2100);
  }

  // Floating petals are decorative; keep their quantity low for mobile performance.
  addPetals(introPetals, 12, "intro-petal");
  addPetals(petalField, 8, "floating-petal");

  const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 30);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  function closeMenu() {
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Abrir menu de navegação");
    if (menu) menu.textContent = "Menu";
  }

  menu?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    menu.textContent = open ? "Fechar" : "Menu";
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (!nav?.classList.contains("open")) return;
    if (!nav.contains(event.target) && !menu?.contains(event.target)) closeMenu();
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function openWhatsApp(service) {
    if (!/^\d{10,15}$/.test(whatsapp)) {
      showToast("Configure o número do WhatsApp no index.html antes de publicar.");
      return;
    }
    const message = service
      ? "Olá! Vi o site da Aura Studio e tenho interesse em agendar o serviço de " + service + ". Podemos verificar os horários disponíveis?"
      : "Olá! Vi o site da Aura Studio e gostaria de saber mais sobre os serviços e horários disponíveis.";
    const url = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }

  document.querySelectorAll(".service-button").forEach(button => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.service));
  });
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openWhatsApp();
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const toast = document.querySelector(".toast");
  const whatsappNumber = (body.dataset.whatsappNumber || "").replace(/\D/g, "");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
  }

  function closeMenu(restoreFocus = false) {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    if (menuButton) menuButton.innerHTML = 'MENU <span aria-hidden="true">☰</span>';
    if (restoreFocus) menuButton?.focus();
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuButton.innerHTML = isOpen ? 'FECHAR <span aria-hidden="true">×</span>' : 'MENU <span aria-hidden="true">☰</span>';
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav?.classList.contains("open")) closeMenu(true);
  });
  document.addEventListener("click", event => {
    if (nav?.classList.contains("open") && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      if (!/^\d{10,15}$/.test(whatsappNumber)) {
        showToast("Este é um modelo demonstrativo. O WhatsApp será conectado ao número da barbearia na personalização.");
        return;
      }
      const message = link.dataset.message || "Olá! Gostaria de agendar um horário na Bravo Barbearia.";
      const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
      const opened = window.open(url, "_blank");
      if (opened) opened.opener = null;
      else window.location.assign(url);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".aura-intro");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const toast = document.querySelector(".toast");
  const heroImage = document.querySelector(".hero-portrait");
  const whatsapp = (document.body.dataset.whatsappNumber || "").replace(/\D/g, "");
  let toastTimer;

  if (intro) {
    const dismiss = () => {
      intro.classList.add("is-gone");
      intro.setAttribute("aria-hidden", "true");
    };
    intro.addEventListener("animationend", event => {
      if (event.animationName === "intro-curtain-out") dismiss();
    });
    // Fallback in case animationend does not fire.
    window.setTimeout(dismiss, reducedMotion ? 350 : 2200);
  }

  // If the remote photo fails, retain the designed frame instead of showing a broken image.
  heroImage?.addEventListener("error", () => {
    heroImage.hidden = true;
    heroImage.parentElement?.classList.add("image-unavailable");
  }, { once: true });

  const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 30);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  function closeMenu({ restoreFocus = false } = {}) {
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    menu?.setAttribute("aria-label", "Abrir menu de navegação");
    if (menu) menu.textContent = "Menu";
    if (restoreFocus) menu?.focus();
  }

  menu?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    menu.textContent = open ? "Fechar" : "Menu";
    if (open) nav?.querySelector("a")?.focus({ preventScroll: true });
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      closeMenu({ restoreFocus: true });
    }
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
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
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

    // Do not use the noopener feature string here: it can make window.open return
    // null even when the new tab opened, incorrectly triggering the same-tab fallback.
    const opened = window.open(url, "_blank");
    if (opened) {
      opened.opener = null;
    } else {
      window.location.assign(url);
    }
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

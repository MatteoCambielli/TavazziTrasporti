import { App, isLocationsPage } from "./components/App.js";
import { icon } from "./icons.js";
import { mount } from "./render.js";
import "./styles.css";

mount(App());
if (isLocationsPage) document.title = "Dove siamo · Tavazzi Trasporti";

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuIcon = document.querySelector("[data-menu-icon]");
const toast = document.querySelector("[data-toast]");
const headerTextItems = document.querySelectorAll("[data-header-text]");

const setHeaderState = () => {
  const isScrolled = window.scrollY > 50;

  header?.classList.toggle("bg-white", isScrolled);
  header?.classList.toggle("backdrop-blur-md", isScrolled);
  header?.classList.toggle("shadow-lg", isScrolled);

  headerTextItems.forEach((item) => {
    item.classList.toggle("text-white", !isScrolled);
    item.classList.toggle("text-[#1B4D3E]", isScrolled);
  });
};

const setMenuOpen = (open) => {
  mobileMenu?.classList.toggle("hidden", !open);
  menuButton?.setAttribute("aria-expanded", String(open));
  if (menuIcon)
    menuIcon.innerHTML = open
      ? icon("close", "w-6 h-6")
      : icon("menu", "w-6 h-6");
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.querySelector("[data-scroll-top]")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document
  .querySelector("[data-contact-form]")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector("button[type='submit']");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload._honey) return;
    payload._subject = `Tavazzi Trasporti — ${payload.tipo_richiesta}`;
    payload._replyto = payload.email;
    payload._template = "table";
    const status = form.querySelector("[data-form-status]");
    status.textContent = "Invio in corso…";
    submit.disabled = true;
    submit.textContent = "Invio in corso...";

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/raffaella@fllitavazzisnc.191.it",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          signal: AbortSignal.timeout(20000),
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("Invio non accettato");
      form.reset();
      status.textContent = "Richiesta accettata. Grazie per averci contattato.";
      if (toast) {
        toast.textContent =
          "Richiesta accettata. Grazie per averci contattato.";
        toast.classList.remove("hidden");
        window.setTimeout(() => toast.classList.add("hidden"), 5000);
      }
    } catch {
      status.textContent = "Invio non riuscito. I dati sono ancora nel modulo: riprova oppure scrivi a raffaella@fllitavazzisnc.191.it.";
      if (toast) {
        toast.textContent =
          "Errore nell'invio del messaggio. Riprova più tardi.";
        toast.classList.remove("hidden");
        window.setTimeout(() => toast.classList.add("hidden"), 5000);
      }
    } finally {
      submit.disabled = false;
      submit.innerHTML = `${icon("send", "w-5 h-5")}<span>Invia Messaggio</span>`;
    }
  });

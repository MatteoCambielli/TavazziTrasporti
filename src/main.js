import "@fontsource/barlow-condensed/latin-400.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import { App } from "./components/App.js";
import { pages } from "./site.js";
import { icon } from "./icons.js";
import { mount } from "./render.js";
import { validateContact } from "./validation.js";
import "./base.css";
import "./styles.css";

if (new URLSearchParams(location.search).get("pagina") === "dove-siamo")
  location.replace("/dove-siamo");
const path = location.pathname.replace(/\/$/, "") || "/";
if (!document.querySelector("#root main")) mount(App(path));
document.title = (pages[path] || pages["/404"]).title;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuIcon = document.querySelector("[data-menu-icon]");
const headerTextItems = document.querySelectorAll("[data-header-text]");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const setHeaderState = () => {
  const scrolled = window.scrollY > 50;
  header?.classList.toggle("bg-white", scrolled);
  header?.classList.toggle("backdrop-blur-md", scrolled);
  header?.classList.toggle("shadow-lg", scrolled);
  headerTextItems.forEach((item) => {
    item.classList.toggle("text-white", !scrolled);
    item.classList.toggle("text-[#1B4D3E]", scrolled);
  });
};
const setMenuOpen = (open) => {
  mobileMenu?.classList.toggle("hidden", !open);
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
  if (menuIcon) menuIcon.innerHTML = icon(open ? "close" : "menu", "w-6 h-6");
};
window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
menuButton?.addEventListener("click", () =>
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"),
);
mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
matchMedia("(min-width: 1200px)").addEventListener("change", () =>
  setMenuOpen(false),
);
document.querySelector("[data-scroll-top]")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "instant" : "smooth",
  });
  document.querySelector("header a")?.focus({ preventScroll: true });
});

const mapContainer = document.querySelector("[data-map-container]");
const placeholder = document.querySelector("[data-map-placeholder]");
const revoke = document.querySelector("[data-revoke-map]");
document.querySelector("[data-load-map]")?.addEventListener("click", () => {
  placeholder.hidden = true;
  mapContainer.classList.remove("map-consent");
  mapContainer.append(
    document.querySelector("[data-map-template]").content.cloneNode(true),
  );
  revoke.hidden = false;
  revoke.focus();
});
revoke?.addEventListener("click", () => {
  mapContainer.querySelector("iframe")?.remove();
  mapContainer.classList.add("map-consent");
  placeholder.hidden = false;
  revoke.hidden = true;
  document.querySelector("[data-load-map]").focus();
});

const form = document.querySelector("[data-contact-form]");
if (form) {
  let startedAt = Date.now();
  let requestId = crypto.randomUUID();
  let sending = false;
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector("button[type=submit]");
  const setErrors = (errors = {}) => {
    for (const name of [
      "nome",
      "email",
      "telefono",
      "tipo_richiesta",
      "messaggio",
    ]) {
      const field = form.elements.namedItem(name);
      const error = document.getElementById(`error-${name}`);
      field.setAttribute("aria-invalid", String(Boolean(errors[name])));
      error.textContent = errors[name] || "";
    }
  };
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    const values = Object.fromEntries(new FormData(form));
    const { errors } = validateContact(values);
    setErrors(errors);
    if (Object.keys(errors).length) {
      status.textContent = "Controlla i campi indicati prima di inviare.";
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    sending = true;
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Invio in corso…";
    submit.textContent = "Invio in corso…";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...values, startedAt, requestId }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 400) {
          setErrors(result.errors);
          form.querySelector('[aria-invalid="true"]')?.focus();
        }
        const messages = {
          400: "Controlla i campi indicati. Se hai aperto il modulo da oltre un giorno, ricarica la pagina.",
          403: "Invio non autorizzato. Ricarica la pagina dal sito ufficiale e riprova.",
          413: "Il messaggio è troppo lungo. Riduci il testo e riprova.",
          429: "Hai inviato troppe richieste. Attendi 10 minuti prima di riprovare.",
          500: "Il servizio ha un problema temporaneo. Riprova più tardi o contattaci direttamente.",
          502: "Non è stato possibile confermare l’invio. Riprova più tardi o contattaci direttamente.",
          503: "Il modulo è temporaneamente non disponibile. Scrivici via email o chiamaci.",
        };
        status.textContent =
          messages[response.status] ||
          "Invio non riuscito. Riprova più tardi o contattaci direttamente.";
        return;
      }
      if (result.success !== true) throw new Error("INVALID_RESPONSE");
      form.reset();
      setErrors();
      startedAt = Date.now();
      requestId = crypto.randomUUID();
      status.textContent =
        "Richiesta inviata. Grazie per averci contattato: ti risponderemo appena possibile.";
    } catch (error) {
      status.textContent =
        error.name === "TimeoutError" || error.name === "AbortError"
          ? "La conferma sta impiegando troppo tempo. I dati sono ancora nel modulo: riprova o contattaci direttamente."
          : "Connessione non riuscita. I dati sono ancora nel modulo: verifica la connessione e riprova.";
    } finally {
      sending = false;
      submit.disabled = false;
      form.setAttribute("aria-busy", "false");
      submit.innerHTML = `${icon("send", "w-5 h-5")}<span>Invia messaggio</span>`;
    }
  });
  form.querySelector("[data-form-fields]").disabled = false;
}

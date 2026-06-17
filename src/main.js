import { App } from "./components/App.js";
import { icon } from "./icons.js";
import { mount } from "./render.js";
import "./styles.css";

mount(App());

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
    submit.disabled = true;
    submit.textContent = "Invio in corso...";

    try {
      await fetch(
        "https://trucking-legacy.preview.emergentagent.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      form.reset();
      if (toast) {
        toast.textContent =
          "Messaggio inviato con successo! Ti risponderemo al più presto.";
        toast.classList.remove("hidden");
        window.setTimeout(() => toast.classList.add("hidden"), 5000);
      }
    } catch {
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

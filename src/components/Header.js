import { navLinks } from "../data.js";
import { icon } from "../icons.js";

const navLink = ({ href, label }, trackHeaderColor = true) => `
  <a
    href="${href}"
    ${trackHeaderColor ? "data-header-text" : ""}
    class="font-['Manrope'] text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#10B981] text-white"
  >
    ${label}
  </a>
`;

export const Header = () => `
  <header
    data-header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-3"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <a
          href="#"
          data-header-text
          class="font-['Barlow_Condensed'] text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors text-white"
        >
          Tavazzi Trasporti
        </a>

        <nav class="hidden lg:flex items-center gap-8">
          ${navLinks.map((item) => navLink(item)).join("")}
        </nav>

        <div class="hidden lg:flex items-center gap-4">
          <a
            href="tel:0377944436"
            data-header-text
            class="flex items-center gap-2 font-semibold transition-colors text-white"
          >
            ${icon("phone", "w-4 h-4")}
            0377 944436
          </a>
          <a
            href="#contatti"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors shadow h-9 bg-[#1B4D3E] text-white hover:bg-[#143a2f] rounded-none px-6 py-2 text-sm font-bold uppercase tracking-wider"
          >
            Contattaci
          </a>
        </div>

        <button
          data-menu-toggle
          data-header-text
          class="lg:hidden p-2 transition-colors text-white"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <span data-menu-icon>${icon("menu", "w-6 h-6")}</span>
        </button>
      </div>
    </div>

    <div
      data-mobile-menu
      class="hidden lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
    >
      <nav class="flex flex-col py-4">
        ${navLinks
          .map(
            ({ href, label }) => `
              <a
                href="${href}"
                class="px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider hover:bg-gray-50 hover:text-[#1B4D3E] transition-colors"
              >
                ${label}
              </a>
            `,
          )
          .join("")}
        <div class="px-6 py-4 border-t border-gray-100 mt-2">
        <a
          href="tel:0377944436"
          class="flex items-center gap-2 text-[#1B4D3E] font-semibold mb-4"
        >
          ${icon("phone", "w-4 h-4")}
          0377 944436
        </a>
        <a
          href="#contatti"
          class="block text-center bg-[#1B4D3E] text-white hover:bg-[#143a2f] px-6 py-3 uppercase tracking-wider font-bold transition-colors"
        >
          Contattaci
        </a>
        </div>
      </nav>
    </div>
  </header>
`;

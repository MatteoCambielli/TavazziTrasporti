import { contactInfo, navLinks } from "../data.js";
import { icon } from "../icons.js";

export const Footer = () => {
  const year = new Date().getFullYear();

  return `
    <footer class="bg-[#111827] text-white" data-testid="footer">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div class="lg:col-span-2">
            <h3 class="font-['Barlow_Condensed'] text-2xl font-bold uppercase mb-4">
              Tavazzi Trasporti
            </h3>
            <p class="text-gray-400 leading-relaxed mb-6 max-w-md">
              Da oltre 60 anni, siamo il partner affidabile per il trasporto merci su strada.
              Una tradizione famigliare costruita sulla fiducia, la puntualità e il rispetto
              della parola data.
            </p>
            <div class="flex items-center gap-2 text-[#10B981]">
              <span class="font-['Barlow_Condensed'] text-4xl font-bold">60+</span>
              <span class="text-sm uppercase tracking-wider text-gray-400">
                Anni di<br />Esperienza
              </span>
            </div>
          </div>

          <div>
            <h4 class="font-['Barlow_Condensed'] text-lg font-bold uppercase mb-6 text-[#10B981]">
              Link Rapidi
            </h4>
            <ul class="space-y-3">
              ${navLinks
                .map(
                  ({ href, label }) => `
                    <li>
                      <a href="${href}" class="text-gray-400 hover:text-white transition-colors">
                        ${href === "#perche-noi" ? "Perché Sceglierci" : label}
                      </a>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </div>

          <div>
            <h4 class="font-['Barlow_Condensed'] text-lg font-bold uppercase mb-6 text-[#10B981]">
              Contatti
            </h4>
            <ul class="space-y-4">
              <li>
                <a href="${contactInfo[0].href}" class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  ${icon("phone", "w-5 h-5 text-[#10B981]")} ${contactInfo[0].value}
                </a>
              </li>
              <li>
                <a href="${contactInfo[1].href}" class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  ${icon("mail", "w-5 h-5 text-[#10B981] flex-shrink-0")} ${contactInfo[1].value}
                </a>
              </li>
              <li>
                <a
                  href="${contactInfo[2].href}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  ${icon("map", "w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5")}
                  <span>Piazza Mercato 37<br />Orio Litta (LO)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-gray-500 text-sm text-center md:text-left">
              © ${year} Tavazzi Trasporti - F.lli Tavazzi S.n.c. - Tutti i diritti riservati
            </p>
            <button
              data-scroll-top
              class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              aria-label="Torna su"
            >
              <span class="text-sm uppercase tracking-wider">Torna su</span>
              <span class="w-10 h-10 bg-[#1B4D3E] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                ${icon("arrowUp", "w-5 h-5")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  `;
};

import { contactInfo } from "../data.js";
import { icon } from "../icons.js";
import { SectionHeading } from "./SectionHeading.js";
import { fieldClasses } from "../render.js";

const contactLink = (item, index) => `
  <a
    href="${item.href}"
    ${item.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}
    class="flex items-start gap-4 group"
    data-testid="contact-info-${index}"
  >
    <div class="w-12 h-12 bg-[#1B4D3E] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-colors">
      ${icon(item.icon, "w-5 h-5")}
    </div>
    <div>
      <div class="text-sm text-gray-500 uppercase tracking-wider">${item.label}</div>
      <div class="text-[#1B4D3E] font-semibold group-hover:text-[#10B981] transition-colors">
        ${item.value}
      </div>
    </div>
  </a>
`;

export const Contact = () => `
  <section id="contatti" class="py-20 md:py-32 bg-[#F3F4F6]" data-testid="contatti-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${SectionHeading({
        kicker: "Parliamone",
        title: "Contattaci",
        text: "Hai bisogno di un preventivo? Vuoi collaborare con noi? Siamo qui per ascoltarti. Compila il modulo e ti risponderemo nel minor tempo possibile.",
      })}

      <div class="grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)]">
            <h3 class="font-['Barlow_Condensed'] text-2xl font-bold text-[#1B4D3E] uppercase mb-6">
              Informazioni di Contatto
            </h3>
            <div class="space-y-6">
              ${contactInfo.map(contactLink).join("")}
            </div>
          </div>

          <div class="bg-[#1B4D3E] text-white p-8">
            <h3 class="font-['Barlow_Condensed'] text-xl font-bold uppercase mb-4">
              Orari di Disponibilità
            </h3>
            <div class="space-y-2 text-gray-200">
              <p>Lunedì - Venerdì: 9:30 - 18:30</p>
              <p>Sabato e domenica: chiuso</p>
              <p class="text-[#10B981] font-semibold mt-4">
                Reperibilità telefonica anche fuori orario per urgenze
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="bg-white p-8 md:p-10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)]">
            <form data-contact-form class="space-y-6" data-testid="contact-form">
              <div class="grid md:grid-cols-2 gap-6">
                <label class="space-y-2 block">
                  <span class="text-gray-700 font-semibold">Nome e Cognome *</span>
                  <input
                    name="nome"
                    type="text"
                    required
                    placeholder="Il tuo nome"
                    class="${fieldClasses} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
                    data-testid="input-nome"
                  />
                </label>
                <label class="space-y-2 block">
                  <span class="text-gray-700 font-semibold">Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="La tua email"
                    class="${fieldClasses} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
                    data-testid="input-email"
                  />
                </label>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <label class="space-y-2 block">
                  <span class="text-gray-700 font-semibold">Telefono</span>
                  <input
                    name="telefono"
                    type="tel"
                    placeholder="Il tuo numero"
                    class="${fieldClasses} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
                    data-testid="input-telefono"
                  />
                </label>
                <label class="space-y-2 block">
                  <span class="text-gray-700 font-semibold">Tipo di Richiesta *</span>
                  <select
                    name="tipo_richiesta"
                    required
                    class="${fieldClasses} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50 text-gray-900"
                    data-testid="select-tipo-richiesta"
                  >
                    <option value="">Seleziona un'opzione</option>
                    <option value="preventivo">Richiesta Preventivo</option>
                    <option value="collaborazione">Collaborazione / Lavoro</option>
                    <option value="informazioni">Informazioni Generali</option>
                  </select>
                </label>
              </div>

              <label class="space-y-2 block">
                <span class="text-gray-700 font-semibold">Messaggio *</span>
                <textarea
                  name="messaggio"
                  required
                  rows="5"
                  placeholder="Descrivi la tua richiesta..."
                  class="${fieldClasses} min-h-[60px] rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50 resize-none"
                  data-testid="textarea-messaggio"
                ></textarea>
              </label>

              <button
                type="submit"
                class="w-full inline-flex items-center justify-center gap-2 bg-[#1B4D3E] text-white hover:bg-[#143a2f] rounded-none px-8 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50 transition-transform hover:-translate-y-1"
                data-testid="submit-btn"
              >
                ${icon("send", "w-5 h-5")}
                <span>Invia Messaggio</span>
              </button>

              <p class="text-sm text-gray-500 text-center">
                * Campi obbligatori. I tuoi dati saranno trattati nel rispetto della privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

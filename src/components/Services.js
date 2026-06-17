import { services } from "../data.js";
import { icon } from "../icons.js";
import { SectionHeading } from "./SectionHeading.js";

export const Services = () => `
  <section id="servizi" class="py-20 md:py-32 bg-[#F3F4F6]" data-testid="servizi-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${SectionHeading({
        kicker: "Cosa Facciamo",
        title: "I Nostri Servizi",
        text: "Offriamo un servizio di trasporto merci completo, costruito su decenni di esperienza e sulla cura di ogni dettaglio. La qualità non è un optional, è il nostro standard.",
      })}

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${services
          .map(
            (service, index) => `
              <article
                class="bg-white p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1"
                data-testid="service-card-${index}"
              >
                <div class="w-14 h-14 bg-[#1B4D3E] text-white flex items-center justify-center mb-6">
                  ${icon(service.icon, "w-7 h-7")}
                </div>
                <h3 class="font-['Barlow_Condensed'] text-2xl font-bold text-[#1B4D3E] uppercase mb-4">
                  ${service.title}
                </h3>
                <p class="text-gray-600 leading-relaxed">${service.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>

      <div class="text-center mt-16">
        <p class="text-gray-600 text-lg mb-6">Hai esigenze particolari? Parliamone insieme.</p>
        <a
          href="#contatti"
          class="inline-block bg-[#1B4D3E] text-white hover:bg-[#10B981] px-8 py-4 uppercase tracking-wider font-bold transition-colors"
        >
          Richiedi Informazioni
        </a>
      </div>
    </div>
  </section>
`;

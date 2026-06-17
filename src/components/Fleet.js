import { fleetFeatures } from "../data.js";
import { icon } from "../icons.js";
import { SectionHeading } from "./SectionHeading.js";

export const Fleet = () => `
  <section id="flotta" class="py-20 md:py-32 bg-white" data-testid="flotta-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${SectionHeading({
        kicker: "I Nostri Mezzi",
        title: "La Nostra Flotta",
        text: "",
      })}

      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="order-2 lg:order-1">
          <div class="space-y-6 text-gray-600 text-lg leading-relaxed mb-8">
            <p>
              Non crediamo nella logica del "più e meglio". La nostra flotta è
              <strong class="text-[#1B4D3E]"> volutamente contenuta</strong>,
              perché preferiamo avere pochi mezzi perfettamente mantenuti
              piùttosto che tanti veicoli trascurati.
            </p>
            <p>
              Ogni camion della nostra flotta viene sottoposto a controlli
              regolari e manutenzione preventiva. Non aspettiamo che qualcosa si
              rompa: interveniamo prima, perché la vostra merce non può permettersi ritardi.
            </p>
            <p>
              I nostri autisti conoscono ogni mezzo alla perfezione. Sono loro
              stessi a segnalare ogni minimo dettaglio, perché sanno che un
              veicolo in perfette condizioni è garanzia di sicurezza per tutti.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            ${fleetFeatures
              .map(
                (feature) => `
                  <div class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      ${icon("check", "w-4 h-4")}
                    </div>
                    <span class="text-[#1B4D3E] font-semibold">${feature}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>

        <div class="order-1 lg:order-2 relative">
          <img
            src="/pod-backups/trucking-legacy/build/static/media/flotta.3f5b6b22770caf74520f.jpeg"
            alt="Flotta Tavazzi Trasporti"
            class="w-full aspect-[4/3] object-cover shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
          />
          <div class="mobile-edge-safe-left absolute -bottom-6 -left-6 bg-[#10B981] text-white p-6 shadow-xl">
            <div class="font-['Barlow_Condensed'] text-4xl font-bold">100%</div>
            <div class="uppercase tracking-wider text-sm">Efficienza</div>
          </div>
          <div class="mobile-edge-safe-right absolute -top-6 -right-6 bg-[#1B4D3E] text-white p-6 shadow-xl">
            <div class="font-['Barlow_Condensed'] text-4xl font-bold">0</div>
            <div class="uppercase tracking-wider text-sm">Guasti in Viaggio</div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

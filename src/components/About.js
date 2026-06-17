import { aboutValues } from "../data.js";
import { icon } from "../icons.js";

export const About = () => `
  <section id="chi-siamo" class="py-20 md:py-32 bg-white" data-testid="chi-siamo-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div class="relative">
          <div class="aspect-[4/3] overflow-hidden">
            <img
              src="/pod-backups/trucking-legacy/build/static/media/storia.2c3a8b5b39826e62c895.jpeg"
              alt="Tavazzi Trasporti - La nostra storia"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="mobile-edge-safe-right absolute -bottom-6 -right-6 bg-[#1B4D3E] text-white p-6 md:p-8">
            <div class="font-['Barlow_Condensed'] text-5xl md:text-6xl font-bold">60+</div>
            <div class="uppercase tracking-wider text-sm mt-1">Anni di Esperienza</div>
          </div>
        </div>

        <div>
          <span class="text-[#10B981] text-sm font-semibold uppercase tracking-widest">
            La Nostra Storia
          </span>
          <h2
            class="font-['Barlow_Condensed'] text-4xl md:text-5xl font-bold text-[#1B4D3E] uppercase tracking-tight mt-3 mb-8"
          >
            Chi Siamo
          </h2>

          <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              <strong class="text-[#1B4D3E]">Tavazzi Trasporti</strong>
              nasce nel 1962 a Orio Litta, nel cuore della pianura lodigiana.
              Da oltre 60 anni, la nostra famiglia si dedica con passione
              al trasporto merci su strada, costruendo un rapporto di fiducia
              con clienti che spesso sono diventati amici.
            </p>
            <p>
              La nostra è una
              <strong class="text-[#1B4D3E]"> storia di continuità</strong>:
              dal fondatore ai figli, ogni generazione ha portato avanti i
              valori di serietà, puntualità e rispetto della parola data. Non
              abbiamo mai cercato di diventare i più grandi, ma i più affidabili.
            </p>
            <p>
              Oggi, con una flotta contenuta ma perfettamente mantenuta,
              continuiamo a offrire un servizio personalizzato dove il
              <strong class="text-[#1B4D3E]"> rapporto diretto con il cliente</strong>
              rimane il nostro punto di forza. Quando ci affidi la tua merce,
              parli direttamente con chi la trasporterà.
            </p>
          </div>

          <div class="grid sm:grid-cols-3 gap-4 mt-10">
            ${aboutValues
              .map(
                (item) => `
                  <div class="bg-[#F3F4F6] p-6">
                    <div class="text-[#10B981] mb-4">${icon(item.icon, "w-8 h-8")}</div>
                    <h3 class="font-['Barlow_Condensed'] text-xl font-bold text-[#1B4D3E] uppercase mb-2">
                      ${item.title}
                    </h3>
                    <p class="text-gray-600 text-sm">${item.text}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </section>
`;

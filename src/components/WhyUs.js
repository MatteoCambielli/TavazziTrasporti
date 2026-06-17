import { strengths } from "../data.js";
import { icon } from "../icons.js";
import { SectionHeading } from "./SectionHeading.js";

export const WhyUs = () => `
  <section id="perche-noi" class="py-20 md:py-32 bg-[#1B4D3E] text-white" data-testid="perche-noi-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${SectionHeading({
        kicker: "I Nostri Punti di Forza",
        title: "Perché Sceglierci",
        text: "In un settore dove tutti promettono affidabilità, noi la dimostriamo con i fatti. Da oltre 60 anni, giorno dopo giorno.",
        light: true,
      })}

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${strengths
          .map(
            (item, index) => `
              <article
                class="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all"
                data-testid="strength-card-${index}"
              >
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-14 h-14 bg-[#10B981] text-white flex items-center justify-center">
                    ${icon(item.icon, "w-7 h-7")}
                  </div>
                  <div class="font-['Barlow_Condensed'] text-5xl font-bold text-[#10B981]">
                    ${item.stat}
                  </div>
                </div>
                <h3 class="font-['Barlow_Condensed'] text-2xl font-bold uppercase mb-4">
                  ${item.title}
                </h3>
                <p class="text-gray-300 leading-relaxed">${item.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>

      <div class="mt-16 text-center max-w-4xl mx-auto">
        <blockquote class="font-['Barlow_Condensed'] text-3xl md:text-5xl font-bold uppercase leading-tight">
          "La differenza tra un trasportatore e un partner di fiducia sta nei dettagli.
          Noi curiamo ogni dettaglio come se fosse l'unico."
        </blockquote>
        <div class="mt-6 text-[#10B981] uppercase tracking-wider font-semibold">
          - Famiglia Tavazzi
        </div>
      </div>
    </div>
  </section>
`;

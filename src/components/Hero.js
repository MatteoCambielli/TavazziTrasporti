import { icon } from "../icons.js";

export const Hero = () => `
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/pod-backups/trucking-legacy/build/static/media/autostrada.dca6d8d3167e573a49cd.png')"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20">
      <div class="inline-block bg-[#1B4D3E]/90 px-6 py-3 mb-8">
        <span class="uppercase tracking-widest text-sm md:text-base font-semibold">
          Dal 1962 al vostro servizio
        </span>
      </div>

      <h1
        class="font-['Barlow_Condensed'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none mb-8"
      >
        <span class="block">60 Anni di Eccellenza</span>
        <span class="block text-[#10B981]">nel Trasporto Merci</span>
      </h1>

      <p class="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
        Affidabilità, puntualità e tradizione famigliare al servizio del tuo business.
        Una storia di dedizione che continua da tre generazioni.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#contatti"
          class="bg-[#1B4D3E] hover:bg-[#10B981] text-white px-8 py-4 uppercase tracking-wider font-bold text-lg transition-all hover:-translate-y-1 w-full sm:w-auto"
        >
          Richiedi Preventivo
        </a>
        <a
          href="#chi-siamo"
          class="border-2 border-white text-white hover:bg-white hover:text-[#1B4D3E] px-8 py-4 uppercase tracking-wider font-bold text-lg transition-all w-full sm:w-auto"
        >
          La Nostra Storia
        </a>
      </div>
    </div>

    <a
      href="#chi-siamo"
      aria-label="Scorri verso il basso"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
    >
      ${icon("chevronDown", "w-8 h-8")}
    </a>
  </section>
`;

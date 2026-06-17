(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&n(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const m=[{href:"#chi-siamo",label:"Chi Siamo"},{href:"#servizi",label:"Servizi"},{href:"#flotta",label:"La Nostra Flotta"},{href:"#perche-noi",label:"Perché Noi"},{href:"#contatti",label:"Contatti"}],l=[{icon:"phone",label:"Telefono",value:"0377 944436",href:"tel:0377944436"},{icon:"mail",label:"Email",value:"raffaella@fllitavazzisnc.191.it",href:"mailto:raffaella@fllitavazzisnc.191.it"},{icon:"map",label:"Sede",value:"Piazza Mercato 37, Orio Litta (LO)",href:"https://maps.google.com/?q=Piazza+Mercato+37+Orio+Litta"}],b=[{icon:"users",title:"Tradizione Famigliare",text:"Tre generazioni unite dalla stessa passione per il trasporto"},{icon:"heart",title:"Dedizione Totale",text:"Ogni cliente è trattato come parte della famiglia"},{icon:"shield",title:"Affidabilità Garantita",text:"Oltre 60 anni di servizio senza compromessi"}],w=[{icon:"truck",title:"Trasporto Merci",text:"Trasporto su gomma affidabile e sicuro per merci di ogni tipo. La nostra esperienza garantisce consegne puntuali in tutta Italia."},{icon:"warehouse",title:"Magazzino e Logistica",text:"Offriamo soluzioni di stoccaggio, con magazzini sicuri e organizzati per ottimizzare i vostri flussi di lavoro."},{icon:"clock",title:"Puntualità Garantita",text:"Il tempo è denaro. Rispettiamo sempre le tempistiche concordate, perché la vostra pianificazione dipende dalla nostra affidabilità."},{icon:"package",title:"Cura del Carico",text:"Ogni merce viene trattata con la massima attenzione. Carico e scarico accurato per preservare l'integrità dei vostri prodotti."},{icon:"route",title:"Flessibilità Operativa",text:"Ci adattiamo alle vostre esigenze. Orari, percorsi e modalità di consegna personalizzate per ogni cliente."},{icon:"shield",title:"Sicurezza Totale",text:"Mezzi revisionati, autisti esperti e assicurazione completa. La vostra merce è sempre in buone mani."}],y=["Mezzi moderni e costantemente aggiornati","Manutenzione preventiva programmata","Revisioni sempre in regola","Dotazioni di sicurezza complete","Sistemi di tracciamento GPS","Copertura assicurativa totale"],z=[{icon:"award",stat:"60+",title:"Anni di Esperienza",text:"Sessant'anni di trasporti senza interruzioni, con la stessa passione del primo giorno."},{icon:"users",stat:"3",title:"Generazioni",text:"Una tradizione di famiglia che si tramanda con orgoglio da nonno a nipote."},{icon:"clock",stat:"100%",title:"Puntualità",text:"Il rispetto dei tempi non è un obiettivo, è una promessa che manteniamo sempre."},{icon:"phone",stat:"1",title:"Referente Diretto",text:"Niente call center. Parli sempre con chi conosce la tua merce e il tuo business."},{icon:"shield",stat:"0",title:"Compromessi",text:"La qualità del servizio non è mai stata negoziabile per la nostra famiglia."},{icon:"heart",stat:"∞",title:"Clienti Soddisfatti",text:"Molti dei nostri clienti sono con noi da decenni. È il nostro orgoglio più grande."}],B=(e,t="w-5 h-5")=>`
  <svg class="${t}" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${e}
  </svg>
`,a=(e,t)=>{const i={phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6.31 6.31l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z"/>',mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>',map:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',warehouse:'<path d="M22 8.35V21H2V8.35L12 3l10 5.35Z"/><path d="M6 21V11h12v10"/><path d="M9 21v-4h6v4"/><path d="M6 14h12"/><path d="M9 11V8.5h6V11"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/>',truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',package:'<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',award:'<path d="m15.48 12.89 1.57 8.88L12 18.77l-5.05 3 1.57-8.88"/><circle cx="12" cy="8" r="6"/>',check:'<path d="M20 6 9 17l-5-5"/>',menu:'<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',arrowUp:'<path d="m18 15-6-6-6 6"/>',send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'};return B(i[e]||i.check,t)},k=({href:e,label:t},i=!0)=>`
  <a
    href="${e}"
    ${i?"data-header-text":""}
    class="font-['Manrope'] text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#10B981] text-white"
  >
    ${t}
  </a>
`,$=()=>`
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
          ${m.map(e=>k(e)).join("")}
        </nav>

        <div class="hidden lg:flex items-center gap-4">
          <a
            href="tel:0377944436"
            data-header-text
            class="flex items-center gap-2 font-semibold transition-colors text-white"
          >
            ${a("phone","w-4 h-4")}
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
          <span data-menu-icon>${a("menu","w-6 h-6")}</span>
        </button>
      </div>
    </div>

    <div
      data-mobile-menu
      class="hidden lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
    >
      <nav class="flex flex-col py-4">
        ${m.map(({href:e,label:t})=>`
              <a
                href="${e}"
                class="px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider hover:bg-gray-50 hover:text-[#1B4D3E] transition-colors"
              >
                ${t}
              </a>
            `).join("")}
        <div class="px-6 py-4 border-t border-gray-100 mt-2">
        <a
          href="tel:0377944436"
          class="flex items-center gap-2 text-[#1B4D3E] font-semibold mb-4"
        >
          ${a("phone","w-4 h-4")}
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
`,E=()=>`
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
      ${a("chevronDown","w-8 h-8")}
    </a>
  </section>
`,L=()=>`
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
            ${b.map(e=>`
                  <div class="bg-[#F3F4F6] p-6">
                    <div class="text-[#10B981] mb-4">${a(e.icon,"w-8 h-8")}</div>
                    <h3 class="font-['Barlow_Condensed'] text-xl font-bold text-[#1B4D3E] uppercase mb-2">
                      ${e.title}
                    </h3>
                    <p class="text-gray-600 text-sm">${e.text}</p>
                  </div>
                `).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>
`,d=({kicker:e,title:t,text:i,light:n=!1})=>`
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="text-[#10B981] text-sm font-semibold uppercase tracking-widest">
      ${e}
    </span>
    <h2
      class="font-['Barlow_Condensed'] text-4xl md:text-5xl font-bold uppercase tracking-tight mt-3 mb-6 ${n?"text-white":"text-[#1B4D3E]"}"
    >
      ${t}
    </h2>
    ${i?`<p class="${n?"text-gray-200":"text-gray-600"} text-lg leading-relaxed">${i}</p>`:""}
  </div>
`,D=()=>`
  <section id="servizi" class="py-20 md:py-32 bg-[#F3F4F6]" data-testid="servizi-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${d({kicker:"Cosa Facciamo",title:"I Nostri Servizi",text:"Offriamo un servizio di trasporto merci completo, costruito su decenni di esperienza e sulla cura di ogni dettaglio. La qualità non è un optional, è il nostro standard."})}

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${w.map((e,t)=>`
              <article
                class="bg-white p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1"
                data-testid="service-card-${t}"
              >
                <div class="w-14 h-14 bg-[#1B4D3E] text-white flex items-center justify-center mb-6">
                  ${a(e.icon,"w-7 h-7")}
                </div>
                <h3 class="font-['Barlow_Condensed'] text-2xl font-bold text-[#1B4D3E] uppercase mb-4">
                  ${e.title}
                </h3>
                <p class="text-gray-600 leading-relaxed">${e.text}</p>
              </article>
            `).join("")}
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
`,C=()=>`
  <section id="flotta" class="py-20 md:py-32 bg-white" data-testid="flotta-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${d({kicker:"I Nostri Mezzi",title:"La Nostra Flotta",text:""})}

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
            ${y.map(e=>`
                  <div class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      ${a("check","w-4 h-4")}
                    </div>
                    <span class="text-[#1B4D3E] font-semibold">${e}</span>
                  </div>
                `).join("")}
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
`,M=()=>`
  <section id="perche-noi" class="py-20 md:py-32 bg-[#1B4D3E] text-white" data-testid="perche-noi-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${d({kicker:"I Nostri Punti di Forza",title:"Perché Sceglierci",text:"In un settore dove tutti promettono affidabilità, noi la dimostriamo con i fatti. Da oltre 60 anni, giorno dopo giorno.",light:!0})}

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${z.map((e,t)=>`
              <article
                class="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all"
                data-testid="strength-card-${t}"
              >
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-14 h-14 bg-[#10B981] text-white flex items-center justify-center">
                    ${a(e.icon,"w-7 h-7")}
                  </div>
                  <div class="font-['Barlow_Condensed'] text-5xl font-bold text-[#10B981]">
                    ${e.stat}
                  </div>
                </div>
                <h3 class="font-['Barlow_Condensed'] text-2xl font-bold uppercase mb-4">
                  ${e.title}
                </h3>
                <p class="text-gray-300 leading-relaxed">${e.text}</p>
              </article>
            `).join("")}
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
`,_=e=>{document.getElementById("root").innerHTML=e},c="flex h-10 w-full border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",T=(e,t)=>`
  <a
    href="${e.href}"
    ${e.href.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}
    class="flex items-start gap-4 group"
    data-testid="contact-info-${t}"
  >
    <div class="w-12 h-12 bg-[#1B4D3E] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-colors">
      ${a(e.icon,"w-5 h-5")}
    </div>
    <div>
      <div class="text-sm text-gray-500 uppercase tracking-wider">${e.label}</div>
      <div class="text-[#1B4D3E] font-semibold group-hover:text-[#10B981] transition-colors">
        ${e.value}
      </div>
    </div>
  </a>
`,S=()=>`
  <section id="contatti" class="py-20 md:py-32 bg-[#F3F4F6]" data-testid="contatti-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${d({kicker:"Parliamone",title:"Contattaci",text:"Hai bisogno di un preventivo? Vuoi collaborare con noi? Siamo qui per ascoltarti. Compila il modulo e ti risponderemo nel minor tempo possibile."})}

      <div class="grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)]">
            <h3 class="font-['Barlow_Condensed'] text-2xl font-bold text-[#1B4D3E] uppercase mb-6">
              Informazioni di Contatto
            </h3>
            <div class="space-y-6">
              ${l.map(T).join("")}
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
                    class="${c} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
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
                    class="${c} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
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
                    class="${c} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50"
                    data-testid="input-telefono"
                  />
                </label>
                <label class="space-y-2 block">
                  <span class="text-gray-700 font-semibold">Tipo di Richiesta *</span>
                  <select
                    name="tipo_richiesta"
                    required
                    class="${c} rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50 text-gray-900"
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
                  class="${c} min-h-[60px] rounded-none border-gray-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50 resize-none"
                  data-testid="textarea-messaggio"
                ></textarea>
              </label>

              <button
                type="submit"
                class="w-full inline-flex items-center justify-center gap-2 bg-[#1B4D3E] text-white hover:bg-[#143a2f] rounded-none px-8 py-3 text-sm font-bold uppercase tracking-wider disabled:opacity-50 transition-transform hover:-translate-y-1"
                data-testid="submit-btn"
              >
                ${a("send","w-5 h-5")}
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
`,O=()=>{const e=new Date().getFullYear();return`
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
              ${m.map(({href:t,label:i})=>`
                    <li>
                      <a href="${t}" class="text-gray-400 hover:text-white transition-colors">
                        ${t==="#perche-noi"?"Perché Sceglierci":i}
                      </a>
                    </li>
                  `).join("")}
            </ul>
          </div>

          <div>
            <h4 class="font-['Barlow_Condensed'] text-lg font-bold uppercase mb-6 text-[#10B981]">
              Contatti
            </h4>
            <ul class="space-y-4">
              <li>
                <a href="${l[0].href}" class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  ${a("phone","w-5 h-5 text-[#10B981]")} ${l[0].value}
                </a>
              </li>
              <li>
                <a href="${l[1].href}" class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  ${a("mail","w-5 h-5 text-[#10B981] flex-shrink-0")} ${l[1].value}
                </a>
              </li>
              <li>
                <a
                  href="${l[2].href}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  ${a("map","w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5")}
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
              © ${e} Tavazzi Trasporti - F.lli Tavazzi S.n.c. - Tutti i diritti riservati
            </p>
            <button
              data-scroll-top
              class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              aria-label="Torna su"
            >
              <span class="text-sm uppercase tracking-wider">Torna su</span>
              <span class="w-10 h-10 bg-[#1B4D3E] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                ${a("arrowUp","w-5 h-5")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  `},j=()=>`
  <div class="min-h-screen" data-testid="homepage">
    ${$()}
    <main>
      ${E()}
      ${L()}
      ${D()}
      ${C()}
      ${M()}
      ${S()}
    </main>
    ${O()}
    <div
      data-toast
      class="hidden fixed top-4 right-4 z-[100] bg-[#111827] text-white px-6 py-4 shadow-xl max-w-sm"
      role="status"
    ></div>
  </div>
`;_(j());const g=document.querySelector("[data-header]"),x=document.querySelector("[data-menu-toggle]"),h=document.querySelector("[data-mobile-menu]"),u=document.querySelector("[data-menu-icon]"),r=document.querySelector("[data-toast]"),F=document.querySelectorAll("[data-header-text]"),f=()=>{const e=window.scrollY>50;g?.classList.toggle("bg-white",e),g?.classList.toggle("backdrop-blur-md",e),g?.classList.toggle("shadow-lg",e),F.forEach(t=>{t.classList.toggle("text-white",!e),t.classList.toggle("text-[#1B4D3E]",e)})},v=e=>{h?.classList.toggle("hidden",!e),x?.setAttribute("aria-expanded",String(e)),u&&(u.innerHTML=a(e?"close":"menu","w-6 h-6"))};window.addEventListener("scroll",f,{passive:!0});f();x?.addEventListener("click",()=>{const e=x.getAttribute("aria-expanded")==="true";v(!e)});h?.addEventListener("click",e=>{e.target.closest("a")&&v(!1)});document.querySelector("[data-scroll-top]")?.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});document.querySelector("[data-contact-form]")?.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget,i=t.querySelector("button[type='submit']");if(!t.checkValidity()){t.reportValidity();return}const n=Object.fromEntries(new FormData(t).entries());i.disabled=!0,i.textContent="Invio in corso...";try{await fetch("https://trucking-legacy.preview.emergentagent.com/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t.reset(),r&&(r.textContent="Messaggio inviato con successo! Ti risponderemo al più presto.",r.classList.remove("hidden"),window.setTimeout(()=>r.classList.add("hidden"),5e3))}catch{r&&(r.textContent="Errore nell'invio del messaggio. Riprova più tardi.",r.classList.remove("hidden"),window.setTimeout(()=>r.classList.add("hidden"),5e3))}finally{i.disabled=!1,i.innerHTML=`${a("send","w-5 h-5")}<span>Invia Messaggio</span>`}});

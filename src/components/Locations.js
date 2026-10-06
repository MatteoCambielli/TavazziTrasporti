import { icon } from "../icons.js";

const locations = [
  {
    number: "01",
    title: "Sede",
    address: "Piazza Mercato 37",
    icon: "map",
    text: "Il punto di riferimento per informazioni, preventivi e rapporti con la nostra azienda.",
  },
  {
    number: "02",
    title: "Magazzino",
    address: "Viale dell’Artigianato 7",
    icon: "warehouse",
    text: "Il riferimento per la logistica. Contattaci prima di arrivare per concordare ritiri e consegne.",
  },
];
const mapsLink = (address) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address + ", Orio Litta, LO, Italia")}`;
const start = encodeURIComponent("Piazza Mercato 37, Orio Litta, Italia");
const end = encodeURIComponent("Viale dell'Artigianato 7, Orio Litta, Italia");

export const Locations = () => `
  <section class="location-hero">
    <div class="location-container">
      <a class="location-back" href="/">← Torna alla home</a>
      <p class="location-kicker">ORIO LITTA · LODI</p>
      <h1>Dove siamo<span>Due punti. Un unico riferimento.</span></h1>
      <p class="location-intro">La nostra sede è ad Orio Litta. Qui trovi gli uffici e i depositi: scegli la tua destinazione e organizza il prossimo incontro con noi.</p>
    </div>
  </section>
  <section class="location-content location-container" aria-label="Le nostre sedi">
    <div class="location-map-panel">
      <div class="location-map-heading"><div><p class="location-kicker">SUL TERRITORIO</p><h2>Ci trovi qui.</h2></div><span class="location-badge">2 sedi a Orio Litta</span></div>
      <div data-map-container class="map-consent">
        <div data-map-placeholder><span class="location-icon">${icon("map", "w-6 h-6")}</span><h3>La mappa, solo se lo scegli.</h3><p>Google Maps può usare cookie e ricevere il tuo indirizzo IP e dati del browser. La mappa resta bloccata fino al tuo consenso, valido solo su questa pagina.</p><p><a href="/cookie-policy">Informazioni sui cookie</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Google</a></p><button type="button" data-load-map class="location-call">Acconsento e carico la mappa</button><p>Puoi continuare senza attivarla: indirizzi e indicazioni sono disponibili qui sotto.</p></div>
      </div>
      <button type="button" data-revoke-map class="map-revoke" hidden>Revoca consenso alla mappa</button>
      <template data-map-template><iframe class="location-map" title="Mappa di Orio Litta con sede in Piazza Mercato 37 e magazzino in Viale dell’Artigianato 7" src="https://www.google.com/maps?saddr=${start}&amp;daddr=${end}&amp;output=embed&amp;hl=it" allowfullscreen referrerpolicy="no-referrer"></iframe></template>
      <div class="location-map-caption"><span><i></i> Sede · Piazza Mercato 37</span><span><i></i> Magazzino · Viale dell’Artigianato 7</span></div>
      <p class="location-map-note">La mappa mostra i due indirizzi e il collegamento tra le sedi. Per partire dalla tua posizione, scegli “Indicazioni stradali” qui sotto.</p>
    </div>
    <div class="location-cards">${locations
      .map(
        (location) => `
      <article class="location-card">
        <div class="location-card-top"><span class="location-icon">${icon(location.icon, "w-6 h-6")}</span><span class="location-number">${location.number}</span></div>
        <h2>${location.title}</h2><p class="location-address">${location.address}<br><span>26863 Orio Litta (LO)</span></p>
        <p class="location-description">${location.text}</p>
        <a class="location-direction" href="${mapsLink(location.address)}" target="_blank" rel="noopener noreferrer">Indicazioni stradali ${icon("arrowUp", "w-5 h-5")}</a>
      </article>`,
      )
      .join("")}
    </div>
    <div class="location-visit">
      <div><p class="location-kicker">PRIMA DI PARTIRE</p><h2>Organizziamo il tuo arrivo.</h2><p>Per ritiri e consegne, comunicaci il tipo di merce e l’orario previsto. Ti aiuteremo a concordare l’accesso al magazzino e le operazioni di carico o scarico.</p><a href="tel:0377944436" class="location-call">${icon("phone", "w-5 h-5")} 0377 944436</a></div>
      <div class="location-hours"><h3>Orari di disponibilità</h3><p>Lunedì – Venerdì<strong>9:30 – 12:30 / 14:30 – 18:30</strong></p><p>Sabato e domenica<strong>Chiuso</strong></p><small>Per l’accesso al magazzino, concorda l’orario telefonicamente.</small></div>
    </div>
    <div class="location-contact"><span>Preferisci scriverci?</span><a href="mailto:raffaella@fllitavazzisnc.191.it">raffaella@fllitavazzisnc.191.it ↗</a><a href="/#contatti">Richiedi un preventivo →</a></div>
  </section>
`;

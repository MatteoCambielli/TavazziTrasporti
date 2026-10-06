export const company = {
  name: "Tavazzi Trasporti",
  legalName: "Tavazzi Trasporti S.n.c.",
  email: "raffaella@fllitavazzisnc.191.it",
  telephone: "+39 0377 944436",
  vat: "01574970156",
  street: "Piazza Mercato 37",
  postalCode: "26863",
  city: "Orio Litta",
  province: "LO",
  // TODO_COMPANY: verificare PEC, REA, Registro Imprese, codice fiscale e dati societari obbligatori con il titolare.
};
export const pages = {
  "/": {
    title: "Tavazzi Trasporti | Autotrasporti e Logistica a Orio Litta (LO)",
    description:
      "Tavazzi Trasporti opera dal 1962 nel trasporto merci su strada, logistica e stoccaggio. Soluzioni affidabili e flessibili da Orio Litta, Lodi.",
  },
  "/dove-siamo": {
    title: "Dove siamo | Sede e magazzino a Orio Litta | Tavazzi Trasporti",
    description:
      "Trova la sede Tavazzi Trasporti in Piazza Mercato 37 e il magazzino in Viale dell’Artigianato 7 a Orio Litta. Indicazioni e contatti per organizzare il tuo arrivo.",
  },
  "/privacy": {
    title: "Privacy Policy | Tavazzi Trasporti",
    description:
      "Informativa sul trattamento dei dati personali e delle richieste inviate a Tavazzi Trasporti attraverso il modulo contatti.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Tavazzi Trasporti",
    description:
      "Informazioni sui cookie, sui servizi esterni e sull’attivazione facoltativa della mappa di Tavazzi Trasporti.",
  },
  "/404": {
    title: "Pagina non trovata | Tavazzi Trasporti",
    description:
      "La pagina richiesta non è disponibile. Torna alla homepage di Tavazzi Trasporti.",
  },
};
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

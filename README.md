# Tavazzi Trasporti S.n.c.

Sito aziendale Vite + JavaScript ES modules, senza React. La build prerenderizza pagine HTML complete e aggiunge metadata specifici: `/`, `/dove-siamo`, `/privacy`, `/cookie-policy`, `/404`. Le interazioni sono progressive; testi e navigazione restano disponibili senza JavaScript. L’API Node.js `/api/contact` è una Vercel Function indipendente.

## Development

Node.js **24.x**, npm e il lockfile versionato sono necessari. Non utilizzare dipendenze provenienti da vecchi ZIP.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

`npm run check` esegue lint, test e build. Non è presente TypeScript: non esiste un typecheck separato. ESLint e i test Node verificano JavaScript e contratti dell’API. `npm run preview` serve gli asset statici; non esegue le Vercel Functions. In sviluppo Vite collega l’endpoint al medesimo handler: senza configurazione risponde 503, non simula un invio riuscito. Per la prova reale del modulo usare un deployment Vercel configurato; l’API accetta solo l’origine HTTPS indicata da SITE_URL e l’IP fornito dal proxy Vercel.

## Environment variables

Copia `.env.example` in `.env.local` per impostazioni locali, oppure configura le variabili nel progetto Vercel. I file `.env*` sono ignorati (tranne l’esempio). **Nessuna variabile segreta deve avere prefisso `VITE_`.**

| Variabile                  | Utilizzo                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                 | Origine HTTPS del dominio ufficiale, senza percorsi; usata per canonical, Open Graph, sitemap e controllo Origin dell’API. |
| `CONTACT_EMAIL`            | Destinatario server delle richieste: impostare `raffaella@fllitavazzisnc.191.it`.                                          |
| `EMAIL_FROM`               | Mittente verificato in Resend, su un dominio controllato dall’azienda. Non usare l’email del visitatore come mittente.     |
| `RESEND_API_KEY`           | Chiave Resend con permessi di invio, solo lato server.                                                                     |
| `UPSTASH_REDIS_REST_URL`   | URL HTTPS del database Redis Upstash.                                                                                      |
| `UPSTASH_REDIS_REST_TOKEN` | Token Redis REST con permessi per EVAL/INCR/EXPIRE/TTL.                                                                    |
| `RATE_LIMIT_SECRET`        | Segreto casuale di almeno 32 caratteri per HMAC delle chiavi antispam e idempotenza; generare e conservare in modo sicuro. |

Nessun dominio è stato fornito. Senza SITE_URL, la build locale è **noindex**, robots blocca l’indicizzazione e la sitemap è vuota. La build di produzione Vercel fallisce senza SITE_URL: è un controllo intenzionale, non un valore placeholder da pubblicare. Le build Vercel Preview sono sempre noindex. Per i test SEO si usa esclusivamente un dominio di esempio in una directory temporanea; non entra nella build finale.

## Deploy su Vercel

1. Importare il repository; preset **Vite**, Node **24.x**, install `npm ci`, build `npm run build`, output `dist` (già in `vercel.json`).
2. Collegare il dominio ufficiale, scegliere una sola origine canonica (apex o www) e impostare il redirect dell’altra variante nella dashboard Domains. Vercel gestisce TLS.
3. Configurare tutte le variabili sopra nell’ambiente Production. Configurare separatamente eventuali credenziali di test in Preview; per un invio reale in preview il controllo Origin deve essere adattato esplicitamente all’origine di test, senza disabilitarlo in produzione. I domini temporanei sono intenzionalmente rifiutati come SITE_URL dalla build SEO.
4. Pubblicare solo dopo la revisione privacy e la verifica dei provider. Eseguire la prova completa di ricezione della mail dal dominio ufficiale prima di aprire il sito al pubblico.

`cleanUrls` serve gli HTML prerenderizzati; nessuna riscrittura globale verso index.html, così gli URL inesistenti mantengono **HTTP 404** con pagina personalizzata. La vecchia query `?pagina=dove-siamo` viene reindirizzata a `/dove-siamo`. Gli header includono CSP senza unsafe-inline/unsafe-eval, HSTS, nosniff, frame-ancestors, Referrer-Policy e Permissions-Policy. Non attivare Vercel Analytics/Speed Insights o script aggiuntivi senza riesaminare privacy e CSP. Gli header effettivi e la risoluzione delle Functions vanno ricontrollati sul deployment reale.

## Form contatti

Provider predisposto: **Resend**, via REST HTTPS e `fetch` nativo (nessun SDK pesante). Prima del go-live:

- Verificare un dominio mittente in Resend e configurare i record DNS richiesti, inclusi SPF/DKIM; verificare DMARC in base alla gestione della posta aziendale.
- Impostare EMAIL_FROM, CONTACT_EMAIL e RESEND_API_KEY. Per cambiare provider, sostituire solo l’adapter `server/email.js` e aggiornare l’informativa.
- Creare Redis Upstash, preferendo una regione UE compatibile con le esigenze aziendali, e impostare URL/token e RATE_LIMIT_SECRET.
- Verificare accordi sul trattamento, sub-responsabili, retention e trasferimenti dei provider prima di abilitarli.

L’API controlla metodo, tipo di contenuto, origine esatta, dimensione reale del body (24.000 byte), tipi, campi obbligatori, lunghezze, email, telefono, valori ammessi e caratteri di controllo. Non abilita CORS. Il testo dell’utente è inviato come **testo semplice** e l’email validata viene usata come Reply-To. Il destinatario non arriva dal browser.

Antispam: honeypot fuori dal focus e dall’albero di accessibilità; limite atomico Redis **5 tentativi in 10 minuti per IP**; tempo di compilazione minimo di 2 secondi e massimo 24 ore. Il controllo temporale è un segnale euristico, non una prova crittografica contro bot. L’IP viene letto solo dall’header affidabile `x-vercel-forwarded-for`, sostituito dall’ingresso Vercel; non fidarsi di `x-forwarded-for` su infrastrutture diverse. Redis salva HMAC + contatori con TTL di 600 secondi, non messaggi, email o IP in chiaro. Nessun limite solo in memoria. Se Redis o le credenziali mancano, l’invio **fallisce chiuso con 503**. Per abusi distribuiti valutare regole del firewall Vercel: il limite applicativo non sostituisce la protezione volumetrica.

Timeout su Redis/email/browser; header Retry-After su 429; chiave idempotente lato Resend per i tentativi ripetuti della stessa richiesta nella pagina aperta. Una ricarica genera un nuovo ID: l’idempotenza non copre tutte le possibili duplicazioni. Nessun salvataggio dei messaggi nel database dell’app. I fornitori email e la casella destinataria trattano e possono conservare la corrispondenza secondo le impostazioni da verificare.

Il frontend conserva i dati in caso di errore e non visualizza errori interni. HTTP 200 significa accettazione da parte del provider, non prova di consegna in inbox: verificare ricezione, spam e stato di consegna nel pannello del provider. I log applicativi riportano solo codici tecnici generici. Non aggiungere logging dei payload.

## Privacy e servizi terzi

- Vercel: hosting, funzione API e log infrastrutturali.
- Resend: invio email dal backend; sostituisce completamente FormSubmit.
- Upstash: contatori antispam dal backend.
- Provider della casella aziendale: ricezione e conservazione dei messaggi; identificazione e condizioni da confermare.
- Google Maps: **nessuna richiesta prima del consenso**, attivazione facoltativa sulla pagina Dove siamo, revoca disponibile. Consenso solo in memoria della pagina, perso al reload; nessun localStorage/sessionStorage/cookie proprietario. La revoca non elimina cookie già impostati dal servizio esterno.
- Nessun analytics, pixel, newsletter o marketing. Nessun banner generale invasivo.
- Barlow Condensed e Manrope sono serviti dallo stesso dominio via Fontsource. Licenze SIL OFL 1.1 in `public/fonts/`; nessuna richiesta runtime a Google Fonts.

I testi di `/privacy` e `/cookie-policy` sono **una base tecnica da sottoporre a verifica del titolare/consulente**, non consulenza legale definitiva. I TODO sono nel codice, non presentati ai visitatori. Prima del go-live approvare finalità/basi, conservazione concreta della corrispondenza e dei log, fornitori, DPA, regioni e garanzie di trasferimento. Verificare eventuali ulteriori dati societari da pubblicare (PEC, REA, Registro Imprese, codice fiscale); nessuno è stato inventato.

## Asset e SEO

Immagini originali convertite in WebP senza ingrandirle; dimensioni dichiarate, lazy loading sotto la piega, hero prioritaria. Immagine social ricavata dalla fotografia esistente della flotta. Non è stato trovato un logo aziendale: favicon e icona touch usano soltanto le iniziali tipografiche TT, da sostituire con gli asset ufficiali se disponibili; non vengono dichiarate come logo aziendale nei dati strutturati.

Metadata e JSON-LD Organization sono generati in `scripts/prerender.js` da `src/site.js`; nessuna recensione, coordinata o statistica inventata. `sitemap.xml` e `robots.txt` vengono generati in dist. La dicitura originaria “1000 m di capannone coperto” è stata resa “1.000 m²”: verificare con il titolare l’unità e la superficie prima di pubblicare.

## Verifiche e manutenzione

`npm test` copre API, errori, antispam, idempotenza, rendering statico, metadata, sitemap e blocco della produzione senza dominio. `npm audit` verifica anche le dipendenze di sviluppo. L’override mirato di esbuild alla versione corretta elimina l’advisory del server di sviluppo Windows; compatibilità verificata con Vite 7 tramite build e browser. Riesaminare/rimuovere l’override quando Vite aggiorna la propria dipendenza.

La pulizia dell’indice Git esclude node_modules, cache, dist e vecchi backup; non riscrive la cronologia Git. Build e cache restano rigenerabili. Consultare `docs/production-readiness.md` per l’audit e i limiti della verifica locale.

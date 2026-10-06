# Audit produzione — 6 ottobre 2026

## Stato

Implementazione e build locale verificate. **Non ancora pubblicato né verificato con email/Redis reali**: mancano dominio e credenziali dei servizi. Il go-live richiede anche l’approvazione dei testi e delle configurazioni privacy da parte del titolare.

## Analisi iniziale

Vite 7, template HTML in JavaScript, stylesheet compilato, nessun React effettivamente usato nonostante la dipendenza dal relativo plugin. Vecchia API sostituita in precedenza da FormSubmit senza backend proprietario. Google Fonts via CSS remoto e preconnect; mappa Google caricata immediatamente. Nessun analytics/pixel rilevato. Nessuna persistenza browser. Assenti pagine legali, routing statico indicizzabile, endpoint interno, header, favicon e metadata completi. Node modules, cache e dist erano tracciati. Sei vulnerabilità iniziali (quattro high, una moderate, una low) nelle dipendenze di sviluppo.

## Interventi

- Footer societario con anno automatico, P. IVA, sede e pagine legali.
- `/privacy`, `/cookie-policy`, `/dove-siamo`, 404 personalizzata; HTML completo a build time, nessun fallback SPA globale.
- Consenso alla mappa nel punto d’uso, revoca, nessuna persistenza della scelta, nessuna connessione a Google prima della scelta.
- API `/api/contact` same-origin, validazione condivisa client/server, errori accessibili, timeout, conservazione dei dati nel form in caso di errore.
- Adapter Resend server-only, destinatario da env, testo semplice, Reply-To validato, idempotenza.
- Rate limiting persistente e atomico Redis, HMAC degli IP con TTL, honeypot e controllo temporale; indisponibilità della protezione impedisce gli invii.
- CSP senza unsafe-inline/eval e altri header Vercel; nessun secret nel frontend.
- Font locali con licenze OFL, immagini WebP e CSS legacy ridotto da circa 60 KB a 21 KB eliminando regole inutilizzate. CSS finale comprensivo dei font e degli stili aggiunti: circa 30 KB, 7 KB gzip. JS circa 54 KB, 17 KB gzip. Immagini pubbliche circa 256 KB.
- Menu tastiera/Escape, skip link, focus, etichette/errori form, touch target, reduced motion, contrasto, link verificati.
- Dipendenza React inutilizzata rimossa; lockfile aggiornato, installazione pulita, override mirato esbuild; zero vulnerabilità dopo npm ci/audit.
- Node modules, cache, dist e backup rimossi dall’indice Git e dal deploy. La cronologia preesistente non è stata riscritta.

## Verifiche

- `npm ci`: riuscito dal lockfile aggiornato.
- `npm run lint`: riuscito.
- `npm test`: 36 test superati, inclusi controlli API, dimensione effettiva body, errori, Redis, invio mock, rendering statico, schema, canonical e sitemap con dominio di fixture.
- Typecheck: non applicabile, progetto JavaScript senza TypeScript.
- `npm run build`: riuscito senza errori né warning CSS; senza SITE_URL genera una build noindex.
- Chrome via Playwright, server locale che applica gli header di `vercel.json`: 28 combinazioni di pagina/larghezza (homepage, sedi, privacy, cookie × 320/375/390/430/768/1024/1440). Nessun overflow rilevato, nessun errore JS/CSP e nessun overlay.
- Zero richieste esterne prima del consenso. Caricamento, revoca e reset al reload della mappa verificati.
- Apertura/chiusura menu da tastiera; form vuoto e stati HTTP simulati 200/201/400/403/429/500/503, errore di rete e timeout reale di 20 secondi verificati. Nessuna email di prova è stata inviata.
- Link interni/ancore, favicon, apple touch icon, social image, robots e sitemap verificati. Pagina sconosciuta con HTTP 404 verificata nel server di test.
- Homepage leggibile con JavaScript disabilitato.
- Controllo sorgenti per endpoint dismessi, domini font remoti, placeholder, style inline e pattern comuni di credenziali: nessun residuo operativo trovato.

Browser plugin dedicato assente: usato Playwright con Chrome installato. Verifiche di base, non certificazione WCAG o penetration test. Non verificati Safari/Firefox, dispositivi fisici, DNS/TLS del dominio ufficiale, effettivi header/routing Vercel, recapito email, contratti o impostazioni dei provider. Richieste Resend e Redis validate con mock: occorre smoke test reale dopo configurazione.

## Classificazione delle stringhe dell’audit

- `preview`: script locale e protezione noindex degli ambienti Vercel Preview; nessun endpoint demo nel frontend.
- `localhost` / `127.0.0.1` / `http://`: esclusivamente sviluppo o filtro di validazione; gli URI standard di namespace SVG e sitemap non sono connessioni HTTP.
- `API_KEY` / `SECRET`: nomi di variabili server e placeholder vuoti; nessun valore reale incluso.
- `TODO_COMPANY`: dati societari mancanti da verificare, in `src/site.js`.
- `TODO_PRIVACY_REVIEW`: basi giuridiche, retention, DPA, fornitori e trasferimenti da verificare, in `src/components/Legal.js`.
- Nessun FIXME operativo. I riferimenti HTTP contenuti nelle licenze OFL sono parte del testo originale delle licenze.

## Revisione umana necessaria

1. Dominio ufficiale e mittente verificato, credenziali Resend/Upstash e destinatario.
2. Conferma informative, procedure di conservazione/cancellazione, log dei provider, DPA e garanzie di trasferimento. Identificare il gestore della casella email.
3. Verificare PEC/REA/Registro Imprese/codice fiscale ed eventuali altre informazioni societarie obbligatorie.
4. Confermare la superficie del capannone: il testo “1000 m” è stato normalizzato a “1.000 m²”. Confermare anche i contenuti aziendali mantenuti, inclusi gli orari già presenti.
5. Logo ufficiale non disponibile: icona tipografica TT provvisoria, nessun logo inventato inserito nello schema.

## Fonti tecniche e normative consultate

- Vercel Node.js Functions: https://vercel.com/docs/functions/runtimes/node-js
- Resend Send Email: https://resend.com/docs/api-reference/emails/send-email
- Upstash Redis REST: https://upstash.com/docs/redis/features/restapi
- Garante, linee guida cookie: https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876
- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=it
- Fontsource e licenze SIL OFL distribuite con Barlow Condensed e Manrope.

# Tavazzi Trasporti

Clone statico deployabile del sito Tavazzi Trasporti.

## Struttura sorgente

- `src/main.js`: avvio dell'app e piccole interazioni.
- `src/components/`: sezioni del sito separate e leggibili.
- `src/data.js`: testi, link, servizi e contenuti ripetuti.
- `src/icons.js`: icone SVG usate nei componenti.
- `static/css/main.8f24e475.css`: stylesheet originale mantenuto per preservare il risultato visivo.

## Avvio locale

```bash
npm install
npm run dev
```

## Build per deploy

```bash
npm run build
```

La build finale viene generata in `dist/`.

## Pagina Dove siamo

La pagina `/?pagina=dove-siamo` funziona anche su hosting statici senza regole di riscrittura. La mappa Google Maps mostra i due indirizzi e il collegamento tra sede e magazzino; ogni scheda ha un link al navigatore con la propria destinazione.

## Ricezione delle richieste di contatto

Il modulo usa FormSubmit e invia a `raffaella@fllitavazzisnc.191.it`.
Prima di considerarlo operativo, dal dominio pubblicato inviare una richiesta di prova e confermare il link di attivazione ricevuto da FormSubmit nella casella destinataria (controllare anche lo spam). Poi inviare una seconda prova e verificare la ricezione effettiva. Non occorrono credenziali SMTP nel browser.

Il modulo controlla lo stato HTTP e la risposta del servizio, mantiene i dati in caso di errore e imposta l'indirizzo del visitatore come Reply-To. Le verifiche locali simulano successo ed errore: non attestano la consegna nella casella email. I dati del modulo transitano tramite FormSubmit; la documentazione del servizio è disponibile su https://formsubmit.co/documentation.

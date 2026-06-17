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

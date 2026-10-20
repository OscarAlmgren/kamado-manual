# kamado-manual

Interaktiv bruksanvisning för Kamado-grillar (på svenska): simulator för luftflöde och temperatur,
sprängskiss över delarna, steg-för-steg-guider, underhåll och teknisk data.

**Live:** https://oscaralmgren.github.io/kamado-manual/

## Kom igång

```sh
npm install
npm run dev       # http://localhost:5173/kamado-manual/
npm run build     # typkontroll + produktionsbygge till dist/
npm run preview   # http://localhost:4173/kamado-manual/
```

Stack: Vite, React, TypeScript, Tailwind CSS v4 och lucide-react.

## Redigera innehåll

Allt innehåll (lägen, mat och tider, delar, guider, rengöring, förvaring, specifikationer) ligger i
[`src/data/kamado.ts`](src/data/kamado.ts). Komponenterna behöver inte ändras.

Ventilöppningarna per läge (`topOpen`, `bottomOpen`) är uppskattade från manualens ritade nivåer.
Justera dem där om de ska stämma bättre.

## Deploy

Sajten publiceras automatiskt på GitHub Pages vid varje push till `main`
(se [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
Engångsinställning: *Settings → Pages → Source: GitHub Actions*.

Sajten serveras under `/kamado-manual/` (`base` i `vite.config.ts`), så använd inga absoluta
sökvägar som `/bild.png`. Statiska filer i `public/` nås via `import.meta.env.BASE_URL`.

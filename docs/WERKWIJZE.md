# Werkwijze De Klimaatheld website

## Fase 1 – Mobiel (nu)
- Alle stijlen in componenten en pagina's zijn de **mobiele** stijlen.
- Op grote schermen wordt de mobiele site tijdelijk in een gecentreerde kolom getoond (zie onderaan `src/styles/global.css`).
- Geen `@media (min-width…)`-regels toevoegen in componenten of pagina's.

## Fase 2 – Desktop (later)
- Alle desktopregels komen in `src/styles/desktop.css` (staat nu uit).
- Werken op branch `desktop`; Netlify maakt daar een aparte testlink (branch deploy).
- Klaar: `desktop.css` aanzetten in `src/layouts/Base.astro`, tijdelijke kolomregel uit `global.css` verwijderen, mergen naar `main`.

## Per pagina
1. Scherm in Stitch exporteren (.zip) → aanleveren
2. Pagina bouwen (mobiel) → live op Netlify
3. Op telefoon checken → feedback → aanpassen

## Productfoto's (configurator & overzichten)
- Toon productfoto's altijd via `src/components/ProductImage.astro`, nooit met een losse `<img>`.
- Elke foto krijgt een bijsnijdkader in `fotoCrop` (src/data/warmtepompen.ts), zodat de transparante rand wegvalt en het apparaat het vak vult.
- Nieuw model (bijv. Blackbird-configurator): foto-URL + kader toevoegen; de build waarschuwt als het kader ontbreekt.

## Inhoud
- Geen verzonnen claims, reviews, keurmerken of bedragen. Onbekende gegevens als placeholder tussen [haken].
- Prijzen altijd als "indicatief". Bedrijfsgegevens centraal in `src/data/site.ts`.

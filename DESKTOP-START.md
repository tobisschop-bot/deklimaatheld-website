# Start: desktopversie website De Klimaatheld

Zeg in een nieuwe chat: **"Lees DESKTOP-START.md en OVERDRACHT.md in de repo tobisschop-bot/deklimaatheld-website. We maken de desktopversie, eerst de visuele vormgeving."**

## Doel
- De site is **mobile-first** gebouwd. Nu maken we er een echte **desktopwebsite** van.
- **Fase 1 (nu): visuele vormgeving.** Eerst laten zien hoe de pagina's op desktop (1280–1440 px) eruit moeten zien, als schetsen of mockups, met een paar varianten per belangrijk blok. Nog niets live.
- **Fase 2:** bouwen in de code, pagina voor pagina, na akkoord van Tycho.
- De **mobiele versie blijft precies zoals hij is.** Desktop komt erbij via media queries en mag mobiel niet veranderen.

## Huidige situatie (techniek)
- Op grote schermen toont de site nu de mobiele site in een **gecentreerde kolom van 480 px** (tijdelijke regel onderaan `src/styles/global.css`, `@media (min-width: 600px)`). Die regel gaat weg zodra desktop klaar is.
- `src/styles/desktop.css` bestaat al, maar **staat uit**. Hij wordt geactiveerd met de regel `// import '../styles/desktop.css';` in `src/layouts/Base.astro`. Er staan alleen eerste aanzetten in: grids, header-nav vanaf 960 px, footer-grid, home-hero en de stappen. Die zijn nooit getest.
- Losse desktop-media queries zitten ook in componenten, zoals op /verduurzamen/ en in CasesCarrousel. Die zijn nu niet zichtbaar, omdat de body maximaal 480 px breed is.
- Header: een zwevende glazen pil op een donkere strook. Op desktop moet er een volledige navigatie in, met een knop Offerte.
- Testen: build lokaal, en controleer met Playwright op 390 px (mobiel ongewijzigd!), 1024 px, 1280 px en 1440 px. Er mag geen horizontale scroll zijn.

## Huisstijl (zie ook BROCHURE-START.md)
- Kleuren: navy `#141A2E` (`#0B132B` voor de header-strook), rood `#D6283A`, groen `#1E9E6A`/`#2E8B57`, licht `#F4F6F9`, rand `#E3E7ED`, gedempte tekst `#5A6475`.
- Archivo: vette, smalle koppen in HOOFDLETTERS, met kleine rode labels erboven.
- Signatuur: schuine fotoranden en schuine scheidslijnen, een grote foto met een kleine schuine bijfoto, pill-knoppen en donkere secties met een gloed. Mascotte en held met animatie (zwevend en vliegend).

## Pagina's die een desktopontwerp nodig hebben (volgorde voorstel)
1. **Header en footer** (op alle pagina's)
2. **Home**: hero met besparingscheck en mascotte, COP-grafiek, stappen, modellen, gasvrij-blok, service, subsidie, slot-CTA
3. **/verduurzamen/**: intro, cases-carrousel (vormgeving van de kaart blijft hetzelfde: grote en kleine schuine foto), gasvrij/hybride, R290, showroom, belofte
4. **/warmtepompen/**: catalogus met filters, plus de configurator per model (twee kolommen: foto links, keuzes rechts?)
5. **/airco/** en modelpagina's, /vloerverwarming/, /lt-verwarming/, /service/, /subsidie/, /over-ons/, /offerte/

## Vragen om aan het begin te stellen
- Maximale contentbreedte (nu `--max: 1200px`): zo laten of breder?
- Moet de mascotte op desktop groter en prominenter, bijvoorbeeld in de hero?
- Carrousels (cases, showroom) op desktop: blijven swipen met pijlen, of meerdere kaarten naast elkaar?
- Voorbeelden van sites waarvan Tycho de stijl mooi vindt?

## Regels (uit OVERDRACHT.md)
- Kort, informeel, Nederlands. Eerst een voorbeeld met screenshots, live pas na "ja".
- Mobiel niet aanraken. Alleen aanpassen waar om gevraagd wordt.
- Voorbeelden op een aparte branch met `[skip ci]`. Live zetten = merge naar main zonder `[skip ci]`, wijzigingen bundelen (Netlify-credits).

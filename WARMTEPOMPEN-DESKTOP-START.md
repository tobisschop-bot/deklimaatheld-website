# Start: desktopontwerp pagina /warmtepompen/

Zeg in een nieuwe chat: **"Lees WARMTEPOMPEN-DESKTOP-START.md (en OVERDRACHT.md) in de repo tobisschop-bot/deklimaatheld-website, branch `desktop-home`. We ontwerpen de desktopversie van /warmtepompen/ opnieuw."**

## Doel
- Een **volledig nieuw desktopontwerp** voor de overzichtspagina **/warmtepompen/**: layout, opbouw en vormgeving mogen helemaal anders. De huidige desktopversie van deze pagina is een eerste aanzet en gaat op de schop.
- Zelfde aanpak als de homepage: **eerst 3 varianten per blok op het Claude Design-canvas**, Tycho kiest, daarna pas bouwen.
- Het niveau en de stijl van de **desktop-homepage** zijn de lat (zie "Huisstijl desktop" hieronder). De pagina moet aanvoelen als onderdeel van dezelfde site.
- **Mobiel blijft precies zoals het is.**

## Wat blijft staan
- De huidige desktoplaag (branch `desktop-home`, commit `4df9bcc`, bewaar-branch `bewaar/desktop-v1`) blijft staan als basis/terugvaloptie. Niet verwijderen.
- Die laag regelt: de schakeling mobiel ↔ desktop in `src/layouts/Base.astro`, de desktop-header en -footer (`src/components/desktop/DkHeader.astro`, `DkFooter.astro`) en algemene desktopregels in `src/styles/desktop.css`.
- Het nieuwe ontwerp **vervangt** de regels voor deze pagina (in `desktop.css` onder "Warmtepompen-overzicht"), of wordt een eigen desktopcomponent zoals bij de homepage (`<slot name="desktop">`, zie hieronder).

## Techniek (zo werkt desktop nu)
- Astro-site, mobile-first. Desktop = vanaf **1024 px**.
- `Base.astro`:
  - Pagina met een `slot="desktop"` (nu alleen de homepage) → `body.dk-page`: mobiele site en een aparte desktopsite naast elkaar, met CSS geschakeld. Volledige vrijheid in layout, mobiel kan niet geraakt worden.
  - Alle andere pagina's → `body.dk-std`: dezelfde HTML als mobiel, met desktop-header/-footer en `desktop.css` eroverheen.
- **Advies voor een echt nieuwe layout:** maak `src/components/desktop/DesktopWarmtepompen.astro` en zet in `src/pages/warmtepompen/index.astro` `<DesktopWarmtepompen slot="desktop" />`, net als bij `index.astro` (home). Dan is de layout helemaal vrij en blijft mobiel 100% hetzelfde. Haal dan de regels "Warmtepompen-overzicht" uit `desktop.css`.
- Hergebruik: `desktop-home.css` (klassen `dk-wrap`, `dk-kicker`, `dk-h2`, `dk-btn--red/white/dark/ghost/outline`, animaties `dk-zweef`, `dk-stroom`, `dk-draai`), `DkHeader`, `DkFooter`, `ProductImage` (voor foto's met `fotoCrop`), `Besparingscheck`/`PostcodeForm`.
- Data komt uit `src/data/warmtepompen.ts` (modellen, prijzen, ISDE, types, badges, `fotoCrop`, `kaartLink`) en `src/data/configurator.ts` (kleuren per model, varianten). `src/lib/rekenmodel.ts` (`bereken`) voor besparingsberekeningen (gasprijs € 1,70/m³, stroom € 0,31/kWh). **Niets verzinnen**: prijzen, claims, reviews en foto's alleen uit de data of van Tycho; anders een placeholder in [haken].

## Huidige inhoud van de pagina (mobiel, moet terugkomen of bewust vervallen)
1. **Hero**: label "Warmtepompen", titel "Slimme warmtepompen, vakkundig geplaatst", lead "Hybride of volledig gasvrij. Wij adviseren, installeren en regelen je ISDE-subsidie.", checks: Inclusief installatie · Subsidie geregeld · Ontwerp volgens Heat Geek-methode. Kruimelpad.
2. **Modellen met filters**: Alle (11) · Hybride · All-electric · Dakmontage · Weheat · Vaillant · Daikin · Haier · Quatt. Per kaart: badge, foto, naam, tag, "v.a. € … incl. montage" (of "Prijs op aanvraag"), "Tot € … ISDE-subsidie*", "Inclusief installatie & inbedrijfstelling", knop "Bekijk product" → configurator.

   | Model | v.a. | ISDE tot | Type |
   |---|---|---|---|
   | Weheat Flint P40 | € 4.248 | € 2.350 | hybride + all-electric |
   | Weheat Sparrow P60 (koper, grijs, groen) | € 5.722 | € 2.575 | hybride + all-electric |
   | Weheat Blackbird P80 | € 6.498 | € 3.025 | hybride + all-electric |
   | Weheat Swift | € 9.851 | op aanvraag | dakmontage |
   | Vaillant aroTHERM pro (antraciet, wit) | € 5.329 | € 3.700 | hybride + all-electric, R290 |
   | Vaillant aroTHERM plus (antraciet, wit) | € 4.903 | € 3.925 | hybride + all-electric |
   | Daikin Altherma 4 H | € 14.495 | € 4.375 | all-electric, R290 |
   | Daikin Altherma H Hybride | € 3.895 | € 1.700 | hybride |
   | Haier Super Aqua | € 3.668 | € 4.175 | hybride + all-electric |
   | Haier GT R290 | € 5.240 | € 3.700 | hybride + all-electric, R290 |
   | Quatt Hybrid | op aanvraag | op aanvraag | hybride + all-electric, R290 |

   Voetnoot: "Prijzen zijn indicatief en afhankelijk van je woning en installatie. *Subsidiebedrag indicatief, zie de RVO-lijst."
3. **Keuzehulp "Welke past bij jouw woning?"**: Kleine woning/app. (tot ca. 1.200 m³) → Flint P40 · Rijtjeshuis (1.200–2.000 m³) → Sparrow P60 · Vrijstaand/2-onder-1-kap (vanaf 2.000 m³) → Blackbird P80. "Indicatief. Het juiste vermogen berekenen we tijdens de installatiecheck."
4. **"Zo werkt De Klimaatheld"**, 5 stappen met iconen (`/icons/01…05-*.svg`): Besparingscheck · Installatiecheck · Installatieplan op maat · Vakkundige installatie · Subsidie & nazorg.
5. **USP-balk**: Garantie blijft geldig · Advies op maat · ISDE-subsidie geregeld.
6. **FAQ** (5 vragen): Wat is een warmtepomp? · Hybride of all-electric? · Hoeveel subsidie krijg ik? · Hoe lang duurt de installatie? · Is mijn woning geschikt?
7. **Slot-CTA "Hoeveel kan jij besparen?"** met postcodeformulier + checks (Gratis advies van specialisten · Fabrieksgarantie veilig met een servicecontract · ISDE-subsidie voor je geregeld).

## Huisstijl desktop (zoals de homepage nu is)
- Kleuren: navy `#141A2E`, diep `#0B132B`, rood `#D6283A` (hover `#B01F2F`), roze accent `#FF8A95`, groen `#1E9E6A` / licht `#4CC38A`, licht `#F4F6F9`, rand `#E3E7ED`, gedempt `#5A6475`.
- Archivo: vette smalle koppen (font-stretch ~62–65%) in HOOFDLETTERS, kleine rode kickers erboven. Pill-knoppen.
- Donkere secties met rode/groene gloed, witte secties met afgeronde bovenhoeken (32 px), contentbreedte 1280 px, 32 px marge.
- Interactief en levendig: de homepage heeft een spotlight met modellenrail + kleurkeuze + terugverdienmeter, geanimeerde installatieschema's met hotspots, merkschappen (donkerblauw), bento "over ons". Hergebruik/doorvertaling daarvan op deze pagina is welkom (bijv. modellen vergelijken, filter als visuele keuze, besparing per model).
- Inspiratie die Tycho noemde: Feenstra, Hoppenbrouwers, dewarmteman.nl.

## Ideeën voor de varianten (om mee te starten, niet verplicht)
- **Hero**: titel + direct een keuze "Hybride / All-electric / Dakmontage" als grote visuele tegels, of hero met de modellenrail.
- **Catalogus**: filters als zijbalk (type, merk, prijs, woninggrootte) + raster; of per merk een schap (zoals de merkschappen op home); of een vergelijk-functie (2–3 modellen naast elkaar).
- **Keuzehulp**: interactief (woningtype of gasverbruik kiezen → model + besparing), gekoppeld aan `bereken()`.
- **Stappen**: horizontale tijdlijn met iconen, of verweven met de Heat Geek-boodschap.

## Werkwijze
1. Lees deze file, `OVERDRACHT.md` en `DESKTOP-START.md`. Bekijk de desktop-homepage en de huidige /warmtepompen/ op de preview: https://deploy-preview-1--keen-crostata-8903d3.netlify.app/warmtepompen/ (met wachtwoord, Tycho logt zelf in).
2. Maak op het Claude Design-canvas **3 varianten**, blok voor blok (beginnen bij hero + catalogus). Tycho kiest.
3. Bouw de gekozen versie op branch `desktop-home`. Test met Playwright op 390 px en 800 px (pixelvergelijking: mobiel moet identiek zijn), en op 1024, 1280 en 1440 px (geen horizontale scroll).
4. Push naar `desktop-home` → Netlify deploy preview (PR #1). Wijzigingen bundelen.

## Regels (uit OVERDRACHT.md)
- Kort, informeel, Nederlands. Eerst laten zien, live pas na "ja" van Tycho.
- Mobiel niet aanraken. Alleen aanpassen waar om gevraagd wordt.
- Niets verzinnen (claims, reviews, foto's). Placeholders in [haken].
- Live zetten = merge naar `main` met `git merge --no-ff` en een commitbericht **zonder** `[skip ci]`. Elke push op main = deploy = Netlify-credits, dus bundelen.

## Openstaande punten (nog niet beantwoord door Tycho)
- "Koper" hernoemen naar "Brons" bij de Sparrow?
- Bron/link van de reviews (9,4 uit 68 reviews, 97%).
- Officiële witte foto van de Vaillant aroTHERM (nu een ingekleurde versie).
- Data checken: Haier Super Aqua prijs (€ 3.668) is lager dan de ISDE (€ 4.175); ISDE-bedragen zijn "tot"-bedragen.

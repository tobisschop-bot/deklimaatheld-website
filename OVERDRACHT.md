# Overdracht – website De Klimaatheld

Zeg in een nieuwe chat: **"Lees OVERDRACHT.md in de repo tobisschop-bot/deklimaatheld-website en ga verder."**

## Wie / hoe
- Tycho (Installatie Team, Den Haag), samen met Gabriel. Eigen merk voor particulieren: **De Klimaatheld**.
- Communicatie: kort, informeel, Nederlands. Tycho stuurt vaak spraakberichten → transcriptie kan raar zijn; bij twijfel kort checken.
- Werkwijze:
  - Eerst voorbeeld + screenshot (mobiel 390 px), live pas na "ja". Bij "zet het op de site / zet erin / voeg toe" direct live.
  - Voorbeelden op een aparte branch met `[skip ci]` in de commit.
  - **Live zetten = merge naar main met `git merge --no-ff` en een commitbericht ZONDER `[skip ci]`.** (Fout gemaakt: een fast-forward met `[skip ci]` → Netlify deployde niet.)
  - Netlify Pro: elke push op main = deploy = credits → wijzigingen bundelen.
  - Alleen aanpassen waar om gevraagd wordt (één keer te veel aan de homepage gezeten → teruggedraaid). Bij grotere herzieningen eerst een schets/voorstel.
- Inhoud:
  - Geen foto's van anderen als eigen werk (Google-foto van Renze Leufkens geweigerd), geen "random" foto's, geen verzonnen besparingsbedragen.
  - Klantcitaten mogen als Tycho de inhoud aangeeft; geen naam bekend → "Klant uit [plaats]".
  - Foto's opschonen mag (watermerk weg, vlekjes/krassen, vinger, serienummer/streepjescode meter onleesbaar) zonder kwaliteitsverlies. Bij twijfel niet doen.

## Techniek
- Repo: GitHub `tobisschop-bot/deklimaatheld-website`, branch `main` (Astro, statisch).
- Live: https://keen-crostata-8903d3.netlify.app (wachtwoord), auto-deploy bij push op main.
- Build: `npx astro build --outDir /tmp/...`; test met Playwright op 390 px, check `scrollWidth == 390`.
- Weheat-productfoto's komen van een externe CDN (cdn.prod.website-files.com) → laden niet in de testomgeving, live wel.
- Redirect in `netlify.toml`: `/gasvrij-wonen/*` → `/verduurzamen/:splat` (301).

## Logo
- Definitief logo: `public/img/logo-de-klimaatheld.png` (zwart woordmerk "DE Klimaatheld" met blad, transparant, 1400×127).
- `src/components/Logo.astro` = dat logo; in header én footer wit (CSS `filter: invert(1)`).
- Header (`src/components/Header.astro`): zwevende glazen pil op donkere strook (#0B132B), sticky; losse topbalk weg, regio + openingstijden staan onderin het mobiele menu.

## Pagina's
- **Home** (`src/pages/index.astro`): hero (nog "Duizenden euro's besparen…" + besparingscheck + mascotte), COP-grafiek, Zorgeloos verduurzamen, 5 stappen, Weheat-modellen, gasvrij-blok met knop **"Bekijk ons werk →"** naar /verduurzamen/, service, ISDE + lening, slot-CTA.
  - COP-grafiek: Heat Geek-logo linksboven in de kaart als subtiele **blinddruk** (`public/img/heatgeek-stempel.png`, absoluut gepositioneerd, kaarthoogte ongewijzigd).
- **/verduurzamen/** (`src/pages/verduurzamen/index.astro`, "Zo verduurzamen wij"):
  1. Hero + korte intro met 3 vinkjes (eerlijk advies, ontwerp op lage temperatuur, subsidie geregeld)
  2. Cases-carrousel "Ons werk – In de praktijk"
  3. "Gasvrij of hybride wonen" in 3 genummerde delen: ① Waarom van het gas af (3 voordelen met icoon) ② Hybride of all-electric (2 kaarten + "Twijfel je?") + **dubbele knop** ③ Toekomstbestendig met R290 (GWP-staafjes 3 / 675 / 2000+)
  4. **Showroom** (donker): merkknoppen Weheat/Vaillant/Daikin/Haier, modellen op verlichte vloer, knop "Bekijk alle modellen →" naar /warmtepompen/
  5. Onze belofte + dubbele knop
  - Dubbele knop: rood "Doe de besparingscheck" (→ /#besparingscheck) + lichtroze doorschijnend "Vraag je offerte aan" (→ /offerte/), stijl 1 ook op donker.
- Verder: /warmtepompen/ (catalogus + configurator per model), /vloerverwarming/, /lt-verwarming/, /airco/, /service/ (+ /service/afsluiten/), /subsidie/, /over-ons/, /offerte/.

## Productfoto's
- Daikin Altherma 4 H kaart op /warmtepompen/: `public/img/daikin-altherma-4h-set.webp` = officiële Daikin-packshots (buitenunit zonder voeten, vóór; ECH2O erachter, onderste deel tank verlengd). Configurator houdt `daikin-altherma-4h.webp`.
- Haier Super Aqua: nog de oude foto. Online geen nette officiële foto (model niet meer op Haier-sites); wacht op PNG van groothandel/Haier.

## Cases-carrousel
- Component: `src/components/CasesCarrousel.astro` (props: id, label, title, hint, aantal, nieuwsteEerst, meer). **Vormgeving niet veranderen**: per case één grote foto + één kleine schuine bijfoto (links, of rechts met `kleinRechts`), titel + 📍 plaats, pijltje (omhoog = dicht, omlaag = verhaal uitgeklapt), CTA "Ook zoiets? →".
- Data: `src/data/projecten.ts` → `cases` (live) en `conceptCases` (placeholders, niet zichtbaar). Velden: soort (klant/project/groot), titel, plaats, jaar (leeg = verborgen), groot, klein, kleinRechts?, info, quote?.
- Live cases:
  1. All-electric – Leiden (klantverhaal, citaat Marcel)
  2. Hybride met Weheat Blackbird – Delft
  3. 34 warmtepompen voor een woningcorporatie – Dordrecht (groot project)
  4. Vloerverwarming + hybride warmtepomp – Nootdorp
  5. Hybride met open verdeler – Sassenheim
  6. Hele huis van het gas af – Leidschendam (klantverhaal, citaat over fijne omgang en strakke planning, "Klant uit Leidschendam")
  7. All-electric met thuisbatterij – Leiden (Weheat + Growatt APX 10 kWh, kleine foto links)
  8. Zonnepanelen, thuisbatterij en driefase meterkast – **Wateringen** (16 kWh; hoofdfoto = eigen foto Growatt-omvormers + batterij, kleine foto = uitsnede groepenkast; `case-wateringen-meterkast.webp` niet meer in gebruik)
  9. Twee Daikin airco's – Amsterdam (klantverhaal; hoofdfoto = 2 foto's met schuine witte streep, geen kaders; citaat: "Ik had jullie werk een paar keer gezien bij het makelaarskantoor waar ik werk. Ik vind jullie fantastische mensen en zal jullie aan iedereen aanbevelen." – "Klant uit Amsterdam")
- Foto's: `public/img/case-*.webp` (~1000 px breed, hoofdfoto 4:4.4, bijfoto 1.15:1).

## Openstaand
- Case 8 Wateringen: evt. Growatt/kWp-gegevens in de tekst.
- Voornamen bij citaten Leidschendam en Amsterdam (nu "Klant uit …").
- Homepage: hero-titel "Duizenden euro's…" breekt op mobiel ("ENERGIEREKENIN/G?") en is een harde claim; Weheat-kaarten op home tonen grijze vlakken in testomgeving. Alleen aanpassen als Tycho dat vraagt.
- Footer-contactgegevens ([Adres volgt] enz.): vragen of die van Installatie Team gebruikt mogen worden of eigen gegevens.
- Reactietijd "[X] uur" op /service/, servicevoorwaarden, prijzen Vaillant/Daikin/Haier/vloerverwarming/LT/Madoka, Netlify-formuliermeldingen "service".
- Heat Geek-logo is uit een screenshot gehaald; officieel partnerbestand zou beter zijn.
- Oude voorbeeldbranches op GitHub mogen opgeruimd worden (case7-*, case6-*, case9-*, herziening-v1, verduurzamen-*, voorbeeld-*, cop-heatgeek, nieuw-logo, carrousel-boven).

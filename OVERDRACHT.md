# Overdracht – website De Klimaatheld

Plak dit in een nieuwe chat (of zeg: "lees OVERDRACHT.md in de repo") om verder te gaan.

## Wie / hoe
- Tycho, Installatie Team (Den Haag), samen met Gabriel. Eigen merk voor particulieren: **De Klimaatheld**.
- Communicatie: kort, informeel, Nederlands.
- Werkwijze: wijzigingen eerst als voorbeeld + screenshot (390 px mobiel), live pas na "ja". Als Tycho zegt "zet op de site / voeg toe", direct live zetten.
- Netlify Pro: elke push = deploy = credits → wijzigingen bundelen.
- Geen verzonnen klantcitaten, reviews of nep-foto's ("voor"-foto's/bouwval). Foto's alleen bijwerken (bijsnijden, vlekken/kras weg) zonder kwaliteitsverlies; bij twijfel niet doen.

## Techniek
- Repo: GitHub `tobisschop-bot/deklimaatheld-website`, branch `main` (Astro, statisch).
- Live: https://keen-crostata-8903d3.netlify.app (wachtwoord), auto-deploy bij push op main.
- Build: `npx astro build`; test met Playwright op 390 px, check `scrollWidth == 390`.
- Commits eindigen met de Co-Authored-By / Claude-Session regels.

## Belangrijkste pagina's
- Home (`src/pages/index.astro`): hero met mascotte, COP-grafiek met KH-held, alleen Weheat-modellen + knop "Alle warmtepompen", gasvrij-blok met eigen installatiefoto's + knop **"Lees meer →" naar /gasvrij-wonen/**, blok Service & onderhoud.
- /warmtepompen/ (catalogus Weheat, Vaillant, Daikin, Haier) + configurator per model.
- /vloerverwarming/, /lt-verwarming/, /airco/, /service/ (+ /service/afsluiten/ met handtekening), /subsidie/, /over-ons/, /offerte/.
- **/gasvrij-wonen/** (`src/pages/gasvrij-wonen/index.astro`): advies (waarom van het gas af, hybride vs all-electric, R290, onze belofte) + **cases-carrousel "In de praktijk"**.

## Cases-carrousel (waar we nu mee bezig zijn)
- Data: `src/data/projecten.ts` → array `cases`. Per case: `soort` (klant / project / groot), `titel`, `plaats`, `jaar` (leeg = verborgen), `groot` + `klein` foto, optioneel `kleinRechts: true`, `info`, optioneel `quote {tekst, naam}`.
- Vormgeving: witte kaart, grote foto met schuine onderrand, kleine foto schuin in wit kader (links of rechts), titel + 📍 plaats, pijltje in het midden (omhoog = dicht, omlaag = tekst uitgeklapt), onderin kort balkje + pijlknoppen. Geen teller, geen detail-labels.
- Foto's in `public/img/case-*.webp` (~1000 px breed).
- Ingevuld en live:
  1. All-electric – Leiden (klantverhaal, citaat Marcel)
  2. Hybride met Weheat Blackbird – Delft (kleine foto rechts, kras op boiler weg)
  3. 34 warmtepompen voor een woningcorporatie – Dordrecht (groot project, pilot, meerdere woonblokken; kleine foto rechts)
  4. Vloerverwarming + hybride warmtepomp – Nootdorp (plank weggesneden)
  5. Hybride met open verdeler – Sassenheim (vloer egaal grijs, vlek op open verdeler weg)
  6. Hele huis van het gas af – Leidschendam
- Case 7 t/m 17 zijn nog placeholders met [haken] (live zichtbaar!). Volgende stap: nieuwe cases invullen óf lege cases verbergen.

## Openstaand
- Cases 7–17 vullen of verbergen; jaartallen; eventueel naam woningcorporatie Dordrecht.
- Contactgegevens in footer, reactietijd "[X] uur" op /service/, servicevoorwaarden.
- Prijzen Vaillant, Daikin, Haier, vloerverwarming, LT, Madoka (nu "op aanvraag").
- Netlify-formuliermeldingen voor "service" aanzetten.

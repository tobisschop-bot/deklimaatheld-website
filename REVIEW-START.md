# Start: review website De Klimaatheld

Zeg in een nieuwe chat: **"Lees REVIEW-START.md en OVERDRACHT.md in de repo tobisschop-bot/deklimaatheld-website en doe de review."**

## Opdracht
Loop de hele website na en maak een overzicht van **wat nog niet af is en wat beter kan**. **Nog niets aanpassen**, alleen inventariseren. Tycho kiest daarna wat er wordt opgepakt.

Lever op: een review als document (Docs-artifact of `REVIEW.md` in de repo), gesorteerd op prioriteit:
1. **Moet af voor livegang:** placeholders, kapotte links, ontbrekende gegevens, juridische pagina's.
2. **Klopt niet / risico:** onjuiste of onbewezen claims, prijzen, inconsistenties tussen pagina's.
3. **Kan beter:** vormgeving, mobiele weergave, teksten, snelheid, SEO, toegankelijkheid.

Per punt: pagina/URL, wat er mis is, voorstel, en wat Tycho moet aanleveren (foto, tekst, prijs, keuze).

## Hoe reviewen
- Build lokaal (`npx astro build --outDir /tmp/...`), serveer met `python3 -m http.server` en loop elke pagina na met Playwright op **390 px (mobiel)** én **1280 px (desktop)**. Check `scrollWidth == breedte` (geen horizontaal scrollen).
- Zoek placeholders: `grep -rn "\[" src` (alles tussen [haken]), "op aanvraag", "volgt", "TODO".
- Controleer alle interne links en knoppen (404's), formulieren (Netlify-forms: offerte, service, besparingscheck), configurators (elke stap en prijs), filters in de catalogus.
- Controleer consistentie: merken/modellen en prijzen tussen home, /warmtepompen/, configurators en de showroom op /verduurzamen/.
- Kijk naar claims: geen verzonnen besparingsbedragen of reviews.
- Let op: Weheat- en Quatt-foto's komen van een externe CDN en laden niet in de testomgeving. Dat is geen fout, live werken ze wel.
- Live site (wachtwoord): https://keen-crostata-8903d3.netlify.app

## Pagina's
Home `/` · `/verduurzamen/` (cases, gasvrij/hybride, R290, showroom) · `/warmtepompen/` + configurators: flint, sparrow, blackbird, swift, arotherm-pro, arotherm-plus, altherma-4h, altherma-hybride, haier-super-aqua, haier-gt-r290, quatt · `/airco/` + 8 modelpagina's (Daikin Emura/Perfera/Stylish, Haier Expert/Pearl Premium/Revive Plus, MHI Diamond/Premium) · `/vloerverwarming/` · `/lt-verwarming/` · `/service/` (+ afsluiten, bedankt) · `/subsidie/` · `/over-ons/` · `/offerte/` · `/bedankt` · `/privacy` · `/voorwaarden` · 404.

## Al bekend als niet af (bevestigen en aanvullen)
- **Contactgegevens** in `src/data/site.ts`: [Telefoonnummer], [E-mailadres], [WhatsApp-nummer], [Adres volgt] → staan in de footer en op meerdere plekken.
- **Juridisch:** `/privacy` ("[Privacyverklaring volgt]"), `/voorwaarden` ("[Algemene voorwaarden volgt]"), servicevoorwaarden.
- **Over ons:** [Naam]/[Functie] (2×) en een mascotte-placeholder.
- **Foto's ontbreken:** airco-producten ([Productfoto …]), vloerverwarming, LT-radiator (`src/data/diensten.ts`); Quatt-foto via fabrikant-CDN nog live controleren.
- **Prijzen:** alle prijzen zijn hypotheses (indicatief); Quatt staat op "Prijs op aanvraag".
- **Service:** reactietijd "[X] uur", Netlify-formuliermeldingen voor "service".
- **Home:** hero-titel "Duizenden euro's besparen…" breekt op mobiel en is een harde claim (alleen aanpassen als Tycho dat wil).
- **Cases:** voornamen bij de citaten van Leidschendam en Amsterdam; Wateringen mist een eigen batterijfoto.
- **Overig:** officieel Heat Geek-logo; oude voorbeeldbranches op GitHub opruimen.

## Regels (uit OVERDRACHT.md)
- Kort, informeel, Nederlands.
- Review eerst; aanpassingen pas na akkoord van Tycho. Live zetten = merge naar main zonder `[skip ci]`, wijzigingen bundelen (Netlify-credits).

# Start: brochure De Klimaatheld

Zeg in een nieuwe chat: **"Lees BROCHURE-START.md (en OVERDRACHT.md) in de repo tobisschop-bot/deklimaatheld-website. We maken een brochure in onze huisstijl."**

## Doel
- Een zakelijke brochure/catalogus voor De Klimaatheld, gebaseerd op de website.
- **Stap 1 (nu): de grafische vormgeving.** Eerst de huisstijl vastleggen als brochure-template: kleuren, typografie, logo, mascotte, beeldtaal, opmaakelementen. Pas daarna de inhoud.
- **Stap 2: de inhoud.** Komt overeen met de catalogus op de site (`src/data/warmtepompen.ts`, `src/data/configurator.ts`, `src/data/projecten.ts`).
- Werkwijze Tycho: eerst voorbeelden en een paar varianten laten zien, dan kiezen. Kort, informeel, Nederlands.

## Huisstijl (uit de website, `src/styles/global.css`)
| Rol | Kleur |
|---|---|
| Navy (hoofdkleur, donkere vlakken, tekst) | `#141A2E` |
| Navy 2 / diep (hero, header) | `#1F2740` / `#0B132B` |
| Rood (accent, knoppen, labels) | `#D6283A` (donker `#B01F2F`, zacht `#FBE3E5`) |
| Roze label op donker | `#FF8A95` |
| Groen (vinkjes, "Klantverhaal", R290) | `#2E8B57` / `#1E9E6A` (zacht `#D9F0E2`) |
| Geel (spaarzaam accent) | `#F5B83D` |
| Achtergrond licht / kaart / rand | `#F4F6F9` / `#FFFFFF` / `#E3E7ED` |
| Tekst gedempt | `#5A6475` |

- **Lettertype:** Archivo (Google Fonts, variabel), koppen extra vet, smal (`font-stretch` ~75%) en in HOOFDLETTERS; brood­tekst Archivo normaal.
- **Labels:** klein, rood, hoofdletters, ruime letterspatiëring boven een kop ("ONZE MODELLEN", "ONS WERK").
- **Vormen:** afgeronde kaarten (10–18 px), zachte schaduw; pill-knoppen en -labels; **schuine onderrand** op foto's en een schuine lijn als scheiding (signatuur-element).
- **Foto-stijl cases:** grote foto + kleine schuine bijfoto in wit kader (−4° of +4°), label rechtsboven (rood = Project, groen = Klantverhaal, navy = Groot project).
- **Donkere secties:** navy met radiale gloed (bijv. showroom: producten op een "verlichte vloer").
- **Knoppen:** rood vol ("Doe de besparingscheck") + lichtroze doorschijnend met rode rand ("Vraag je offerte aan").

## Beeldmateriaal (in `public/`)
- Logo: `img/logo-de-klimaatheld.png` (zwart woordmerk met blad; op donker wit/geïnverteerd).
- Mascotte: `img/mascotte.webp`, `img/mascotte-vliegend.webp`, klein embleem `img/kh-held.webp` (held met cape, rode accenten; "animatie" = zwevend/vliegend met actiestreepjes).
- Iconen 5 stappen: `icons/01-besparingscheck.svg` t/m `05-subsidie-nazorg.svg` (ook in `/home/claude/klimaatheld-iconen`).
- COP-grafiek: rode lijn "De Klimaatheld × Heat Geek" vs grijze stippellijn "Standaard installateur", Heat Geek-logo als blinddruk (`img/heatgeek-stempel.png`).
- Productfoto's: `img/*.webp` (Vaillant, Daikin, Haier, Swift); Weheat en Quatt via fabrikant-CDN.
- Eigen projectfoto's: `img/case-*.webp` (9 cases, zie OVERDRACHT.md).

## Inhoud die later in de brochure komt
- Merken/modellen: Weheat (Flint P40, Sparrow P60, Blackbird P80, Swift), Vaillant (aroTHERM pro, aroTHERM plus), Daikin (Altherma 4 H, Altherma H Hybride), Haier (Super Aqua, GT R290), Quatt (Hybrid, R290 – hybride of all-electric). Prijzen zijn indicatief.
- Verhaal: hybride vs all-electric, R290 (GWP ~3 vs 675 vs 2000+), ontwerp op lage temperatuur / waterzijdig inregelen (Heat Geek), ISDE-subsidie + Energiebespaarlening, service & onderhoud, onze belofte, cases.

## Regels
- Geen verzonnen besparingsbedragen, reviews of foto's van anderen als eigen werk.
- Contactgegevens voor De Klimaatheld nog niet vastgesteld (site heeft placeholders) → eerst vragen.
- Bestandsformaat brochure nog kiezen (bijv. PDF/drukwerk A4 of A5); voorstel doen en laten kiezen.

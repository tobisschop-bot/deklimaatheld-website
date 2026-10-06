// Data voor de productconfigurator (/warmtepompen/<model>/).
// Een nieuw model (bijv. Blackbird) = alleen een extra entry in `configurators` + een pagina
// die <Configurator model={configurators.blackbird} /> rendert.
// ALLE PRIJZEN ZIJN INDICATIEF – vervangen door eigen prijzen.
import { warmtepompen } from './warmtepompen';

const img = (slug: string) => warmtepompen.find((w) => w.slug === slug)?.img ?? '';

export type UitvoeringId = 'hybride' | 'hybride-ketel' | 'all-electric';

export interface Uitvoering {
  id: UitvoeringId;
  name: string;
  badge: string;
  text: string;
  price: number | null; // v.a.-prijs, indicatief (null = op aanvraag)
  needsBoiler: boolean;
}
export interface Kleur { id: string; name: string; hex: string; note?: string; img?: string } // img: foto in deze kleur (zelfde kader als model.img)
export interface Boiler { id: string; naam?: string; liters: number; persons: string; text: string; price: number | null; recommended?: boolean } // null = op aanvraag
/** Vermogensvariant (alleen bij modellen met meerdere vermogens, bijv. Vaillant). prijs per uitvoering; null/ontbrekend = op aanvraag */
export interface Vermogen { id: string; label: string; sub: string; prijs?: Partial<Record<UitvoeringId, number | null>> }
export interface Fact { value: string; label: string }
export interface Waarom { title: string; text: string; check?: string }
export interface FaqItem { q: string; a: string }

export interface ConfigModel {
  slug: string;
  name: string; // volledige naam, bijv. 'Weheat Sparrow P60'
  short: string; // korte naam in samenvatting, bijv. 'Sparrow P60'
  title: string; // h1
  lead: string;
  img: string;
  imgAlt: string;
  photoColor: string; // kleur die op de productfoto staat
  quickFacts: Fact[]; // 3 kerncijfers onder de foto
  uitvoeringen: Uitvoering[];
  vermogens?: Vermogen[]; // optioneel: extra stap 'Kies het vermogen'
  defaultVermogen?: string;
  kleuren: Kleur[];
  kleurNote?: string; // bijv. "alleen leverbaar in antraciet"
  boilers: Boiler[];
  defaultBoiler: string;
  specs: Fact[];
  waarom: Waarom[];
  inbegrepen: Fact[];
  faq: FaqItem[];
}

// ---- Gedeelde onderdelen ----
export const boilers: Boiler[] = [
  { id: '150', liters: 150, persons: '1–2 personen', text: 'Standaard douchecomfort, appartement of starter', price: 1450 },
  { id: '200', liters: 200, persons: '3–4 personen', text: 'Ideaal voor een gezin of regendouche', price: 1650, recommended: true },
  { id: '300', liters: 300, persons: '5+ personen', text: 'Grote gezinnen of een royaal ligbad', price: 2150 },
];

export const inbegrepen: Fact[] = [
  { value: 'Installatie door eigen monteurs', label: 'Vakkundig geplaatst en aangesloten' },
  { value: 'Waterzijdig inregelen (Heat Geek-methode)', label: 'Ontworpen op lage temperatuur voor meer rendement' },
  { value: 'Hulp bij je ISDE-subsidieaanvraag', label: 'We helpen je met het dossier bij de RVO' },
  { value: 'Nazorg en monitoring', label: 'Service in Den Haag en omstreken' },
];

const hybride = (price: number | null): Uitvoering => ({
  id: 'hybride', name: 'Hybride', badge: 'Bestaande ketel', price, needsBoiler: false,
  text: 'Werkt samen met je huidige cv-ketel. De ketel springt bij op de koudste dagen en voor warm water.',
});
const allElectric = (price: number | null): Uitvoering => ({
  id: 'all-electric', name: 'All-electric', badge: 'Gasvrij', price, needsBoiler: true,
  text: 'Verwarmt je woning en tapwater zonder gas. Hiervoor is een boilervat nodig.',
});

// ---- Modellen ----
export const configurators: Record<string, ConfigModel> = {
  sparrow: {
    slug: 'sparrow',
    name: 'Weheat Sparrow P60',
    short: 'Sparrow P60',
    title: 'Stel jouw Sparrow samen',
    lead: 'Stil, stijlvol en krachtig. 9 kW monobloc, ook voor actieve zomerkoeling.',
    img: '/img/weheat-sparrow-koper.webp',
    imgAlt: 'Weheat Sparrow P60 warmtepomp met koperkleurige lamellen',
    photoColor: 'koper',
    quickFacts: [
      { value: '9 kW', label: 'A7/W35' },
      { value: '40,5 dB(A)', label: 'Geluid' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(5722), allElectric(9450)],
    kleuren: [
      { id: 'grijs', name: 'Grijs', hex: '#6B7280', note: 'Tijdloos modern', img: '/img/weheat-sparrow-grijs.webp' },
      { id: 'koper', name: 'Koper', hex: '#B87333', note: 'Warme uitstraling', img: '/img/weheat-sparrow-koper.webp' },
    ],
    boilers,
    defaultBoiler: '200',
    specs: [
      { value: '9 kW', label: 'Vermogen (A7/W35)' },
      { value: '6 kW', label: 'Vermogen bij -10°C' },
      { value: '4,78', label: 'SCOP' },
      { value: '40,5 dB(A)', label: 'Geluidsniveau' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
      { value: 'Koelen', label: 'Actieve zomerkoeling' },
      { value: '4G-app', label: 'Eigen 4G-verbinding' },
    ],
    waarom: [
      {
        title: 'Stil in gebruik',
        text: 'Met 40,5 dB(A) is de Sparrow een stille buitenunit. Waar hij het best kan staan, bekijken we samen bij de opname.',
      },
      {
        title: 'Verwarmt én koelt',
        text: 'Naast verwarmen kan de Sparrow actief koelen, bijvoorbeeld via vloerverwarming of geschikte convectoren.',
        check: 'Comfort in elk seizoen',
      },
      {
        title: 'Slim via de Weheat 4G-app',
        text: 'De Sparrow heeft een eigen 4G-verbinding, dus geen gedoe met zwakke wifi in de tuin. Via de app volg je verbruik en prestaties.',
      },
    ],
    inbegrepen,
    faq: [
      {
        q: 'Is mijn woning geschikt voor de Sparrow P60?',
        a: 'Met 9 kW (A7/W35) is de Sparrow geschikt voor veel grondgebonden woningen. Of hij bij jouw huis past, hangt af van de warmtevraag, isolatie en het afgiftesysteem (bijv. vloerverwarming of lage-temperatuurradiatoren). Dat rekenen we bij de opname voor je door.',
      },
      {
        q: 'Hoeveel subsidie (ISDE) ontvang ik op de Weheat Sparrow?',
        a: 'Het ISDE-bedrag is € [bedrag] (indicatief, zie de actuele RVO-lijst). We helpen je met de aanvraag na oplevering.',
      },
      {
        q: 'Kan de Sparrow P60 ook koelen in de zomer?',
        a: 'Ja, de Sparrow heeft een actieve koelfunctie. Hoeveel verkoeling je merkt, hangt af van je afgiftesysteem en woning.',
      },
      {
        q: 'Hoe snel kan de installatie plaatsvinden?',
        a: 'Na de opname en je akkoord op de offerte plannen we de installatie in overleg met je in.',
      },
    ],
  },

  flint: {
    slug: 'flint',
    name: 'Weheat Flint P40',
    short: 'Flint P40',
    title: 'Stel jouw Flint samen',
    lead: 'Compact en krachtig, met een scherpe instapprijs.',
    img: img('flint'),
    imgAlt: 'Weheat Flint P40 warmtepomp in antraciet',
    photoColor: 'antraciet',
    quickFacts: [
      { value: '6 kW', label: 'A7/W35' },
      { value: '37,5 dB(A)', label: 'Geluid' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(4248), allElectric(7950)],
    kleuren: [{ id: 'antraciet', name: 'Antraciet', hex: '#374151' }],
    kleurNote: 'De Flint is alleen leverbaar in antraciet.',
    boilers,
    defaultBoiler: '200',
    specs: [
      { value: '6 kW', label: 'Vermogen (A7/W35)' },
      { value: '4 kW', label: 'Vermogen bij -10°C' },
      { value: '6,41', label: 'COP (A7/W27)' },
      { value: '37,5 dB(A)', label: 'Geluidsniveau' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
      { value: 'Koelen', label: 'Actieve zomerkoeling' },
      { value: '4G-app', label: 'Eigen 4G-verbinding' },
    ],
    waarom: [
      {
        title: 'Compact formaat',
        text: 'De Flint P40 is een compacte buitenunit. Waar hij het best kan staan, bekijken we samen bij de opname.',
      },
      {
        title: 'Scherp geprijsd',
        text: 'De Flint is het instapmodel van Weheat: hybride al vanaf € 4.248 (indicatief).',
      },
      {
        title: 'Stil en slim',
        text: 'Slechts 37,5 dB(A). Met de ingebouwde 4G-verbinding volg je verbruik en prestaties in de Weheat-app.',
      },
    ],
    inbegrepen,
    faq: [
      {
        q: 'Kan ik later overstappen van hybride naar all-electric?',
        a: 'Dat hangt af van je woning en installatie. Wil je op termijn helemaal van het gas af, geef dat dan aan bij de opname, dan houden we er in het ontwerp rekening mee.',
      },
      {
        q: 'Voor welke woningen is de Flint P40 geschikt?',
        a: 'Met 6 kW (A7/W35) past de Flint vooral bij goed tot redelijk geïsoleerde woningen met een kleinere warmtevraag. Of hij bij jouw huis past, rekenen we bij de opname voor je door.',
      },
      {
        q: 'Hoeveel ISDE-subsidie ontvang ik op de Weheat Flint P40?',
        a: 'Het ISDE-bedrag is € [bedrag] (indicatief, zie de actuele RVO-lijst). We helpen je met de aanvraag na oplevering.',
      },
      {
        q: 'Hoe stil is de Flint P40?',
        a: 'Het geluidsniveau is 37,5 dB(A). Of de plaatsing aan de geluidseisen bij de erfgrens voldoet, controleren we per situatie.',
      },
    ],
  },

  blackbird: {
    slug: 'blackbird',
    name: 'Weheat Blackbird P80',
    short: 'Blackbird P80',
    title: 'Stel jouw Blackbird samen',
    lead: 'Het krachtigste model van Weheat: 11 kW voor grotere woningen, en toch stil.',
    img: img('blackbird'),
    imgAlt: 'Weheat Blackbird P80 warmtepomp',
    photoColor: 'zwart',
    quickFacts: [
      { value: '11 kW', label: 'A7/W35' },
      { value: '38 dB(A)', label: 'Geluid' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(6498), allElectric(10200)],
    kleuren: [{ id: 'standaard', name: 'Zoals afgebeeld', hex: '#1F2937' }],
    kleurNote: 'Andere afwerkingen bespreken we graag bij de opname.',
    boilers,
    defaultBoiler: '200',
    specs: [
      { value: '11 kW', label: 'Vermogen (A7/W35)' },
      { value: '8 kW', label: 'Vermogen bij -10°C' },
      { value: '4,7', label: 'SCOP' },
      { value: '38 dB(A)', label: 'Geluidsniveau' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
      { value: 'Koelen', label: 'Actieve zomerkoeling' },
    ],
    waarom: [
      {
        title: 'Veel vermogen',
        text: 'Met 11 kW (A7/W35) en nog 8 kW bij -10°C is de Blackbird geschikt voor grotere woningen of woningen met een hogere warmtevraag.',
      },
      {
        title: 'Stil voor zijn klasse',
        text: 'Ondanks het vermogen blijft het geluidsniveau op 38 dB(A). Waar hij het best kan staan, bekijken we samen bij de opname.',
      },
      {
        title: 'Verwarmt én koelt',
        text: 'De Blackbird kan ook actief koelen, bijvoorbeeld via vloerverwarming of geschikte convectoren.',
        check: 'Comfort in elk seizoen',
      },
    ],
    inbegrepen,
    faq: [
      {
        q: 'Heb ik de Blackbird nodig, of is een kleiner model genoeg?',
        a: 'Dat hangt af van de warmtevraag van je woning. Een te groot toestel is niet beter. Bij de opname rekenen we uit welk vermogen past.',
      },
      {
        q: 'Hoeveel ISDE-subsidie ontvang ik op de Weheat Blackbird?',
        a: 'Het ISDE-bedrag is € [bedrag] (indicatief, zie de actuele RVO-lijst). We helpen je met de aanvraag na oplevering.',
      },
      {
        q: 'Wat kost de all-electric uitvoering?',
        a: 'All-electric is er vanaf € 10.200 (indicatief), plus het boilervat dat je kiest. De exacte prijs hangt af van je woning; die ontvang je na de opname.',
      },
    ],
  },

  swift: {
    slug: 'swift',
    name: 'Weheat Swift',
    short: 'Swift',
    title: 'Stel jouw Swift samen',
    lead: 'De warmtepomp die in je schuine dak verdwijnt. Geen buitenunit in de tuin of op de gevel.',
    img: img('swift'),
    imgAlt: 'Weheat Swift dakwarmtepomp',
    photoColor: 'wit',
    quickFacts: [
      { value: '4–6 kW', label: 'Vermogensklasse' },
      { value: 'In het dak', label: 'Geen buitenunit' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(9851), allElectric(null)],
    kleuren: [{ id: 'standaard', name: 'Wit (binnenzijde)', hex: '#F3F4F6' }],
    kleurNote: 'Aan de buitenkant zie je alleen een dakelement, vergelijkbaar met een dakraam.',
    boilers,
    defaultBoiler: '200',
    specs: [
      { value: '4–6 kW', label: 'Vermogensklasse' },
      { value: 'Schuin dak', label: 'Montage in het dakvlak' },
      { value: 'Van binnenuit', label: 'Plaatsing zonder kraan' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
      { value: 'Hybride of all-electric', label: 'Uitvoeringen' },
    ],
    waarom: [
      {
        title: 'Onzichtbaar',
        text: 'De Swift zit in het schuine dak. Er staat dus geen buitenunit in je tuin, op je balkon of tegen de gevel.',
      },
      {
        title: 'Ideaal voor rijtjeshuizen',
        text: 'Geen ruimte voor een buitenunit of strenge eisen van de VvE of gemeente? Dan kan de Swift een uitkomst zijn.',
      },
      {
        title: 'Plaatsing van binnenuit',
        text: 'De Swift wordt van binnenuit in het dak geplaatst, zonder kraan. Onderhoud gebeurt ook van binnenuit.',
      },
    ],
    inbegrepen,
    faq: [
      {
        q: 'Is mijn dak geschikt voor de Swift?',
        a: 'De Swift is bedoeld voor woningen met een schuin dak. Of jouw dak geschikt is (helling, constructie, ruimte op zolder), bekijken we bij de opname.',
      },
      {
        q: 'Wanneer is de Swift leverbaar?',
        a: 'De Swift is nieuw van Weheat. Vraag ons naar de actuele levertijd, dan plannen we de opname daarop in.',
      },
      {
        q: 'Hoeveel ISDE-subsidie ontvang ik op de Weheat Swift?',
        a: 'Het ISDE-bedrag is € [bedrag] (indicatief, zie de actuele RVO-lijst). We helpen je met de aanvraag na oplevering.',
      },
    ],
  },

  // ---- Daikin ----
  // Bron specs: daikin.nl (consumenten- en installateurspagina's, persbericht Altherma 4 H april 2025).
  // PRIJZEN VOLGEN (Tycho) – tot die tijd 'op aanvraag'.
  'altherma-4h': {
    slug: 'altherma-4h',
    name: 'Daikin Altherma 4 H',
    short: 'Altherma 4 H',
    title: 'Stel jouw Altherma 4 H samen',
    lead: 'De krachtige hogetemperatuurwarmtepomp van Daikin op natuurlijk R290. Tot 75 °C aanvoer, dus ideaal om je cv-ketel volledig te vervangen, ook met gewone radiatoren.',
    img: '/img/daikin-altherma-4h.webp',
    imgAlt: 'Daikin Altherma 4 H buitenunit in antraciet',
    photoColor: 'antraciet',
    quickFacts: [
      { value: '6–14 kW', label: 'Vermogensklasse' },
      { value: '70–75 °C', label: 'Aanvoer, ook bij -15 °C' },
      { value: '28 dB(A)', label: 'Op 3 m (6 kW)' },
    ],
    uitvoeringen: [allElectric(null)],
    vermogens: [
      { id: '6', label: '6 kW', sub: '1-fase' },
      { id: '8', label: '8 kW', sub: '1- of 3-fase' },
      { id: '10', label: '10 kW', sub: '1- of 3-fase' },
      { id: '12', label: '12 kW', sub: '1- of 3-fase' },
      { id: '14', label: '14 kW', sub: '1- of 3-fase' },
    ],
    defaultVermogen: '8',
    kleuren: [{ id: 'antraciet', name: 'Antraciet', hex: '#3B3D40', img: '/img/daikin-altherma-4h.webp' }],
    kleurNote: 'De Altherma 4 H buitenunit is alleen leverbaar in antraciet.',
    boilers: [
      { id: 'f180', naam: 'Vloermodel', liters: 180, persons: '2–4 personen', text: 'Binnenunit met ingebouwde warmtapwatertank', price: null, recommended: true },
      { id: 'f230', naam: 'Vloermodel', liters: 230, persons: '4+ personen', text: 'Binnenunit met ingebouwde warmtapwatertank', price: null },
      { id: 'w150', naam: 'Wandmodel + tank', liters: 150, persons: '1–2 personen', text: 'Compacte wandunit met losse tank', price: null },
      { id: 'w200', naam: 'Wandmodel + tank', liters: 200, persons: '3–4 personen', text: 'Compacte wandunit met losse tank', price: null },
      { id: 'w300', naam: 'Wandmodel + tank', liters: 300, persons: '5+ personen', text: 'Compacte wandunit met losse tank', price: null },
    ],
    defaultBoiler: 'f180',
    specs: [
      { value: '6, 8, 10, 12 en 14 kW', label: 'Vermogens' },
      { value: 'Tot 70–75 °C (ook bij -15 °C)', label: 'Aanvoertemperatuur' },
      { value: 'A+++ bij 35 °C én 55 °C', label: 'Energielabel verwarmen' },
      { value: 'Tot A+', label: 'Energielabel warm tapwater' },
      { value: '28 dB(A) op 3 m (6 kW)', label: 'Geluidsdruk buitendeel' },
      { value: 'Tot -28 °C', label: 'Werkt bij buitentemperatuur' },
      { value: 'R290 (propaan)', label: 'Koudemiddel' },
      { value: 'Ja', label: 'Koelen' },
      { value: 'Vloermodel (180/230 L) of wandmodel', label: 'Binnenunit' },
      { value: '1.122 × 1.330 × 600 mm', label: 'Buitenunit (h × b × d)' },
    ],
    waarom: [
      { title: 'Vervangt je cv-ketel volledig', text: 'Tot 70–75 °C aanvoertemperatuur met alleen de warmtepomp, zelfs bij -15 °C buiten. Je bestaande radiatoren kunnen vaak blijven.' },
      { title: 'Stilste in zijn klasse', text: 'Volgens Daikin slechts 28 dB(A) op 3 meter afstand (6 kW-model).' },
      { title: 'Natuurlijk koudemiddel', text: 'R290 (propaan) heeft een GWP van bijna nul en is klaar voor de toekomst.' },
      { title: 'Slim te bedienen', text: 'Regelen via de Onecta-app, Google Assistant of Amazon Alexa. Smart Grid Ready.' },
    ],
    inbegrepen,
    faq: [
      { q: 'Vloermodel of wandmodel?', a: 'Het vloermodel heeft een ingebouwde warmtapwatertank van 180 of 230 liter. Het wandmodel is compacter en combineer je met een losse tank van 150 tot 300 liter. We adviseren je bij de installatiecheck.' },
      { q: 'Kan de Altherma 4 H hybride met mijn cv-ketel?', a: 'De Altherma 4 H is bedoeld om je cv-ketel volledig te vervangen. Wil je je ketel houden, kijk dan naar de Daikin Altherma H Hybride.' },
      { q: 'Is de Altherma 4 H in wit leverbaar?', a: 'Nee, de buitenunit is antraciet. De Daikin Altherma H Hybride heeft een witte buitenunit.' },
      { q: 'Hoeveel ISDE-subsidie ontvang ik?', a: 'Het ISDE-bedrag (€ [bedrag]) hangt af van het vermogen. Indicatief, zie de actuele RVO-lijst. We helpen je met de aanvraag.' },
    ],
  },

  'altherma-hybride': {
    slug: 'altherma-hybride',
    name: 'Daikin Altherma H Hybride',
    short: 'Altherma H Hybride',
    title: 'Stel jouw Altherma Hybride samen',
    lead: 'Een compacte 4 kW-warmtepomp die samenwerkt met een cv-ketel. Het systeem kiest zelf de zuinigste warmtebron, zodat je flink minder gas verbruikt.',
    img: '/img/daikin-altherma-hybride.webp',
    imgAlt: 'Daikin Altherma H Hybride buitenunit in wit',
    photoColor: 'wit',
    quickFacts: [
      { value: '4 kW', label: 'Warmtepomp (monobloc)' },
      { value: '37 dB(A)', label: 'Geluidsdruk buitendeel' },
      { value: '45 kg', label: 'Licht buitendeel' },
    ],
    uitvoeringen: [
      { id: 'hybride', name: 'Op je huidige ketel', badge: 'Bestaande ketel', price: null, needsBoiler: false, text: 'De warmtepomp wordt gekoppeld aan je bestaande cv-ketel. Wij checken of jouw ketel geschikt is.' },
      { id: 'hybride-ketel', name: 'Met nieuwe Daikin-ketel', badge: 'Ketel vervangen', price: null, needsBoiler: false, text: 'Compleet systeem met een nieuwe Daikin cv-ketel (28 of 32 kW) als binnendeel, voor verwarming en warm water.' },
    ],
    kleuren: [{ id: 'wit', name: 'Wit', hex: '#F4F5F3', img: '/img/daikin-altherma-hybride.webp' }],
    kleurNote: 'De buitenunit van de Altherma H Hybride is alleen leverbaar in wit.',
    boilers,
    defaultBoiler: '200',
    specs: [
      { value: '4 kW (nominaal 3,8 kW)', label: 'Vermogen warmtepomp' },
      { value: '4,49', label: 'COP' },
      { value: '3,26–3,28', label: 'SCOP (systeem)' },
      { value: 'A++ (35 °C)', label: 'Energielabel verwarmen' },
      { value: '37 dB(A) · geluidsvermogen 57,8 dB(A)', label: 'Geluid buitendeel' },
      { value: 'R32', label: 'Koudemiddel' },
      { value: 'Tot 65 °C', label: 'Warm tapwater (via ketel)' },
      { value: '745 × 845 × 329 mm, 45 kg', label: 'Buitenunit (h × b × d)' },
      { value: 'Daikin cv-ketel 28 of 32 kW (optioneel)', label: 'Binnendeel' },
    ],
    waarom: [
      { title: 'Direct minder gas', text: 'De warmtepomp neemt het grootste deel van de verwarming over. Daikin spreekt van tot 80% minder gasverbruik.' },
      { title: 'Kiest zelf de zuinigste bron', text: 'Het systeem schakelt slim tussen warmtepomp en ketel op basis van warmtevraag, energieprijzen en buitentemperatuur.' },
      { title: 'Compact en licht', text: 'Het buitendeel weegt 45 kg en past vaak op een schuurtje, plat dak of aan de gevel.' },
    ],
    inbegrepen,
    faq: [
      { q: 'Kan ik mijn huidige cv-ketel houden?', a: 'Vaak wel. Bij de installatiecheck kijken we of jouw ketel geschikt is. Is hij oud, dan is de combinatie met een nieuwe Daikin-ketel vaak slimmer.' },
      { q: 'Is de Altherma Hybride in zwart leverbaar?', a: 'Nee, de buitenunit is wit. Zoek je een donkere unit, kijk dan naar de Daikin Altherma 4 H (antraciet).' },
      { q: 'Kan ik later volledig gasvrij?', a: 'Deze hybride is gemaakt om samen met een ketel te werken. Wil je nu of later helemaal van het gas af, dan is de Altherma 4 H de logische keuze.' },
      { q: 'Hoeveel ISDE-subsidie ontvang ik?', a: 'Het ISDE-bedrag is € [bedrag] (indicatief, zie de actuele RVO-lijst). We helpen je met de aanvraag.' },
    ],
  },

  // ---- Vaillant ----
  // Bron specs: vaillant.nl (aroTHERM plus, VWL ../8.1 A) en groothandel-/fabrieksgegevens (aroTHERM pure, VWL ../7.2 AS).
  // PRIJZEN VOLGEN (Tycho) – tot die tijd 'op aanvraag'.
  'arotherm-plus': {
    slug: 'arotherm-plus',
    name: 'Vaillant aroTHERM plus',
    short: 'aroTHERM plus',
    title: 'Stel jouw aroTHERM plus samen',
    lead: 'De stilste en zuinigste lucht-waterwarmtepomp van Vaillant. Met natuurlijk koudemiddel R290 en tot 75 °C aanvoertemperatuur, dus ook geschikt voor radiatoren.',
    img: '/img/vaillant-arotherm-plus.webp',
    imgAlt: 'Vaillant aroTHERM plus warmtepomp in antraciet',
    photoColor: 'antraciet',
    quickFacts: [
      { value: '3–12 kW', label: 'Vermogensklasse' },
      { value: '75 °C', label: 'Max. aanvoertemperatuur' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(null), allElectric(null)],
    vermogens: [
      { id: '35', label: 'VWL 35/8.1', sub: '4,2 kW bij -7 °C · 230 V · 765 mm hoog' },
      { id: '55', label: 'VWL 55/8.1', sub: '5,0 kW bij -7 °C · 230 V · 765 mm hoog' },
      { id: '75', label: 'VWL 75/8.1', sub: '5,9 kW bij -7 °C · 230 V · 965 mm hoog' },
      { id: '105', label: 'VWL 105/8.1', sub: '9,6 kW bij -7 °C · 400 V · 1.480 mm hoog' },
      { id: '125', label: 'VWL 125/8.1', sub: '10,1 kW bij -7 °C · 400 V · 1.480 mm hoog' },
    ],
    defaultVermogen: '55',
    kleuren: [{ id: 'antraciet', name: 'Antraciet', hex: '#3A3F44', img: '/img/vaillant-arotherm-plus.webp' }],
    kleurNote: 'De aroTHERM plus is alleen leverbaar in antraciet. Optioneel met designplint.',
    boilers: [
      { id: 'unitower', naam: 'uniTOWER', liters: 190, persons: '3–5 personen', text: 'uniTOWER: binnendeel met ingebouwde 190 L boiler, tot 376 L douchewater van 40 °C', price: null, recommended: true },
      { id: '200', liters: 200, persons: '3–4 personen', text: 'Losse warmtepompboiler', price: null },
      { id: '300', liters: 300, persons: '5+ personen', text: 'Losse warmtepompboiler', price: null },
    ],
    defaultBoiler: 'unitower',
    specs: [
      { value: 'VWL 35 t/m 125 (3–12 kW)', label: 'Vermogens' },
      { value: '4,83–5,13', label: 'SCOP bij 35 °C' },
      { value: 'A+++', label: 'Energielabel verwarmen (35 °C)' },
      { value: 'Tot 75 °C', label: 'Aanvoertemperatuur' },
      { value: 'Vanaf 27,5 dB(A) op 3 m', label: 'Geluid (stilste stand)' },
      { value: 'R290 (GWP 0,02)', label: 'Koudemiddel' },
      { value: 'Ja, EER tot 5,0', label: 'Koelen' },
      { value: '765–1.480 × 1.100 × 450 mm', label: 'Afmetingen (h × b × d)' },
      { value: '2 jaar + 3 jaar extra bij registratie', label: 'Garantie' },
    ],
    waarom: [
      { title: 'Fluisterstil', text: 'De stilste lucht-waterwarmtepomp van Vaillant: vanaf 27,5 dB(A) op 3 meter. Prettig voor jou én de buren.' },
      { title: 'Ook voor radiatoren', text: 'Met aanvoertemperaturen tot 75 °C werkt hij ook in bestaande woningen met gewone radiatoren.' },
      { title: 'Plaatsen dicht bij huis', text: 'Dankzij de Flexible Space Function mag hij vlak naast deuren, ramen en stopcontacten staan, ondanks het R290-koudemiddel.' },
      { title: 'Koelt in de zomer', text: 'Via vloerverwarming of ventilo-convectoren kan de aroTHERM plus je woning ook koelen.' },
    ],
    inbegrepen,
    faq: [
      { q: 'Welk vermogen heb ik nodig?', a: 'Dat hangt af van je woning, isolatie en gasverbruik. Doe de besparingscheck voor een eerste indicatie; het exacte vermogen berekenen we tijdens de installatiecheck.' },
      { q: 'Kan de aroTHERM plus hybride met mijn cv-ketel?', a: 'Ja. Hij kan samenwerken met je bestaande cv-ketel, of volledig gasvrij met een uniTOWER of losse boiler.' },
      { q: 'Is de aroTHERM plus in andere kleuren leverbaar?', a: 'Nee, Vaillant levert de aroTHERM plus in antraciet. Wil je een witte buitenunit, kijk dan naar de aroTHERM pure.' },
      { q: 'Hoeveel ISDE-subsidie ontvang ik?', a: 'Het ISDE-bedrag (€ [bedrag]) hangt af van het vermogen. Indicatief, zie de actuele RVO-lijst. We helpen je met de aanvraag.' },
    ],
  },

  'arotherm-pure': {
    slug: 'arotherm-pure',
    name: 'Vaillant aroTHERM pure',
    short: 'aroTHERM pure',
    title: 'Stel jouw aroTHERM pure samen',
    lead: 'Compacte, lichte split-warmtepomp van Vaillant. Een betaalbare instap: hybride met je cv-ketel, of later all-electric.',
    img: '/img/vaillant-arotherm-pure.webp',
    imgAlt: 'Vaillant aroTHERM pure buitenunit in wit',
    photoColor: 'wit',
    quickFacts: [
      { value: '4–10 kW', label: 'Vermogensklasse' },
      { value: 'Split', label: 'Binnen- en buitendeel' },
      { value: '55 kg', label: 'Licht buitendeel (6 kW)' },
    ],
    uitvoeringen: [hybride(null), allElectric(null)],
    vermogens: [
      { id: '45', label: 'VWL 45/7.2', sub: 'ca. 4 kW · 230 V' },
      { id: '65', label: 'VWL 65/7.2', sub: 'ca. 6 kW · 230 V' },
      { id: '85', label: 'VWL 85/7.2', sub: 'ca. 8 kW' },
      { id: '105', label: 'VWL 105/7.2', sub: 'ca. 10 kW' },
    ],
    defaultVermogen: '65',
    kleuren: [{ id: 'wit', name: 'Wit', hex: '#F1EFEA', img: '/img/vaillant-arotherm-pure.webp' }],
    kleurNote: 'De aroTHERM pure is alleen leverbaar in wit.',
    boilers: [
      { id: 'unitower', naam: 'uniTOWER pure', liters: 190, persons: '3–5 personen', text: 'uniTOWER pure: binnendeel met ingebouwde 190 L boiler', price: null, recommended: true },
      { id: '200', liters: 200, persons: '3–4 personen', text: 'Losse boiler met hydraulische module', price: null },
    ],
    defaultBoiler: 'unitower',
    specs: [
      { value: 'VWL 45 t/m 105 (4–10 kW)', label: 'Vermogens' },
      { value: 'Split (buitendeel + binnendeel)', label: 'Type' },
      { value: 'Tot 5,3 (A7/W35)', label: 'COP' },
      { value: 'A+++ (35 °C) · A++ (55 °C)', label: 'Energielabel verwarmen' },
      { value: 'Tot 60 °C', label: 'Aanvoertemperatuur' },
      { value: 'Tot -25 °C', label: 'Werkt bij buitentemperatuur' },
      { value: 'R32', label: 'Koudemiddel' },
      { value: 'Ja', label: 'Koelen' },
      { value: '702 × 975 × 396 mm, 55 kg (6 kW)', label: 'Afmetingen (h × b × d)' },
    ],
    waarom: [
      { title: 'Compact en licht', text: 'Het buitendeel is klein en weegt rond de 55 kg. Makkelijk te plaatsen op een plat dak, balkon of aan de gevel.' },
      { title: 'Slimme hybride', text: 'Met de triVAI-regeling kiest het systeem zelf de goedkoopste warmtebron: warmtepomp of cv-ketel, op basis van gas- en stroomprijs.' },
      { title: 'Klaar voor gasvrij', text: 'Start hybride en stap later over op all-electric met de uniTOWER pure met ingebouwde boiler.' },
    ],
    inbegrepen,
    faq: [
      { q: 'Wat is het verschil met de aroTHERM plus?', a: 'De pure is een compacte split-warmtepomp (R32, tot 60 °C) en een voordelige instap. De plus is een monoblock met R290, stiller en tot 75 °C, en is alleen in antraciet leverbaar.' },
      { q: 'Is de aroTHERM pure in zwart leverbaar?', a: 'Nee, Vaillant levert de aroTHERM pure in wit. Zoek je een donkere buitenunit, kijk dan naar de aroTHERM plus (antraciet).' },
      { q: 'Welk vermogen heb ik nodig?', a: 'Doe de besparingscheck voor een eerste indicatie. Het exacte vermogen berekenen we tijdens de installatiecheck.' },
      { q: 'Hoeveel ISDE-subsidie ontvang ik?', a: 'Het ISDE-bedrag (€ [bedrag]) hangt af van het vermogen. Indicatief, zie de actuele RVO-lijst. We helpen je met de aanvraag.' },
    ],
  },
};

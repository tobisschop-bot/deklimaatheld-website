// Data voor de productconfigurator (/warmtepompen/<model>/).
// Een nieuw model (bijv. Blackbird) = alleen een extra entry in `configurators` + een pagina
// die <Configurator model={configurators.blackbird} /> rendert.
// ALLE PRIJZEN ZIJN INDICATIEF – vervangen door eigen prijzen.
import { warmtepompen } from './warmtepompen';

const img = (slug: string) => warmtepompen.find((w) => w.slug === slug)?.img ?? '';

export type UitvoeringId = 'hybride' | 'all-electric';

export interface Uitvoering {
  id: UitvoeringId;
  name: string;
  badge: string;
  text: string;
  price: number | null; // v.a.-prijs, indicatief (null = op aanvraag)
  needsBoiler: boolean;
}
export interface Kleur { id: string; name: string; hex: string; note?: string }
export interface Boiler { id: string; liters: number; persons: string; text: string; price: number; recommended?: boolean }
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
    img: img('sparrow'),
    imgAlt: 'Weheat Sparrow P60 warmtepomp met koperkleurige lamellen',
    photoColor: 'koper',
    quickFacts: [
      { value: '9 kW', label: 'A7/W35' },
      { value: '40,5 dB(A)', label: 'Geluid' },
      { value: 'R290', label: 'Natuurlijk koudemiddel' },
    ],
    uitvoeringen: [hybride(5722), allElectric(9450)],
    kleuren: [
      { id: 'grijs', name: 'Grijs', hex: '#6B7280', note: 'Tijdloos modern' },
      { id: 'koper', name: 'Koper', hex: '#B87333', note: 'Warme uitstraling' },
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
    uitvoeringen: [hybride(6498), allElectric(null)],
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
        a: 'De prijs van een all-electric installatie hangt sterk af van je woning en het boilervat. Je ontvangt een prijs op maat na de opname.',
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
};

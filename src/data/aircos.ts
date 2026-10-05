// Airco-assortiment (lucht-lucht, wandmodellen). Eerste merk: Daikin.
// Specificaties: Daikin / gepubliceerde productbladen (zie bron per serie).
// PRIJZEN: null = "op aanvraag". Vul hier eigen prijzen incl. montage in (per vermogen).

export interface AircoVermogen {
  id: string; // bijv. '25'
  kw: number; // koelvermogen (nominaal)
  kwVerwarmen: number;
  m2: string; // indicatieve ruimtegrootte
  prijs: number | null; // v.a. incl. montage, indicatief
}
export interface AircoKleur { id: string; naam: string; hex: string; toeslag: number | null }
export interface AircoSerie {
  slug: string; // url: /airco/<slug>/
  merk: string;
  naam: string; // 'Daikin Perfera'
  type: string; // typecode binnenunit
  positionering: string; // korte tag
  lead: string;
  img: string | null; // productfoto; null = placeholder
  kenmerken: { value: string; label: string }[]; // 3 kerncijfers
  specs: { value: string; label: string }[];
  waarom: { title: string; text: string }[];
  vermogens: AircoVermogen[];
  kleuren: AircoKleur[];
  faq: { q: string; a: string }[];
  bron: string;
}

const ruimte = { '20': '± 25 m²', '25': '± 35 m²', '35': '± 45 m²', '42': '± 55 m²', '50': '± 65 m²' } as Record<string, string>;
const v = (id: string, kw: number, kwV: number, prijs: number | null = null): AircoVermogen => ({ id, kw, kwVerwarmen: kwV, m2: ruimte[id], prijs });

const faqAlgemeen = [
  {
    q: 'Welk vermogen heb ik nodig?',
    a: 'Dat hangt af van de grootte van de ruimte, de isolatie, ramen op het zuiden en of je de airco vooral wilt gebruiken om te verwarmen. De ruimtegroottes zijn een indicatie; bij de opname rekenen we het juiste vermogen voor je uit.',
  },
  {
    q: 'Kan ik meerdere ruimtes aansluiten op één buitenunit?',
    a: 'Ja, met een multi-split sluit je meerdere binnenunits aan op één buitenunit. Geef in je aanvraag aan welke ruimtes je wilt koelen of verwarmen, dan maken we een voorstel.',
  },
  {
    q: 'Kan ik met deze airco ook verwarmen?',
    a: 'Ja, het is een lucht-lucht warmtepomp: hij verwarmt en koelt. Gebruik je hem om te verwarmen, dan bespaar je gas. Bereken je besparing met de besparingscheck op de homepage.',
  },
];

export const aircos: AircoSerie[] = [
  {
    slug: 'daikin-perfera',
    merk: 'Daikin',
    naam: 'Daikin Perfera',
    type: 'FTXM-R',
    positionering: 'Bestverkochte allrounder',
    lead: 'Het bestverkochte wandmodel van Daikin: stil, zuinig en slim, met een bewegingssensor die de lucht van je af stuurt.',
    img: null,
    kenmerken: [
      { value: 'tot A+++', label: 'Energielabel' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
      { value: 'Onecta', label: 'App-bediening' },
    ],
    specs: [
      { value: '2,0 – 5,0 kW', label: 'Koelvermogen (ook 6,0 en 7,1 kW)' },
      { value: 'SEER 9,5 / SCOP 5,2', label: 'Rendement (2,0–3,5 kW)' },
      { value: 'tot A+++', label: 'Energielabel koelen en verwarmen' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit' },
      { value: 'Flash Streamer', label: 'Luchtzuivering + zilverfilter' },
      { value: 'Tot 5 units', label: 'Multi-split mogelijk' },
    ],
    waarom: [
      { title: 'Comfort zonder tocht', text: 'De bewegingssensor met 2 zones en de Comfort+-luchtstroom sturen de lucht langs je heen in plaats van recht op je af.' },
      { title: 'Schone lucht', text: 'De Flash Streamer en het zilverfilter breken allergenen en geurtjes af. Fijn voor slaapkamers en mensen met allergie.' },
      { title: 'Slim bedienen', text: 'Met de Daikin Onecta-app bedien je de airco op afstand, ook via Google Home of Alexa.' },
    ],
    vermogens: [v('20', 2.0, 2.5), v('25', 2.5, 2.8), v('35', 3.5, 4.0), v('42', 4.2, 5.4), v('50', 5.0, 5.8)],
    kleuren: [{ id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0 }],
    faq: faqAlgemeen,
    bron: 'https://www.daikin.nl/nl_nl/consument/products-and-advice/product-categories/air-conditioners/perfera-wall-mounted.html',
  },
  {
    slug: 'daikin-stylish',
    merk: 'Daikin',
    naam: 'Daikin Stylish',
    type: 'FTXA',
    positionering: 'Compact design',
    lead: 'Compact en strak vormgegeven, in wit, zilver of zwart. Met het Coanda-effect blaast hij de lucht langs het plafond voor een gelijkmatige temperatuur.',
    img: null,
    kenmerken: [
      { value: 'A+++', label: 'Energielabel (2,0–3,5 kW)' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
      { value: '3 kleuren', label: 'Wit, zilver, zwart' },
    ],
    specs: [
      { value: '2,0 – 5,0 kW', label: 'Koelvermogen' },
      { value: 'SEER tot 8,75', label: 'Rendement koelen' },
      { value: 'SCOP tot 5,15', label: 'Rendement verwarmen' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit' },
      { value: 'Coanda-effect', label: 'Luchtstroom langs het plafond' },
      { value: 'Flash Streamer', label: 'Actieve luchtzuivering' },
    ],
    waarom: [
      { title: 'Design dat opvalt (of juist niet)', text: 'Een compacte, vlakke unit met afgeronde hoeken, in wit, zilver of zwart. Past bij elk interieur.' },
      { title: 'Gelijkmatige temperatuur', text: 'Dankzij het Coanda-effect gaat de lucht langs het plafond. Bij koelen voel je geen koude luchtstroom op je hoofd.' },
      { title: 'Zuinig en stil', text: 'Tot A+++ en vanaf 19 dB(A), dus ook geschikt voor de slaapkamer.' },
    ],
    vermogens: [v('20', 2.0, 2.5), v('25', 2.5, 2.8), v('35', 3.4, 4.0), v('42', 4.2, 5.4), v('50', 5.0, 5.8)],
    kleuren: [
      { id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0 },
      { id: 'zilver', naam: 'Zilver', hex: '#B9BEC4', toeslag: null },
      { id: 'zwart', naam: 'Zwart', hex: '#1F2024', toeslag: null },
    ],
    faq: faqAlgemeen,
    bron: 'https://www.daikin.nl/nl_nl/installateurs/products/product.html/FTXA-CW.html',
  },
  {
    slug: 'daikin-emura',
    merk: 'Daikin',
    naam: 'Daikin Emura',
    type: 'FTXJ',
    positionering: 'Premium design',
    lead: 'Het designicoon van Daikin. Een vlak front zonder zichtbare roosters, in mat kristalwit, zilver of zwart.',
    img: null,
    kenmerken: [
      { value: 'A+++', label: 'Energielabel (2,0–2,5 kW)' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
      { value: '3 kleuren', label: 'Kristalwit, zilver, zwart' },
    ],
    specs: [
      { value: '2,0 – 5,0 kW', label: 'Koelvermogen' },
      { value: 'SEER tot 8,75', label: 'Rendement koelen' },
      { value: 'SCOP tot 5,15', label: 'Rendement verwarmen' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit' },
      { value: 'Thermische sensor', label: 'Stuurt lucht naar waar het nodig is' },
      { value: 'Flash Streamer', label: 'Actieve luchtzuivering' },
    ],
    waarom: [
      { title: 'Design zonder roosters', text: 'Als de Emura uit staat, zie je een strak vlak front. De luchtuitblaas verdwijnt in de unit.' },
      { title: 'Slimme sensor', text: 'De thermische sensor meet waar het te warm of te koud is en stuurt de lucht daarheen.' },
      { title: 'Stil en zuinig', text: 'Vanaf 19 dB(A) en tot A+++ (2,0 en 2,5 kW).' },
    ],
    vermogens: [v('20', 2.0, 2.5), v('25', 2.5, 2.8), v('35', 3.4, 4.0), v('42', 4.2, 5.4), v('50', 5.0, 5.8)],
    kleuren: [
      { id: 'kristalwit', naam: 'Kristalwit', hex: '#F4F4F2', toeslag: 0 },
      { id: 'zilver', naam: 'Zilver', hex: '#B9BEC4', toeslag: null },
      { id: 'zwart', naam: 'Zwart', hex: '#1F2024', toeslag: null },
    ],
    faq: faqAlgemeen,
    bron: 'https://www.daikin.nl/nl_nl/consument/products-and-advice/product-categories/air-conditioners.html',
  },
];

export const aircoNamen = Object.fromEntries(aircos.map((a) => [a.slug, a.naam]));
export const vanafPrijs = (a: AircoSerie) => {
  const p = a.vermogens.map((x) => x.prijs).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};

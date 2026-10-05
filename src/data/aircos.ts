// Airco-assortiment (lucht-lucht, wandmodellen). Eerste merk: Daikin.
// Specificaties: Daikin / gepubliceerde productbladen (zie bron per serie).
// PRIJZEN: null = "op aanvraag". Vul hier eigen prijzen incl. montage in (per vermogen).

export interface AircoVermogen {
  id: string; // bijv. '25'
  kw: number; // koelvermogen (nominaal)
  kwVerwarmen: number | null;
  m2: string; // indicatieve ruimtegrootte
  prijs: number | null; // v.a. incl. montage, indicatief
}
export interface AircoKleur { id: string; naam: string; hex: string; toeslag: number | null; img?: string }
export interface AircoSerie {
  slug: string; // url: /airco/<slug>/
  merk: string;
  naam: string; // 'Daikin Perfera'
  type: string; // typecode binnenunit
  positionering: string; // korte tag
  lead: string;
  img: string | null; // productfoto (uitgesneden, 1200×520); null = placeholder
  kenmerken: { value: string; label: string }[]; // 3 kerncijfers
  specs: { value: string; label: string }[];
  waarom: { title: string; text: string }[];
  vermogens: AircoVermogen[];
  kleuren: AircoKleur[];
  faq: { q: string; a: string }[];
  bron: string;
}

// Indicatieve ruimtegrootte op basis van koelvermogen
const m2Voor = (kw: number) => (kw <= 2.1 ? '± 25 m²' : kw <= 2.8 ? '± 35 m²' : kw <= 3.7 ? '± 45 m²' : kw <= 4.3 ? '± 55 m²' : kw <= 5.4 ? '± 65 m²' : kw <= 6.3 ? '± 80 m²' : '± 90 m²');
const v = (id: string, kw: number, kwV: number | null, prijs: number | null = null): AircoVermogen => ({ id, kw, kwVerwarmen: kwV, m2: m2Voor(kw), prijs });

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
    img: '/img/airco/daikin-perfera.webp',
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
    img: '/img/airco/daikin-stylish-wit.webp',
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
      { id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0, img: '/img/airco/daikin-stylish-wit.webp' },
      { id: 'zilver', naam: 'Zilver', hex: '#B9BEC4', toeslag: null, img: '/img/airco/daikin-stylish-zilver.webp' },
      { id: 'zwart', naam: 'Zwart', hex: '#1F2024', toeslag: null, img: '/img/airco/daikin-stylish-zwart.webp' },
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
    img: '/img/airco/daikin-emura-kristalwit.webp',
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
      { id: 'kristalwit', naam: 'Kristalwit', hex: '#F4F4F2', toeslag: 0, img: '/img/airco/daikin-emura-kristalwit.webp' },
      { id: 'zilver', naam: 'Zilver', hex: '#B9BEC4', toeslag: null, img: '/img/airco/daikin-emura-zilver.webp' },
      { id: 'zwart', naam: 'Zwart', hex: '#1F2024', toeslag: null, img: '/img/airco/daikin-emura-zwart.webp' },
    ],
    faq: faqAlgemeen,
    bron: 'https://www.daikin.nl/nl_nl/consument/products-and-advice/product-categories/air-conditioners.html',
  },

  // ---------------- HAIER ----------------
  // Prijzen v.a. (incl. installatie en btw) = indicatief, marktprijs De Warmteman okt 2026
  {
    slug: 'haier-revive-plus',
    merk: 'Haier',
    naam: 'Haier Revive Plus',
    type: 'AS-RV',
    positionering: 'Voordelige instapper',
    lead: 'Stijlvolle, zuinige airco met ingebouwde wifi en een stille werking. De voordelige keuze om te koelen én te verwarmen.',
    img: '/img/airco/haier-revive-plus.webp',
    kenmerken: [
      { value: 'A++', label: 'Energielabel koelen' },
      { value: '19 dB(A)', label: 'Stil (2,7 kW)' },
      { value: 'Wifi', label: 'Ingebouwd' },
    ],
    specs: [
      { value: '2,7 – 6,2 kW', label: 'Koelvermogen' },
      { value: 'SEER 6,5 / SCOP 4,0', label: 'Rendement (2,7 kW)' },
      { value: 'A++ / A+', label: 'Energielabel koelen / verwarmen' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit (2,7 kW)' },
      { value: 'R32', label: 'Koudemiddel' },
      { value: 'Wifi', label: 'Bediening via app' },
    ],
    waarom: [
      { title: 'Scherp geprijsd', text: 'De Revive Plus is de voordelige manier om te koelen en te verwarmen, zonder in te leveren op comfort.' },
      { title: 'Stil in de slaapkamer', text: 'De 2,7 kW-uitvoering draait vanaf 19 dB(A) op de laagste stand.' },
      { title: 'Slim bedienen', text: 'Met de ingebouwde wifi bedien je de airco via de app, ook als je niet thuis bent.' },
    ],
    vermogens: [v('27', 2.7, 2.9, 1249), v('35', 3.5, 3.9), v('48', 4.8, 4.8), v('62', 6.2, 6.3)],
    kleuren: [{ id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0 }],
    faq: faqAlgemeen,
    bron: 'https://www.pelletkachelverkoop.nl/producten/airco-koelen-en-verwarmen/airco-split-unit/airco-single-split-unit/specificaties-haier-revive-plus',
  },
  {
    slug: 'haier-expert',
    merk: 'Haier',
    naam: 'Haier Expert',
    type: 'AS-XC',
    positionering: 'Zuinig en schoon',
    lead: 'Hoogwaardige airco met A+++, zelfreinigende filtertechniek en ingebouwde wifi. In wit of mat zwart.',
    img: '/img/airco/haier-expert-wit.webp',
    kenmerken: [
      { value: 'A+++', label: 'Energielabel koelen' },
      { value: '17 dB(A)', label: 'Fluisterstil (3,5 kW)' },
      { value: '2 kleuren', label: 'Wit of zwart' },
    ],
    specs: [
      { value: '2,5 / 3,5 / 5,0 kW', label: 'Koelvermogen' },
      { value: 'SEER 8,5 / SCOP 4,75', label: 'Rendement (3,5 kW)' },
      { value: 'A+++ / A++', label: 'Energielabel koelen / verwarmen (3,5 kW)' },
      { value: '17 dB(A)', label: 'Laagste geluidsniveau binnenunit (3,5 kW)' },
      { value: 'Zelfreinigend', label: 'Filtertechniek' },
      { value: 'Wifi', label: 'Ingebouwd, bediening via app' },
    ],
    waarom: [
      { title: 'Heel zuinig', text: 'Met een SEER van 8,5 en A+++ voor koelen (3,5 kW) is de Expert een van de zuinigste modellen van Haier.' },
      { title: 'Schone lucht', text: 'De zelfreinigende techniek houdt de binnenunit en het filter schoon, voor frissere lucht.' },
      { title: 'Wit of mat zwart', text: 'Kies de kleur die bij je interieur past.' },
    ],
    vermogens: [v('25', 2.5, null), v('35', 3.5, 4.2, 2439), v('50', 5.0, null)],
    kleuren: [
      { id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0, img: '/img/airco/haier-expert-wit.webp' },
      { id: 'zwart', naam: 'Zwart', hex: '#1F2024', toeslag: null, img: '/img/airco/haier-expert-zwart.webp' },
    ],
    faq: faqAlgemeen,
    bron: 'https://airconditioningenwarmtepompservicenederland.nl/product/haier-expert-wit-35-kw-a-a/',
  },
  {
    slug: 'haier-pearl-premium',
    merk: 'Haier',
    naam: 'Haier Pearl Premium',
    type: 'AS-PB',
    positionering: 'Ideaal voor multi-split',
    lead: 'Comfort in meerdere kamers met één buitendeel. Met UV-C-sterilisatie, Coanda Plus-luchtstroom en bediening via de hOn-app.',
    img: '/img/airco/haier-pearl-premium.webp',
    kenmerken: [
      { value: 'A+++', label: 'Energielabel koelen' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
      { value: 'Tot 5', label: 'Binnenunits op 1 buitendeel' },
    ],
    specs: [
      { value: '2,7 / 3,6 / 5,3 / 7,1 kW', label: 'Koelvermogen' },
      { value: 'A+++ / A++', label: 'Energielabel koelen / verwarmen (3,6 kW)' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit' },
      { value: 'UV-C', label: 'Sterilisatie van bacteriën en virussen' },
      { value: 'Coanda Plus', label: 'Luchtstroom langs het plafond' },
      { value: 'hOn-app', label: 'Wifi, ook met Google Assistant en Alexa' },
    ],
    waarom: [
      { title: 'Meerdere kamers, één buitendeel', text: 'Sluit tot 5 binnenunits aan op één buitenunit. Minder op de gevel, comfort in het hele huis.' },
      { title: 'Gezonde lucht', text: 'De UV-C-lamp en de Steri-Clean-functie houden de binnenunit schoon en de lucht fris.' },
      { title: 'Comfortabele luchtstroom', text: 'Met Coanda Plus gaat de lucht langs het plafond, zodat je geen koude luchtstroom op je voelt.' },
    ],
    vermogens: [v('27', 2.7, null, 1969), v('36', 3.6, null), v('53', 5.3, null), v('71', 7.1, null)],
    kleuren: [{ id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0 }],
    faq: faqAlgemeen,
    bron: 'https://www.vrijzon.nl/producten/airco-hoge-wandmodellen-haier-pearl-premium-airco-36-kw/',
  },

  // ---------------- MITSUBISHI HEAVY INDUSTRIES ----------------
  // Prijzen v.a. incl. installatie = indicatief (marktprijs NL-installateur, okt 2026)
  {
    slug: 'mhi-premium',
    merk: 'Mitsubishi Heavy Industries',
    naam: 'Mitsubishi Heavy Premium',
    type: 'SRK-ZS-W',
    positionering: 'Betrouwbare allrounder',
    lead: 'De Premium-serie van Mitsubishi Heavy Industries: stil, zuinig en met ingebouwde wifi. Een degelijke keuze voor elke kamer.',
    img: '/img/airco/mhi-premium-wit.webp',
    kenmerken: [
      { value: 'A+++', label: 'Energielabel koelen (2,0–2,5 kW)' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
      { value: 'Wifi', label: 'Ingebouwd' },
    ],
    specs: [
      { value: '2,0 / 2,5 / 3,5 / 5,0 kW', label: 'Koelvermogen' },
      { value: 'SEER 8,5 / SCOP 4,7', label: 'Rendement (2,5 kW)' },
      { value: 'A+++ / A++', label: 'Energielabel koelen / verwarmen (2,0–2,5 kW)' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit (2,0–3,5 kW)' },
      { value: '3D Auto Airflow', label: 'Luchtverdeling door de hele ruimte' },
      { value: 'Hot Start', label: 'Direct warme lucht bij verwarmen' },
    ],
    waarom: [
      { title: 'Japanse betrouwbaarheid', text: 'Mitsubishi Heavy Industries staat bekend om degelijke, duurzame airco\'s die jarenlang meegaan.' },
      { title: 'Stil en zuinig', text: 'Vanaf 19 dB(A) en tot A+++ voor koelen. Geschikt voor woonkamer én slaapkamer.' },
      { title: 'Prettige luchtverdeling', text: 'Met 3D Auto Airflow verdeelt de airco de lucht automatisch over de hele ruimte.' },
    ],
    vermogens: [v('20', 2.0, null, 1725), v('25', 2.5, null, 1770), v('35', 3.5, null, 1885), v('50', 5.0, 5.8, 2295)],
    kleuren: [
      { id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0, img: '/img/airco/mhi-premium-wit.webp' },
      { id: 'titanium', naam: 'Titanium', hex: '#B3AC9C', toeslag: null, img: '/img/airco/mhi-premium-titanium.webp' },
      { id: 'zwart-wit', naam: 'Zwart/wit', hex: 'linear-gradient(90deg,#1F2024 50%,#F7F7F5 50%)', toeslag: null, img: '/img/airco/mhi-premium-zwart-wit.webp' },
    ],
    faq: faqAlgemeen,
    bron: 'https://www.aircoprofs.nl/airconditioning/mitsubishi/premium/',
  },
  {
    slug: 'mhi-diamond',
    merk: 'Mitsubishi Heavy Industries',
    naam: 'Mitsubishi Heavy Diamond',
    type: 'SRK-ZSX-W',
    positionering: 'Topmodel, dubbel A+++',
    lead: 'Het topmodel van Mitsubishi Heavy Industries: dubbel A+++ (koelen én verwarmen), een aanwezigheidssensor en ingebouwde wifi. Ideaal als je de airco ook veel gebruikt om te verwarmen.',
    img: '/img/airco/mhi-diamond-wit.webp',
    kenmerken: [
      { value: 'A+++ / A+++', label: 'Koelen én verwarmen (2,0–3,5 kW)' },
      { value: 'SCOP 5,2', label: 'Zeer zuinig verwarmen' },
      { value: '19 dB(A)', label: 'Fluisterstil' },
    ],
    specs: [
      { value: '2,0 / 2,5 / 3,5 / 5,0 kW', label: 'Koelvermogen' },
      { value: 'SEER tot 10,3', label: 'Rendement koelen (2,5 kW)' },
      { value: 'SCOP tot 5,2', label: 'Rendement verwarmen (2,0–2,5 kW)' },
      { value: 'A+++ / A+++', label: 'Energielabel koelen / verwarmen (2,0–3,5 kW)' },
      { value: '19 dB(A)', label: 'Laagste geluidsniveau binnenunit' },
      { value: 'Aanwezigheidssensor', label: 'Bespaart energie als niemand in de ruimte is' },
    ],
    waarom: [
      { title: 'Dubbel A+++', text: 'Een van de weinige airco\'s met A+++ voor zowel koelen als verwarmen (2,0–3,5 kW). Ideaal als je er veel mee verwarmt.' },
      { title: 'Slimme sensor', text: 'De aanwezigheidssensor schakelt terug als er niemand in de ruimte is, zo verspil je geen energie.' },
      { title: 'Stil en in kleur', text: 'Vanaf 19 dB(A), en verkrijgbaar in wit, titanium en zwart/wit.' },
    ],
    vermogens: [v('20', 2.0, 2.0, 2260), v('25', 2.5, 2.5, 2430), v('35', 3.5, 3.5, 2625), v('50', 5.0, 5.0, 3150)],
    kleuren: [
      { id: 'wit', naam: 'Wit', hex: '#F7F7F5', toeslag: 0, img: '/img/airco/mhi-diamond-wit.webp' },
      { id: 'titanium', naam: 'Titanium', hex: '#B3AC9C', toeslag: null, img: '/img/airco/mhi-diamond-titanium.webp' },
      { id: 'zwart-wit', naam: 'Zwart/wit', hex: 'linear-gradient(90deg,#1F2024 50%,#F7F7F5 50%)', toeslag: null, img: '/img/airco/mhi-diamond-zwart-wit.webp' },
    ],
    faq: faqAlgemeen,
    bron: 'https://www.aircoprofs.nl/airconditioning/mitsubishi/diamond/',
  },
];

export const aircoNamen = Object.fromEntries(aircos.map((a) => [a.slug, a.naam]));
export const vanafPrijs = (a: AircoSerie) => {
  const p = a.vermogens.map((x) => x.prijs).filter((x): x is number => x != null);
  return p.length ? Math.min(...p) : null;
};

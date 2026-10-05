// Dienstpagina's (airco, later cv-ketel, vloerverwarming, zonnepanelen).
// Eén data-object per dienst; src/components/dienst/DienstPagina.astro rendert het.
// Prijzen zijn placeholders en INDICATIEF – invullen zodra bekend.

export type IconNaam = 'airco' | 'zon' | 'geluid' | 'blad' | 'app' | 'warmtepomp' | 'vlam' | 'vloer' | 'zonnepaneel';

export interface DienstData {
  slug: string;
  meta: { title: string; description: string };
  hero: { label: string; title: string; lead: string; cta: { label: string; href: string } };
  product: { icon: IconNaam; placeholder: string; caption?: string };
  keuze: {
    title: string;
    lead?: string;
    kaarten: { tag: string; title: string; prijs: string; prijsNoot: string; tekst: string; cta: string; href: string }[];
  };
  voordelen: { title: string; items: { icon: IconNaam; title: string; tekst: string }[] };
  prijs: { title: string; items: { title: string; tekst: string }[] };
  stappen: { title: string; items: { title: string; tekst: string }[] };
  faq: { q: string; a: string }[];
  cta: { title: string; text?: string; button: string; href?: string };
}

// Overzicht van alle diensten voor de 'andere diensten'-kaartjes.
// `pagina: true` alleen als de pagina echt bestaat; anders linkt het kaartje naar /offerte/.
const diensten = [
  { slug: 'warmtepompen', title: 'Warmtepompen', icon: 'warmtepomp', pagina: true },
  { slug: 'airco', title: 'Airco', icon: 'airco', pagina: true },
  { slug: 'cv-ketel', title: 'CV-ketels', icon: 'vlam', pagina: false },
  { slug: 'vloerverwarming', title: 'Vloerverwarming', icon: 'vloer', pagina: false },
  { slug: 'zonnepanelen', title: 'Zonnepanelen', icon: 'zonnepaneel', pagina: false },
] as const satisfies readonly { slug: string; title: string; icon: IconNaam; pagina: boolean }[];

export const andereDiensten = (huidig: string) =>
  diensten
    .filter((d) => d.slug !== huidig)
    .map((d) => ({ title: d.title, icon: d.icon as IconNaam, href: d.pagina ? `/${d.slug}/` : '/offerte/' }));

export const airco: DienstData = {
  slug: 'airco',
  meta: {
    title: 'Airco laten installeren in Den Haag – De Klimaatheld',
    description: 'Airco laten plaatsen in Den Haag en omstreken: koelen in de zomer, verwarmen in de winter. Single-split of multi-split, inclusief montage door eigen monteurs.',
  },
  hero: {
    label: 'Airco',
    title: 'Koel in de zomer, verwarm in de winter',
    lead: 'Een airco is een lucht-lucht warmtepomp: stil, zuinig en het hele jaar bruikbaar.',
    cta: { label: 'Gratis advies aanvragen', href: '/offerte/' },
  },
  product: { icon: 'airco', placeholder: '[Productfoto airco]', caption: 'Wandunit binnen & buitenunit' },
  keuze: {
    title: 'Welke airco past bij jou?',
    lead: 'Kies voor één specifieke leefruimte of een klimaatregeling voor meerdere ruimtes.',
    kaarten: [
      {
        tag: 'Eén ruimte',
        title: 'Single-split',
        prijs: 'v.a. € [prijs]',
        prijsNoot: 'incl. montage · indicatief',
        tekst: '1 binnenunit op 1 buitenunit. Ideaal voor één ruimte, zoals de slaapkamer of werkkamer.',
        cta: 'Bekijk opties',
        href: '/offerte/',
      },
      {
        tag: 'Meerdere ruimtes',
        title: 'Multi-split',
        prijs: 'v.a. € [prijs]',
        prijsNoot: 'incl. montage · indicatief',
        tekst: 'Meerdere binnenunits aangesloten op 1 buitenunit, voor meerdere ruimtes in huis.',
        cta: 'Bekijk opties',
        href: '/offerte/',
      },
    ],
  },
  voordelen: {
    title: 'Voordelen van een airco',
    items: [
      { icon: 'zon', title: 'Koelen én verwarmen', tekst: 'Comfort in elk seizoen.' },
      { icon: 'geluid', title: 'Stil', tekst: 'Moderne binnenunits zijn zacht, ook ’s nachts.' },
      { icon: 'blad', title: 'Zuinig', tekst: 'Een warmtepomp-principe: meer warmte of kou dan stroom erin.' },
      { icon: 'app', title: 'Bediening via app', tekst: 'Op veel modellen regel je de temperatuur ook op afstand.' },
    ],
  },
  prijs: {
    title: 'Wat zit er in de prijs',
    items: [
      { title: 'Advies aan huis', tekst: 'Opname van je situatie en een berekening van het benodigde vermogen.' },
      { title: 'Montage door eigen monteurs', tekst: 'Geen onderaannemers.' },
      { title: 'Leidingwerk en afwerking', tekst: 'Nette leidinggoten en afgewerkte doorvoeren.' },
      { title: 'Inbedrijfstelling en uitleg', tekst: 'We stellen het systeem in en leggen de bediening uit, ook van de app.' },
      { title: 'Nazorg en onderhoud', tekst: 'Na de installatie blijven we bereikbaar voor service en onderhoud.' },
    ],
  },
  stappen: {
    title: 'Zo werkt het',
    items: [
      { title: 'Aanvraag', tekst: 'Vraag vrijblijvend advies aan via de website.' },
      { title: 'Adviesgesprek', tekst: 'Telefonisch of bij je thuis nemen we je situatie door.' },
      { title: 'Installatie', tekst: 'Vakkundige en schone montage door onze eigen monteurs.' },
      { title: 'Nazorg', tekst: 'Genieten van koeling en warmte, met service als je die nodig hebt.' },
    ],
  },
  faq: [
    {
      q: 'Hoeveel stroom verbruikt een airco?',
      a: 'Dat hangt af van het vermogen, het rendement van het toestel, je woning en hoe vaak je hem gebruikt. Een airco werkt als warmtepomp en levert meer warmte of koeling dan hij aan stroom verbruikt. Bij het adviesgesprek geven we je een inschatting voor jouw situatie.',
    },
    {
      q: 'Kan ik met een airco mijn huis verwarmen?',
      a: 'Ja. Een airco is een lucht-lucht warmtepomp en kan ook verwarmen. Daarmee verwarm je ruimtes elektrisch, zonder gas. Of hij je hele huis kan verwarmen hangt af van je woning, isolatie en het aantal binnenunits; dat bekijken we samen.',
    },
    {
      q: 'Heb ik een vergunning nodig voor de buitenunit?',
      a: 'Dat hangt af van je gemeente en situatie, bijvoorbeeld de plek van de buitenunit, of je woning een monument is of in een beschermd stadsgezicht ligt, en eventuele regels van je VvE. Er gelden ook regels voor geluid. Wij checken dit vooraf voor je.',
    },
    {
      q: 'Hoe vaak moet een airco onderhouden worden?',
      a: 'Filters van de binnenunit kun je zelf regelmatig schoonmaken. Daarnaast is periodiek onderhoud door een monteur verstandig; hoe vaak hangt af van het gebruik en de adviezen van de fabrikant. We bespreken dit bij de oplevering.',
    },
  ],
  cta: {
    title: 'Klaar voor een koele zomer?',
    text: 'Vraag een offerte aan en ontdek wat een airco voor jouw woning kost, inclusief montage.',
    button: 'Vraag je offerte aan →',
    href: '/offerte/',
  },
};

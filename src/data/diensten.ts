// Dienstpagina's (airco, later cv-ketel, vloerverwarming, zonnepanelen).
// Eén data-object per dienst; src/components/dienst/DienstPagina.astro rendert het.
// Prijzen zijn placeholders en INDICATIEF – invullen zodra bekend.

export type IconNaam = 'airco' | 'zon' | 'geluid' | 'blad' | 'app' | 'warmtepomp' | 'vlam' | 'vloer' | 'zonnepaneel' | 'radiator' | 'thermo';

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
  { slug: 'vloerverwarming', title: 'Vloerverwarming', icon: 'vloer', pagina: true },
  { slug: 'lt-verwarming', title: 'LT-verwarming', icon: 'radiator', pagina: true },
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

export const vloerverwarming: DienstData = {
  slug: 'vloerverwarming',
  meta: {
    title: 'Vloerverwarming laten aanleggen in Den Haag – De Klimaatheld',
    description: 'Vloerverwarming in Den Haag en omstreken: infrezen in je bestaande vloer of aanleggen in een nieuwe dekvloer. Ontworpen op lage temperatuur, ideaal met een warmtepomp.',
  },
  hero: {
    label: 'Vloerverwarming',
    title: 'Overal even warm, met warme voeten',
    lead: 'Vloerverwarming geeft gelijkmatige, stille warmte en werkt op een lage temperatuur. Daardoor is het de perfecte partner van een warmtepomp.',
    cta: { label: 'Gratis advies aanvragen', href: '/offerte/?dienst=Vloerverwarming' },
  },
  product: { icon: 'vloer', placeholder: '[Foto vloerverwarming]', caption: 'Leidingen in de vloer, verdeler in de meterkast of trapkast' },
  keuze: {
    title: 'Welke vloerverwarming past bij jou?',
    lead: 'Bestaande woning of verbouwing: er is bijna altijd een oplossing.',
    kaarten: [
      {
        tag: 'Bestaande woning',
        title: 'Infrezen',
        prijs: 'v.a. € [prijs] per m²',
        prijsNoot: 'incl. aanleg · indicatief',
        tekst: 'We frezen sleuven in je bestaande dekvloer en leggen de leidingen erin. Je hoeft de vloer niet te slopen.',
        cta: 'Vraag advies',
        href: '/offerte/?dienst=Vloerverwarming',
      },
      {
        tag: 'Verbouwing of nieuwbouw',
        title: 'In een nieuwe dekvloer',
        prijs: 'v.a. € [prijs] per m²',
        prijsNoot: 'incl. aanleg · indicatief',
        tekst: 'De leidingen worden op de ondervloer gelegd en daarna afgestort met een nieuwe dekvloer.',
        cta: 'Vraag advies',
        href: '/offerte/?dienst=Vloerverwarming',
      },
    ],
  },
  voordelen: {
    title: 'Voordelen van vloerverwarming',
    items: [
      { icon: 'blad', title: 'Zuiniger met een warmtepomp', tekst: 'Een lage aanvoertemperatuur betekent een hogere COP: meer warmte uit elke kWh.' },
      { icon: 'zon', title: 'Gelijkmatige warmte', tekst: 'Warmte van onderaf, zonder koude hoeken of warme plafonds.' },
      { icon: 'vloer', title: 'Geen radiatoren in zicht', tekst: 'Meer ruimte aan de muur en vrij om je interieur in te richten.' },
      { icon: 'thermo', title: 'Ook koelen', tekst: 'In combinatie met een geschikte warmtepomp kan de vloer in de zomer licht koelen.' },
    ],
  },
  prijs: {
    title: 'Wat zit er in de prijs',
    items: [
      { title: 'Opname en warmteverliesberekening', tekst: 'We berekenen per ruimte hoeveel warmte nodig is.' },
      { title: 'Legplan op maat', tekst: 'Leidingafstand en groepen afgestemd op jouw woning en warmtepomp.' },
      { title: 'Aanleg door eigen monteurs', tekst: 'Infrezen of aanleggen, stofarm en netjes.' },
      { title: 'Verdeler en aansluiting', tekst: 'We plaatsen de verdeler en sluiten aan op je cv-ketel of warmtepomp.' },
      { title: 'Waterzijdig inregelen', tekst: 'Elke groep krijgt de juiste hoeveelheid water, voor gelijke warmte overal.' },
    ],
  },
  stappen: {
    title: 'Zo werkt het',
    items: [
      { title: 'Aanvraag', tekst: 'Vraag vrijblijvend advies aan via de website.' },
      { title: 'Opname', tekst: 'We bekijken je vloer, de ruimtes en je huidige verwarming.' },
      { title: 'Aanleg', tekst: 'Infrezen of aanleggen en aansluiten op je installatie.' },
      { title: 'Inregelen', tekst: 'We regelen het systeem in en leggen de bediening uit.' },
    ],
  },
  faq: [
    { q: 'Is mijn vloer geschikt om in te frezen?', a: 'Dat hangt af van de dikte en het type dekvloer. Bij de opname meten en controleren we dit, zodat je vooraf weet of infrezen kan.' },
    { q: 'Welke vloerafwerking kan erop?', a: 'Tegels en natuursteen geven warmte het best door. PVC, laminaat en parket kunnen vaak ook, mits geschikt voor vloerverwarming. Check dit bij je leverancier; wij denken graag mee.' },
    { q: 'Hoe lang duurt de aanleg?', a: 'Dat hangt af van het aantal m² en de methode. Na de opname krijg je een planning op maat.' },
    { q: 'Kan vloerverwarming mijn radiatoren vervangen?', a: 'Vaak wel, mits de woning goed geïsoleerd is. Met een warmteverliesberekening per ruimte bepalen we of vloerverwarming genoeg is, of dat je beter kunt combineren met LT-radiatoren.' },
  ],
  cta: {
    title: 'Klaar voor warme voeten?',
    text: 'Vraag een offerte aan en ontdek wat vloerverwarming in jouw woning kost.',
    button: 'Vraag je offerte aan →',
    href: '/offerte/?dienst=Vloerverwarming',
  },
};

export const ltVerwarming: DienstData = {
  slug: 'lt-verwarming',
  meta: {
    title: 'Lage temperatuur verwarming (LT) in Den Haag – De Klimaatheld',
    description: 'Maak je woning klaar voor een warmtepomp met lage temperatuur verwarming: LT-radiatoren, convectoren of wandverwarming, berekend per ruimte.',
  },
  hero: {
    label: 'LT-verwarming',
    title: 'Klaar voor een warmtepomp, ook met radiatoren',
    lead: 'Lage temperatuur verwarming geeft dezelfde warmte met lager water. Zo haalt je warmtepomp het meeste rendement, zonder dat je hele vloer eruit hoeft.',
    cta: { label: 'Gratis advies aanvragen', href: '/offerte/?dienst=LT-verwarming' },
  },
  product: { icon: 'radiator', placeholder: '[Foto LT-radiator]', caption: 'Lage temperatuur radiator of convector' },
  keuze: {
    title: 'Welke oplossing past bij jou?',
    lead: 'We berekenen per ruimte wat nodig is. Vaak hoeven niet alle radiatoren te worden vervangen.',
    kaarten: [
      {
        tag: 'Meest gekozen',
        title: 'LT-radiatoren',
        prijs: 'v.a. € [prijs] per radiator',
        prijsNoot: 'incl. montage · indicatief',
        tekst: 'Grotere of ventilator-ondersteunde radiatoren (convectoren) die al bij 35–45 °C genoeg warmte geven.',
        cta: 'Vraag advies',
        href: '/offerte/?dienst=LT-verwarming',
      },
      {
        tag: 'Onzichtbaar',
        title: 'Wandverwarming',
        prijs: 'v.a. € [prijs] per m²',
        prijsNoot: 'incl. aanleg · indicatief',
        tekst: 'Leidingen in de muur, weggewerkt achter stucwerk. Stralingswarmte zonder radiator aan de wand.',
        cta: 'Vraag advies',
        href: '/offerte/?dienst=LT-verwarming',
      },
    ],
  },
  voordelen: {
    title: 'Waarom lage temperatuur?',
    items: [
      { icon: 'blad', title: 'Hoger rendement', tekst: 'Hoe lager de aanvoertemperatuur, hoe zuiniger je warmtepomp werkt.' },
      { icon: 'warmtepomp', title: 'Warmtepomp-klaar', tekst: 'Je woning is voorbereid op hybride of volledig gasvrij verwarmen.' },
      { icon: 'radiator', title: 'Geen grote verbouwing', tekst: 'Radiatoren vervangen kan meestal op de bestaande leidingen.' },
      { icon: 'zon', title: 'Behaaglijk comfort', tekst: 'Mildere, gelijkmatige warmte in plaats van hete radiatoren.' },
    ],
  },
  prijs: {
    title: 'Wat zit er in de prijs',
    items: [
      { title: 'Warmteverliesberekening per ruimte', tekst: 'We rekenen uit welke radiator of oplossing elke ruimte nodig heeft.' },
      { title: 'Advies op maat', tekst: 'Alleen vervangen wat nodig is, volgens de Heat Geek-methode.' },
      { title: 'Montage door eigen monteurs', tekst: 'Oude radiatoren eruit, nieuwe erin, netjes afgewerkt.' },
      { title: 'Waterzijdig inregelen', tekst: 'Zodat elke ruimte precies de juiste warmte krijgt.' },
    ],
  },
  stappen: {
    title: 'Zo werkt het',
    items: [
      { title: 'Aanvraag', tekst: 'Vraag vrijblijvend advies aan via de website.' },
      { title: 'Berekening', tekst: 'We meten je woning op en berekenen het warmteverlies per ruimte.' },
      { title: 'Plaatsing', tekst: 'We vervangen alleen de radiatoren die het nodig hebben.' },
      { title: 'Inregelen', tekst: 'We regelen het systeem in, klaar voor je warmtepomp.' },
    ],
  },
  faq: [
    { q: 'Wat is lage temperatuur verwarming?', a: 'Een verwarmingssysteem dat je woning warm krijgt met water van ongeveer 35 tot 45 °C, in plaats van de 60 tot 80 °C van een traditionele cv-ketel. Dat is precies waar een warmtepomp het zuinigst werkt.' },
    { q: 'Moet ik al mijn radiatoren vervangen?', a: 'Meestal niet. Met een warmteverliesberekening per ruimte zien we welke radiatoren groot genoeg zijn en welke vervangen moeten worden.' },
    { q: 'Is LT-verwarming nodig voor een hybride warmtepomp?', a: 'Niet altijd, maar het verhoogt het rendement. Bij een all-electric warmtepomp is een goed afgestemd LT-systeem extra belangrijk.' },
    { q: 'Kan ik LT combineren met vloerverwarming?', a: 'Ja. Veel woningen hebben vloerverwarming beneden en LT-radiatoren boven. We stemmen alles op elkaar af.' },
  ],
  cta: {
    title: 'Maak je woning warmtepomp-klaar',
    text: 'Vraag advies aan en ontdek welke radiatoren of oplossingen jouw woning nodig heeft.',
    button: 'Vraag je offerte aan →',
    href: '/offerte/?dienst=LT-verwarming',
  },
};

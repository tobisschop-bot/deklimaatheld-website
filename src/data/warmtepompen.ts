// Warmtepompen (Weheat, Vaillant, Daikin, Haier, Quatt), in deze volgorde getoond. Prijzen zijn INDICATIEF (hypotheses Tycho/markt okt 2026) – later herzien.
const CDN = 'https://cdn.prod.website-files.com/67ed5695314f69c537693240/';

// Neutrale placeholder-afbeelding voor modellen zonder bruikbare productfoto
const placeholderImg = (tekst: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect x="4" y="4" width="392" height="292" rx="10" fill="#F4F6F9" stroke="#E3E7ED" stroke-width="4" stroke-dasharray="12 8"/><text x="200" y="155" text-anchor="middle" font-family="Archivo,sans-serif" font-size="18" fill="#5A6475">${tekst}</text></svg>`
  );

export type Warmtepomp = {
  slug: string;
  name: string;
  tag: string;
  /** v.a.-prijs; null = prijs op aanvraag */
  from: number | null;
  /** max. ISDE-bedrag 2026 (RVO-meldcodelijst, indicatief); null = onbekend */
  isde: number | null;
  merk: 'Daikin' | 'Weheat' | 'Vaillant' | 'Haier' | 'Quatt';
  img: string;
  /** false = geen echte productfoto beschikbaar, toon een .placeholder-vak */
  photo: boolean;
  /** eigen productpagina, of null → kaart linkt naar /offerte/ ('Vraag advies') */
  page: string | null;
  /** filtercategorieën op /warmtepompen/ */
  types: ('hybride' | 'all-electric' | 'dakmontage')[];
  badge: string;
  includes: string;
};

export const warmtepompen: Warmtepomp[] = [
  { slug: 'flint', merk: 'Weheat', name: 'Weheat Flint P40', tag: 'Compact & scherp geprijsd', from: 4248, isde: 2350, img: CDN + '680a992ae6196a42fa131878_Weheat%20warmtepomp-flint.webp', photo: true, page: '/warmtepompen/flint/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'sparrow', merk: 'Weheat', name: 'Weheat Sparrow P60', tag: 'Populaire allrounder', from: 5722, isde: 2575, img: CDN + '680a98ecbde35b827bb60c63_Weheat%20warmtepomop-sparrow.webp', photo: true, page: '/warmtepompen/sparrow/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'blackbird', merk: 'Weheat', name: 'Weheat Blackbird P80', tag: 'Voor grotere woningen', from: 6498, isde: 3025, img: CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif', photo: true, page: '/warmtepompen/blackbird/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'swift', merk: 'Weheat', name: 'Weheat Swift', tag: 'Onzichtbaar in het schuine dak', from: 9851, isde: null, img: '/img/weheat-swift.webp', photo: true, page: '/warmtepompen/swift/', types: ['dakmontage'], badge: 'Dakintegratie', includes: 'Inclusief dakmontage' },
  { slug: 'arotherm-pro', merk: 'Vaillant', name: 'Vaillant aroTHERM pro', tag: 'Compact, R290, in antraciet', from: 5329, isde: 3700, img: '/img/vaillant-arotherm-plus.webp', photo: true, page: '/warmtepompen/arotherm-pro/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'arotherm-plus', merk: 'Vaillant', name: 'Vaillant aroTHERM plus', tag: 'Stil, R290, in antraciet', from: 4903, isde: 3925, img: '/img/vaillant-arotherm-plus.webp', photo: true, page: '/warmtepompen/arotherm-plus/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'altherma-4h', merk: 'Daikin', name: 'Daikin Altherma 4 H', tag: 'Krachtig, tot 75 °C, in antraciet', from: 14495, isde: 4375, img: '/img/daikin-altherma-4h-set.webp', photo: true, page: '/warmtepompen/altherma-4h/', types: ['all-electric'], badge: 'All-electric · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'altherma-hybride', merk: 'Daikin', name: 'Daikin Altherma H Hybride', tag: 'Hybride met cv-ketel, in wit', from: 3895, isde: 1700, img: '/img/daikin-altherma-hybride.webp', photo: true, page: '/warmtepompen/altherma-hybride/', types: ['hybride'], badge: 'Hybride', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'haier-super-aqua', merk: 'Haier', name: 'Haier Super Aqua', tag: 'Voordelige monoblock, in wit', from: 3668, isde: 4175, img: '/img/haier-super-aqua.webp', photo: true, page: '/warmtepompen/haier-super-aqua/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'haier-gt-r290', merk: 'Haier', name: 'Haier GT R290', tag: 'R290, tot 80 °C, in grijs', from: 5240, isde: 3700, img: '/img/haier-gt-r290.webp', photo: true, page: '/warmtepompen/haier-gt-r290/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'quatt-hybrid', merk: 'Quatt', name: 'Quatt Hybrid', tag: 'Nieuwste versie op R290, naast je cv-ketel', from: null, isde: null, img: placeholderImg('Quatt Hybrid'), photo: false, page: null, types: ['hybride'], badge: 'Hybride · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'quatt-all-electric', merk: 'Quatt', name: 'Quatt All-Electric', tag: 'Volledig gasvrij met HeatCharger & HeatBattery', from: null, isde: null, img: placeholderImg('Quatt All-Electric'), photo: false, page: null, types: ['all-electric'], badge: 'All-electric · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
];

/** Link + knoptekst voor een warmtepompkaart */
export const kaartLink = (w: Warmtepomp) =>
  w.page ? { href: w.page, label: 'Bekijk product' } : { href: '/offerte/', label: 'Vraag advies' };

export const euro = (n: number) => '€ ' + n.toLocaleString('nl-NL');

// Weheat-foto's zijn 940×788 met veel transparante rand. Bijsnijdkader (x0, y0, x1, y1)
// van het zichtbare product, gemeten op de originele afbeeldingen.
export const fotoCrop: Record<string, { w: number; h: number; box: [number, number, number, number] }> = {
  [CDN + '680a992ae6196a42fa131878_Weheat%20warmtepomp-flint.webp']: { w: 940, h: 788, box: [126, 302, 786, 722] },
  [CDN + '680a98ecbde35b827bb60c63_Weheat%20warmtepomop-sparrow.webp']: { w: 940, h: 788, box: [138, 206, 794, 730] },
  // Eigen kopieën van de Sparrow (koper = origineel, grijs = zelf bijgekleurd), zelfde kader
  '/img/weheat-sparrow-koper.webp': { w: 940, h: 788, box: [138, 206, 794, 730] },
  '/img/weheat-sparrow-grijs.webp': { w: 940, h: 788, box: [138, 206, 794, 730] },
  [CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif']: { w: 940, h: 788, box: [112, 344, 780, 692] },
};

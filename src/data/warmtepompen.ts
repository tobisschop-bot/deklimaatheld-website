// Warmtepompen (Weheat, Vaillant, Daikin), in deze volgorde getoond. Prijzen zijn INDICATIEF (bron: De Warmteman) – vervangen door eigen prijzen.
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
  merk: 'Daikin' | 'Weheat' | 'Vaillant';
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
  { slug: 'flint', merk: 'Weheat', name: 'Weheat Flint P40', tag: 'Compact & scherp geprijsd', from: 4248, img: CDN + '680a992ae6196a42fa131878_Weheat%20warmtepomp-flint.webp', photo: true, page: '/warmtepompen/flint/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'sparrow', merk: 'Weheat', name: 'Weheat Sparrow P60', tag: 'Populaire allrounder', from: 5722, img: CDN + '680a98ecbde35b827bb60c63_Weheat%20warmtepomop-sparrow.webp', photo: true, page: '/warmtepompen/sparrow/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'blackbird', merk: 'Weheat', name: 'Weheat Blackbird P80', tag: 'Voor grotere woningen', from: 6498, img: CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif', photo: true, page: '/warmtepompen/blackbird/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'swift', merk: 'Weheat', name: 'Weheat Swift', tag: 'Onzichtbaar in het schuine dak', from: 9851, img: '/img/weheat-swift.webp', photo: true, page: '/warmtepompen/swift/', types: ['dakmontage'], badge: 'Dakintegratie', includes: 'Inclusief dakmontage' },
  { slug: 'arotherm-pure', merk: 'Vaillant', name: 'Vaillant aroTHERM pure', tag: 'Compacte split, in wit', from: null, img: '/img/vaillant-arotherm-pure.webp', photo: true, page: '/warmtepompen/arotherm-pure/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'arotherm-plus', merk: 'Vaillant', name: 'Vaillant aroTHERM plus', tag: 'Stil, R290, in antraciet', from: null, img: '/img/vaillant-arotherm-plus.webp', photo: true, page: '/warmtepompen/arotherm-plus/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'altherma-4h', merk: 'Daikin', name: 'Daikin Altherma 4 H', tag: 'Krachtig, tot 75 °C, in antraciet', from: null, img: '/img/daikin-altherma-4h.webp', photo: true, page: '/warmtepompen/altherma-4h/', types: ['all-electric'], badge: 'All-electric · R290', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'altherma-hybride', merk: 'Daikin', name: 'Daikin Altherma H Hybride', tag: 'Hybride met cv-ketel, in wit', from: null, img: '/img/daikin-altherma-hybride.webp', photo: true, page: '/warmtepompen/altherma-hybride/', types: ['hybride'], badge: 'Hybride', includes: 'Inclusief installatie & inbedrijfstelling' },
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

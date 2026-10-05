// Weheat-modellen. Prijzen zijn INDICATIEF (bron: De Warmteman) – vervangen door eigen prijzen.
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
  from: number;
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
  { slug: 'flint', name: 'Weheat Flint P40', tag: 'Compact & scherp geprijsd', from: 4248, img: CDN + '680a992ae6196a42fa131878_Weheat%20warmtepomp-flint.webp', photo: true, page: '/warmtepompen/flint/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'sparrow', name: 'Weheat Sparrow P60', tag: 'Populaire allrounder', from: 5722, img: CDN + '680a98ecbde35b827bb60c63_Weheat%20warmtepomop-sparrow.webp', photo: true, page: '/warmtepompen/sparrow/', types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'blackbird', name: 'Weheat Blackbird P80', tag: 'Voor grotere woningen', from: 6498, img: CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif', photo: true, page: null, types: ['hybride', 'all-electric'], badge: 'Hybride + all-electric ready', includes: 'Inclusief installatie & inbedrijfstelling' },
  { slug: 'swift', name: 'Weheat Swift', tag: 'Onzichtbaar in het schuine dak', from: 9851, img: placeholderImg('[Productfoto Weheat Swift]'), photo: false, page: null, types: ['dakmontage'], badge: 'Dakintegratie', includes: 'Inclusief dakmontage' },
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
  [CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif']: { w: 940, h: 788, box: [112, 344, 780, 692] },
};

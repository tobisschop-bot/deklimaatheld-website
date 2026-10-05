// Weheat-modellen. Prijzen zijn INDICATIEF (bron: De Warmteman) – vervangen door eigen prijzen.
const CDN = 'https://cdn.prod.website-files.com/67ed5695314f69c537693240/';
export const warmtepompen = [
  { slug: 'flint', name: 'Weheat Flint P40', tag: 'Compact & scherp geprijsd', from: 4248, img: CDN + '680a992ae6196a42fa131878_Weheat%20warmtepomp-flint.webp' },
  { slug: 'sparrow', name: 'Weheat Sparrow P60', tag: 'Populaire allrounder', from: 5722, img: CDN + '680a98ecbde35b827bb60c63_Weheat%20warmtepomop-sparrow.webp' },
  { slug: 'blackbird', name: 'Weheat Blackbird P80', tag: 'Voor grotere woningen', from: 6498, img: CDN + '68134c373abc353d78e00443_Weheat_Blackbird_Products%20(1).avif' },
];
export const euro = (n: number) => '€ ' + n.toLocaleString('nl-NL');

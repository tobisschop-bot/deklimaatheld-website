export type Project = { id: string; titel: string; plaats: string; img: string; alt: string; type: string; info: string; punten: string[] };
// Voorbeelddata – vervangen door echte klussen
export const projecten: Project[] = [
  { id: 'p1', titel: 'Weheat all-electric', plaats: '[Plaats]', img: '/img/werk-installatie-binnen.webp', alt: 'Weheat-installatie met boiler- en buffervat', type: 'All-electric', info: '[Korte beschrijving van de klus: woning, wat er is geplaatst en het resultaat.]', punten: ['[Warmtepomp + vermogen]', '[Boiler / buffervat]', '[Afgiftesysteem]'] },
  { id: 'p2', titel: 'Buitenunit aan de gevel', plaats: '[Plaats]', img: '/img/werk-installatie-buiten.webp', alt: 'Weheat-buitenunit tegen de gevel', type: 'Warmtepomp', info: '[Korte beschrijving van de klus.]', punten: ['[Detail 1]', '[Detail 2]'] },
];

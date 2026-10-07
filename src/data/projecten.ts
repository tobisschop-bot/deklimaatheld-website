export type Soort = 'klant' | 'project' | 'groot';
export const soortLabel: Record<Soort, string> = { klant: 'Klantverhaal', project: 'Project', groot: 'Groot project' };
export type Case = { id: string; soort: Soort; titel: string; plaats: string; jaar: string; img: string; alt: string; info: string; quote?: { tekst: string; naam: string }; punten: string[] };
// Voorbeelddata – vervangen door echte cases (alles tussen [haken] invullen)
export const cases: Case[] = [
  { id: 'c1', soort: 'klant', titel: '[Familie X] is van het gas af', plaats: '[Plaats]', jaar: '[Jaar]', img: '/img/werk-installatie-binnen.webp', alt: 'Weheat-installatie met boiler- en buffervat', info: '[Korte situatie: woning, wens van de klant en wat we hebben geplaatst.]', quote: { tekst: '[Citaat van de klant]', naam: '[Naam klant]' }, punten: ['[Warmtepomp]', '[Boiler]', '[Afgifte]'] },
  { id: 'c2', soort: 'project', titel: '[Buitenunit aan de gevel]', plaats: '[Plaats]', jaar: '[Jaar]', img: '/img/werk-installatie-buiten.webp', alt: 'Weheat-buitenunit tegen de gevel', info: '[Wat is er gedaan en waarom.]', punten: ['[Detail 1]', '[Detail 2]'] },
  { id: 'c3', soort: 'groot', titel: '[Groot project]', plaats: '[Plaats]', jaar: '[Jaar]', img: '/img/jaga-strada-interieur.webp', alt: 'Interieur met lage-temperatuurradiatoren', info: '[Omvang van het project, bijvoorbeeld aantal woningen of units.]', punten: ['[Aantal woningen]', '[Systeem]'] },
];

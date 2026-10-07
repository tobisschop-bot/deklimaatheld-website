// Servicepakketten – ÉÉN bron voor de service-pagina én het afsluitscherm (/service/afsluiten/).
// Prijzen per maand, incl. btw. VOORSTEL – Tycho past deze aan.
export type PakketId = 'basis' | 'zorgeloos' | 'compleet' | 'airco';
export type InstallatieId = 'lucht-water' | 'hybride' | 'airco';

export interface Pakket { id: PakketId; naam: string; tag?: string; kort: string; voor: InstallatieId[] }
export const pakketten: Pakket[] = [
  { id: 'basis', naam: 'Basis', kort: 'Monitoring en onderhoud om het jaar.', voor: ['lucht-water', 'hybride'] },
  { id: 'zorgeloos', naam: 'Zorgeloos', tag: 'Aanbevolen', kort: 'Elk jaar onderhoud, winterklaar en voorrang.', voor: ['lucht-water', 'hybride'] },
  { id: 'compleet', naam: 'Compleet', kort: 'Alles inbegrepen, ook arbeid en onderdelen bij storing.', voor: ['lucht-water', 'hybride'] },
  { id: 'airco', naam: 'Airco Onderhoud', kort: 'Elk voorjaar een complete reiniging, klaar voor de zomer.', voor: ['airco'] },
];

// Wat er in elk pakket zit (true = ja, string = toelichting, false = nee)
// Kenmerken warmtepomp-pakketten
export const kenmerken: { label: string; basis: boolean | string; zorgeloos: boolean | string; compleet: boolean | string }[] = [
  { label: 'Monitoring op afstand', basis: true, zorgeloos: true, compleet: true },
  { label: 'Inregelcheck en rendementscontrole', basis: true, zorgeloos: true, compleet: true },
  { label: 'Onderhoudsbeurt', basis: '1x per 2 jaar', zorgeloos: 'Elk jaar', compleet: 'Elk jaar' },
  { label: 'Winterklaar-check (okt/nov)', basis: false, zorgeloos: true, compleet: true },
  { label: 'Jaarlijks rendementsrapport', basis: false, zorgeloos: true, compleet: true },
  { label: 'Voorrang bij storing', basis: false, zorgeloos: true, compleet: 'Ook in het weekend' },
  { label: 'Voorrijkosten bij storing', basis: false, zorgeloos: true, compleet: true },
  { label: 'Arbeid bij storing', basis: false, zorgeloos: false, compleet: true },
  { label: 'Onderdelen bij storing', basis: false, zorgeloos: false, compleet: 'Excl. koudemiddel' },
];

// Wat zit er in Airco Onderhoud
export const aircoKenmerken = [
  'Complete reiniging binnen- en buitendeel (met water, ontsmetting en filters)',
  'Zomerklaar: in het voorjaar ingepland, vóór het koelseizoen',
  'Controle op werking, lekkage en afvoer van condenswater',
  'Rendementscheck en advies over instellingen',
  'Voorrang bij storing',
];

export const installaties: { id: InstallatieId; naam: string; sub: string }[] = [
  { id: 'lucht-water', naam: 'Warmtepomp (all-electric)', sub: 'Lucht-water, zonder cv-ketel' },
  { id: 'hybride', naam: 'Hybride warmtepomp', sub: 'Warmtepomp + cv-ketel' },
  { id: 'airco', naam: 'Airco', sub: 'Lucht-lucht, per buitendeel' },
];

// Maandprijzen per installatie en pakket. null = niet beschikbaar.
// Hybride is duurder: ook de cv-ketel wordt nagekeken.
// Airco: prijs per buitendeel incl. 1 binnendeel; reinigen kost ± 2 uur + reistijd.
export const prijzen: Record<InstallatieId, Partial<Record<PakketId, number>>> = {
  'lucht-water': { basis: 12.5, zorgeloos: 27.5, compleet: 39.5 },
  hybride: { basis: 17.5, zorgeloos: 32.5, compleet: 44.5 },
  airco: { airco: 19.5 },
};
export const aircoExtraBinnendeel = 5; // per extra binnendeel per maand
export const jaarKorting = 0.05; // korting bij jaarbetaling

export const maandprijs = (inst: InstallatieId, p: PakketId, binnendelen = 1) => {
  const b = prijzen[inst][p];
  if (b == null) return null;
  return b + (inst === 'airco' ? Math.max(0, binnendelen - 1) * aircoExtraBinnendeel : 0);
};
export const eur = (n: number) => '€ ' + n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

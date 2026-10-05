// =====================================================================
// REKENMODEL BESPARINGSCHECK – De Klimaatheld
// Alle aannames staan hieronder bij elkaar. Pas ze hier aan; de check
// rekent overal automatisch mee. Uitkomsten zijn altijd INDICATIEF.
// =====================================================================

export const AANNAMES = {
  gasprijs: 1.70,          // € per m³ incl. belastingen (gemiddeld, okt 2026 – keuze.nl)
  stroomprijs: 0.31,       // € per kWh incl. belastingen (gemiddeld, okt 2026 – keuze.nl)
  kWhPerM3: 8.8,           // nuttige warmte per m³ gas (9,77 kWh × ketelrendement ±90%)
  scopRuimte: 4.0,         // seizoensrendement warmtepomp voor ruimteverwarming (lage-temperatuurontwerp)
  copTapwater: 2.5,        // rendement warmtepomp voor warm tapwater (hogere temperatuur)
  scopAirco: 4.5,          // seizoensrendement lucht-lucht (airco) bij verwarmen
  hybrideAandeel: 0.75,    // deel van de ruimteverwarming dat een hybride warmtepomp overneemt
  aircoAandeel: { 1: 0.25, 2: 0.40, 3: 0.55, 4: 0.65 } as Record<number, number>, // per aantal ruimtes
  tapwaterPerPersoon: 50,  // m³ gas per persoon per jaar voor warm water
  kokenM3: 0,              // m³ gas voor koken (0 = niet meegenomen)
  vollastUren: 2200,       // voor vermogensadvies: jaarlijkse warmte ÷ uren = benodigd vermogen bij -10°C
  // Financiering voor 'investering per maand' (annuïteit). Pas aan naar eigen aanbod.
  rente: 0.04,             // 4% per jaar
  looptijdJaren: 15,
  // Indicatieve investering airco (lucht-lucht) per aantal ruimtes; null = op aanvraag
  aircoInvestering: { 1: null, 2: null, 3: null, 4: null } as Record<number, number | null>,
  boilerStandaard: 1650,   // 200 L boilervat bij all-electric (gelijk aan configurator)
};

export type Woningtype = 'appartement' | 'tussenwoning' | 'hoekwoning' | 'twee-onder-een-kap' | 'vrijstaand';

// Ruimteverwarming (m³/jaar) voor een referentiewoning uit 1975–1991 met een typische oppervlakte
const BASIS: Record<Woningtype, { m3: number; m2: number; label: string }> = {
  appartement: { m3: 650, m2: 75, label: 'Appartement' },
  tussenwoning: { m3: 950, m2: 115, label: 'Rijtjeshuis' },
  hoekwoning: { m3: 1100, m2: 120, label: 'Hoekwoning' },
  'twee-onder-een-kap': { m3: 1200, m2: 140, label: '2-onder-1-kap' },
  vrijstaand: { m3: 1450, m2: 170, label: 'Vrijstaand' },
};
export const WONINGTYPES = Object.entries(BASIS).map(([id, v]) => ({ id: id as Woningtype, label: v.label }));

function bouwjaarFactor(jaar?: number | null): number {
  if (!jaar) return 1.0;
  if (jaar < 1946) return 1.35;
  if (jaar < 1965) return 1.25;
  if (jaar < 1975) return 1.15;
  if (jaar < 1992) return 1.0;
  if (jaar < 2006) return 0.8;
  if (jaar < 2015) return 0.65;
  return 0.45;
}

/** Schat het jaarlijkse gasverbruik (m³) op basis van woningtype, oppervlakte, bouwjaar en huishouden. */
export function schatGasverbruik(i: { type: Woningtype; m2?: number | null; bouwjaar?: number | null; personen: number }) {
  const b = BASIS[i.type];
  const m2 = i.m2 && i.m2 > 15 && i.m2 < 1000 ? i.m2 : b.m2;
  const ruimte = b.m3 * bouwjaarFactor(i.bouwjaar) * Math.sqrt(m2 / b.m2);
  const tapwater = AANNAMES.tapwaterPerPersoon * i.personen;
  return Math.round((ruimte + tapwater + AANNAMES.kokenM3) / 10) * 10;
}

const annuiteit = (bedrag: number) => {
  const r = AANNAMES.rente / 12, n = AANNAMES.looptijdJaren * 12;
  return r === 0 ? bedrag / n : (bedrag * r) / (1 - Math.pow(1 + r, -n));
};

export type Model = { slug: string; name: string; kwMin10: number; hybride: number | null; allElectric: number | null };

export interface Uitkomst {
  gasM3Bespaard: number;
  besparingGasMaand: number;
  extraStroomKWh: number;
  extraStroomMaand: number;
  investering: number | null;
  investeringMaand: number | null;
  nettoMaand: number;          // besparing gas − extra stroom − investering/maand (indien bekend)
  nettoZonderInvestering: number;
  advies?: Model;
}

/** Bereken de besparing. Gasverbruik = totaal (ruimte + tapwater). */
export function bereken(i: {
  soort: 'lucht-water' | 'lucht-lucht';
  uitvoering?: 'hybride' | 'all-electric';
  gasM3: number;
  personen: number;
  ruimtes?: number;
  modellen?: Model[];
}): Uitkomst {
  const A = AANNAMES;
  const tapwaterM3 = Math.min(i.gasM3 * 0.4, A.tapwaterPerPersoon * i.personen);
  const ruimteM3 = Math.max(0, i.gasM3 - tapwaterM3 - A.kokenM3);

  let gasBespaard = 0, stroom = 0, investering: number | null = null, advies: Model | undefined;

  if (i.soort === 'lucht-lucht') {
    const aandeel = A.aircoAandeel[Math.min(4, Math.max(1, i.ruimtes ?? 1))];
    gasBespaard = ruimteM3 * aandeel;
    stroom = (gasBespaard * A.kWhPerM3) / A.scopAirco;
    investering = A.aircoInvestering[Math.min(4, Math.max(1, i.ruimtes ?? 1))] ?? null;
  } else {
    const ae = i.uitvoering === 'all-electric';
    const ruimteDeel = ae ? 1 : A.hybrideAandeel;
    const ruimteBespaard = ruimteM3 * ruimteDeel;
    const tapBespaard = ae ? tapwaterM3 : 0;
    gasBespaard = ruimteBespaard + tapBespaard;
    stroom = (ruimteBespaard * A.kWhPerM3) / A.scopRuimte + (tapBespaard * A.kWhPerM3) / A.copTapwater;
    // Vermogensadvies: all-electric dekt de volle last, hybride ±60%
    const lastKW = (ruimteM3 * A.kWhPerM3) / A.vollastUren;
    const nodig = ae ? lastKW : lastKW * 0.6;
    const kandidaten = (i.modellen ?? []).slice().sort((a, b) => a.kwMin10 - b.kwMin10);
    advies = kandidaten.find((m) => m.kwMin10 >= nodig) ?? kandidaten[kandidaten.length - 1];
    if (advies) {
      const p = ae ? advies.allElectric : advies.hybride;
      investering = p == null ? null : p + (ae ? A.boilerStandaard : 0);
    }
  }

  const besparingGasMaand = (gasBespaard * A.gasprijs) / 12;
  const extraStroomMaand = (stroom * A.stroomprijs) / 12;
  const investeringMaand = investering == null ? null : annuiteit(investering);
  const nettoZonderInvestering = besparingGasMaand - extraStroomMaand;
  return {
    gasM3Bespaard: Math.round(gasBespaard),
    besparingGasMaand,
    extraStroomKWh: Math.round(stroom),
    extraStroomMaand,
    investering,
    investeringMaand,
    nettoMaand: nettoZonderInvestering - (investeringMaand ?? 0),
    nettoZonderInvestering,
    advies,
  };
}

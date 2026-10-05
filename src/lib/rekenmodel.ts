// =====================================================================
// REKENMODEL BESPARINGSCHECK – De Klimaatheld
// Alle aannames staan hieronder bij elkaar. Pas ze hier aan; de check
// rekent overal automatisch mee. Uitkomsten zijn altijd INDICATIEF.
// =====================================================================

export const AANNAMES = {
  gasprijs: 1.70,          // € per m³ incl. belastingen (gemiddeld, okt 2026)
  stroomprijs: 0.31,       // € per kWh incl. belastingen (gemiddeld, okt 2026)
  kWhPerM3: 8.8,           // nuttige warmte per m³ gas (9,77 kWh × ketelrendement ±90%)

  // Rendement (gemiddelde COP over het seizoen)
  copWarmtepomp: 4.5,      // lucht-water warmtepomp, ruimteverwarming
  copTapwater: 2.5,        // lucht-water bij warm tapwater (hogere temperatuur), alleen all-electric
  copAirco: 3.8,           // lucht-lucht (airco) bij verwarmen

  hybrideAandeel: 0.75,    // deel van de ruimteverwarming dat een hybride warmtepomp overneemt
  woonkamerAandeel: 0.40,  // deel van de warmtevraag dat in de woonkamer zit (eerste airco-unit)
  aircoMaxAandeel: 0.85,   // airco neemt nooit 100% over (badkamer, gangen, tapwater)

  tapwaterPerPersoon: 50,  // m³ gas per persoon per jaar voor warm water
  kokenM3: 0,              // m³ gas voor koken (0 = niet meegenomen)
  vollastUren: 2200,       // voor vermogensadvies: jaarlijkse warmte ÷ uren = benodigd vermogen bij -10°C

  // Financiering voor 'investering per maand' (annuïteit). Pas aan naar eigen aanbod.
  rente: 0.04,             // 4% per jaar
  looptijdJaren: 15,

  // Indicatieve investering airco (lucht-lucht, incl. montage); null = op aanvraag
  aircoEersteRuimte: null as number | null,  // single-split, woonkamer
  aircoExtraRuimte: null as number | null,   // per extra binnenunit (multi-split)

  boilerStandaard: 1650,   // 200 L boilervat bij all-electric (gelijk aan configurator)
};


// WONINGTABEL – referentiewaarden per woningtype (bouwjaar 1975–1991, typische oppervlakte).
// gasRuimte = m³ gas per jaar voor ruimteverwarming (excl. warm water).
// kamers   = aantal te verwarmen ruimtes (bepaalt hoeveel een airco per extra unit overneemt).
export const WONINGTABEL = {
  appartement:          { label: 'Appartement',   m2: 75,  gasRuimte: 650,  kamers: 3 },
  tussenwoning:         { label: 'Rijtjeshuis',   m2: 115, gasRuimte: 950,  kamers: 5 },
  hoekwoning:           { label: 'Hoekwoning',    m2: 120, gasRuimte: 1100, kamers: 5 },
  'twee-onder-een-kap': { label: '2-onder-1-kap', m2: 140, gasRuimte: 1200, kamers: 6 },
  vrijstaand:           { label: 'Vrijstaand',    m2: 170, gasRuimte: 1450, kamers: 7 },
};
export type Woningtype = keyof typeof WONINGTABEL;
const BASIS: Record<Woningtype, { m3: number; m2: number; label: string; kamers: number }> = Object.fromEntries(
  Object.entries(WONINGTABEL).map(([k, v]) => [k, { m3: v.gasRuimte, m2: v.m2, label: v.label, kamers: v.kamers }]),
) as any;

/** Deel van de ruimteverwarming dat n airco-units overnemen (woonkamer eerst, dan overige kamers). */
export function aircoAandeel(type: Woningtype, ruimtes: number): number {
  const A = AANNAMES, k = BASIS[type].kamers;
  const n = Math.max(1, Math.min(ruimtes, k));
  const deel = A.woonkamerAandeel + ((n - 1) * (1 - A.woonkamerAandeel)) / Math.max(1, k - 1);
  return Math.min(A.aircoMaxAandeel, deel);
}

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
  type?: Woningtype;
  ruimtes?: number;
  modellen?: Model[];
}): Uitkomst {
  const A = AANNAMES;
  const tapwaterM3 = Math.min(i.gasM3 * 0.4, A.tapwaterPerPersoon * i.personen);
  const ruimteM3 = Math.max(0, i.gasM3 - tapwaterM3 - A.kokenM3);

  let gasBespaard = 0, stroom = 0, investering: number | null = null, advies: Model | undefined;

  if (i.soort === 'lucht-lucht') {
    const n = Math.max(1, i.ruimtes ?? 1);
    gasBespaard = ruimteM3 * aircoAandeel(i.type ?? 'tussenwoning', n);
    stroom = (gasBespaard * A.kWhPerM3) / A.copAirco;
    investering = A.aircoEersteRuimte == null || A.aircoExtraRuimte == null ? null : A.aircoEersteRuimte + (n - 1) * A.aircoExtraRuimte;
  } else {
    const ae = i.uitvoering === 'all-electric';
    const ruimteDeel = ae ? 1 : A.hybrideAandeel;
    const ruimteBespaard = ruimteM3 * ruimteDeel;
    const tapBespaard = ae ? tapwaterM3 : 0;
    gasBespaard = ruimteBespaard + tapBespaard;
    stroom = (ruimteBespaard * A.kWhPerM3) / A.copWarmtepomp + (tapBespaard * A.kWhPerM3) / A.copTapwater;
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

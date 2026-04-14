export const LABELS = [
  "GAAR",
  "SARS",
  "CFC",
  "PE",
  "POEM",
  "FBE",
  "BPR",
  "IRevenue",
] as const;

export type HandleId = (typeof LABELS)[number];

export const HINTS: Record<HandleId, string> = {
  GAAR: "Anti-avoidance",
  SARS: "SA revenue",
  CFC: "Controlled foreign co.",
  PE: "Permanent est.",
  POEM: "Place of mgmt",
  FBE: "Foreign business",
  BPR: "Business purpose",
  IRevenue: "Irish revenue",
};

export const DESCRIPTIONS: Record<
  HandleId,
  { fix: string; risk: string }
> = {
  GAAR: {
    fix: "Add genuine commercial substance to the structure",
    risk: "Structure looks tax-motivated to both jurisdictions",
  },
  SARS: {
    fix: "Full SA disclosure and compliance",
    risk: "SARS scrutinises the arrangement more closely",
  },
  CFC: {
    fix: "Dilute SA shareholding below 50% or ensure FBE exemption",
    risk: "SA residents may be deemed to control the Irish entity",
  },
  PE: {
    fix: "Limit SA co-founder's operational role from SA",
    risk: "SA-based activity could create a taxable presence there",
  },
  POEM: {
    fix: "Ensure all key decisions are made by Irish-resident directors",
    risk: "If SA founders drive strategy, company could be deemed SA-resident",
  },
  FBE: {
    fix: "Build real Irish office, staff, and operational substance",
    risk: "Without genuine Irish substance, CFC exemption fails",
  },
  BPR: {
    fix: "Demonstrate genuine non-tax commercial reasons for Irish entity",
    risk: "Purely tax-driven structure fails business purpose tests",
  },
  IRevenue: {
    fix: "Meet Irish substance requirements (directors, office, payroll)",
    risk: "Irish Revenue questions whether the company is genuinely Irish-managed",
  },
};

/**
 * Coupling matrix: COUPLINGS[i][j] describes how resolving handle i
 * affects handle j. Positive = co-beneficial, negative = creates tension.
 *
 * Updated to reflect the D9 Corporate Structure Options Comparison document:
 * - CFC fix (12.4%) creates GAAR exposure (timing/motive risk)
 * - CFC fix eliminates FBE requirement
 * - CFC and POEM are independent legal tests
 * - POEM governance (2:1 board) strengthens BPR viability
 * - POEM governance helps Irish Revenue substance
 * - FBE substance helps CFC exemption
 * - PE risk from SA founders creates POEM tension
 */
export const COUPLINGS: number[][] = [
  /*           GAAR  SARS   CFC    PE    POEM   FBE    BPR   IRev */
  /* GAAR */ [0, 0.3, 0, -0.3, 0, 0.4, 0.7, 0.4],
  /* SARS */ [0.2, 0, -0.5, 0, 0, 0, -0.4, 0],
  /* CFC  */ [-0.55, -0.3, 0, 0, 0, 0.7, 0, -0.3],
  /* PE   */ [-0.3, 0.3, 0, 0, -0.5, 0, 0, 0.3],
  /* POEM */ [0, 0, 0, -0.4, 0, 0.3, 0.5, 0.7],
  /* FBE  */ [0.3, 0, 0.5, -0.5, 0.3, 0, 0.3, 0],
  /* BPR  */ [0.6, -0.4, 0, 0, 0.3, -0.3, 0, 0.3],
  /* IRev */ [0.3, 0, -0.3, 0.3, 0.5, 0.3, -0.4, 0],
];

export const N = LABELS.length;

export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function getColor(v: number): string {
  if (v < -0.3) return "#E24B4A";
  if (v < 0.3) return "#BA7517";
  return "#1D9E75";
}

export function getThumbColor(v: number): string {
  if (v < -0.3) return "#F09595";
  if (v < 0.3) return "#FAC775";
  return "#5DCAA5";
}

export function getTrackFillColor(v: number): string {
  if (v < -0.3) return "rgba(226,75,74,0.15)";
  if (v < 0.3) return "rgba(186,117,23,0.12)";
  return "rgba(29,158,117,0.15)";
}

export function valueToPct(v: number): number {
  return Math.round(((v + 1) / 2) * 100);
}

export interface SideEffect {
  label: HandleId;
  improved: boolean;
}

export function computeSideEffects(
  idx: number,
  improved: boolean
): SideEffect[] {
  const effects: SideEffect[] = [];
  for (let j = 0; j < N; j++) {
    if (j === idx) continue;
    const c = COUPLINGS[idx][j];
    if (c !== 0) {
      const dir = (improved ? c : -c) > 0;
      effects.push({ label: LABELS[j], improved: dir });
    }
  }
  return effects;
}

export function applyChange(
  values: number[],
  idx: number,
  newVal: number,
  baseValues?: number[]
): number[] {
  const base = baseValues ?? values;
  const result = base.slice();
  const oldVal = base[idx];
  const delta = newVal - oldVal;
  result[idx] = clamp(newVal, -1, 1);

  for (let j = 0; j < N; j++) {
    if (j === idx) continue;
    const c = COUPLINGS[idx][j];
    if (c !== 0) {
      result[j] = clamp(base[j] + c * delta * 0.65, -1, 1);
    }
  }
  return result;
}


import type { HandleId } from "./engine";

export type OptionId = "A" | "B" | "C" | "D";

export interface CapTableEntry {
  shareholder: string;
  holding: string;
  jurisdiction: string;
}

export interface GovernanceEntry {
  role: string;
  person: string;
  jurisdiction: string;
}

export interface TaxOutcome {
  mrr: string;
  monthly: string;
}

export interface ComplianceEntry {
  item: string;
  status: "required" | "no" | "optional" | "critical" | "n/a";
}

export interface StructureOption {
  id: OptionId;
  name: string;
  subtitle: string;
  corporateTax: string;
  founderEquity: string;
  overview: string;
  /** Risk profile values matching LABELS order: GAAR, SARS, CFC, PE, POEM, FBE, BPR, IRevenue */
  riskProfile: number[];
  /** Bias toward this option in scoring — reflects document's overall assessment */
  qualityBonus: number;
  capTable: CapTableEntry[];
  governance: GovernanceEntry[] | null;
  taxOutcomes: TaxOutcome[];
  setup: string[];
  advantages: string[];
  risks: string[];
  compliance: ComplianceEntry[];
}

/**
 * Risk label for the summary table in option selector cards.
 * Maps each dimension to the document's assessment per option.
 */
export const RISK_LABELS: Record<OptionId, Record<HandleId, string>> = {
  A: {
    GAAR: "Medium",
    SARS: "High",
    CFC: "High",
    PE: "Medium",
    POEM: "High",
    FBE: "Critical",
    BPR: "Hard",
    IRevenue: "Medium",
  },
  B: {
    GAAR: "None",
    SARS: "Low",
    CFC: "None",
    PE: "None",
    POEM: "None",
    FBE: "N/A",
    BPR: "None",
    IRevenue: "Low",
  },
  C: {
    GAAR: "High",
    SARS: "Low",
    CFC: "None",
    PE: "Medium",
    POEM: "Medium",
    FBE: "N/A",
    BPR: "Optional",
    IRevenue: "Medium",
  },
  D: {
    GAAR: "Low-Med",
    SARS: "Low",
    CFC: "None",
    PE: "Low-Med",
    POEM: "Low",
    FBE: "N/A",
    BPR: "Strong",
    IRevenue: "Low",
  },
};

// ──────────────────────────────────────────────────────
// Option A: Irish POEM with Dual Entity
// ──────────────────────────────────────────────────────
const OPTION_A: StructureOption = {
  id: "A",
  name: "Irish POEM with Dual Entity",
  subtitle: "Maximum ambition, maximum risk",
  corporateTax: "12.5%",
  founderEquity: "17% each",
  overview:
    "D9 Ireland is the parent holding company with Jason as sole operational director. D9 SA operates as a limited-risk contract service provider employing the four SA founders. The structure aims to establish and defend an Irish POEM for 12.5% corporate tax — but FBE is not yet established and POEM risk from SHA constraints means it would not survive a SARS audit in its current form.",
  //              GAAR  SARS   CFC    PE    POEM   FBE    BPR   IRev
  riskProfile: [-0.2, -0.6, -0.7, -0.25, -0.7, -0.9, -0.5, -0.25],
  qualityBonus: 0.0,
  capTable: [
    { shareholder: "Shay Kallie (Heimdall)", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Shaun Norton", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Ben Smith", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Storme Grainger", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Jason Silva", holding: "17%", jurisdiction: "Ireland" },
    { shareholder: "Carel / RocherMauritia", holding: "7.5%", jurisdiction: "Mauritius" },
    { shareholder: "Reserved", holding: "7.5%", jurisdiction: "\u2014" },
  ],
  governance: null,
  taxOutcomes: [
    { mrr: "Pre-revenue", monthly: "\u20ac0" },
    { mrr: "\u20ac16K MRR", monthly: "\u20ac2K/mo" },
    { mrr: "\u20ac50K MRR", monthly: "\u20ac6.25K/mo" },
    { mrr: "\u20ac100K MRR", monthly: "\u20ac12.5K/mo" },
    { mrr: "FBE fails", monthly: ">45% effective" },
  ],
  setup: [
    "Jason as sole operational director with formal Irish employment contract",
    "D9 SA invoices D9 Ireland monthly at cost-plus (8\u201315% markup)",
    "SHA reserved matters narrowed to extraordinary corporate events only",
    "Establish FBE across all 5 criteria: fixed place, employee, equipment, facilities, non-tax purpose",
    "BPR application to SARS once substance is in place",
    "Transfer pricing benchmarking study (R25\u201350K) before first intercompany invoice",
  ],
  advantages: [
    "Preserves 12.5% Irish corporate tax rate",
    "Coronation CC precedent supports the outsourcing model",
    "Keeps founder equity at 17% each",
    "Cleanest long-term structure if D9 scales internationally",
  ],
  risks: [
    "POEM is the central vulnerability \u2014 SHA language constructs SARS\u2019s own argument",
    "FBE not established \u2014 founders face up to 45% tax on attributed CFC income",
    "CFC classification is a mathematical certainty: 68% SA-resident participation",
    "If FBE fails in a year of material profits, founders face >45% effective tax",
    "Dual-entity compliance: corporate tax in two jurisdictions, SARB, DWT, intercompany docs",
  ],
  compliance: [
    { item: "IT10B (per founder, annual)", status: "required" },
    { item: "FBE Evidence File", status: "required" },
    { item: "BPR Application", status: "required" },
    { item: "TP Benchmarking Study", status: "required" },
    { item: "Dual Corporate Tax Returns", status: "required" },
    { item: "SARB FinSurv Reporting", status: "required" },
    { item: "Irish CT1 Filing", status: "required" },
    { item: "Annual IP Valuation", status: "optional" },
    { item: "Quarterly Board Minutes", status: "critical" },
  ],
};

// ──────────────────────────────────────────────────────
// Option B: Accept SA POEM
// ──────────────────────────────────────────────────────
const OPTION_B: StructureOption = {
  id: "B",
  name: "Accept SA POEM",
  subtitle: "Simplest compliance, accept 27%",
  corporateTax: "27%",
  founderEquity: "17% each",
  overview:
    "D9 Ireland is incorporated in Ireland but the team accepts that POEM is in South Africa. Under the DTA tie-breaker, D9 Ireland is treated as SA tax-resident at 27%. Ireland is retained purely for operational infrastructure: Stripe, Revolut, Carel\u2019s investment, and future EU access. The tax differential on zero revenue is zero \u2014 the team revisits when revenue justifies genuine Irish substance.",
  //              GAAR  SARS  CFC   PE    POEM  FBE   BPR   IRev
  riskProfile: [0.9, 0.7, 0.9, 0.9, 0.9, 0.8, 0.7, 0.4],
  qualityBonus: 0.2,
  capTable: [
    { shareholder: "Shay Kallie (Heimdall)", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Shaun Norton", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Ben Smith", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Storme Grainger", holding: "17%", jurisdiction: "SA" },
    { shareholder: "Jason Silva", holding: "17%", jurisdiction: "Ireland" },
    { shareholder: "Carel / RocherMauritia", holding: "7.5%", jurisdiction: "Mauritius" },
    { shareholder: "Reserved", holding: "7.5%", jurisdiction: "\u2014" },
  ],
  governance: null,
  taxOutcomes: [
    { mrr: "Pre-revenue", monthly: "\u20ac0" },
    { mrr: "\u20ac16K MRR", monthly: "\u20ac4.3K/mo" },
    { mrr: "\u20ac50K MRR", monthly: "\u20ac13.5K/mo" },
    { mrr: "\u20ac100K MRR", monthly: "\u20ac27K/mo" },
  ],
  setup: [
    "Register D9 Ireland as a SA taxpayer \u2014 file SA corporate tax returns at 27%",
    "Ireland retained for Stripe, Revolut, Carel\u2019s investment vehicle, and EU market access",
    "D9 SA continues as thin employment vehicle for SA-based founders",
    "International revenue flows through D9 Ireland; domestic SA revenue through D9 SA",
    "When sustained revenue justifies it (\u20ac50K+ MRR), revisit with genuine Irish substance",
  ],
  advantages: [
    "Simplest compliance profile \u2014 structure matches how business actually operates",
    "Zero GAAR risk \u2014 no manufactured substance, no performative evidence",
    "Keeps founder equity at 17% each",
    "Eliminates entire CFC/FBE/IT10B compliance stack",
    "Tax differential on current income is zero \u2014 D9 is pre-revenue",
    "Dividend tax at 20% SA DWT better than Irish DWT + s9D loop (~30%)",
  ],
  risks: [
    "27% corporate tax vs 12.5% when revenue arrives (\u20ac7.25K/mo differential at \u20ac50K MRR)",
    "At \u20ac100K MRR, differential is \u20ac14.5K/month \u2014 real money at scale",
    "Does not position D9 for optimal tax efficiency at scale",
    "Requires a future structural shift with its own advisory costs and timing risk",
  ],
  compliance: [
    { item: "IT10B (per founder, annual)", status: "no" },
    { item: "FBE Evidence File", status: "no" },
    { item: "BPR Application", status: "no" },
    { item: "TP Benchmarking Study", status: "n/a" },
    { item: "Dual Corporate Tax Returns", status: "required" },
    { item: "SARB FinSurv Reporting", status: "required" },
    { item: "Irish CT1 Filing", status: "required" },
    { item: "Annual IP Valuation", status: "no" },
    { item: "Quarterly Board Minutes", status: "optional" },
  ],
};

// ──────────────────────────────────────────────────────
// Option C: 12.4% CFC Threshold Restructure
// ──────────────────────────────────────────────────────
const OPTION_C: StructureOption = {
  id: "C",
  name: "12.4% CFC Threshold Restructure",
  subtitle: "Eliminates CFC, but POEM and PE exposed",
  corporateTax: "12.5%",
  founderEquity: "12.4% each",
  overview:
    "Each SA founder reduces from 17% to 12.4%, producing 49.6% SA-resident participation \u2014 just below the 50% CFC threshold. D9 Ireland ceases to be a CFC. However, POEM and PE remain exposed. The GAAR shadow over the restructuring motive is the single biggest vulnerability, particularly if any record of the deliberation process exists. Option C is Option D without its best feature.",
  //              GAAR   SARS  CFC   PE     POEM   FBE   BPR   IRev
  riskProfile: [-0.55, 0.4, 0.85, -0.2, -0.3, 0.75, 0.2, -0.1],
  qualityBonus: 0.1,
  capTable: [
    { shareholder: "Shay Kallie (Heimdall)", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Shaun Norton", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Ben Smith", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Storme Grainger", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Jason Silva", holding: "12.4%", jurisdiction: "Ireland" },
    { shareholder: "Carel / RocherMauritia", holding: "7.6%", jurisdiction: "Mauritius" },
    { shareholder: "Reserved for future rounds", holding: "30.4%", jurisdiction: "\u2014" },
  ],
  governance: null,
  taxOutcomes: [
    { mrr: "Pre-revenue", monthly: "\u20ac0" },
    { mrr: "\u20ac16K MRR", monthly: "\u20ac2K/mo" },
    { mrr: "\u20ac50K MRR", monthly: "\u20ac6.25K/mo" },
    { mrr: "\u20ac100K MRR", monthly: "\u20ac12.5K/mo" },
  ],
  setup: [
    "Each SA founder drops from 17% to 12.4% (4.6% reduction each, 18.4% total)",
    "30.4% reserved pool for future investment rounds",
    "POEM must still be managed \u2014 CFC and POEM are separate legal tests",
    "D9 SA question (retain or dissolve) remains open",
    "Founders can purchase equity back toward 15% when D9 has revenue via company loans",
  ],
  advantages: [
    "Eliminates CFC entirely \u2014 no IT10B, no FBE, no attributed income at 45%",
    "Preserves 12.5% Irish corporate tax rate target",
    "30.4% reserved pool genuinely attractive to future investors",
  ],
  risks: [
    "GAAR exposure: SARS can map the timeline \u2014 if motive was to duck 50%, arrangement fails sole-or-main-purpose test",
    "Connected persons rules may let SARS argue four founders act in concert as single block",
    "POEM is not solved \u2014 five SA-based people running the company gives SARS strong argument",
    "PE risk not addressed \u2014 five SA-resident founders performing services creates PE argument",
    "Each founder loses ~R2.6M in notional value (seed-round implied valuation ~R57M)",
    "Buyback plan (company loans) introduces s8C, fringe benefit, and arm\u2019s-length complications",
  ],
  compliance: [
    { item: "IT10B (per founder, annual)", status: "no" },
    { item: "FBE Evidence File", status: "no" },
    { item: "BPR Application", status: "optional" },
    { item: "TP Benchmarking Study", status: "required" },
    { item: "Dual Corporate Tax Returns", status: "optional" },
    { item: "SARB FinSurv Reporting", status: "required" },
    { item: "Irish CT1 Filing", status: "required" },
    { item: "Annual IP Valuation", status: "no" },
    { item: "Quarterly Board Minutes", status: "optional" },
  ],
};

// ──────────────────────────────────────────────────────
// Option D: Board Governance Model with 12.4% Restructure
// ──────────────────────────────────────────────────────
const OPTION_D: StructureOption = {
  id: "D",
  name: "Governance Model with 12.4% Restructure",
  subtitle: "Best risk-adjusted outcome \u2014 recommended",
  corporateTax: "12.5%",
  founderEquity: "12.4% each",
  overview:
    "Combines CFC elimination (12.4% shareholding) with a governance architecture designed to defend POEM. Only one SA founder holds a board seat. Jason (Ireland) plus Carel/Rocher Trust (Mauritius) form a 2:1 majority on the D9 Ireland board. Pre-incorporation structuring is harder for SARS to attack. The commercial justification (30% for future investors) is genuine and documented in the founding board resolution.",
  //              GAAR   SARS  CFC   PE    POEM  FBE   BPR   IRev
  riskProfile: [-0.05, 0.5, 0.85, 0.1, 0.5, 0.75, 0.45, 0.4],
  qualityBonus: 0.5,
  capTable: [
    { shareholder: "Shay Kallie (Heimdall)", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Shaun Norton", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Ben Smith", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Storme Grainger", holding: "12.4%", jurisdiction: "SA" },
    { shareholder: "Jason Silva", holding: "12.4%", jurisdiction: "Ireland" },
    { shareholder: "Carel / RocherMauritia", holding: "7.6%", jurisdiction: "Mauritius" },
    { shareholder: "Reserved for future rounds", holding: "30.4%", jurisdiction: "\u2014" },
  ],
  governance: [
    { role: "Operational Director", person: "Jason Silva", jurisdiction: "Ireland" },
    { role: "Corporate Director", person: "The Rocher Trust (Carel)", jurisdiction: "Mauritius" },
    { role: "Board Seat (SA)", person: "One SA founder (TBD)", jurisdiction: "South Africa" },
    { role: "Shareholders only", person: "Remaining 3 SA founders", jurisdiction: "SA \u2014 no governance" },
  ],
  taxOutcomes: [
    { mrr: "Pre-revenue", monthly: "\u20ac0" },
    { mrr: "\u20ac16K MRR", monthly: "\u20ac2K/mo" },
    { mrr: "\u20ac50K MRR", monthly: "\u20ac6.25K/mo" },
    { mrr: "\u20ac100K MRR", monthly: "\u20ac12.5K/mo" },
  ],
  setup: [
    "Leroy confirms 49.6% CFC elimination is watertight and pre-incorporation GAAR position is defensible",
    "Draft founding board resolution with commercial rationale (investor attraction, governance, expansion \u2014 no tax language)",
    "Incorporate D9 Ireland with 3-seat board: Jason + Rocher Trust + one SA founder (2:1 non-SA majority)",
    "Issue shares at 12.4% per founder, 7.6% Carel, 30.4% reserved",
    "Execute Jason\u2019s Irish employment contract with documented operational authority",
    "Close seed round with Carel \u2014 Class A/B shares in D9 Ireland, mirrored in D9 SA",
    "When sustained revenue justifies it (\u20ac50K+ MRR): build genuine Irish substance, apply for BPR",
  ],
  advantages: [
    "Strongest POEM defence: 2:1 non-SA board majority with documented Irish decision-making",
    "CFC eliminated \u2014 no IT10B, no FBE, no attributed income at 45%",
    "PE risk deferred behind part-time founder shield with D9 SA employment path",
    "12.5% corporate tax preserved",
    "GAAR defence stronger: commercial rationale stands independently of tax motive",
    "Best BPR pathway \u2014 most defensible evidence file when the time comes",
  ],
  risks: [
    "Three SA co-founders lose board representation \u2014 equity holders only, requires trust",
    "Same equity dilution as Option C (17% \u2192 12.4% each)",
    "PE risk deferred, not eliminated \u2014 SARS will scrutinise when founders go full-time",
    "Jason\u2019s authority must be genuine \u2014 if SA founders still drive decisions via Slack, POEM defence collapses",
    "GAAR risk on 12.4% restructuring remains but mitigated by pre-incorporation timing",
  ],
  compliance: [
    { item: "IT10B (per founder, annual)", status: "no" },
    { item: "FBE Evidence File", status: "no" },
    { item: "BPR Application", status: "optional" },
    { item: "TP Benchmarking Study", status: "required" },
    { item: "Dual Corporate Tax Returns", status: "required" },
    { item: "SARB FinSurv Reporting", status: "required" },
    { item: "Irish CT1 Filing", status: "required" },
    { item: "Annual IP Valuation", status: "no" },
    { item: "Quarterly Board Minutes", status: "critical" },
  ],
};

export const OPTIONS: StructureOption[] = [OPTION_A, OPTION_B, OPTION_C, OPTION_D];

export function getOptionById(id: OptionId): StructureOption {
  return OPTIONS.find((o) => o.id === id)!;
}

/**
 * Structural guidance engine.
 *
 * Maps slider positions to concrete business-structure decisions
 * derived from D9 Corporate Structure Options Comparison V1.0.
 *
 * Every string in this file is sourced from the document or directly
 * inferred from Leroy Rutherford's Board Advisory Pack analysis.
 */

// ── Types ────────────────────────────────────────────

export type RiskLevel = "safe" | "caution" | "risk";

export function riskLevel(v: number): RiskLevel {
  if (v >= 0.3) return "safe";
  if (v >= -0.3) return "caution";
  return "risk";
}

export interface CapTableRow {
  label: string;
  holding: string;
  jurisdiction: string;
  highlight?: "good" | "warn";
}

export interface GovernanceRow {
  role: string;
  person: string;
  jurisdiction: string;
}

export interface DimensionGuidance {
  id: string;
  status: RiskLevel;
  headline: string;
  detail: string;
  actions: string[];
}

export interface TaxProjection {
  rate: string;
  rationale: string;
  rows: { mrr: string; tax: string }[];
}

export interface StructuralAnalysis {
  archetype: string;
  archetypeId: string;
  headline: string;
  tax: TaxProjection;
  capTable: CapTableRow[];
  capNote: string;
  governance: GovernanceRow[];
  governanceNote: string;
  dimensions: DimensionGuidance[];
  crossInsights: string[];
  priorityActions: string[];
}

// ── Cap Table (driven by CFC slider) ─────────────────

function buildCapTable(cfc: number): {
  rows: CapTableRow[];
  note: string;
} {
  if (cfc >= 0.2) {
    return {
      rows: [
        {
          label: "Shay Kallie (Heimdall)",
          holding: "12.4%",
          jurisdiction: "SA",
        },
        { label: "Shaun Norton", holding: "12.4%", jurisdiction: "SA" },
        { label: "Ben Smith", holding: "12.4%", jurisdiction: "SA" },
        {
          label: "Storme Grainger",
          holding: "12.4%",
          jurisdiction: "SA",
        },
        {
          label: "Jason Silva",
          holding: "12.4%",
          jurisdiction: "Ireland",
        },
        {
          label: "Carel / RocherMauritia",
          holding: "7.6%",
          jurisdiction: "Mauritius",
        },
        {
          label: "Reserved (future rounds)",
          holding: "30.4%",
          jurisdiction: "\u2014",
          highlight: "good",
        },
      ],
      note: "SA-resident total: 49.6% \u2014 below 50% CFC threshold. 30.4% reserved pool strengthens commercial justification for future investors.",
    };
  }
  return {
    rows: [
      {
        label: "Shay Kallie (Heimdall)",
        holding: "17%",
        jurisdiction: "SA",
      },
      { label: "Shaun Norton", holding: "17%", jurisdiction: "SA" },
      { label: "Ben Smith", holding: "17%", jurisdiction: "SA" },
      {
        label: "Storme Grainger",
        holding: "17%",
        jurisdiction: "SA",
      },
      {
        label: "Jason Silva",
        holding: "17%",
        jurisdiction: "Ireland",
      },
      {
        label: "Carel / RocherMauritia",
        holding: "7.5%",
        jurisdiction: "Mauritius",
      },
      {
        label: "Reserved",
        holding: "7.5%",
        jurisdiction: "\u2014",
      },
    ],
    note: "SA-resident total: 68% (75.5% including Carel) \u2014 above 50%. D9 Ireland is a Controlled Foreign Company. IT10B filing required for every SA founder every year.",
  };
}

// ── Governance (driven by POEM slider) ───────────────

function buildGovernance(poem: number): {
  rows: GovernanceRow[];
  note: string;
} {
  if (poem >= 0.3) {
    return {
      rows: [
        {
          role: "Operational Director",
          person: "Jason Silva",
          jurisdiction: "Ireland",
        },
        {
          role: "Corporate Director",
          person: "Rocher Trust (Carel)",
          jurisdiction: "Mauritius",
        },
        {
          role: "Board Seat (SA)",
          person: "One SA founder (TBD)",
          jurisdiction: "South Africa",
        },
        {
          role: "Shareholders only",
          person: "Remaining 3 SA founders",
          jurisdiction: "SA \u2014 no governance",
        },
      ],
      note: "2:1 non-SA board majority. Key management and commercial decisions documented as originating from Ireland-majority board. Jason\u2019s authority must be genuine, not nominal.",
    };
  }
  if (poem >= -0.1) {
    return {
      rows: [
        {
          role: "Sole Operational Director",
          person: "Jason Silva",
          jurisdiction: "Ireland",
        },
        {
          role: "All SA founders",
          person: "Shareholders with SHA protections",
          jurisdiction: "South Africa",
        },
      ],
      note: "Jason as sole director with formal Irish employment contract. SHA reserved matters narrowed to extraordinary corporate events only. Day-to-day authority explicitly carved out.",
    };
  }
  return {
    rows: [
      {
        role: "All founders",
        person: "Equal participants",
        jurisdiction: "SA / Ireland",
      },
    ],
    note: "SA POEM accepted. No governance optimisation needed \u2014 Ireland retained for operational infrastructure (Stripe, Revolut, Carel\u2019s investment, EU access).",
  };
}

// ── Tax Projection (driven by POEM + CFC) ────────────

function buildTaxProjection(cfc: number, poem: number): TaxProjection {
  if (poem < -0.2) {
    return {
      rate: "27%",
      rationale:
        "SA POEM accepted \u2014 DTA tie-breaker resolves to SA residency at 27% on worldwide income",
      rows: [
        { mrr: "Pre-revenue", tax: "\u20ac0" },
        { mrr: "\u20ac16K MRR", tax: "\u20ac4.3K/mo" },
        { mrr: "\u20ac50K MRR", tax: "\u20ac13.5K/mo" },
        { mrr: "\u20ac100K MRR", tax: "\u20ac27K/mo" },
      ],
    };
  }
  if (cfc >= 0.2 && poem >= 0.2) {
    return {
      rate: "12.5%",
      rationale:
        "Irish rate \u2014 CFC eliminated via shareholding threshold, POEM defensible",
      rows: [
        { mrr: "Pre-revenue", tax: "\u20ac0" },
        { mrr: "\u20ac16K MRR", tax: "\u20ac2K/mo" },
        { mrr: "\u20ac50K MRR", tax: "\u20ac6.25K/mo" },
        { mrr: "\u20ac100K MRR", tax: "\u20ac12.5K/mo" },
      ],
    };
  }
  if (cfc < 0) {
    return {
      rate: "12.5% (fragile)",
      rationale:
        "CFC active \u2014 requires FBE exemption. If FBE fails in a year of material profits, founders face >45% effective tax",
      rows: [
        { mrr: "Pre-revenue", tax: "\u20ac0" },
        { mrr: "\u20ac16K MRR", tax: "\u20ac2K/mo" },
        { mrr: "\u20ac50K MRR", tax: "\u20ac6.25K/mo" },
        { mrr: "FBE fails", tax: ">45% effective" },
      ],
    };
  }
  return {
    rate: "12.5% (at risk)",
    rationale:
      "Irish rate targeted but POEM not fully defensible \u2014 27% if SARS succeeds on POEM argument",
    rows: [
      { mrr: "Pre-revenue", tax: "\u20ac0" },
      { mrr: "\u20ac16K MRR", tax: "\u20ac2K/mo" },
      { mrr: "\u20ac50K MRR", tax: "\u20ac6.25K/mo" },
      { mrr: "\u20ac100K MRR", tax: "\u20ac12.5K/mo" },
    ],
  };
}

// ── Per-Dimension Guidance ───────────────────────────

function gaarGuidance(v: number, cfc: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "GAAR",
      status,
      headline: "Commercial substance established \u2014 GAAR defence strong",
      detail:
        "Founding board resolution documents genuine commercial rationale: investor attraction, governance quality, international expansion. No tax language in corporate documents.",
      actions: [
        "Maintain commercial justification records",
        "Keep Slack history as evidence of normal business deliberation \u2014 do not delete",
      ],
    };
  }
  if (status === "caution") {
    const cfcNote =
      cfc >= 0.2
        ? " The 12.4% restructure needs documented commercial rationale independent of tax benefits."
        : "";
    return {
      id: "GAAR",
      status,
      headline: "GAAR position requires active management",
      detail:
        "Commercial rationale must be documented independently of tax benefits." +
        cfcNote,
      actions: [
        "Draft founding resolution with commercial-first language",
        "Review digital records for tax-motivated language",
        "Lead with: investor pool, governance quality, EU market access",
      ],
    };
  }
  return {
    id: "GAAR",
    status,
    headline:
      "GAAR vulnerability \u2014 restructuring motive traceable",
    detail:
      "SARS can map the timeline. If shareholding reduction was decided specifically to duck the 50% threshold, the arrangement fails the sole-or-main-purpose test. Connected persons rules may allow SARS to argue four founders act in concert as a single block.",
    actions: [
      "Document commercial rationale NOW \u2014 founding resolution must lead with business purpose",
      "Do NOT delete Slack or communication records \u2014 selective deletion is more dangerous than comprehensive documentation",
      "Pre-incorporation timing helps: SARS has weaker case attacking a structure designed before the entity existed",
    ],
  };
}

function sarsGuidance(v: number, cfc: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "SARS",
      status,
      headline: "SARS compliance clean \u2014 low audit trigger",
      detail:
        "No IT10B filing required. Simple filing structure with minimal annual touchpoints. Structure matches how the business actually operates.",
      actions: [
        "Maintain annual compliance calendar",
        "SARB FinSurv reporting still required for cross-border flows",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "SARS",
      status,
      headline: "SARS position manageable \u2014 filings must be current",
      detail:
        "Ensure all required filings are up to date. Cross-border arrangement attracts attention but is manageable with proper documentation.",
      actions: [
        "Confirm all required filings with tax advisor",
        "Prepare FinSurv documentation for EUR \u2192 ZAR transfers",
      ],
    };
  }
  return {
    id: "SARS",
    status,
    headline:
      "SARS audit risk elevated \u2014 multiple filing obligations",
    detail: cfc < 0
      ? "CFC classification triggers IT10B filing for every SA founder every year. CFC income attribution may trigger automated SARS queries."
      : "Cross-border arrangement with current structure attracts heightened SARS scrutiny.",
    actions: [
      "Engage cross-border tax advisor immediately",
      "Prepare transfer pricing benchmarking study (R25\u201350K)",
      "IT10B filing required for every SA founder annually",
    ],
  };
}

function cfcGuidance(v: number, fbe: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "CFC",
      status,
      headline:
        "CFC eliminated \u2014 SA shareholding below 50% threshold",
      detail:
        "Total SA-resident participation: 49.6% (4 founders \u00d7 12.4%). IT10B, FBE analysis, and annual CFC income attribution all fall away. 30.4% reserved pool is genuinely attractive to future investors.",
      actions: [
        "Confirm with Leroy: does the 49.6% structure actually eliminate CFC, or do anti-avoidance provisions (connected persons, acting in concert) allow SARS to look through?",
        "Document 30.4% reserved pool as commercial decision in founding resolution",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "CFC",
      status,
      headline: "CFC status borderline \u2014 threshold management critical",
      detail:
        "Near the 50% boundary. SARS may argue connected persons rules aggregate control. Get written legal opinion before proceeding.",
      actions: [
        "Get Leroy\u2019s written opinion on anti-avoidance provisions",
        "Verify connected persons rules don\u2019t aggregate founder control",
        "Decide: restructure to 12.4% (below 50%) or maintain 17% and establish FBE",
      ],
    };
  }
  const fbeNote =
    fbe < -0.2
      ? " FBE is NOT established \u2014 this is the catastrophic scenario."
      : "";
  return {
    id: "CFC",
    status,
    headline:
      "CFC classification active \u2014 68% SA-resident participation",
    detail:
      "IT10B filing required for every SA founder every year. Without FBE, founders face up to 45% tax on attributed CFC income annually, whether or not cash has been received." +
      fbeNote,
    actions: [
      "Either restructure shareholding to <50% OR establish FBE exemption",
      "FBE requires all 5 criteria: fixed place of business, local employee, equipment, facilities, non-tax primary purpose",
      "If FBE fails in a year of material profits, effective tax rate exceeds 45%",
    ],
  };
}

function peGuidance(v: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "PE",
      status,
      headline:
        "PE risk mitigated \u2014 part-time shield holds during transition",
      detail:
        "SA founders are currently employed at their existing companies and are not yet full-time D9. SARS cannot argue 100% of their time is devoted to D9 Ireland. When founders go full-time, D9 SA absorbs employment as the PE mitigation layer.",
      actions: [
        "Document each SA founder\u2019s part-time status and primary employment",
        "Prepare D9 SA employment contracts for transition to full-time",
        "D9 SA invoices D9 Ireland at cost-plus (8\u201315% markup per interim benchmarking)",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "PE",
      status,
      headline:
        "PE position requires monitoring \u2014 shield holds but time-limited",
      detail:
        "Part-time founder shield is valid during the transitional period. Track founders\u2019 time allocation between current employment and D9 work. D9 SA must be ready to absorb employment when transition happens.",
      actions: [
        "Track SA founders\u2019 time allocation to D9 work",
        "Prepare D9 SA as formal employment vehicle",
        "Transfer pricing documentation needed when invoicing begins",
      ],
    };
  }
  return {
    id: "PE",
    status,
    headline:
      "PE argument present \u2014 SA founders performing substantial services",
    detail:
      "Five SA-resident founders performing services in SA creates a permanent establishment argument regardless of CFC status. SARS can argue D9 Ireland has a taxable presence in SA.",
    actions: [
      "Establish D9 SA as formal employer with cost-plus invoicing",
      "Limit SA founders\u2019 authority to act on behalf of D9 Ireland directly",
      "Transfer pricing benchmarking study required before first intercompany invoice",
    ],
  };
}

function poemGuidance(v: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "POEM",
      status,
      headline:
        "POEM defensible \u2014 2:1 non-SA board with documented authority",
      detail:
        "Board decisions by majority vote: Jason (Ireland) + Rocher Trust (Mauritius) = 2 non-SA directors. Key management and commercial decisions documented as originating from the Ireland-majority board.",
      actions: [
        "CRITICAL: quarterly board minutes documenting Irish-originated decisions",
        "Jason\u2019s Irish employment contract with explicit commercial authority",
        "If evidence shows SA founders still making all decisions via Slack, POEM defence collapses regardless of formal board structure",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "POEM",
      status,
      headline: "POEM defence exists but not at strongest level",
      detail:
        "Consider formalising board structure with non-SA majority. Jason as sole director provides some POEM defence but a 2:1 board is significantly stronger.",
      actions: [
        "Appoint Rocher Trust (Carel) as corporate director to create 2:1 non-SA majority",
        "Begin documenting board decisions with formal minutes",
        "Formalise Jason\u2019s operational authority in writing",
      ],
    };
  }
  return {
    id: "POEM",
    status,
    headline:
      "POEM likely in SA \u2014 five SA-based people driving decisions",
    detail:
      "If SA founders drive strategy, company is deemed SA-resident under DTA tie-breaker at 27%. The honest reality: the tax differential on zero revenue is zero. The team is optimising for a tax position on income that does not exist yet.",
    actions: [
      "Either restructure governance for Irish POEM or accept SA POEM and file at 27%",
      "Accepting SA POEM eliminates CFC, FBE, BPR, IT10B compliance entirely",
      "When sustained revenue justifies it (\u20ac50K+ MRR), revisit with genuine Irish substance",
    ],
  };
}

function fbeGuidance(v: number, cfc: number): DimensionGuidance {
  const status = riskLevel(v);
  if (cfc >= 0.2) {
    // CFC is eliminated, FBE is irrelevant
    return {
      id: "FBE",
      status: "safe",
      headline:
        "FBE not required \u2014 CFC eliminated via shareholding threshold",
      detail:
        "When CFC doesn\u2019t apply, FBE analysis falls away entirely. No need to establish the 5-criteria test: fixed place, employee, equipment, facilities, non-tax purpose.",
      actions: [],
    };
  }
  if (status === "safe") {
    return {
      id: "FBE",
      status,
      headline:
        "FBE established \u2014 5 criteria met for Irish substance",
      detail:
        "Fixed place of business, local employee, equipment, facilities, and non-tax primary purpose all established. Coronation CC precedent supports the outsourcing model.",
      actions: [
        "Maintain FBE evidence file \u2014 must be defensible in annual audit",
        "Annual review of all 5 criteria",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "FBE",
      status,
      headline: "FBE partially established \u2014 gaps remain",
      detail:
        "Some but not all 5 FBE criteria are met. If CFC is active, FBE is the load-bearing element. Gaps must be closed before material profits arise.",
      actions: [
        "Audit which of the 5 FBE criteria are met",
        "Close gaps: office space, Jason\u2019s employment, local equipment",
        "FBE must be defensible BEFORE material profits arise",
      ],
    };
  }
  return {
    id: "FBE",
    status,
    headline:
      "FBE not established \u2014 catastrophic if CFC applies",
    detail:
      "Without FBE, founders face up to 45% effective tax on attributed CFC income. This is worse than the SA baseline of 27%. FBE requires: fixed place of business in Ireland, local employee, equipment, facilities, non-tax primary purpose.",
    actions: [
      "URGENT: build genuine Irish substance \u2014 office space, Jason\u2019s employment, local equipment",
      "FBE must be established BEFORE material profits arise",
      "Consider restructuring shareholding to <50% instead (eliminates FBE requirement entirely)",
    ],
  };
}

function bprGuidance(v: number, poem: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "BPR",
      status,
      headline:
        "BPR pathway strong \u2014 apply when revenue justifies it",
      detail:
        poem >= 0.3
          ? "Governance structure (2:1 board) produces the most defensible BPR evidence file. Apply when sustained \u20ac50K+ MRR. BPR application takes 90+ days."
          : "BPR intent is sound but the evidence file would be stronger with formalised governance. Apply when revenue and substance are both in place.",
      actions: [
        "Apply when sustained revenue (\u20ac50K+ MRR) and genuine Irish substance exist",
        "BPR application to SARS takes 90+ days \u2014 plan timing carefully",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "BPR",
      status,
      headline:
        "BPR optional \u2014 focus on product and revenue first",
      detail:
        "BPR strengthens position but is not urgent for a pre-revenue company. Structure follows revenue.",
      actions: [
        "Focus energy on product and revenue, not structural gymnastics",
        "Revisit BPR when revenue justifies the advisory cost",
      ],
    };
  }
  return {
    id: "BPR",
    status,
    headline:
      "BPR not viable in current form \u2014 insufficient substance",
    detail:
      "Application would likely fail without genuine Irish operations. BPR requires demonstrable non-tax commercial reasons for the Irish entity.",
    actions: [
      "Do not apply for BPR until genuine substance exists",
      "Launch d-one.build \u2014 focus on product and revenue",
    ],
  };
}

function irevGuidance(v: number, poem: number): DimensionGuidance {
  const status = riskLevel(v);
  if (status === "safe") {
    return {
      id: "IRevenue",
      status,
      headline:
        "Irish Revenue substance requirements met",
      detail:
        poem >= 0.3
          ? "2:1 board majority demonstrates genuine Irish management. Jason\u2019s employment contract and operational authority documented. Quarterly board minutes evidence genuine decision-making."
          : "Irish substance requirements are being met. Maintain documentation of Irish-based operations and decision-making.",
      actions: [
        "Maintain quarterly board minutes",
        "Annual Irish CT1 filing required",
      ],
    };
  }
  if (status === "caution") {
    return {
      id: "IRevenue",
      status,
      headline:
        "Irish Revenue position needs strengthening",
      detail:
        "Irish Revenue requires genuine management presence. Consider formalising Irish operations with employment contract, documented authority, and regular board meetings.",
      actions: [
        "Ensure Jason has formal Irish employment contract",
        "Document operational authority in Ireland",
        "Schedule quarterly board meetings with minutes",
      ],
    };
  }
  return {
    id: "IRevenue",
    status,
    headline:
      "Irish Revenue may challenge genuine Irish management",
    detail:
      "Without substance, Ireland is a brass-plate company. Irish Revenue could challenge the POEM claim, creating a dual-residency dispute. The CT1 filing is still required for an Irish-incorporated company.",
    actions: [
      "Establish genuine Irish operational presence",
      "Meet minimum substance: directors, office, payroll",
      "Irish Revenue challenge is unlikely but not impossible",
    ],
  };
}

// ── Cross-Dimensional Insights ───────────────────────

function buildCrossInsights(values: number[]): string[] {
  const [gaar, , cfc, pe, poem, fbe] = values;
  const insights: string[] = [];

  // CFC safe + GAAR risk = restructuring created exposure
  if (cfc >= 0.2 && gaar < -0.1) {
    insights.push(
      "The 12.4% shareholding restructure eliminated CFC but created GAAR exposure. Mitigate: the pre-incorporation timing helps (SARS has weaker case attacking a structure designed before the entity existed), and the 30.4% reserved pool provides genuine commercial justification."
    );
  }

  // CFC risk + FBE risk = catastrophic
  if (cfc < -0.2 && fbe < -0.2) {
    insights.push(
      "CRITICAL: CFC is active AND FBE is not established. Founders face >45% effective tax on attributed CFC income. Either restructure shareholding below 50% or establish FBE urgently. This combination cannot persist."
    );
  }

  // POEM safe + PE exposed
  if (poem >= 0.3 && pe < 0.1) {
    insights.push(
      "POEM is defensible through board governance, but PE risk from SA-based founders persists. The part-time shield holds during transition \u2014 when founders go full-time, D9 SA must absorb employment as the PE mitigation layer."
    );
  }

  // POEM risk = major simplification
  if (poem < -0.3) {
    insights.push(
      "With POEM accepted as SA, CFC/FBE/BPR/IT10B compliance falls away entirely. The tax differential on zero revenue is zero. Focus on product \u2014 revisit structure when revenue justifies genuine Irish substance."
    );
  }

  // Strong position
  if (cfc >= 0.3 && poem >= 0.3 && gaar >= 0) {
    insights.push(
      "Strongest structural position: CFC eliminated, POEM defensible, GAAR managed. Focus energy on product and revenue. Apply for BPR when sustained \u20ac50K+ MRR justifies it."
    );
  }

  // Many risks
  if (values.filter((v) => v < -0.3).length >= 4) {
    insights.push(
      "Multiple critical exposures open. Leroy\u2019s assessment: \u201cThe structure would not survive a SARS audit in its current form.\u201d Consider accepting SA POEM (Option B) as an interim position."
    );
  }

  return insights;
}

// ── Priority Actions ────────────────────────────────

function buildPriorityActions(values: number[]): string[] {
  const [gaar, , cfc, , poem, fbe] = values;
  const actions: string[] = [];
  const isNeutral = values.every((v) => Math.abs(v) < 0.25);

  // Neutral state: guide the user toward decisions
  if (isNeutral) {
    actions.push(
      "Decide CFC position: restructure shareholding to 12.4% each (below 50% threshold) or maintain 17% and establish FBE"
    );
    actions.push(
      "Decide POEM position: establish 2:1 non-SA board majority (Option D), accept SA POEM at 27% (Option B), or maintain Jason as sole director (Option A)"
    );
    actions.push(
      "Get Leroy\u2019s deep dive on the 7 open questions before finalising structure"
    );
    actions.push(
      "Launch d-one.build \u2014 focus energy on product and revenue, not structural gymnastics"
    );
    return actions;
  }

  // Most urgent first
  if (cfc < -0.2 && fbe < -0.2) {
    actions.push(
      "URGENT: Resolve CFC/FBE exposure \u2014 restructure shareholding below 50% or establish FBE"
    );
  }

  if (cfc >= 0.2) {
    actions.push(
      "Leroy confirms 49.6% CFC elimination is watertight (connected persons rules, acting in concert)"
    );
  }

  if (gaar < 0.1 && cfc >= 0.2) {
    actions.push(
      "Draft founding board resolution with commercial rationale \u2014 investor attraction, governance, expansion. No tax language."
    );
  }

  if (poem >= 0.2) {
    actions.push(
      "Incorporate D9 Ireland with governance structure \u2014 issue shares at restructured percentages"
    );
    actions.push(
      "Execute Jason\u2019s Irish employment contract with documented operational authority"
    );
  }

  if (poem < -0.2) {
    actions.push(
      "Register D9 Ireland as SA taxpayer \u2014 file SA corporate tax returns at 27%"
    );
  }

  if (cfc >= 0.2 && poem >= 0.2) {
    actions.push(
      "Close seed round with Carel \u2014 Class A/B shares in D9 Ireland, mirrored in D9 SA"
    );
  }

  actions.push(
    "Launch d-one.build \u2014 focus energy on product and revenue"
  );

  if (cfc >= 0.2 && poem >= 0.2) {
    actions.push(
      "When sustained revenue (\u20ac50K+ MRR): build genuine Irish substance, apply for BPR"
    );
  }

  return actions.slice(0, 7);
}

// ── Archetype Detection ─────────────────────────────

function detectArchetype(values: number[]): {
  label: string;
  id: string;
} {
  const [, , cfc, , poem] = values;

  if (poem < -0.3) return { label: "Option B \u2014 Accept SA POEM", id: "B" };
  if (cfc >= 0.3 && poem >= 0.3)
    return {
      label: "Option D \u2014 Governance + 12.4% Restructure",
      id: "D",
    };
  if (cfc >= 0.3 && poem < 0.3)
    return { label: "Option C \u2014 12.4% CFC Fix", id: "C" };
  if (cfc < 0 && poem >= 0)
    return {
      label: "Option A \u2014 Irish POEM with Dual Entity",
      id: "A",
    };
  return { label: "Hybrid \u2014 mixed structural position", id: "X" };
}

// ── Main Analysis Function ──────────────────────────

export function analyzeStructure(values: number[]): StructuralAnalysis {
  const [gaar, , cfc, , poem, fbe] = values;

  const archetype = detectArchetype(values);
  const cap = buildCapTable(cfc);
  const gov = buildGovernance(poem);
  const tax = buildTaxProjection(cfc, poem);

  // Build dimension guidance
  const dimensions: DimensionGuidance[] = [
    cfcGuidance(cfc, fbe),
    poemGuidance(poem),
    gaarGuidance(gaar, cfc),
    peGuidance(values[3]),
    fbeGuidance(fbe, cfc),
    sarsGuidance(values[1], cfc),
    bprGuidance(values[6], poem),
    irevGuidance(values[7], poem),
  ];

  // Sort: risk first, then caution, then safe
  const order: Record<RiskLevel, number> = {
    risk: 0,
    caution: 1,
    safe: 2,
  };
  dimensions.sort((a, b) => order[a.status] - order[b.status]);

  // Headline
  let headline: string;
  if (archetype.id === "D") {
    headline =
      "CFC eliminated via shareholding, POEM defensible through 2:1 non-SA board. Best risk-adjusted position.";
  } else if (archetype.id === "B") {
    headline =
      "SA POEM accepted \u2014 simplest compliance, 27% corporate tax. Zero cost on zero revenue.";
  } else if (archetype.id === "C") {
    headline =
      "CFC eliminated via shareholding but POEM and PE remain exposed. Option D without its best feature.";
  } else if (archetype.id === "A") {
    headline =
      "Irish POEM with dual entity \u2014 maximum ambition, maximum risk. FBE is the load-bearing element.";
  } else {
    headline =
      "Mixed structural position \u2014 adjust sliders to align with a defensible configuration.";
  }

  return {
    archetype: archetype.label,
    archetypeId: archetype.id,
    headline,
    tax,
    capTable: cap.rows,
    capNote: cap.note,
    governance: gov.rows,
    governanceNote: gov.note,
    dimensions,
    crossInsights: buildCrossInsights(values),
    priorityActions: buildPriorityActions(values),
  };
}

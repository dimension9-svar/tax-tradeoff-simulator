/**
 * Full scenario engine.
 *
 * Generates a complete structural report — as detailed as the original
 * D9 Corporate Structure Options Comparison V1.0 — that rewrites
 * dynamically as slider positions change.
 *
 * Every fact, number, threshold, and legal reference is sourced
 * directly from the document or Leroy Rutherford's Board Advisory Pack.
 */

// ── Types ────────────────────────────────────────────

export interface ScenarioBlock {
  /** prose = paragraph, data = formatted data/table, warn = red callout,
   *  question = open question for Leroy, action = action item */
  type: "prose" | "data" | "warn" | "question" | "action";
  text: string;
}

export interface ReportSection {
  id: string;
  title: string;
  blocks: ScenarioBlock[];
}

// ── Helpers ──────────────────────────────────────────

const p = (text: string): ScenarioBlock => ({ type: "prose", text });
const d = (text: string): ScenarioBlock => ({ type: "data", text });
const w = (text: string): ScenarioBlock => ({ type: "warn", text });
const q = (text: string): ScenarioBlock => ({ type: "question", text });
const a = (text: string): ScenarioBlock => ({ type: "action", text });

// Slider indices: 0=GAAR 1=SARS 2=CFC 3=PE 4=POEM 5=FBE 6=BPR 7=IRev

// ── Section 1: Entity Architecture ───────────────────

function entityArchitecture(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    // Option B: SA POEM accepted
    blocks.push(p(
      "D9 Ireland is incorporated in Ireland but the team accepts that its Place of Effective Management is in South Africa. Under the Ireland\u2013SA Double Taxation Agreement tie-breaker (Article 4), D9 Ireland is treated as SA tax-resident for SA tax purposes. Corporate tax applies at 27% on worldwide income."
    ));
    blocks.push(p(
      "Ireland is retained purely for its operational infrastructure: Stripe payment processing, Revolut EUR banking, Carel\u2019s Mauritius-based investment vehicle (RocherMauritia), and future EU market access. Ireland is not the tax home \u2014 it is the payment-processing and banking jurisdiction."
    ));
    blocks.push(p(
      "D9 SA continues to exist as a thin employment vehicle for SA-based founders. Only domestic SA revenue flows through D9 SA. International revenue (Stripe, SaaS subscriptions, international contracts) flows through D9 Ireland. IP is shared between both entities. D-One remains ringfenced in Twixel with a perpetual licence."
    ));
    blocks.push(p(
      "The structure matches how the business actually operates \u2014 SA-resident founders making decisions from SA. This eliminates the need for manufactured substance, performative evidence, or defensive documentation. There is no gap between the formal structure and operational reality."
    ));
  } else if (cfc >= 0.2 && poem >= 0.3) {
    // Option D: Governance + 12.4%
    blocks.push(p(
      "D9 Ireland is the parent holding company, incorporated in Ireland. It holds all customer contracts, processes revenue through Stripe, maintains the Revolut EUR account, and receives Carel\u2019s seed investment via RocherMauritia. D9 Ireland is the primary commercial entity \u2014 all new IP created post-incorporation is owned by D9 Ireland."
    ));
    blocks.push(p(
      "D9 Ireland\u2019s board has three seats: Jason Silva (Operational Director, Ireland-resident), the Rocher Trust acting through Carel (Corporate Director, Mauritius), and one SA founder to be determined. Ireland-aligned directors hold a 2:1 majority. The four remaining SA co-founders are shareholders with no governance authority over D9 Ireland."
    ));
    blocks.push(p(
      "D9 SA is retained as a limited-purpose employment vehicle. It employs the four SA-based founders and invoices D9 Ireland monthly for their services at cost-plus. D9 SA does not hold customer contracts, IP, or significant commercial authority. Only domestic SA revenue (if any) flows through D9 SA."
    ));
    blocks.push(p(
      "The two-entity structure serves three purposes: (1) PE mitigation \u2014 SA founders are employees of D9 SA, not D9 Ireland, limiting D9 Ireland\u2019s permanent establishment exposure in SA; (2) Transfer pricing \u2014 the intercompany services agreement provides an arm\u2019s-length basis for remuneration; (3) Operational reality \u2014 SA-based employment law, UIF, PAYE, and benefits administration are handled domestically."
    ));
  } else if (cfc >= 0.2) {
    // Option C: CFC fix without governance
    blocks.push(p(
      "D9 Ireland is the parent holding company, incorporated in Ireland. Shareholding has been restructured to place SA-resident participation below the 50% CFC threshold, but governance architecture has not been optimised for POEM defence."
    ));
    blocks.push(p(
      "D9 Ireland holds all customer contracts, Stripe revenue, and new IP. Jason Silva serves as the operational point of contact in Ireland, but the board structure does not yet include a non-SA majority capable of defending Irish POEM against SARS challenge."
    ));
    blocks.push(p(
      "D9 SA question remains open. The case for or against dissolving D9 SA is unchanged by the shareholding restructure. If retained, D9 SA functions as a thin employment vehicle for SA founders."
    ));
    blocks.push(w(
      "CFC is eliminated by the shareholding restructure, but POEM remains exposed. Five SA-based people running the company still gives SARS a strong POEM argument. This is Option D without its best feature."
    ));
  } else {
    // Option A: Irish POEM with dual entity, CFC active
    blocks.push(p(
      "D9 Ireland is the parent holding company, incorporated in Ireland with Jason Silva as sole operational director. D9 Ireland holds all customer contracts, Stripe revenue, new IP, and commercial decision-making authority via Jason. The structure aims to establish and defend an Irish POEM for D9 Ireland, enabling 12.5% corporate tax on trading income."
    ));
    blocks.push(p(
      "D9 SA operates as a limited-risk contract technical service provider, employing the four SA-based founders. D9 SA invoices D9 Ireland monthly at cost-plus (8\u201315% markup per Leroy\u2019s interim benchmarking). D9 SA is a cost centre with no independent revenue, no IP, and no customer relationships."
    ));
    blocks.push(p(
      "This dual-entity structure is the most complex to maintain. It requires active management of FBE substance, POEM evidence, CFC compliance, transfer pricing documentation, and intercompany governance boundaries. Leroy\u2019s assessment: \u201CThe structure is viable in concept but does not currently function as presented. POEM risk from SHA constraints and absent FBE substance mean the structure would not survive a SARS audit in its current form.\u201D"
    ));
  }

  return { id: "entity", title: "Entity Architecture", blocks };
}

// ── Section 2: Shareholding & CFC Position ───────────

function shareholdingSection(v: number[]): ReportSection {
  const gaar = v[0], cfc = v[2];
  const blocks: ScenarioBlock[] = [];

  if (cfc >= 0.2) {
    blocks.push(d(
      "Shay Kallie (Heimdall) \u2014 12.4% (SA)  |  Shaun Norton \u2014 12.4% (SA)  |  Ben Smith \u2014 12.4% (SA)  |  Storme Grainger \u2014 12.4% (SA)  |  Jason Silva \u2014 12.4% (Ireland)  |  Carel / RocherMauritia \u2014 7.6% (Mauritius Trust)  |  Reserved for future rounds \u2014 30.4%"
    ));
    blocks.push(p(
      "SA-resident total: 49.6% (4 founders \u00d7 12.4%) \u2014 below the 50% CFC threshold under s9D of the Income Tax Act. Jason (12.4%) + Carel (7.6%) = 20% Ireland/non-SA aligned. D9 Ireland ceases to be a Controlled Foreign Company."
    ));
    blocks.push(p(
      "Each SA founder reduced from 17% to 12.4% \u2014 a 4.6% reduction per founder, 18.4% total. Combined with Carel\u2019s extra 0.1%, this creates a 30.4% reserved pool for future investment rounds. At the seed-round implied valuation (~R57M pre-money), each founder gives up approximately R2.6M in notional value."
    ));
    blocks.push(p(
      "The 30.4% reserved pool is genuinely attractive to future investors (Irish VC ecosystem, Jason\u2019s contacts) and provides the core commercial justification for the restructuring. The founding board resolution must document this rationale explicitly: the restructuring is driven by governance quality, investor attraction, and international expansion \u2014 not by the CFC threshold."
    ));
    blocks.push(p(
      "With CFC eliminated: IT10B filing, FBE analysis, and annual CFC income attribution all fall away. There is no annual tax return obligation on SA founders for CFC attributed income. This removes the catastrophic downside scenario where founders face >45% effective tax on income not yet received in cash."
    ));
    blocks.push(p(
      "Founders can purchase equity back towards 15% each when D9 has revenue, using company loans. However, this buyback mechanism introduces its own complications under s8C (restricted equity instruments), fringe benefit tax implications, and arm\u2019s-length pricing requirements. Leroy should advise on the buyback mechanism before it becomes relevant."
    ));

    if (gaar < 0) {
      blocks.push(w(
        "GAAR exposure on the restructuring: SARS can map the timeline from the team\u2019s discussion (Slack history, documents, meeting minutes) to the shareholding decision. If evidence exists that the primary motive was to duck the 50% threshold, the arrangement fails the sole-or-main-purpose test. Connected persons rules (s1 of the Income Tax Act) may also allow SARS to argue the four SA founders act in concert as a single control block, effectively aggregating their holdings above 50%."
      ));
      blocks.push(p(
        "The pre-incorporation timing is the key defence. D9 Ireland has not yet been incorporated. SARS has a weaker case attacking a structure that was designed before the entity existed than one that was restructured after the fact. The commercial justification (30.4% for future investors) must be documented in a founding board resolution before incorporation."
      ));
      blocks.push(w(
        "Jason\u2019s observation about deleting the D9 Slack to remove traceable chat history is legally sensitive. Destruction of records can be seen as consciousness of guilt. The better approach: ensure the founding resolution documents the genuine commercial rationale, and let the informal discussion history remain as evidence of normal business deliberation. Selective deletion is more dangerous than comprehensive documentation."
      ));
    }

    blocks.push(q(
      "Open question for Leroy: Does the 49.6% structure actually eliminate CFC classification, or are there anti-avoidance provisions (connected persons rules, acting in concert) that allow SARS to look through to beneficial control?"
    ));
    blocks.push(q(
      "Open question for Leroy: Does the pre-incorporation timing of the 12.4% restructuring genuinely protect against GAAR, or does SARS apply a substance-over-form analysis regardless of when the decision was made?"
    ));
  } else {
    blocks.push(d(
      "Shay Kallie (Heimdall) \u2014 17% (SA)  |  Shaun Norton \u2014 17% (SA)  |  Ben Smith \u2014 17% (SA)  |  Storme Grainger \u2014 17% (SA)  |  Jason Silva \u2014 17% (Ireland)  |  Carel / RocherMauritia \u2014 7.5% (Mauritius Trust)  |  Reserved \u2014 7.5%"
    ));
    blocks.push(p(
      "SA-resident total: 68% (4 founders \u00d7 17%). Including Carel (7.5%, Mauritius Trust with SA connections), effective SA-aligned participation may reach 75.5%. CFC classification is a mathematical certainty under s9D of the Income Tax Act."
    ));
    blocks.push(p(
      "Every SA founder must file an IT10B annually declaring their participation in the CFC. If D9 Ireland earns profits that are not exempt via the Foreign Business Establishment (FBE) exemption, each founder\u2019s proportional share of CFC income is deemed received by them and taxed at their marginal rate \u2014 up to 45%. This applies whether or not cash has actually been distributed."
    ));
    blocks.push(w(
      "If FBE fails in a year of material D9 Ireland profits, founders face >45% effective tax \u2014 worse than the SA baseline of 27%. This is the catastrophic downside scenario. The probability of it materialising is uncomfortably high at this stage because FBE is not yet established."
    ));
  }

  return { id: "shareholding", title: "Shareholding & CFC Position", blocks };
}

// ── Section 3: Governance & POEM Defence ─────────────

function governanceSection(v: number[]): ReportSection {
  const poem = v[4];
  const blocks: ScenarioBlock[] = [];

  if (poem >= 0.3) {
    blocks.push(d(
      "Operational Director: Jason Silva (Ireland)  |  Corporate Director: The Rocher Trust / Carel (Mauritius)  |  Board Seat (SA): One SA founder, TBD (South Africa)  |  Shareholders only: Remaining 3 SA founders (SA \u2014 no governance role)"
    ));
    blocks.push(p(
      "D9 Ireland\u2019s board has three seats. Ireland-aligned directors (Jason + Rocher Trust) hold a 2:1 majority. Board decisions are made by majority vote. Two of three directors are non-SA. Key management and commercial decisions are documented as originating from the Ireland-majority board."
    ));
    blocks.push(p(
      "Jason must have a formal Irish employment contract, documented operational authority, and manage banking/treasury functions independently. His commercial authority must be genuine, not nominal. If evidence shows SA founders are still making all meaningful decisions via Slack or other channels, the POEM defence collapses regardless of formal board structure."
    ));
    blocks.push(p(
      "SHA reserved matters are narrowed to extraordinary corporate events only (sale of company, winding up, issuance of new share classes, amendment to constitution). Jason\u2019s day-to-day operational and commercial authority is explicitly carved out of the SHA. This is critical \u2014 if the SHA constrains Jason\u2019s authority, SARS argues that decisions are being made in SA. The proposal\u2019s own SHA language was flagged by Leroy as constructing this argument on SARS\u2019s behalf."
    ));
    blocks.push(p(
      "Three SA co-founders accept reduced governance rights in D9 Ireland in exchange for structural defensibility. They are equity holders only \u2014 no board seat, no vote on operational decisions. This requires trust in the governance arrangement and in Jason\u2019s and Carel\u2019s judgement. The governance trade-off is the cost of Option D."
    ));
    blocks.push(a(
      "Quarterly board minutes are CRITICAL. They must document: (1) decisions made by the Ireland-majority board, (2) Jason\u2019s exercise of operational authority, (3) that key commercial and management decisions originate in Ireland, not SA."
    ));
  } else if (poem >= -0.1) {
    blocks.push(d(
      "Sole Operational Director: Jason Silva (Ireland)  |  All SA founders: Shareholders with SHA protections"
    ));
    blocks.push(p(
      "Jason serves as sole operational director of D9 Ireland with a formal Irish employment contract. SHA reserved matters are narrowed to extraordinary corporate events only. Day-to-day authority is explicitly carved out."
    ));
    blocks.push(p(
      "This provides some POEM defence \u2014 the sole director is Ireland-resident \u2014 but it is weaker than a 2:1 board majority. SARS can still argue that the four SA founders, as majority shareholders with SHA protections, effectively control decision-making. The SHA language is the vulnerability: if it constrains Jason\u2019s authority too narrowly, SARS uses the SHA itself as evidence that decisions are made in SA."
    ));
    blocks.push(w(
      "POEM defence at this level is fragile. The gap between \u201CJason is the sole director\u201D and \u201CJason actually makes the decisions\u201D is filled with Slack messages, WhatsApp groups, and operational reality. Consider strengthening to a 2:1 board by appointing Rocher Trust (Carel) as corporate director."
    ));
  } else {
    blocks.push(p(
      "SA POEM is accepted. No governance optimisation is needed for D9 Ireland\u2019s tax position because the company is not claiming Irish tax residency for SA purposes."
    ));
    blocks.push(p(
      "All founders participate equally in decision-making. Ireland is retained for operational infrastructure only. The authority question \u2014 who makes decisions from where \u2014 is moot. There is no need for quarterly board minutes documenting Irish-originated decisions, no need to constrain SHA reserved matters, and no need to carve out Jason\u2019s day-to-day authority."
    ));
    blocks.push(p(
      "When D9 reaches sustained revenue (\u20ac50K+ MRR), the team revisits with genuine Irish substance and applies for a BPR from a defensible position. Shifting POEM to Ireland later requires building genuine substance, which is harder and more expensive to do after the fact than to design for from the start."
    ));
  }

  return { id: "governance", title: "Governance & POEM Defence", blocks };
}

// ── Section 4: Revenue Flow & Contracts ──────────────

function revenueFlowSection(v: number[]): ReportSection {
  const poem = v[4];
  const blocks: ScenarioBlock[] = [];

  blocks.push(p(
    "All four options share common non-negotiable elements: D9 Ireland is incorporated in Ireland, holds the Revolut EUR account, processes revenue through Stripe, and receives Carel\u2019s seed investment via RocherMauritia."
  ));

  if (poem < -0.2) {
    blocks.push(p(
      "International revenue (Stripe, SaaS subscriptions, international contracts) flows through D9 Ireland. Domestic SA revenue flows through D9 SA. Because D9 Ireland is treated as SA tax-resident under the DTA, all worldwide income is subject to SA corporate tax at 27%."
    ));
    blocks.push(p(
      "Ireland still requires a CT1 or equivalent filing for an Irish-incorporated company, but the DTA should prevent double taxation. The mechanics of this \u2014 specifically how to claim DTA relief on the Irish side for tax paid in SA \u2014 should be confirmed with Leroy."
    ));
  } else {
    blocks.push(p(
      "D9 Ireland holds all customer contracts. Revenue from Stripe and international SaaS subscriptions flows into D9 Ireland\u2019s Revolut EUR account. D9 Ireland is the contracting party for all customer relationships. D9 SA has no direct customer revenue \u2014 it is an internal service provider only."
    ));
    blocks.push(p(
      "Carel\u2019s seed investment enters via RocherMauritia into D9 Ireland as Class A/B preference shares. Carel holds 7.5\u20137.6% in D9 Ireland and receives mirrored shares in D9 SA at R0 par value. This mirroring ensures Carel has standing in both entities."
    ));
  }

  return { id: "revenue", title: "Revenue Flow & Contracts", blocks };
}

// ── Section 5: Employment & Permanent Establishment ──

function employmentSection(v: number[]): ReportSection {
  const pe = v[3], poem = v[4], cfc = v[2];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    blocks.push(p(
      "With SA POEM accepted, PE analysis is inapplicable. D9 Ireland is already SA tax-resident, so the question of whether it has a permanent establishment in SA is moot \u2014 it is taxed on worldwide income in SA regardless."
    ));
    blocks.push(p(
      "SA founders can be employed directly by D9 Ireland or by D9 SA. The choice is operational, not tax-driven. D9 SA as a thin employment vehicle is simpler for SA labour law compliance (UIF, PAYE, SDL, employment contracts under the LRA)."
    ));
    blocks.push(q(
      "Open question for Leroy: If SA founders are employed directly by D9 Ireland (no D9 SA), does the DTA actually prevent double taxation on their salaries, or does it create a different set of filings with no net benefit?"
    ));
  } else if (pe >= 0.2) {
    blocks.push(p(
      "SA founders are currently employed at their existing companies and are not yet full-time D9. This is the part-time founder shield: SARS cannot argue that 100% of their time is devoted to D9 Ireland. The shield holds only during the transitional period \u2014 when founders go full-time, it expires."
    ));
    blocks.push(p(
      "When SA founders transition to full-time, D9 SA absorbs the employment relationship. SA founders become employees of D9 SA (not D9 Ireland). D9 SA invoices D9 Ireland monthly at cost-plus (8\u201315% markup per Leroy\u2019s interim benchmarking). This is the PE mitigation layer \u2014 D9 Ireland\u2019s activities in SA are conducted through a separate legal entity (D9 SA), which bears the employment risk and obligations."
    ));
    blocks.push(p(
      "The cost-plus markup must be arm\u2019s-length. Leroy\u2019s interim benchmarking suggests 8\u201315%. A formal transfer pricing benchmarking study (R25\u201350K) is required before the first intercompany invoice, with annual review. The markup must be comparable to what an independent service provider would charge for similar technical services."
    ));
    blocks.push(a(
      "Document each SA founder\u2019s current primary employment and part-time status. When transition occurs: execute D9 SA employment contracts, establish intercompany services agreement, complete transfer pricing benchmarking study."
    ));
  } else {
    blocks.push(p(
      "Five SA-resident employees/founders performing services in SA creates a permanent establishment argument under Article 5 of the Ireland-SA DTA, regardless of CFC status. If SARS argues D9 Ireland has a PE in SA through the founders\u2019 activities, profits attributable to the PE would be taxable in SA."
    ));
    blocks.push(p(
      "D9 SA as a formal employer is the primary PE mitigation strategy. If D9 SA employs the SA founders and invoices D9 Ireland at arm\u2019s-length, the SA activities are conducted through a separate entity rather than directly by D9 Ireland. This does not eliminate PE risk entirely but significantly reduces SARS\u2019s argument."
    ));
    if (cfc >= 0.2) {
      blocks.push(w(
        "PE risk is deferred, not eliminated. The current part-time founder status provides temporary cover. When founders go full-time, SARS will scrutinise the arrangement. D9 SA must be ready to absorb employment before that transition happens."
      ));
    }
    blocks.push(q(
      "Open question for Leroy: Does dissolving D9 SA strengthen or weaken the POEM and FBE position? Ireland carries employment costs (stronger FBE argument), but five SA-based employees strengthen SARS\u2019s PE argument."
    ));
    blocks.push(q(
      "Open question for Leroy: What is the minimum viable D9 SA structure if it is retained? Can transfer pricing and arm\u2019s-length reporting be kept to a manageable annual cost?"
    ));
  }

  return { id: "employment", title: "Employment & Permanent Establishment", blocks };
}

// ── Section 6: IP Strategy ───────────────────────────

function ipSection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    blocks.push(p(
      "IP is shared between both entities. D-One remains ringfenced in Twixel with a perpetual licence. Because D9 Ireland is SA tax-resident, IP location is less critical \u2014 all income is taxed in SA regardless. No FinSurv approval or CGT event is triggered by the IP arrangement."
    ));
  } else if (cfc >= 0.2) {
    blocks.push(p(
      "All new IP created post-incorporation is owned by D9 Ireland. Pre-existing IP (developed before incorporation) requires a decision between two paths:"
    ));
    blocks.push(p(
      "Path A \u2014 IP Assignment: Transfer pre-existing IP from founders/D9 SA to D9 Ireland. This triggers FinSurv (SARB) approval for cross-border IP transfer and Capital Gains Tax on the transfer value. The IP must be independently valued. FinSurv approval is not guaranteed and the process can take months."
    ));
    blocks.push(p(
      "Path B \u2014 IP Licensing: D9 SA (or founders) retain ownership of pre-existing IP and license it to D9 Ireland. This triggers a 10% royalty withholding tax under the Ireland-SA DTA on royalty payments from Ireland to SA. It also requires a dual transfer pricing analysis: one for the royalty rate (must be arm\u2019s-length) and one for the intercompany services fee."
    ));
    blocks.push(p(
      "D-One remains ringfenced in Twixel with a perpetual licence to D9 Ireland. This separation protects D-One IP from D9 corporate risk and simplifies the IP landscape."
    ));
  } else {
    blocks.push(p(
      "IP strategy is complicated by the dual-entity structure and CFC classification. IP assignment (Path A) triggers FinSurv approval and CGT. IP licensing (Path B) triggers 10% royalty withholding and requires dual TP analysis. Both paths add compliance cost and complexity."
    ));
    blocks.push(p(
      "D-One remains ringfenced in Twixel. New IP created by SA founders while employed by D9 SA is a grey area \u2014 employment contracts must clearly assign IP to D9 Ireland via D9 SA to maintain the intended IP ownership structure."
    ));
  }

  return { id: "ip", title: "IP Ownership & Licensing", blocks };
}

// ── Section 7: Transfer Pricing ──────────────────────

function transferPricingSection(v: number[]): ReportSection {
  const cfc = v[2], pe = v[3], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    blocks.push(p(
      "With SA POEM accepted, transfer pricing between D9 Ireland and D9 SA is significantly simplified. Both entities are effectively SA tax-resident, reducing the risk that SARS challenges intercompany pricing. A formal TP study is likely moot at this stage but may become relevant if the structure is later migrated to Irish POEM."
    ));
  } else if (cfc >= 0.2 || pe < 0) {
    blocks.push(p(
      "Transfer pricing requires a formal benchmarking study (R25\u201350K) before the first intercompany invoice, with annual review. The study must establish that the cost-plus markup charged by D9 SA to D9 Ireland is arm\u2019s-length \u2014 comparable to what an independent service provider would charge for similar technical development services."
    ));
    blocks.push(p(
      "Leroy\u2019s interim benchmarking suggests 8\u201315% markup on direct costs. The markup range depends on the characterisation of D9 SA\u2019s services: routine contract development services (lower end) vs. specialist technical services requiring unique expertise (higher end). The Coronation CC precedent directly supports the limited-risk service provider model \u2014 a cost-plus contract developer that does not defeat FBE."
    ));
    blocks.push(p(
      "Documentation required: (1) Intercompany services agreement between D9 Ireland and D9 SA; (2) Transfer pricing benchmarking study with comparable transactions; (3) Monthly invoices with time-tracking or deliverable-based allocation; (4) Annual TP review memorandum updating the benchmarking for current market conditions."
    ));
    blocks.push(a(
      "Commission TP benchmarking study before first intercompany invoice. Ensure intercompany services agreement is executed before D9 SA begins invoicing. Establish monthly invoicing cadence with supporting documentation."
    ));
  } else {
    blocks.push(p(
      "Transfer pricing is a significant compliance requirement for the dual-entity structure. Without a formal benchmarking study, SARS can challenge the intercompany pricing and deem additional income to be SA-sourced."
    ));
    blocks.push(a(
      "Commission transfer pricing benchmarking study (R25\u201350K) as a priority. This is required before D9 SA issues its first invoice to D9 Ireland."
    ));
  }

  return { id: "tp", title: "Transfer Pricing", blocks };
}

// ── Section 8: Tax Mechanics ─────────────────────────

function taxMechanicsSection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4], fbe = v[5];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    blocks.push(d(
      "Corporate tax rate: 27% (SA)  |  Pre-revenue: \u20ac0  |  \u20ac16K MRR: \u20ac4.3K/mo tax  |  \u20ac50K MRR: \u20ac13.5K/mo tax  |  \u20ac100K MRR: \u20ac27K/mo tax"
    ));
    blocks.push(p(
      "At 27% corporate tax on worldwide income, the tax differential versus the 12.5% Irish rate is substantial at scale: approximately \u20ac7,250/month at \u20ac50K MRR and \u20ac14,500/month at \u20ac100K MRR. However, the tax differential on current income (zero revenue) is zero."
    ));
    blocks.push(p(
      "Dividend tax: 20% SA Dividends Withholding Tax (DWT) on distributions to SA-resident shareholders. This is actually slightly better than Irish DWT at 15% plus the s9D loop amendment trap \u2014 where dividends routed through Ireland from SA profits face an effective ~30% combined rate. The DTA does not fully eliminate this layered taxation."
    ));
    blocks.push(p(
      "The honest reality: the team is spending significant energy optimising for a tax position on income that does not exist yet. Accepting 27% on zero income is zero cost. The structure can be revisited when revenue justifies the advisory spend."
    ));
  } else if (cfc >= 0.2 && poem >= 0.2) {
    blocks.push(d(
      "Corporate tax rate: 12.5% (Ireland)  |  Pre-revenue: \u20ac0  |  \u20ac16K MRR: \u20ac2K/mo tax  |  \u20ac50K MRR: \u20ac6.25K/mo tax  |  \u20ac100K MRR: \u20ac12.5K/mo tax"
    ));
    blocks.push(p(
      "Irish corporate tax at 12.5% on trading income. CFC attribution eliminated via the shareholding restructure. No FBE required. No IT10B. The 12.5% rate applies cleanly without the catastrophic >45% downside that exists under Option A."
    ));
    blocks.push(p(
      "Dividend mechanics: D9 Ireland distributes dividends at 25% Irish DWT (reduced to 15% under the Ireland-SA DTA for SA-resident shareholders). SA founders then declare the dividend income and claim a foreign tax credit for Irish DWT paid. Net effective dividend tax rate depends on the founder\u2019s marginal rate and available credits."
    ));
    blocks.push(p(
      "When salary payments flow through D9 SA\u2019s cost-plus invoicing, SA founders receive income as D9 SA employees (taxed at normal PAYE rates) rather than as foreign dividends. The intercompany markup (8\u201315%) represents D9 SA\u2019s retained margin and is taxed at 27% SA corporate rate in D9 SA. At scale, optimising the salary vs. dividend vs. retained-earnings split becomes important."
    ));
  } else if (cfc < 0) {
    blocks.push(d(
      "Corporate tax rate: 12.5% (Ireland, target)  |  Pre-revenue: \u20ac0  |  \u20ac16K MRR: \u20ac2K/mo tax  |  \u20ac50K MRR: \u20ac6.25K/mo tax  |  FBE failure scenario: >45% effective tax on attributed CFC income"
    ));
    blocks.push(p(
      "The 12.5% Irish rate is the target, but it is only valid if FBE is maintained. CFC classification means SA founders are taxed on their proportional share of D9 Ireland\u2019s income at their marginal rate (up to 45%), regardless of whether dividends were actually paid."
    ));
    if (fbe < 0) {
      blocks.push(w(
        "FBE is not established. If D9 Ireland earns material profits before FBE is in place, each SA founder\u2019s 17% share of profits is deemed received and taxed at up to 45%. On \u20ac50K MRR (\u20ac600K annual), each founder would face attributed income of \u20ac102K, taxed at marginal rate. This is the catastrophic scenario."
      ));
    }
    blocks.push(p(
      "Dividend tax is secondary to the CFC attribution problem. Even if D9 Ireland retains all profits and pays no dividends, CFC attribution deems the income received by SA founders. The dividend vs. salary optimisation only becomes relevant after FBE is established and CFC attribution is neutralised."
    ));
  } else {
    blocks.push(d(
      "Corporate tax rate: 12.5% (Ireland, at risk)  |  Pre-revenue: \u20ac0  |  \u20ac16K MRR: \u20ac2K/mo tax  |  \u20ac50K MRR: \u20ac6.25K/mo tax  |  \u20ac100K MRR: \u20ac12.5K/mo tax"
    ));
    blocks.push(p(
      "The 12.5% rate is targeted but POEM is not fully defensible. If SARS succeeds in arguing POEM is in SA, the DTA tie-breaker applies and D9 Ireland would be treated as SA-resident at 27%. The tax projection above assumes Irish POEM holds."
    ));
  }

  return { id: "tax", title: "Tax Mechanics & Projections", blocks };
}

// ── Section 9: Filing & Compliance ───────────────────

function complianceSection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  blocks.push(p(
    "Regardless of structure chosen, the following are always required: SARB FinSurv reporting for cross-border flows, Irish CT1 annual filing (or equivalent) for the Irish-incorporated entity, and Carel\u2019s Mauritius Trust reporting obligations."
  ));

  if (poem < -0.2) {
    blocks.push(d(
      "IT10B (per founder): Not required  |  FBE Evidence File: Not required  |  BPR Application: Not needed  |  TP Study: Likely moot  |  SA Corporate Tax Return: Required (D9 Ireland at 27%)  |  Irish CT1: Required  |  Board Minutes: Optional  |  Annual IP Valuation: Not required"
    ));
    blocks.push(p(
      "SA POEM produces the simplest compliance profile. CFC classification is inapplicable (D9 Ireland is SA-resident, not foreign). FBE analysis is not required. BPR is not needed because Irish tax residency is not being claimed. IT10B filing is not applicable. The authority question is moot."
    ));
  } else if (cfc >= 0.2 && poem >= 0.3) {
    blocks.push(d(
      "IT10B (per founder): Not required  |  FBE Evidence File: Not required  |  BPR Application: Optional (future)  |  TP Study: Required (R25\u201350K)  |  Dual Corporate Tax Returns: Required  |  Irish CT1: Required  |  Board Minutes: CRITICAL (quarterly)  |  Annual IP Valuation: Not required"
    ));
    blocks.push(p(
      "CFC eliminated \u2014 no IT10B, no FBE evidence file. Board minutes are critical for POEM defence and must be produced quarterly. Transfer pricing study is required before first intercompany invoice. BPR application is optional and should be deferred until sustained revenue (\u20ac50K+ MRR) and genuine Irish substance justify it."
    ));
  } else if (cfc >= 0.2) {
    blocks.push(d(
      "IT10B (per founder): Not required  |  FBE Evidence File: Not required  |  BPR Application: Optional  |  TP Study: Required  |  Board Minutes: Advisable  |  Irish CT1: Required"
    ));
    blocks.push(p(
      "CFC is eliminated but POEM defence is not at its strongest. Board minutes are advisable (not critical) but become critical if POEM is ever challenged. Transfer pricing documentation is still required for intercompany invoicing."
    ));
  } else {
    blocks.push(d(
      "IT10B (per founder): REQUIRED (annual)  |  FBE Evidence File: REQUIRED  |  BPR Application: Recommended  |  TP Study: REQUIRED (R25\u201350K)  |  Dual Corporate Tax Returns: Required  |  Irish CT1: Required  |  Board Minutes: CRITICAL  |  Annual IP Valuation: Required if Path B"
    ));
    blocks.push(p(
      "This is the highest compliance burden. Every SA founder files IT10B annually. FBE evidence file must be maintained and defensible. BPR application is recommended once substance is in place (takes 90+ days). Transfer pricing study is mandatory. If IP licensing (Path B) is chosen, annual IP valuation is also required."
    ));
    blocks.push(w(
      "The compliance cost for this configuration is very high. Dual-entity corporate tax returns in two jurisdictions, SARB reporting, DWT mechanics, intercompany documentation, TP benchmarking, FBE evidence \u2014 all must be maintained simultaneously."
    ));
  }

  return { id: "compliance", title: "Filing & Compliance Obligations", blocks };
}

// ── Section 10: SARB & Exchange Control ──────────────

function sarbSection(v: number[]): ReportSection {
  const poem = v[4];
  const blocks: ScenarioBlock[] = [];

  blocks.push(p(
    "SARB FinSurv reporting is required for all cross-border flows between D9 Ireland and D9 SA, regardless of which structural option is selected. This includes intercompany service fees, dividend distributions, loan advances, and IP-related payments."
  ));

  if (poem < -0.2) {
    blocks.push(q(
      "Open question for Leroy: Are there SARB implications for ongoing EUR to ZAR transfers from an Irish-incorporated company where POEM is deliberately not claimed as Irish? The company is Irish-incorporated but SA tax-resident \u2014 does SARB treat the EUR flows as domestic or cross-border?"
    ));
  }

  blocks.push(p(
    "FinSurv reporting obligations: (1) Any intercompany payments exceeding the reporting threshold must be declared; (2) Dividend distributions from D9 Ireland to SA-resident shareholders require FinSurv notification; (3) IP transfers (if Path A is chosen) require SARB approval, which is not guaranteed and can take months."
  ));

  return { id: "sarb", title: "SARB & Exchange Control", blocks };
}

// ── Section 11: What Falls Away ──────────────────────

function fallsAwaySection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  const items: string[] = [];

  if (poem < -0.2) {
    items.push("CFC classification \u2014 D9 Ireland is SA-resident, not foreign, so s9D is inapplicable");
    items.push("FBE analysis \u2014 not required when CFC does not apply");
    items.push("BPR application \u2014 not needed as Irish tax residency is not being claimed for SA purposes");
    items.push("GAAR exposure on shareholding \u2014 no restructuring to defend");
    items.push("IT10B filing \u2014 not applicable");
    items.push("The authority question (who makes decisions from where) \u2014 moot");
    items.push("Quarterly board minutes for POEM defence \u2014 not needed");
    items.push("SHA reserved matters carve-outs \u2014 not needed");
    blocks.push(p(
      "Accepting SA POEM eliminates the entire CFC/FBE/IT10B/BPR compliance stack. The following obligations fall away completely:"
    ));
  } else if (cfc >= 0.2) {
    items.push("CFC classification \u2014 SA shareholding below 50%");
    items.push("IT10B filing (per founder, annual) \u2014 not applicable");
    items.push("FBE evidence file \u2014 not required when CFC does not apply");
    items.push("Annual CFC income attribution at up to 45% \u2014 eliminated");
    items.push("The catastrophic >45% tax scenario if FBE fails \u2014 eliminated entirely");
    blocks.push(p(
      "The 12.4% shareholding restructure eliminates CFC and its downstream obligations:"
    ));
  } else {
    blocks.push(p(
      "At the current configuration, no major compliance obligations fall away. The full CFC/FBE/IT10B/TP/BPR stack applies."
    ));
  }

  if (items.length > 0) {
    for (const item of items) {
      blocks.push(d(item));
    }
  }

  return { id: "fallsaway", title: "What Falls Away", blocks };
}

// ── Section 12: Risk Assessment ──────────────────────

function riskAssessmentSection(v: number[]): ReportSection {
  const gaar = v[0], cfc = v[2], pe = v[3], poem = v[4], fbe = v[5];
  const blocks: ScenarioBlock[] = [];

  // CFC
  if (cfc >= 0.2) {
    blocks.push(p("CFC Attribution: NONE. SA shareholding below 50% threshold eliminates CFC classification entirely."));
  } else {
    blocks.push(w("CFC Attribution: HIGH. 68% SA-resident participation is a mathematical certainty of CFC classification. IT10B required annually."));
  }

  // POEM
  if (poem >= 0.3) {
    blocks.push(p("POEM Challenge: LOW. 2:1 non-SA board majority with documented decision-making authority in Ireland is the strongest available defence."));
  } else if (poem >= -0.1) {
    blocks.push(p("POEM Challenge: MEDIUM. Jason as sole director provides some defence but is weaker than a 2:1 board. SARS can argue SA founders effectively control decisions via SHA protections."));
  } else {
    blocks.push(p("POEM Challenge: NONE. SA POEM accepted \u2014 no Irish POEM claim to defend."));
  }

  // PE
  if (pe >= 0.2) {
    blocks.push(p("PE Argument: LOW-MEDIUM. Part-time founder shield holds during transition. D9 SA as future employer provides mitigation path when founders go full-time."));
  } else if (poem < -0.2) {
    blocks.push(p("PE Argument: NONE. D9 Ireland is SA-resident, so PE question is moot."));
  } else {
    blocks.push(p("PE Argument: MEDIUM. SA-based founders performing services create PE risk. D9 SA employment is the mitigation but is not yet active."));
  }

  // GAAR
  if (poem < -0.2) {
    blocks.push(p("GAAR Exposure: NONE. No restructuring to defend. Structure matches operational reality."));
  } else if (cfc >= 0.2 && gaar < 0) {
    blocks.push(w("GAAR Exposure: HIGH. The 12.4% restructuring carries timing risk. SARS can map the deliberation process to the shareholding decision. Commercial rationale documentation is critical."));
  } else if (cfc >= 0.2 && gaar >= 0) {
    blocks.push(p("GAAR Exposure: MEDIUM. The restructuring has commercial justification (30.4% investor pool). Pre-incorporation timing strengthens the defence. GAAR risk is present but mitigated."));
  } else {
    blocks.push(p("GAAR Exposure: MODERATE. If documentation is clean and the structure reflects genuine commercial purpose, GAAR is manageable."));
  }

  // FBE
  if (cfc >= 0.2) {
    blocks.push(p("FBE Failure: NOT APPLICABLE. CFC eliminated via shareholding \u2014 FBE is not needed."));
  } else if (fbe >= 0.3) {
    blocks.push(p("FBE Failure: LOW. All five FBE criteria are being met. Annual review required to maintain compliance."));
  } else {
    blocks.push(w("FBE Failure: CRITICAL. FBE is not established. If CFC applies and FBE fails in a year of material profits, founders face >45% effective tax. This is the single highest-impact risk in the structure."));
  }

  // Audit trigger
  if (poem < -0.2 || (cfc >= 0.2 && poem >= 0.2)) {
    blocks.push(p("Audit Trigger: LOW. Structure is clean and defensible. Low probability of SARS initiating an audit on this configuration."));
  } else if (cfc < 0) {
    blocks.push(p("Audit Trigger: HIGH. CFC classification, IT10B filings, and cross-border intercompany arrangements all increase the probability of SARS audit attention."));
  } else {
    blocks.push(p("Audit Trigger: LOW. Restructured shareholding reduces the compliance touchpoints that attract SARS attention."));
  }

  return { id: "risk", title: "Risk Assessment", blocks };
}

// ── Section 13: Implementation Sequence ──────────────

function implementationSection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  if (poem < -0.2) {
    blocks.push(a("1. Accept SA POEM position \u2014 confirm with Leroy that DTA tie-breaker mechanics are as expected"));
    blocks.push(a("2. Register D9 Ireland as a SA taxpayer. File SA corporate tax returns at 27%"));
    blocks.push(a("3. Retain D9 SA as thin employment vehicle for SA founders"));
    blocks.push(a("4. Close the seed round with Carel \u2014 Class A/B shares in D9 Ireland, mirrored in D9 SA"));
    blocks.push(a("5. Launch d-one.build. Focus energy on product and revenue, not structural gymnastics"));
    blocks.push(a("6. When sustained revenue justifies it (\u20ac50K+ MRR): build genuine Irish substance, apply for BPR, and shift POEM to Ireland from a position of actual strength"));
  } else if (cfc >= 0.2 && poem >= 0.3) {
    blocks.push(a("1. Leroy deep dive on the open questions. Confirm the 49.6% CFC elimination is watertight and the pre-incorporation GAAR position is defensible"));
    blocks.push(a("2. Draft founding board resolution with commercial rationale for the 12.4% / 30.4% cap table. Lead with investor attraction, governance quality, and international expansion. No tax language"));
    blocks.push(a("3. Incorporate D9 Ireland with the governance structure (Jason + Rocher Trust + one SA founder as directors). Issue shares at 12.4% per founder, 7.6% Carel"));
    blocks.push(a("4. Execute Jason\u2019s Irish employment contract with documented operational and commercial authority"));
    blocks.push(a("5. Close the seed round with Carel. Class A/B shares in D9 Ireland, mirrored in D9 SA"));
    blocks.push(a("6. Launch d-one.build. Focus energy on product and revenue, not structural gymnastics"));
    blocks.push(a("7. When sustained revenue justifies it (\u20ac50K+ MRR): build genuine Irish substance, apply for BPR, and shift POEM to Ireland from a position of actual strength"));
    blocks.push(p(
      "The structure that matches reality is always the safest structure. This configuration designs a reality that is both operationally honest and structurally defensible."
    ));
  } else if (cfc >= 0.2) {
    blocks.push(a("1. Leroy confirms 49.6% CFC elimination is watertight"));
    blocks.push(a("2. Draft founding board resolution with commercial rationale \u2014 no tax language"));
    blocks.push(a("3. Incorporate D9 Ireland. Issue shares at 12.4% per founder"));
    blocks.push(a("4. Consider strengthening governance: appoint Rocher Trust as corporate director for 2:1 board majority"));
    blocks.push(a("5. Close seed round with Carel"));
    blocks.push(a("6. Launch d-one.build"));
    blocks.push(w(
      "This configuration eliminates CFC but leaves POEM exposed. Consider moving the POEM slider toward safe to add the governance architecture that makes this structure defensible."
    ));
  } else {
    blocks.push(a("1. Engage Leroy for formal advice on FBE establishment timeline and requirements"));
    blocks.push(a("2. Establish FBE across all 5 criteria: office space, Jason\u2019s employment, equipment, facilities, non-tax purpose"));
    blocks.push(a("3. Commission transfer pricing benchmarking study (R25\u201350K)"));
    blocks.push(a("4. Prepare BPR application once substance is in place (90+ day process)"));
    blocks.push(a("5. Close seed round with Carel"));
    blocks.push(a("6. Launch d-one.build"));
    blocks.push(w(
      "This configuration carries the highest compliance burden and risk profile. Consider restructuring shareholding to 12.4% (move CFC slider toward safe) to eliminate the CFC/FBE stack entirely."
    ));
  }

  return { id: "implementation", title: "Implementation Sequence", blocks };
}

// ── Section 14: Open Questions for Leroy ─────────────

function openQuestionsSection(v: number[]): ReportSection {
  const cfc = v[2], poem = v[4];
  const blocks: ScenarioBlock[] = [];

  blocks.push(p(
    "Regardless of which structural configuration is selected, the following questions require Leroy\u2019s deep dive before a final decision can be made:"
  ));

  if (cfc >= 0.2) {
    blocks.push(q("1. Does the 49.6% structure actually eliminate CFC classification, or are there anti-avoidance provisions (connected persons rules, acting in concert) that allow SARS to look through to beneficial control?"));
    blocks.push(q("7. Does the pre-incorporation timing of the 12.4% restructuring genuinely protect against GAAR, or does SARS apply a substance-over-form analysis regardless of when the decision was made?"));
  }

  blocks.push(q("2. If SA founders are employed directly by D9 Ireland (no D9 SA), does the DTA actually prevent double taxation on their salaries, or does it create a different set of filings with no net benefit?"));
  blocks.push(q("3. Does dissolving D9 SA strengthen or weaken the POEM and FBE position? Ireland carries employment costs (stronger FBE), but five SA-based employees strengthen SARS\u2019s PE argument."));
  blocks.push(q("4. What is the minimum viable D9 SA structure if it is retained? Can transfer pricing and arm\u2019s-length reporting be kept to a manageable annual cost?"));

  if (poem >= 0.2) {
    blocks.push(q("5. What needs to be true for a BPR application to succeed under this configuration, and what is the earliest realistic timeline?"));
  }

  blocks.push(q("6. Are there SARB implications for ongoing EUR to ZAR transfers from an Irish-incorporated company where POEM is deliberately not claimed as Irish?"));

  return { id: "questions", title: "Open Questions for Leroy", blocks };
}

// ── Main Report Generator ────────────────────────────

export function generateReport(values: number[]): ReportSection[] {
  return [
    entityArchitecture(values),
    shareholdingSection(values),
    governanceSection(values),
    revenueFlowSection(values),
    employmentSection(values),
    ipSection(values),
    transferPricingSection(values),
    taxMechanicsSection(values),
    complianceSection(values),
    sarbSection(values),
    fallsAwaySection(values),
    riskAssessmentSection(values),
    implementationSection(values),
    openQuestionsSection(values),
  ];
}

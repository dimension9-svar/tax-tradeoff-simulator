"use client";

import { useMemo } from "react";
import {
  analyzeStructure,
  type RiskLevel,
} from "@/lib/guidance";
import {
  generateReport,
  type ReportSection,
  type ScenarioBlock,
} from "@/lib/scenarios";

interface StructurePanelProps {
  values: number[];
}

const STATUS_COLORS: Record<RiskLevel, string> = {
  safe: "#1D9E75",
  caution: "#BA7517",
  risk: "#E24B4A",
};

const STATUS_TAG: Record<RiskLevel, string> = {
  safe: "CLEAR",
  caution: "WATCH",
  risk: "AT RISK",
};

const ARCHETYPE_COLORS: Record<string, string> = {
  A: "#E24B4A",
  B: "#BA7517",
  C: "#6B8AE0",
  D: "#1D9E75",
  X: "var(--text-tertiary)",
};

function BlockRenderer({ block }: { block: ScenarioBlock }) {
  switch (block.type) {
    case "prose":
      return (
        <p className="text-[12px] text-[var(--text-secondary)] leading-[1.7] mb-2">
          {block.text}
        </p>
      );
    case "data":
      return (
        <div className="text-[11px] font-mono text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] rounded px-2.5 py-1.5 mb-2 leading-relaxed whitespace-pre-wrap">
          {block.text.split("  |  ").map((segment, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="text-[var(--text-tertiary)] mx-1">
                  {"\u00b7"}
                </span>
              )}
              {segment}
            </span>
          ))}
        </div>
      );
    case "warn":
      return (
        <div
          className="text-[12px] leading-[1.7] mb-2 p-2.5 rounded-lg"
          style={{
            background: "rgba(226,75,74,0.06)",
            borderLeft: "3px solid #E24B4A",
            color: "var(--text-secondary)",
          }}
        >
          {block.text}
        </div>
      );
    case "question":
      return (
        <div
          className="text-[12px] leading-[1.7] mb-2 p-2.5 rounded-lg"
          style={{
            background: "rgba(133,183,235,0.08)",
            borderLeft: "3px solid #85B7EB",
            color: "var(--text-secondary)",
          }}
        >
          {block.text}
        </div>
      );
    case "action":
      return (
        <div
          className="text-[12px] leading-[1.7] mb-1 pl-3"
          style={{
            borderLeft: "2px solid #1D9E75",
            color: "var(--text-secondary)",
          }}
        >
          {block.text}
        </div>
      );
  }
}

function SectionRenderer({ section }: { section: ReportSection }) {
  return (
    <div className="mb-5">
      <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-2 pb-1 border-b border-[var(--border)]">
        {section.title}
      </h3>
      {section.blocks.map((block, i) => (
        <BlockRenderer key={`${section.id}-${i}`} block={block} />
      ))}
    </div>
  );
}

export default function StructurePanel({ values }: StructurePanelProps) {
  const analysis = useMemo(() => analyzeStructure(values), [values]);
  const report = useMemo(() => generateReport(values), [values]);

  const accentColor =
    ARCHETYPE_COLORS[analysis.archetypeId] ?? "var(--text-tertiary)";

  return (
    <div className="mt-6 pt-5 border-t border-[var(--border)]">
      {/* ── Header ── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">
            Structural analysis
          </h2>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: accentColor, color: "#fff" }}
          >
            {analysis.archetype}
          </span>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
          {analysis.headline}
        </p>
      </div>

      {/* ── Key Metrics Bar ── */}
      <div
        className="flex flex-wrap gap-3 p-3 rounded-lg mb-5 text-[12px]"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div>
          <span className="text-[var(--text-tertiary)]">
            Corp. tax:{" "}
          </span>
          <span
            className="font-bold"
            style={{
              color: analysis.tax.rate.includes("27")
                ? "#E24B4A"
                : analysis.tax.rate.includes("risk") ||
                    analysis.tax.rate.includes("fragile")
                  ? "#BA7517"
                  : "#1D9E75",
            }}
          >
            {analysis.tax.rate}
          </span>
        </div>
        <span className="text-[var(--border)]">|</span>
        <div>
          <span className="text-[var(--text-tertiary)]">
            Founder equity:{" "}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">
            {analysis.capTable[0].holding} each
          </span>
        </div>
        <span className="text-[var(--border)]">|</span>
        <div className="flex-1 min-w-[200px]">
          <span className="text-[var(--text-tertiary)]">
            {analysis.tax.rationale}
          </span>
        </div>
      </div>

      {/* ── Risk Summary Strip ── */}
      <div className="mb-5">
        <h3 className="text-[10px] font-semibold text-[var(--text-tertiary)] mb-1.5 uppercase tracking-wider">
          Risk summary
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {analysis.dimensions.map((dim) => (
            <span
              key={dim.id}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background:
                  dim.status === "safe"
                    ? "rgba(29,158,117,0.1)"
                    : dim.status === "risk"
                      ? "rgba(226,75,74,0.1)"
                      : "rgba(186,117,23,0.08)",
                color: STATUS_COLORS[dim.status],
              }}
            >
              {dim.id}: {STATUS_TAG[dim.status]}
            </span>
          ))}
        </div>
      </div>

      {/* ── Full Scenario Report ── */}
      <div>
        {report.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>

      {/* ── Cross-Dimensional Insights ── */}
      {analysis.crossInsights.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[12px] font-semibold text-[var(--text-primary)] mb-2 pb-1 border-b border-[var(--border)]">
            Cross-Dimensional Interactions
          </h3>
          {analysis.crossInsights.map((insight, i) => (
            <div
              key={i}
              className="text-[12px] text-[var(--text-secondary)] leading-[1.7] mb-2 p-2.5 rounded-lg"
              style={{
                background: insight.includes("CRITICAL")
                  ? "rgba(226,75,74,0.06)"
                  : "rgba(133,183,235,0.08)",
                borderLeft: insight.includes("CRITICAL")
                  ? "3px solid #E24B4A"
                  : "3px solid #85B7EB",
              }}
            >
              {insight}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

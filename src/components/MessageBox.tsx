"use client";

import type { SideEffect } from "@/lib/engine";

interface MessageBoxProps {
  activeLabel: string | null;
  action: string | null;
  effects: SideEffect[];
  values: number[];
}

export default function MessageBox({
  activeLabel,
  action,
  effects,
  values,
}: MessageBoxProps) {
  const positiveCount = values.filter((v) => v > 0.3).length;
  const negCount = values.filter((v) => v < -0.3).length;

  if (!activeLabel) {
    return (
      <div className="text-[13px] text-[var(--text-secondary)] mt-4 p-3 bg-[var(--bg-secondary)] rounded-lg leading-relaxed min-h-[44px] transition-all duration-300">
        Drag a handle toward safe or risk — or click anywhere on a
        track to jump there.
      </div>
    );
  }

  let note = "";
  if (positiveCount >= 6) note = "Close — but check what went red.";
  if (negCount >= 3)
    note = "Multiple exposures open. This is the core problem.";

  return (
    <div className="text-[13px] text-[var(--text-secondary)] mt-4 p-3 bg-[var(--bg-secondary)] rounded-lg leading-relaxed min-h-[44px] transition-all duration-300">
      <span className="font-semibold">{activeLabel}:</span> {action}
      <br />
      <span>Side effects: </span>
      {effects.map((eff, i) => (
        <span key={eff.label}>
          {i > 0 && <span>&nbsp;&nbsp;</span>}
          <span className="font-semibold">{eff.label}</span>{" "}
          {eff.improved ? (
            <span className="text-emerald-600">&uarr;</span>
          ) : (
            <span className="text-red-500">&darr;</span>
          )}
        </span>
      ))}
      {note && (
        <>
          <br />
          {note}
        </>
      )}
    </div>
  );
}

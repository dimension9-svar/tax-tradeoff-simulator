"use client";

import { getColor, valueToPct } from "@/lib/engine";

interface ScoreBarProps {
  label: string;
  value: number;
}

export default function ScoreBar({ label, value }: ScoreBarProps) {
  const pct = valueToPct(value);
  const color = getColor(value);

  return (
    <div className="flex items-center gap-2.5 mb-2">
      <span className="text-xs text-[var(--text-secondary)] min-w-[76px]">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full overflow-hidden bg-[var(--border)]">
        <div
          className="h-full rounded-full transition-all duration-400"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-medium min-w-[36px] text-right"
        style={{ color }}
      >
        {pct}%
      </span>
    </div>
  );
}

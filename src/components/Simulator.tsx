"use client";

import { useCallback, useRef, useState } from "react";
import {
  N,
  LABELS,
  HINTS,
  DESCRIPTIONS,
  applyChange,
  computeSideEffects,
  type SideEffect,
} from "@/lib/engine";
import Slider from "./Slider";
import ScoreBar from "./ScoreBar";
import MessageBox from "./MessageBox";
import StructurePanel from "./StructurePanel";

const INITIAL = new Array(N).fill(0);

export default function Simulator() {
  const [values, setValues] = useState<number[]>(INITIAL);
  const [message, setMessage] = useState<{
    label: string;
    action: string;
    effects: SideEffect[];
  } | null>(null);

  const preRef = useRef<number[]>(INITIAL);
  const isDragging = useRef(false);

  const handleDragStart = useCallback((idx: number) => {
    isDragging.current = true;
    preRef.current = valuesRef.current.slice();
  }, []);

  // keep a ref to current values for drag baseline
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const handleChange = useCallback(
    (idx: number, newVal: number) => {
      const base = isDragging.current ? preRef.current : undefined;
      const next = applyChange(valuesRef.current, idx, newVal, base);
      setValues(next);
      valuesRef.current = next;

      if (!isDragging.current) {
        const improved = newVal > (base ?? valuesRef.current)[idx];
        const d = DESCRIPTIONS[LABELS[idx]];
        setMessage({
          label: LABELS[idx],
          action: improved ? d.fix : d.risk,
          effects: computeSideEffects(idx, improved),
        });
      }
    },
    []
  );

  const handleDragEnd = useCallback((idx: number) => {
    isDragging.current = false;
    const improved =
      valuesRef.current[idx] > preRef.current[idx];
    const d = DESCRIPTIONS[LABELS[idx]];
    setMessage({
      label: LABELS[idx],
      action: improved ? d.fix : d.risk,
      effects: computeSideEffects(idx, improved),
    });
  }, []);

  const reset = useCallback(() => {
    setValues(INITIAL);
    valuesRef.current = INITIAL;
    setMessage(null);
  }, []);

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <h1 className="text-xl font-medium mb-2">
        Tax trade-off simulator
      </h1>
      <div className="text-xs text-[var(--text-tertiary)] mb-2 leading-relaxed py-2.5 px-3 border-l-[3px] border-[#85B7EB] bg-[var(--bg-secondary)]">
        Irish Ltd (12.5% CT) &mdash; 4 co-founders in South Africa, 1
        co-founder + 1 investor in Ireland
      </div>
      <p className="text-[13px] text-[var(--text-secondary)] mb-6 leading-relaxed">
        Each handle represents a structural risk dimension. Drag toward
        &ldquo;safe&rdquo; to resolve that risk &mdash; the analysis
        below rewrites to show exactly how your corporate structure,
        cap table, governance, and compliance obligations change.
      </p>

      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {LABELS.map((label, i) => (
          <Slider
            key={label}
            label={label}
            hint={HINTS[label]}
            value={values[i]}
            onChange={(v) => handleChange(i, v)}
            onDragStart={() => handleDragStart(i)}
            onDragEnd={() => handleDragEnd(i)}
          />
        ))}
      </div>

      <div className="mt-4">
        {LABELS.map((label, i) => (
          <ScoreBar key={label} label={label} value={values[i]} />
        ))}
      </div>

      <MessageBox
        activeLabel={message?.label ?? null}
        action={message?.action ?? null}
        effects={message?.effects ?? []}
        values={values}
      />

      <StructurePanel values={values} />

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={reset}
          className="text-xs cursor-pointer py-1.5 px-4 bg-transparent border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
        >
          Reset all handles
        </button>
        <span className="text-[10px] text-[var(--text-tertiary)]">
          Source: D9 Corporate Structure Options Comparison V1.0
        </span>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] text-[var(--text-tertiary)] leading-relaxed">
        Illustrative only &mdash; not tax advice. Based on Leroy
        Rutherford&apos;s Board Advisory Pack (April 2026) and founding
        team analysis. Couplings are approximate and intended to
        demonstrate the interconnected nature of cross-border tax risks.
        Consult a qualified tax advisor for your specific situation.
      </div>
    </div>
  );
}

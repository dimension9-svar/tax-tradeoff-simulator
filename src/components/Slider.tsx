"use client";

import { useCallback, useRef } from "react";
import {
  clamp,
  getThumbColor,
  getTrackFillColor,
} from "@/lib/engine";

const TRACK_H = 150;
const THUMB_H = 16;

function valueToPx(v: number) {
  return Math.round((1 - (v + 1) / 2) * (TRACK_H - THUMB_H));
}

function pxToValue(y: number) {
  const ratio = clamp(y / (TRACK_H - THUMB_H), 0, 1);
  return 1 - ratio * 2;
}

interface SliderProps {
  label: string;
  hint: string;
  value: number;
  onChange: (newValue: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default function Slider({
  label,
  hint,
  value,
  onChange,
  onDragStart,
  onDragEnd,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const top = valueToPx(value);
  const fillH = Math.max(0, TRACK_H - top - THUMB_H / 2);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (dragging.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const y = clamp(
        e.clientY - rect.top - THUMB_H / 2,
        0,
        TRACK_H - THUMB_H
      );
      onChange(pxToValue(y));
    },
    [onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);
      dragging.current = true;
      onDragStart();
    },
    [onDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const y = clamp(
        e.clientY - rect.top - THUMB_H / 2,
        0,
        TRACK_H - THUMB_H
      );
      onChange(pxToValue(y));
    },
    [onChange]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    onDragEnd();
  }, [onDragEnd]);

  return (
    <div className="flex flex-col items-center w-[74px]">
      <span className="text-[11px] font-medium text-[var(--text-secondary)] mb-1 text-center leading-tight h-7 flex items-end justify-center">
        {label}
      </span>
      <span className="text-[9px] text-[var(--text-tertiary)] text-center mb-1.5 leading-tight h-5 flex items-center justify-center">
        {hint}
      </span>
      <div className="relative flex flex-col items-center h-[180px]">
        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 whitespace-nowrap leading-none">
          safe
        </span>
        <div
          ref={trackRef}
          className="w-7 rounded-full relative cursor-pointer my-0.5"
          style={{
            height: TRACK_H,
            background: "var(--border)",
          }}
          onClick={handleTrackClick}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full pointer-events-none transition-all duration-400"
            style={{
              height: fillH,
              background: getTrackFillColor(value),
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-8 h-4 rounded-lg cursor-grab active:cursor-grabbing z-10 shadow-sm transition-all duration-400 hover:brightness-110 hover:scale-105"
            style={{
              top,
              background: getThumbColor(value),
              ...(dragging.current
                ? { transition: "none", cursor: "grabbing" }
                : {}),
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </div>
        <span className="text-[9px] text-red-500 dark:text-red-400 whitespace-nowrap leading-none">
          risk
        </span>
      </div>
    </div>
  );
}

"use client";

import { useCallback } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  ariaLabel?: string;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  ariaLabel,
}: SliderInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--text-secondary)]">{label}</label>
        <span className="font-mono text-sm font-bold text-[var(--accent)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel || label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={format(value)}
        className="w-full"
      />
      <div className="flex justify-between">
        <span className="text-[11px] text-[var(--text-dim)]">
          {format(min)}
        </span>
        <span className="text-[11px] text-[var(--text-dim)]">
          {format(max)}
        </span>
      </div>
    </div>
  );
}

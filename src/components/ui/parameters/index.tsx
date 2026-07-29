"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";

export interface ParameterSlider {
  id: string;
  label: string;
  value: number;
  /** Optional qualitative label shown on the right (e.g. "High"). */
  hint?: (value: number) => string;
}

export interface ParametersProps {
  /** Initial slider config. */
  sliders?: ParameterSlider[];
  /** Initial seed value. */
  seed?: number;
  onChange?: (values: Record<string, number>) => void;
  onSeedChange?: (seed: number) => void;
  className?: string;
}

const defaultHint = (v: number) => (v < 34 ? "Low" : v < 67 ? "Medium" : "High");

const DEFAULT_SLIDERS: ParameterSlider[] = [
  { id: "prompt", label: "Prompt strength", value: 57 },
  { id: "style", label: "Style strength", value: 78 },
  { id: "variation", label: "Variation", value: 28 },
];

/** A panel of sliders and a seed field for tuning generation parameters. */
export function Parameters({
  sliders = DEFAULT_SLIDERS,
  seed: seedProp = 67809238,
  onChange,
  onSeedChange,
  className = "",
}: ParametersProps) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(sliders.map((s) => [s.id, s.value])),
  );
  const [seed, setSeed] = useState(seedProp);

  const update = (id: string, v: number) => {
    const next = { ...values, [id]: v };
    setValues(next);
    onChange?.(next);
  };

  const randomizeSeed = () => {
    const next = Math.floor(Math.random() * 99999999);
    setSeed(next);
    onSeedChange?.(next);
  };

  return (
    <div
      className={
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 " +
        className
      }
    >
      <div className="flex flex-col gap-5">
        {sliders.map((s) => {
          const v = values[s.id];
          const hint = (s.hint ?? defaultHint)(v);
          return (
            <div key={s.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700 dark:text-zinc-200">
                  {s.label}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500">{hint}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={v}
                  onChange={(e) => update(s.id, Number(e.target.value))}
                  aria-label={s.label}
                  className="param-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700"
                  style={{
                    background: `linear-gradient(to right, #18181b ${v}%, transparent ${v}%)`,
                  }}
                />
                <span
                  className="pointer-events-none absolute -top-5 -translate-x-1/2 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                  style={{ left: `${v}%` }}
                >
                  {v}%
                </span>
              </div>
            </div>
          );
        })}

        <div>
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Seed
          </span>
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700">
            <input
              value={seed}
              onChange={(e) => {
                const n = Number(e.target.value.replace(/\D/g, ""));
                setSeed(n);
                onSeedChange?.(n);
              }}
              inputMode="numeric"
              aria-label="Seed"
              className="w-full bg-transparent text-sm text-zinc-700 outline-none dark:text-zinc-200"
            />
            <button
              type="button"
              onClick={randomizeSeed}
              aria-label="Randomize seed"
              className="text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .param-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #18181b;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }
        :global(.dark) .param-range::-webkit-slider-thumb {
          background: #fff;
          border-color: #18181b;
        }
        .param-range::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 9999px;
          background: #18181b;
          border: 2px solid #fff;
        }
      `}</style>
    </div>
  );
}

"use client";

import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

export interface CaveatProps {
  /** Message text. */
  children?: ReactNode;
  /** Optional "Learn more" link target. */
  learnMoreHref?: string;
  /** Tone of the disclaimer. */
  tone?: "warning" | "info" | "neutral";
  className?: string;
}

const tones = {
  warning:
    "border-amber-400/60 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/40",
  info: "border-blue-400/60 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-500/40",
  neutral:
    "border-zinc-300 bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
};

/** A disclaimer banner warning users about AI limitations. */
export function Caveat({
  children = "AI responses can be inaccurate or misleading.",
  learnMoreHref,
  tone = "warning",
  className = "",
}: CaveatProps) {
  return (
    <div
      role="note"
      className={
        "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium " +
        tones[tone] +
        " " +
        className
      }
    >
      <AlertTriangle size={16} className="shrink-0" />
      <span>
        {children}{" "}
        {learnMoreHref && (
          <a
            href={learnMoreHref}
            className="underline underline-offset-2 hover:opacity-80"
          >
            Learn more
          </a>
        )}
      </span>
    </div>
  );
}

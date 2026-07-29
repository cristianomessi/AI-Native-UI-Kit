"use client";

import { PenLine } from "lucide-react";
import type { ReactNode } from "react";

export interface InlineActionProps {
  /** The content the action applies to. */
  children: ReactNode;
  /** Action button label. */
  label?: string;
  /** Leading icon. */
  icon?: ReactNode;
  onAction?: () => void;
  className?: string;
}

/**
 * A block of content with a floating contextual AI action — e.g. a
 * selection that can be improved, rewritten, or summarized.
 */
export function InlineAction({
  children,
  label = "Improve Writing",
  icon = <PenLine size={15} />,
  onAction,
  className = "",
}: InlineActionProps) {
  return (
    <div className={"relative w-full max-w-md " + className}>
      <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
        <span className="rounded bg-fuchsia-500/10 box-decoration-clone px-0.5 text-zinc-700 dark:text-zinc-200">
          {children}
        </span>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {icon}
        {label}
      </button>
    </div>
  );
}

"use client";

import {
  RefreshCw,
  ArrowDownWideNarrow,
  AlignLeft,
  Shuffle,
  ChevronRight,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export interface ResponseAction {
  id: string;
  label: string;
  icon: ReactNode;
  submenu?: boolean;
}

export interface ResponseActionsProps {
  actions?: ResponseAction[];
  onAction?: (id: string, prompt?: string) => void;
  onFeedback?: (kind: "copy" | "up" | "down" | "regenerate") => void;
  className?: string;
}

const DEFAULT_ACTIONS: ResponseAction[] = [
  { id: "retry", label: "Try again", icon: <RefreshCw size={16} /> },
  {
    id: "cluster",
    label: "Cluster by sentiment",
    icon: <ArrowDownWideNarrow size={16} />,
  },
  { id: "concise", label: "More concise", icon: <AlignLeft size={16} /> },
  {
    id: "model",
    label: "Switch model",
    icon: <Shuffle size={16} />,
    submenu: true,
  },
];

/** A "change response" menu plus a feedback toolbar for AI answers. */
export function ResponseActions({
  actions = DEFAULT_ACTIONS,
  onAction,
  onFeedback,
  className = "",
}: ResponseActionsProps) {
  const [prompt, setPrompt] = useState("");
  const [fb, setFb] = useState<"up" | "down" | null>(null);

  return (
    <div className={"flex w-full max-w-xs flex-col items-center gap-4 " + className}>
      <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        {/* mini input */}
        <div className="flex items-center gap-2 px-4 py-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && prompt.trim()) {
                onAction?.("custom", prompt);
                setPrompt("");
              }
            }}
            placeholder="Ask to change response"
            className="w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
          />
          <button
            type="button"
            onClick={() => prompt.trim() && onAction?.("custom", prompt)}
            aria-label="Send"
            className="grid size-6 place-items-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          >
            <ArrowUp size={13} />
          </button>
        </div>
        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
        {/* actions */}
        <ul className="p-1.5">
          {actions.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => onAction?.(a.id)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <span className="text-zinc-500 dark:text-zinc-400">{a.icon}</span>
                <span className="flex-1 text-left">{a.label}</span>
                {a.submenu && (
                  <ChevronRight size={15} className="text-zinc-400" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* feedback toolbar */}
      <div className="flex items-center gap-1">
        {[
          { k: "copy" as const, icon: <Copy size={16} />, label: "Copy" },
          {
            k: "down" as const,
            icon: <ThumbsDown size={16} />,
            label: "Bad response",
          },
          {
            k: "up" as const,
            icon: <ThumbsUp size={16} />,
            label: "Good response",
          },
          {
            k: "regenerate" as const,
            icon: <RefreshCw size={16} />,
            label: "Regenerate",
          },
        ].map((b) => (
          <button
            key={b.k}
            type="button"
            aria-label={b.label}
            aria-pressed={b.k === fb || undefined}
            onClick={() => {
              if (b.k === "up" || b.k === "down") setFb(b.k);
              onFeedback?.(b.k);
            }}
            className={
              "grid size-8 place-items-center rounded-lg transition-colors " +
              ((b.k === "up" || b.k === "down") && fb === b.k
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800")
            }
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

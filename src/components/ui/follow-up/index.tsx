"use client";

import { ArrowUp, Plus } from "lucide-react";
import { useState } from "react";

export interface FollowUpProps {
  /** Suggested follow-up prompts shown as chips. */
  suggestions?: string[];
  placeholder?: string;
  onSend?: (text: string) => void;
  /** Fires when a suggestion chip is clicked. */
  onSelect?: (text: string) => void;
  className?: string;
}

const DEFAULT_SUGGESTIONS = [
  "Identify key trends",
  "Consider another perspective",
  "Find more sources",
];

/** A compact follow-up input with clickable suggestion chips. */
export function FollowUp({
  suggestions = DEFAULT_SUGGESTIONS,
  placeholder = "Ask a follow up...",
  onSend,
  onSelect,
  className = "",
}: FollowUpProps) {
  const [value, setValue] = useState("");

  const submit = (text: string) => {
    if (!text.trim()) return;
    onSend?.(text);
    setValue("");
  };

  return (
    <div className={"flex w-full max-w-md flex-col gap-3 " + className}>
      <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          aria-label="Add context"
          className="grid size-8 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <Plus size={17} />
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
        />
        <button
          type="button"
          onClick={() => submit(value)}
          disabled={!value.trim()}
          aria-label="Send"
          className="grid size-8 place-items-center rounded-full bg-zinc-900 text-white transition-opacity disabled:opacity-40 dark:bg-white dark:text-zinc-900"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => (onSelect ? onSelect(s) : submit(s))}
            className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

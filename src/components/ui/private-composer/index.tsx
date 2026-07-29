"use client";

import {
  Plus,
  Telescope,
  Globe,
  ChevronDown,
  Mic,
  ArrowUp,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export interface PrivateComposerProps {
  placeholder?: string;
  model?: string;
  source?: string;
  /** Initial private-mode state. */
  defaultPrivate?: boolean;
  onSend?: (text: string, isPrivate: boolean) => void;
  onPrivateToggle?: (isPrivate: boolean) => void;
  className?: string;
}

/** A dark, compact prompt composer with a private-mode toggle. */
export function PrivateComposer({
  placeholder = "Learn something new...",
  model = "GPT-5",
  source = "All sources",
  defaultPrivate = true,
  onSend,
  onPrivateToggle,
  className = "",
}: PrivateComposerProps) {
  const [value, setValue] = useState("");
  const [priv, setPriv] = useState(defaultPrivate);

  const send = () => {
    if (!value.trim()) return;
    onSend?.(value, priv);
    setValue("");
  };

  return (
    <div
      className={
        "w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-3.5 text-zinc-100 shadow-xl " +
        className
      }
    >
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
        >
          <Plus size={13} /> Add context
        </button>
        <button
          type="button"
          onClick={() => {
            const next = !priv;
            setPriv(next);
            onPrivateToggle?.(next);
          }}
          aria-pressed={priv}
          className={
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors " +
            (priv
              ? "bg-emerald-500/15 text-emerald-400"
              : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200")
          }
        >
          <ShieldCheck size={13} /> Private mode
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
        rows={1}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent px-1 py-1 text-[15px] outline-none placeholder:text-zinc-500"
      />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-0.5 text-zinc-400">
          <button
            type="button"
            aria-label="Attach"
            className="grid size-8 place-items-center rounded-lg hover:bg-white/5 hover:text-zinc-200"
          >
            <Plus size={17} className="rotate-45" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5 hover:text-zinc-200"
          >
            <Telescope size={15} /> Research
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5 hover:text-zinc-200"
          >
            <Globe size={15} /> {source} <ChevronDown size={13} />
          </button>
          <span className="hidden px-2 text-sm sm:inline">{model}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Voice"
            className="grid size-8 place-items-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
          >
            <Mic size={17} />
          </button>
          <button
            type="button"
            onClick={send}
            disabled={!value.trim()}
            aria-label="Send"
            className="grid size-8 place-items-center rounded-full bg-white text-zinc-900 transition-opacity disabled:opacity-40"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

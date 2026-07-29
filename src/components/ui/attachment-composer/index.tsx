"use client";

import { Paperclip, X, FileText } from "lucide-react";
import { useRef, useState } from "react";

export interface Attachment {
  id: string;
  name: string;
}

export interface AttachmentComposerProps {
  placeholder?: string;
  /** Initial attachments. */
  defaultAttachments?: Attachment[];
  onSend?: (text: string, attachments: Attachment[]) => void;
  onAttach?: (files: FileList | null) => void;
  className?: string;
}

/** A composer that shows attached files as removable chips. */
export function AttachmentComposer({
  placeholder = "What can I help you learn...?",
  defaultAttachments = [{ id: "1", name: "FinalContract.pdf" }],
  onSend,
  onAttach,
  className = "",
}: AttachmentComposerProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(defaultAttachments);
  const [value, setValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const remove = (id: string) =>
    setAttachments((a) => a.filter((x) => x.id !== id));

  return (
    <div
      className={
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 " +
        className
      }
    >
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {attachments.map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-2 pr-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <FileText size={16} className="text-red-500" />
              <span className="max-w-[140px] truncate text-zinc-700 dark:text-zinc-200">
                {a.name}
              </span>
              <button
                type="button"
                onClick={() => remove(a.id)}
                aria-label={`Remove ${a.name}`}
                className="grid size-5 place-items-center rounded text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700"
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend?.(value, attachments);
            setValue("");
          }
        }}
        rows={1}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent px-1 py-1.5 text-[15px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
      />

      <div className="mt-1 flex items-center">
        <input
          ref={fileRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setAttachments((a) => [
                ...a,
                ...[...files].map((f, i) => ({
                  id: `${Date.now()}-${i}`,
                  name: f.name,
                })),
              ]);
            }
            onAttach?.(files);
          }}
        />
        <div className="group relative">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Add photos & files"
            className="grid size-9 place-items-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Paperclip size={18} />
          </button>
          <span className="pointer-events-none absolute bottom-full left-0 mb-1.5 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Add photos &amp; files
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./PromptComposer.module.css";
import {
  ArrowUpIcon,
  AtIcon,
  ChevronDownIcon,
  CloseIcon,
  GlobeIcon,
  MicIcon,
  PaperclipIcon,
  ResearchIcon,
} from "./icons";

export interface SourceOption {
  id: string;
  label: string;
}

export interface PromptComposerProps {
  /** Controlled input value. Omit for uncontrolled usage. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  /** Placeholder shown when the input is empty. */
  placeholder?: string;
  /** Label for the top context pill. Set to `null` to hide it. */
  contextLabel?: ReactNode;

  /** Fires on every keystroke with the current value. */
  onChange?: (value: string) => void;
  /** Fires when the user submits (send button or Enter). Clears input when uncontrolled. */
  onSend?: (value: string) => void;
  /** Fires when the attach button is clicked, with any selected files. */
  onAttach?: (files: FileList | null) => void;
  /** Fires when the context pill is clicked. */
  onAddContext?: () => void;
  /** Fires when the close (✕) button is clicked. Hidden when omitted. */
  onClose?: () => void;
  /** Fires when the mic button is clicked. */
  onMic?: () => void;

  /** Controlled Research toggle state. */
  research?: boolean;
  /** Initial Research state when uncontrolled. */
  defaultResearch?: boolean;
  /** Fires when the Research toggle changes. */
  onResearchToggle?: (active: boolean) => void;

  /** Available "sources" options. */
  sources?: SourceOption[];
  /** Controlled selected source id. */
  selectedSource?: string;
  /** Initial selected source id when uncontrolled. */
  defaultSource?: string;
  /** Fires when the source selection changes. */
  onSourceChange?: (id: string) => void;

  /** Available model options. */
  models?: string[];
  /** Controlled selected model. */
  selectedModel?: string;
  /** Initial selected model when uncontrolled. */
  defaultModel?: string;
  /** Fires when the model selection changes. */
  onModelChange?: (model: string) => void;

  /** Disable the entire composer. */
  disabled?: boolean;
  /** Extra class applied to the root element. */
  className?: string;
  /** Max textarea height in px before it scrolls. */
  maxRows?: number;
}

const DEFAULT_SOURCES: SourceOption[] = [
  { id: "all", label: "All sources" },
  { id: "web", label: "Web" },
  { id: "academic", label: "Academic" },
  { id: "social", label: "Social" },
];

const DEFAULT_MODELS = ["GPT-5", "GPT-5 mini", "o4", "Claude Opus 4.8"];

/** Small helper: state that can be either controlled or uncontrolled. */
function useControllable<T>(
  controlled: T | undefined,
  defaultValue: T,
): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : uncontrolled;
  const set = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
    },
    [isControlled],
  );
  return [value, set];
}

/** A dropdown menu that opens upward (toolbar sits near the bottom). */
function Menu({
  label,
  icon,
  options,
  value,
  onSelect,
  disabled,
}: {
  label: ReactNode;
  icon?: ReactNode;
  options: SourceOption[];
  value: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.menuRoot} ref={rootRef}>
      <button
        type="button"
        className={styles.toolButton}
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        {icon}
        <span className={styles.toolLabel}>{label}</span>
        <ChevronDownIcon className={styles.chevron} />
      </button>
      {open && (
        <ul className={styles.menu} role="listbox" id={menuId}>
          {options.map((opt) => (
            <li key={opt.id} role="none">
              <button
                type="button"
                role="option"
                aria-selected={opt.id === value}
                className={styles.menuItem}
                data-selected={opt.id === value || undefined}
                onClick={() => {
                  onSelect(opt.id);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const PromptComposer = forwardRef<HTMLTextAreaElement, PromptComposerProps>(
  function PromptComposer(props, forwardedRef) {
    const {
      value: valueProp,
      defaultValue = "",
      placeholder = "Learn something new...",
      contextLabel = "Add context",
      onChange,
      onSend,
      onAttach,
      onAddContext,
      onClose,
      onMic,
      research: researchProp,
      defaultResearch = false,
      onResearchToggle,
      sources = DEFAULT_SOURCES,
      selectedSource: selectedSourceProp,
      defaultSource,
      onSourceChange,
      models = DEFAULT_MODELS,
      selectedModel: selectedModelProp,
      defaultModel,
      onModelChange,
      disabled = false,
      className,
      maxRows = 8,
    } = props;

    const [value, setValue] = useControllable(valueProp, defaultValue);
    const [research, setResearch] = useControllable(researchProp, defaultResearch);
    const [sourceId, setSourceId] = useControllable(
      selectedSourceProp,
      defaultSource ?? sources[0]?.id ?? "",
    );
    const [model, setModel] = useControllable(
      selectedModelProp,
      defaultModel ?? models[0] ?? "",
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    // Auto-grow the textarea up to maxRows.
    useLayoutEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      const lineHeight = 24;
      const max = lineHeight * maxRows;
      el.style.height = `${Math.min(el.scrollHeight, max)}px`;
      el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
    }, [value, maxRows]);

    const canSend = value.trim().length > 0 && !disabled;

    const handleSend = () => {
      if (!canSend) return;
      onSend?.(value);
      if (valueProp === undefined) setValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    };

    const toggleResearch = () => {
      const next = !research;
      setResearch(next);
      onResearchToggle?.(next);
    };

    const sourceLabel =
      sources.find((s) => s.id === sourceId)?.label ?? sources[0]?.label ?? "";

    return (
      <div
        className={[styles.root, disabled ? styles.disabled : "", className]
          .filter(Boolean)
          .join(" ")}
        data-disabled={disabled || undefined}
      >
        {onClose && (
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
            disabled={disabled}
          >
            <CloseIcon />
          </button>
        )}

        <div className={styles.card}>
          {contextLabel !== null && (
            <div className={styles.topRow}>
              <button
                type="button"
                className={styles.pill}
                onClick={onAddContext}
                disabled={disabled}
              >
                <AtIcon width={14} height={14} />
                <span>{contextLabel}</span>
              </button>
            </div>
          )}

          <textarea
            ref={setRefs}
            className={styles.textarea}
            placeholder={placeholder}
            value={value}
            rows={1}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label={typeof placeholder === "string" ? placeholder : "Prompt"}
          />

          <div className={styles.bottomRow}>
            <div className={styles.toolsLeft}>
              <input
                ref={fileRef}
                type="file"
                multiple
                hidden
                onChange={(e) => onAttach?.(e.target.files)}
              />
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => fileRef.current?.click()}
                aria-label="Attach files"
                disabled={disabled}
              >
                <PaperclipIcon />
              </button>

              <button
                type="button"
                className={styles.toolButton}
                data-active={research || undefined}
                aria-pressed={research}
                onClick={toggleResearch}
                disabled={disabled}
              >
                <ResearchIcon />
                <span className={styles.toolLabel}>Research</span>
              </button>

              <Menu
                label={sourceLabel}
                icon={<GlobeIcon />}
                options={sources}
                value={sourceId}
                disabled={disabled}
                onSelect={(id) => {
                  setSourceId(id);
                  onSourceChange?.(id);
                }}
              />

              <Menu
                label={model}
                options={models.map((m) => ({ id: m, label: m }))}
                value={model}
                disabled={disabled}
                onSelect={(id) => {
                  setModel(id);
                  onModelChange?.(id);
                }}
              />
            </div>

            <div className={styles.toolsRight}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={onMic}
                aria-label="Voice input"
                disabled={disabled}
              >
                <MicIcon />
              </button>
              <button
                type="button"
                className={styles.sendButton}
                onClick={handleSend}
                aria-label="Send"
                disabled={!canSend}
              >
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

"use client";

import { useState } from "react";
import { PromptComposer } from "@/components/ui/prompt-composer";

/**
 * Interactive demo wrapper used on the landing page and docs.
 * Shows the composer plus a small log of submitted prompts.
 */
export function ComposerDemo() {
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <PromptComposer
        onSend={(text) => setLog((l) => [text, ...l].slice(0, 4))}
        models={["Claude Opus 4.8", "Claude Sonnet 5", "GPT-5", "Llama 4"]}
        sources={[
          { id: "all", label: "All sources" },
          { id: "web", label: "Web" },
          { id: "docs", label: "My docs" },
          { id: "github", label: "GitHub" },
        ]}
      />
      <div className="min-h-5 text-center text-sm text-fd-muted-foreground">
        {log.length === 0 ? (
          <span>Type a prompt and press Enter ↵</span>
        ) : (
          <span>
            Last sent: <span className="font-medium text-fd-foreground">“{log[0]}”</span>
          </span>
        )}
      </div>
    </div>
  );
}

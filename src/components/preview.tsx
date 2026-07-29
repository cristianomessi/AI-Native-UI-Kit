import type { ReactNode } from "react";

/** A framed, centered surface for showcasing a live component in the docs. */
export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 flex min-h-64 w-full items-center justify-center rounded-xl border border-fd-border bg-fd-card/40 p-8">
      {children}
    </div>
  );
}

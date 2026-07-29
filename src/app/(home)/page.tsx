import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Terminal,
  Accessibility,
  Palette,
  Sparkles,
} from "lucide-react";
import { ComposerDemo } from "@/components/composer-demo";

const features = [
  {
    icon: Blocks,
    title: "Composable",
    desc: "Small, focused building blocks you combine into your own AI interfaces.",
  },
  {
    icon: Terminal,
    title: "Registry install",
    desc: "Add components straight into your app with the shadcn CLI — you own the code.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    desc: "Keyboard navigation, ARIA roles, and focus states built in from the start.",
  },
  {
    icon: Palette,
    title: "Themeable",
    desc: "Styled with CSS variables and dark-mode aware out of the box.",
  },
];

const components = [
  {
    name: "Prompt Composer",
    href: "/docs/components/prompt-composer",
    desc: "Chat input with context pill, attach, research, source & model selectors, mic, and send.",
    status: "Ready",
  },
  {
    name: "Private Composer",
    href: "/docs/components/private-composer",
    desc: "A dark, compact prompt composer with a private-mode toggle.",
    status: "Ready",
  },
  {
    name: "Attachment Composer",
    href: "/docs/components/attachment-composer",
    desc: "A composer that shows attached files as removable chips.",
    status: "Ready",
  },
  {
    name: "Follow-up Suggestions",
    href: "/docs/components/follow-up",
    desc: "A compact follow-up input with clickable suggestion chips.",
    status: "Ready",
  },
  {
    name: "Inline Action",
    href: "/docs/components/inline-action",
    desc: "A block of content with a floating contextual AI action.",
    status: "Ready",
  },
  {
    name: "Response Actions",
    href: "/docs/components/response-actions",
    desc: "A change-response menu plus a feedback toolbar for AI answers.",
    status: "Ready",
  },
  {
    name: "Parameters",
    href: "/docs/components/parameters",
    desc: "A panel of sliders and a seed field for tuning generation parameters.",
    status: "Ready",
  },
  {
    name: "Caveat",
    href: "/docs/components/caveat",
    desc: "A disclaimer banner that warns users about AI limitations.",
    status: "Ready",
  },
  {
    name: "AI Button",
    href: "/docs/components/ai-button",
    desc: "A gradient call-to-action button for AI-powered actions.",
    status: "Ready",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--color-fd-primary) 18%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-14 text-center sm:pt-28">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-sm text-fd-muted-foreground">
            <Sparkles className="size-3.5 text-fd-primary" />
            Components for AI-native apps
          </span>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            The UI kit for building{" "}
            <span className="text-fd-primary">AI-native</span> interfaces
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg text-fd-muted-foreground">
            Composable, accessible React components for chat, prompts, and
            agents. Copy-paste or install via the CLI — the code is yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse components <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/docs/components/prompt-composer"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            >
              View Prompt Composer
            </Link>
          </div>

          {/* Live demo */}
          <div className="mt-14 w-full max-w-2xl">
            <div className="rounded-2xl border border-fd-border bg-fd-card/40 p-6 shadow-sm sm:p-10">
              <ComposerDemo />
            </div>
            <p className="mt-3 text-xs text-fd-muted-foreground">
              A live, interactive component — try it.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-fd-border bg-fd-card p-5"
            >
              <f.icon className="size-5 text-fd-primary" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Components</h2>
          <Link
            href="/docs"
            className="text-sm text-fd-muted-foreground hover:text-fd-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold group-hover:text-fd-primary">
                  {c.name}
                </h3>
                <span
                  className={
                    "rounded-full px-2 py-0.5 text-xs " +
                    (c.status === "Ready"
                      ? "bg-fd-primary/10 text-fd-primary"
                      : "bg-fd-muted text-fd-muted-foreground")
                  }
                >
                  {c.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-fd-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

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
import { HeroBackground, Reveal } from "@/components/landing-fx";

const features = [
  {
    icon: Blocks,
    title: "Composable",
    desc: "Small, focused building blocks you combine into your own AI interfaces.",
    color: "#d946ef",
  },
  {
    icon: Terminal,
    title: "Registry install",
    desc: "Add components straight into your app with the shadcn CLI — you own the code.",
    color: "#8b5cf6",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    desc: "Keyboard navigation, ARIA roles, and focus states built in from the start.",
    color: "#3b82f6",
  },
  {
    icon: Palette,
    title: "Themeable",
    desc: "Styled with CSS variables and dark-mode aware out of the box.",
    color: "#ec4899",
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
        <HeroBackground />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:pt-28">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/70 px-3 py-1 text-sm text-fd-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-fuchsia-500" />
            Components for AI-native apps
          </span>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            The UI kit for building{" "}
            <span className="gradient-text">AI-native</span> interfaces
          </h1>
          <p className="mt-5 max-w-xl text-balance text-lg text-fd-muted-foreground">
            Composable, accessible React components for chat, prompts, and
            agents. Copy-paste or install via the CLI — the code is yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              Browse components{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/components/prompt-composer"
              className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-fd-accent"
            >
              View Prompt Composer
            </Link>
          </div>

          {/* Live demo */}
          <div className="mt-14 w-full max-w-2xl">
            <div className="glow-card rounded-2xl border border-fd-border bg-fd-card/50 p-6 shadow-sm backdrop-blur sm:p-10">
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
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="glow-card h-full rounded-xl border border-fd-border bg-fd-card p-5">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-lg"
                  style={{
                    background: `color-mix(in oklab, ${f.color} 15%, transparent)`,
                    color: f.color,
                  }}
                >
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Components</h2>
            <Link
              href="/docs"
              className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 80}>
              <Link
                href={c.href}
                className="glow-card group flex h-full flex-col rounded-xl border border-fd-border bg-fd-card p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold transition-colors group-hover:text-fuchsia-500">
                    {c.name}
                  </h3>
                  <span
                    className={
                      "rounded-full px-2 py-0.5 text-xs " +
                      (c.status === "Ready"
                        ? "bg-fuchsia-500/10 text-fuchsia-500"
                        : "bg-fd-muted text-fd-muted-foreground")
                    }
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-fd-muted-foreground">{c.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { Coffee } from "lucide-react";
import { gitConfig } from "@/lib/shared";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-fd-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="text-lg font-bold tracking-tight">AI Native UI Kit</div>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Composable, accessible React components for building AI-native
            interfaces.
          </p>
          <p className="mt-4 text-sm text-fd-muted-foreground">
            © {year} Balram Ravi. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/docs"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              Docs
            </Link>
            <Link
              href="/docs/components/prompt-composer"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              Components
            </Link>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              GitHub
            </a>
          </nav>

          <a
            href="https://buymeacoffee.com/balram93"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFDD00] px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            <Coffee className="size-4" />
            Buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}

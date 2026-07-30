"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Renders the animated aurora blobs plus a cursor-following spotlight.
 * Drop inside a `position: relative; overflow: hidden` hero section.
 */
export function HeroBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    const section = spot?.parentElement;
    if (!spot || !section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spot.style.setProperty("--mx", `${x}%`);
      spot.style.setProperty("--my", `${y}%`);
    };
    const enter = () => spot.setAttribute("data-active", "true");
    const leave = () => spot.setAttribute("data-active", "false");

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", enter);
    section.addEventListener("mouseleave", leave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", enter);
      section.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div ref={spotRef} className="spotlight" />
    </div>
  );
}

/** Reveals children with a fade-up the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    // Safety net: never leave content hidden if the observer doesn't fire.
    const fallback = setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={"reveal " + className}
      data-shown={shown || undefined}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

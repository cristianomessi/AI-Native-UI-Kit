"use client";

import { Sparkles } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface AIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label. Defaults to "Create With AI". */
  children?: ReactNode;
  /** Visual size. */
  size?: "sm" | "md" | "lg";
  /** Hide the leading sparkle icon. */
  hideIcon?: boolean;
}

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-6 text-base gap-2.5",
};

const iconSize = { sm: 15, md: 17, lg: 19 };

/** A gradient call-to-action button for AI-powered actions. */
export function AIButton({
  children = "Create With AI",
  size = "md",
  hideIcon = false,
  className = "",
  ...props
}: AIButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={
        "group inline-flex items-center justify-center rounded-xl font-semibold text-white " +
        "bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 " +
        "shadow-[0_6px_20px_-6px_rgba(192,38,211,0.7)] " +
        "transition-all hover:brightness-110 hover:shadow-[0_8px_26px_-6px_rgba(192,38,211,0.85)] " +
        "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 " +
        "disabled:cursor-not-allowed disabled:opacity-60 " +
        sizes[size] +
        " " +
        className
      }
    >
      {!hideIcon && (
        <Sparkles
          size={iconSize[size]}
          className="transition-transform group-hover:rotate-12"
        />
      )}
      {children}
    </button>
  );
}

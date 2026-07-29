import React from "react";
import type { CategoryColor } from "@/lib/blog";

// The one place on /blog that isn't brand red. Structure — eyebrows, CTAs,
// active filter pills — stays red; the category chip varies so the archive is
// scannable, the way usfdemolition.com colour-codes its guides.
//
// Every class string below is written out in full. Tailwind v4 scans source
// text for class names, so a template-built string like `bg-cat-${color}/10`
// would compile to nothing at all.
const BADGE_CLASSES: Record<CategoryColor, string> = {
  red: "bg-brand-red/10 text-brand-red",
  blue: "bg-cat-blue/10 text-cat-blue",
  orange: "bg-cat-orange/10 text-cat-orange",
  teal: "bg-cat-teal/10 text-cat-teal",
  charcoal: "bg-brand-gray-900/10 text-brand-gray-700",
};

/** Solid variant, for placing over a photo where the tinted chip would vanish. */
const SOLID_CLASSES: Record<CategoryColor, string> = {
  red: "bg-brand-red text-white",
  blue: "bg-cat-blue text-white",
  orange: "bg-cat-orange text-white",
  teal: "bg-cat-teal text-white",
  charcoal: "bg-brand-gray-900 text-white",
};

export function CategoryBadge({
  label,
  color,
  variant = "tint",
}: {
  label: string;
  color: CategoryColor;
  variant?: "tint" | "solid";
}) {
  const palette = variant === "solid" ? SOLID_CLASSES : BADGE_CLASSES;
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${palette[color]}`}
    >
      {label}
    </span>
  );
}

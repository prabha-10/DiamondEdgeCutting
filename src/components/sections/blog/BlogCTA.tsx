import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// The red closing band. Markup is the one already duplicated across
// /projects and /projects/[slug]; extracted here with props so the two blog
// routes share a single copy rather than adding a third and fourth.
export function BlogCTA({
  heading,
  ctaLabel = "Discuss Your Project",
  ctaHref = "/contact",
}: {
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-32 bg-brand-red text-white text-center">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center gap-10">
        <h2 className="font-display font-medium text-white text-[40px] md:text-[64px] leading-[1.05] tracking-tight max-w-3xl">
          {heading}
        </h2>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-white text-brand-gray-900 font-medium text-[15px] px-7 py-3.5 hover:bg-brand-gray-300 transition-colors"
        >
          {ctaLabel}
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

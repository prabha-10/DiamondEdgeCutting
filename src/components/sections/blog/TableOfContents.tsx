"use client";

import React, { useEffect, useState } from "react";

// Sticky contents rail for the article page, built from the h2s in the body.
// Desktop only — below lg the article is a single column and a pinned rail
// would eat most of the screen.
//
// Ids are the Portable Text blocks' own _keys (see extractHeadings in
// src/lib/blog.ts), so this never has to slugify a heading or resolve two
// sections that happen to share a title.

export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // The top band is discounted because the header is fixed over it: a heading
    // scrolled to y=100 is visually behind the chrome, not the section being
    // read. The bottom band keeps the last heading from winning the whole time.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Article contents" className="hidden lg:block lg:sticky lg:top-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gray-500 mb-4">
        Contents
      </p>
      <ul className="flex flex-col gap-3 border-l border-brand-gray-300">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block -ml-px border-l-2 pl-4 font-['Inter_Display',sans-serif] text-[14px] leading-[1.45] transition-colors ${
                  isActive
                    ? "border-brand-red text-brand-red font-medium"
                    : "border-transparent text-brand-gray-500 hover:text-brand-gray-900"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import React from "react";

type TextCell = {
  type: "text";
  eyebrow: string;
  statement: string;
  caption: string;
};

type PhotoCell = {
  type: "photo";
  src: string;
  alt: string;
};

type Cell = TextCell | PhotoCell;

const cells: Cell[] = [
  // Row 1, text left, photos right
  {
    type: "text",
    eyebrow: "Mission",
    statement:
      "Deliver safe, efficient demolition that exceeds expectations on every site.",
    caption: "How we approach every project.",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80&auto=format&fit=crop",
    alt: "Construction crew on site",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1000&q=80&auto=format&fit=crop",
    alt: "Heavy excavator at work",
  },

  // Row 2, photos, text right
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1000&q=80&auto=format&fit=crop",
    alt: "Robotic demolition machine",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80&auto=format&fit=crop",
    alt: "Concrete chimney project",
  },
  {
    type: "text",
    eyebrow: "Vision",
    statement:
      "Be the Middle East's leading specialist demolition contractor.",
    caption: "Where we're going.",
  },

  // Row 3, text left, photos right
  {
    type: "text",
    eyebrow: "Values",
    statement:
      "Cost efficiency · On-time delivery · Skilled workforce · Specialist experience · Latest technology.",
    caption: "Five non-negotiables we won't compromise on.",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1000&q=80&auto=format&fit=crop",
    alt: "Active demolition site",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80&auto=format&fit=crop",
    alt: "High-rise project",
  },
];

function TextCard({ cell }: { cell: TextCell }) {
  return (
    <div className="aspect-[4/3] rounded-[28px] bg-brand-gray-100 p-7 md:p-9 flex flex-col items-center justify-center text-center gap-5 border border-transparent transition-all duration-300 hover:bg-white hover:border-brand-gray-300 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]">
      <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
        {cell.eyebrow}
      </span>
      <p className="font-sans italic font-medium text-brand-gray-900 text-[18px] md:text-[20px] leading-[1.35] tracking-tight max-w-[28ch]">
        &ldquo;{cell.statement}&rdquo;
      </p>
      <span className="w-10 h-px bg-brand-gray-300" aria-hidden />
      <span className="font-['Inter_Display',sans-serif] text-[13px] text-brand-gray-500 max-w-[26ch]">
        {cell.caption}
      </span>
    </div>
  );
}

function PhotoCard({ cell }: { cell: PhotoCell }) {
  return (
    <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-brand-gray-100 group">
      <img
        src={cell.src}
        alt={cell.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

export function MissionVision() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header, left-aligned (original) */}
        <div className="flex flex-col gap-6 mb-20 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
            <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
              How We Work
            </span>
          </div>
          <h2 className="font-sans font-medium text-brand-gray-900 text-[44px] md:text-[64px] leading-[1.02] tracking-tight">
            What we&apos;re here to do
            <br className="hidden md:block" /> and where we&apos;re going.
          </h2>
        </div>

        {/* Bento grid: 3 cols × 3 rows = 9 cells (3 text + 6 photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cells.map((cell, i) =>
            cell.type === "text" ? (
              <TextCard key={i} cell={cell} />
            ) : (
              <PhotoCard key={i} cell={cell} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

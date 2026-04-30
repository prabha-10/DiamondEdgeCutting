import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Sparkles,
  Users,
  Layers,
  Ruler,
  House,
  Box,
  Weight,
  Recycle,
} from "lucide-react";

type Stat = {
  icon: React.ElementType;
  label: string;
};

type RentalCategory = {
  name: string;
  line: string;
  href: string;
  image: string;
  badge: string;
  stats: [Stat, Stat];
};

const rentalCategories: RentalCategory[] = [
  {
    name: "Robotic Demolition Machines",
    line: "Brokk and Husqvarna DXR rigs, sized for confined, noise-sensitive, and emission-controlled sites.",
    href: "/rental-equipment/robotic-demolition-machines",
    image:
      "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=900&q=80&auto=format&fit=crop",
    badge: "Specialist Fleet",
    stats: [
      { icon: Layers, label: "9 models" },
      { icon: Users, label: "Operator-led" },
    ],
  },
  {
    name: "Excavators",
    line: "14 to 50 ton excavators, plus 26-metre long-reach for high-clearance demolition.",
    href: "/rental-equipment/excavators",
    image:
      "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=900&q=80&auto=format&fit=crop",
    badge: "14 to 50 Ton",
    stats: [
      { icon: Ruler, label: "26m reach" },
      { icon: Users, label: "Wet or dry" },
    ],
  },
  {
    name: "Mini Excavators",
    line: "KOBELCO and Hitachi mini fleets for basements, podium decks, and tight-access refurb.",
    href: "/rental-equipment/mini-excavators",
    image:
      "https://images.unsplash.com/photo-1649829809465-d358fce60ebd?w=900&q=80&auto=format&fit=crop",
    badge: "Tight Access",
    stats: [
      { icon: House, label: "Indoor-capable" },
      { icon: Users, label: "Day to month" },
    ],
  },
  {
    name: "Skid Steers",
    line: "Compact loaders for strip-out, debris handling, and post-demolition site clearance.",
    href: "/rental-equipment/skid-steers",
    image:
      "https://images.unsplash.com/photo-1545426373-6588267475be?w=900&q=80&auto=format&fit=crop",
    badge: "Indoor-Capable",
    stats: [
      { icon: Box, label: "Compact" },
      { icon: Users, label: "Wet or dry" },
    ],
  },
  {
    name: "Wheel Loaders",
    line: "Heavy load-out and material handling on live demolition and enabling-works packages.",
    href: "/rental-equipment/wheel-loaders",
    image:
      "https://images.unsplash.com/photo-1630288214032-2c4cc2c080ca?w=900&q=80&auto=format&fit=crop",
    badge: "Heavy Load-Out",
    stats: [
      { icon: Weight, label: "High capacity" },
      { icon: Users, label: "With operator" },
    ],
  },
  {
    name: "Waste Removal Skips and Lorries",
    line: "12 and 22 CBM skips, 3 to 18 CBM lorries, debris cleared site-direct.",
    href: "/rental-equipment/waste-removal",
    image:
      "https://images.unsplash.com/photo-1746349086423-06ea6b4d73f7?w=900&q=80&auto=format&fit=crop",
    badge: "Site-Direct",
    stats: [
      { icon: Recycle, label: "Recycling-led" },
      { icon: Users, label: "Drivers included" },
    ],
  },
];

const trustItems = [
  "300+ trained crew",
  "ISO 45001 safety",
  "Dubai Municipality G+12 approved",
  "Same-day quotes for live tenders",
];

export function RentalTeaser() {
  return (
    <section className="py-32 bg-brand-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header — 8/12 left, 4/12 right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Left: eyebrow + headline */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
                Equipment Rental
              </span>
            </div>
            <h2 className="font-sans font-medium text-white text-[40px] md:text-[56px] leading-[1.02] tracking-tight">
              The GCC&apos;s largest specialist fleet,
              <br className="hidden md:block" /> mobilised on your programme.
            </h2>
          </div>

          {/* Right: subhead + CTAs (right-aligned on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:items-end lg:text-right lg:justify-end">
            <p className="font-['Inter_Display',sans-serif] font-normal text-[18px] leading-[1.55] text-brand-gray-300 max-w-[620px]">
              From Brokk robotic demolition rigs to 26-metre long-reach excavators, every machine ships with a trained operator, full spec sheet, and the safety paperwork your main contractor already expects.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
              <Button asChild variant="brand" size="lg">
                <Link href="/rental-equipment">Browse Fleet</Link>
              </Button>
              <Link
                href="/contact"
                className="font-['Inter_Display',sans-serif] text-[15px] font-medium text-brand-gray-300 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                Talk to the hire team
              </Link>
            </div>
          </div>
        </div>

        {/* 6-card grid: 1 / 2 / 3 columns — full-bleed image with frosted-glass content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[4/5] rounded-[28px] overflow-hidden bg-brand-gray-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]"
            >
              {/* Full-bleed image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Vertical gradient for legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/65"
                aria-hidden
              />

              {/* Top: badge pill */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-white text-[12px] font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                  {category.badge}
                </span>
              </div>

              {/* Bottom: name + frosted-glass content panel */}
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3">
                <h3 className="font-sans font-semibold text-white text-[22px] leading-[1.15] tracking-tight px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  {category.name}
                </h3>

                <div className="rounded-[20px] bg-white/12 backdrop-blur-xl border border-white/20 px-5 py-4 flex flex-col gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <p className="font-['Inter_Display',sans-serif] font-normal text-[13.5px] leading-[1.5] text-white/85">
                    {category.line}
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-x-3.5 gap-y-1 flex-wrap">
                      {category.stats.map((stat) => {
                        const StatIcon = stat.icon;
                        return (
                          <span
                            key={stat.label}
                            className="inline-flex items-center gap-1.5 font-['Inter_Display',sans-serif] text-[12.5px] text-white/85"
                          >
                            <StatIcon className="w-3.5 h-3.5" strokeWidth={1.8} />
                            {stat.label}
                          </span>
                        );
                      })}
                    </div>
                    <span
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/30 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all duration-300 group-hover:bg-white group-hover:text-brand-gray-900 group-hover:border-white"
                      aria-hidden
                    >
                      Hire
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-['Inter_Display',sans-serif] text-[14px] text-brand-gray-500">
          {trustItems.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && (
                <span aria-hidden className="text-brand-gray-700">
                  ·
                </span>
              )}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

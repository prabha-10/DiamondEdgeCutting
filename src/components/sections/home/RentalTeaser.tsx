import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

type RentalCategory = {
  name: string;
  line: string;
  href: string;
};

const rentalCategories: RentalCategory[] = [
  {
    name: "Robotic Demolition Machines",
    line: "Brokk and Husqvarna DXR rigs, sized for confined, noise-sensitive, and emission-controlled sites.",
    href: "/rental-equipment/robotic-demolition-machines",
  },
  {
    name: "Excavators",
    line: "14 to 50 ton excavators, plus 26-metre long-reach for high-clearance demolition.",
    href: "/rental-equipment/excavators",
  },
  {
    name: "Mini Excavators",
    line: "KOBELCO and Hitachi mini fleets for basements, podium decks, and tight-access refurb.",
    href: "/rental-equipment/mini-excavators",
  },
  {
    name: "Skid Steers",
    line: "Compact loaders for strip-out, debris handling, and post-demolition site clearance.",
    href: "/rental-equipment/skid-steers",
  },
  {
    name: "Wheel Loaders",
    line: "Heavy load-out and material handling on live demolition and enabling-works packages.",
    href: "/rental-equipment/wheel-loaders",
  },
  {
    name: "Waste Removal Skips and Lorries",
    line: "12 and 22 CBM skips, 3 to 18 CBM lorries, debris cleared site-direct.",
    href: "/rental-equipment/waste-removal",
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
    <section className="py-16 md:py-24 bg-brand-red text-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-10 pb-10 border-b border-white/20">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-white/80">
                Equipment Rental
              </span>
            </div>
            <h2 className="font-sans font-medium text-white text-[40px] md:text-[56px] leading-[1.02] tracking-tight">
              The GCC&apos;s largest specialist fleet,
              <br className="hidden md:block" /> mobilised on your programme.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 lg:items-end lg:text-right lg:justify-end">
            <p className="font-['Inter_Display',sans-serif] font-normal text-[18px] leading-[1.55] text-white/90 max-w-[620px]">
              From Brokk robotic demolition rigs to 26-metre long-reach excavators, every machine ships with a trained operator, full spec sheet, and the safety paperwork your main contractor already expects.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
              <Button
                asChild
                variant="brand"
                size="lg"
                className="!bg-white !border-white !text-brand-red hover:!bg-brand-gray-100 hover:!border-brand-gray-100 [&_span]:bg-brand-red [&_span]:text-white"
              >
                <Link href="/rental-equipment">Browse Fleet</Link>
              </Button>
              <Link
                href="/contact"
                className="font-['Inter_Display',sans-serif] text-[15px] font-medium text-white/80 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                Talk to the hire team
              </Link>
            </div>
          </div>
        </div>

        {/* Category list */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20">
          {rentalCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex items-start justify-between gap-4 py-5 border-b border-white/15 hover:opacity-75 transition-opacity"
            >
              <div>
                <p className="font-sans font-medium text-white text-[18px] tracking-tight">
                  {category.name}
                </p>
                <p className="font-['Inter_Display',sans-serif] text-[14px] text-white/65 mt-1 leading-[1.5]">
                  {category.line}
                </p>
              </div>
              <ArrowUpRight className="shrink-0 w-4 h-4 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-['Inter_Display',sans-serif] text-[14px] text-white">
          {trustItems.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && (
                <span aria-hidden className="text-white/60">
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

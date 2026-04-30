import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: "26m", label: "Long-reach capability" },
  { value: "Brokk 500", label: "Flagship robotic rig" },
  { value: "G+12", label: "DM-approved high-rise" },
  { value: "300+", label: "Trained crew" },
];

export function ServiceHero() {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden border-b border-white/10">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=2000&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-black/40"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
            <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-white/75">
              Demolition Services
            </span>
          </div>
          <h1 className="font-sans font-medium text-white text-[56px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
            Engineering-led
            <br className="hidden md:block" /> demolition.
          </h1>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-12 border-t border-white/15">
          <p className="lg:col-span-7 font-['Inter_Display',sans-serif] font-normal text-[19px] md:text-[22px] leading-[1.5] text-white/85 max-w-2xl">
            From 90-metre chimney towers to confined-space refractory works — every scope planned, sequenced, and delivered with the GCC&apos;s largest specialist robotic fleet.
          </p>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Button asChild variant="brand" size="lg">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>

        {/* Stats strip — white cards pop on the dark image */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/95 backdrop-blur-sm rounded-[16px] p-5 flex flex-col gap-2"
            >
              <span className="font-sans font-medium text-brand-gray-900 text-[36px] md:text-[44px] leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="font-['Inter_Display',sans-serif] text-[13px] text-[#707070]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

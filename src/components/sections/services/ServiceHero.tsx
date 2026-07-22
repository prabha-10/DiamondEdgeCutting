import React from "react";
import { ChevronDown } from "lucide-react";

const stats = [
  { value: "350+", label: "Owned assets" },
  { value: "25+", label: "Robotic demolition machines" },
  { value: "1.7–50t", label: "Excavator capability" },
  { value: "26m", label: "Long-reach capability" },
];

export function ServiceHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden border-b border-white/10">
      {/* Background image */}
      <img
        src="/service-section-bg.jpeg"
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
          <h1 className="font-display font-medium text-white text-[56px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
            Engineering-led
            <br className="hidden md:block" /> demolition.
          </h1>
        </div>

        <div className="mt-10 pt-10 border-t border-white/15">
          <p className="font-['Inter_Display',sans-serif] font-normal text-[19px] md:text-[22px] leading-[1.5] text-white/85 max-w-2xl">
            From 90-metre chimney towers to confined-space refractory works, every scope planned, sequenced, and delivered with the GCC&apos;s largest specialist robotic fleet.
          </p>
        </div>

        {/* Stats strip, white cards pop on the dark image */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/95 backdrop-blur-sm rounded-[16px] p-5 flex flex-col gap-2"
            >
              <span className="font-sans font-medium text-brand-gray-900 text-[36px] md:text-[44px] leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="font-['Inter_Display',sans-serif] text-[13px] text-brand-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#service-details"
        aria-label="Scroll to content"
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 group-hover:text-white transition-colors">
          Scroll
        </span>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white group-hover:bg-white group-hover:text-brand-gray-900 transition-colors">
          <ChevronDown className="w-5 h-5 animate-bounce" strokeWidth={2} />
        </span>
      </a>
    </section>
  );
}

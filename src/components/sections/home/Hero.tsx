"use client";

import React from "react";
import { useIntro } from "@/context/IntroContext";

const slideUp = (delay: number, revealed: boolean): React.CSSProperties => ({
  opacity: revealed ? 1 : 0,
  transform: revealed ? "translateY(0px)" : "translateY(56px)",
  transition: `opacity 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

const stats: Array<{ num: string; label: string }> = [
  { num: "30+", label: "Years in industry" },
  { num: "120+", label: "Skilled team" },
  { num: "350+", label: "Plant & Equipment" },
  { num: "No. 1", label: "Robotic fleet in GCC" },
];

export function Hero() {
  const { introComplete } = useIntro();

  return (
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-20 bg-black">
        {/* Background image — robotic demolition machine. Portrait crop on
            mobile, landscape on larger screens; subject sits opposite the text. */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/hero-mobile.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/hero-desktop.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

        {/* Faint editorial grid, mirrors the reference HTML */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-6xl">
            {/* Display headline */}
            <div style={slideUp(120, introComplete)}>
              <h1 className="font-hero uppercase leading-[0.95] tracking-tight">
                <div className="text-[9vw] md:text-[6rem] lg:text-[7.5rem]">
                  <span className="text-white">WE </span>
                  <span className="text-brand-red">DEMOLISH.</span>
                </div>
                <div className="text-[9vw] md:text-[6rem] lg:text-[7.5rem] text-white">
                  WE CUT. WE DRILL.
                </div>
                <div className="text-[9vw] md:text-[6rem] lg:text-[7.5rem] text-white/55">
                  WE DELIVER.
                </div>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="mt-8 max-w-4xl text-base md:text-lg text-white/80 leading-[1.6] font-['Inter_Display',sans-serif]"
              style={slideUp(250, introComplete)}
            >
              <strong className="text-white font-semibold">Diamond Edge Cutting LLC</strong>{" "}is the GCC&apos;s leading specialist demolition contractor, providing controlled demolition, robotic demolition, specialist concrete cutting and core drilling services across the UAE, Oman, Saudi Arabia, Qatar, Bahrain &amp; Kuwait.
            </p>

            {/* 4-up hero stats */}
            <div
              className="mt-9 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-10 gap-y-6 md:gap-y-8 border-t border-white/15 pt-7 md:pt-10 max-w-4xl"
              style={slideUp(360, introComplete)}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 items-center text-center">
                  <span className="font-display font-extrabold text-white text-[30px] sm:text-[34px] md:text-[44px] leading-none tracking-tight tabular-nums">
                    {s.num}
                  </span>
                  <span className="font-display font-extrabold text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.16em] text-white/65 text-balance">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

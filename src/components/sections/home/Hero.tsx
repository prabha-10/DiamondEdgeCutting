"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { VideoIntro } from "@/components/ui/VideoIntro";
import { useIntro } from "@/context/IntroContext";

const slideUp = (delay: number, revealed: boolean): React.CSSProperties => ({
  opacity: revealed ? 1 : 0,
  transform: revealed ? "translateY(0px)" : "translateY(56px)",
  transition: `opacity 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

const stats: Array<{ num: string; label: string }> = [
  { num: "30+", label: "Years in industry" },
  { num: "300+", label: "Skilled team" },
  { num: "G+12", label: "Approved demolition" },
  { num: "N°1", label: "Robotic fleet in GCC" },
];

export function Hero() {
  const { introComplete, markIntroComplete } = useIntro();

  return (
    <>
      <VideoIntro onComplete={markIntroComplete} />

      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-20 bg-black">
        {/* Looping background video */}
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />

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
            {/* Pulse-dot meta */}
            <div className="flex items-center gap-3 mb-8" style={slideUp(0, introComplete)}>
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-brand-red animate-ping opacity-75" />
                <span className="relative rounded-full bg-brand-red w-2.5 h-2.5" />
              </span>
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-brand-red">
                DM G+12 Approved · ISO 9001 / 14001 / 45001
              </span>
            </div>

            {/* Display headline with italic accent */}
            <div style={slideUp(120, introComplete)}>
              <h1 className="font-display font-extrabold uppercase text-white text-[14vw] md:text-[8rem] lg:text-[10rem] leading-[0.92] tracking-tight">
                Precision.
                <br />
                <em className="font-light italic text-white/55 normal-case">Demolition.</em>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="mt-8 max-w-3xl text-lg md:text-xl text-white/85 leading-[1.55] font-['Inter_Display',sans-serif]"
              style={slideUp(250, introComplete)}
            >
              Diamond Edge Cutting is the GCC&apos;s leading specialist demolition contractor,
              delivering controlled demolition, robotic systems, concrete cutting and core drilling
              to the highest standards of safety and precision.
            </p>

            {/* 4-up hero stats */}
            <div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-white/15 pt-10 max-w-4xl"
              style={slideUp(360, introComplete)}
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-display font-extrabold text-white text-[40px] md:text-[52px] leading-none tracking-tight tabular-nums">
                    {s.num}
                  </span>
                  <span className="font-mono text-[10.5px] md:text-[11px] uppercase tracking-[0.16em] text-white/65">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mt-12"
              style={slideUp(480, introComplete)}
            >
              <Button asChild size="lg" variant="brand">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 border-white text-white hover:bg-white hover:text-brand-gray-900"
              >
                <Link href="/rental-equipment">View Fleet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

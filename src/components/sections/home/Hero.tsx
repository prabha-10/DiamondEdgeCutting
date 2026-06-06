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
  { num: "120+", label: "Skilled team" },
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
                  WITH SURGICAL CONTROL.
                </div>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="mt-8 max-w-4xl text-base md:text-lg text-white/80 leading-[1.6] font-['Inter_Display',sans-serif]"
              style={slideUp(250, introComplete)}
            >
              <strong className="text-white font-semibold">Diamond Edge Cutting LLC</strong>{" "}is the GCC&apos;s leading specialist demolition contractor — controlled demolition, robotic systems, concrete cutting and core drilling delivered to the highest standards of safety, professionalism and quality. Operating across the UAE, Oman, Saudi Arabia, Qatar, Bahrain &amp; Kuwait.
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={slideUp(600, introComplete)}>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>
    </>
  );
}

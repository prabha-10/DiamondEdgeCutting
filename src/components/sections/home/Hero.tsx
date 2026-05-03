"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DemolitionButton } from "@/components/ui/DemolitionButton";
import { VideoIntro } from "@/components/ui/VideoIntro";
import { useIntro } from "@/context/IntroContext";

const slideUp = (delay: number, revealed: boolean): React.CSSProperties => ({
  opacity: revealed ? 1 : 0,
  transform: revealed ? "translateY(0px)" : "translateY(56px)",
  transition: `opacity 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  willChange: "opacity, transform",
});

export function Hero() {
  const { introComplete, markIntroComplete } = useIntro();

  return (
    <>
      {/* Fullscreen intro overlay, plays video for 3s, locks scroll, then fades out */}
      <VideoIntro onComplete={markIntroComplete} />

      {/* Hero section, always rendered but content hidden until intro fires */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-32 bg-black">

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

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-6xl">

            <div style={slideUp(0, introComplete)}>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white leading-[0.9] tracking-tighter">
                Precision
              </h1>
            </div>

            <div style={slideUp(120, introComplete)}>
              <p className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white/45 leading-[0.9] tracking-tighter mb-6">
                Demolition.
              </p>
            </div>

            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4"
              style={slideUp(250, introComplete)}
            >
              <p className="text-xl md:text-2xl text-white/80 max-w-xl font-medium leading-relaxed">
                Specialist demolition, concrete cutting, and heavy-equipment rental across the GCC.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              style={slideUp(400, introComplete)}
            >
              <DemolitionButton 
                size="lg" 
                variant="brand"
                onClick={() => window.location.href='/contact'}
              >
                Start Your Project
              </DemolitionButton>
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

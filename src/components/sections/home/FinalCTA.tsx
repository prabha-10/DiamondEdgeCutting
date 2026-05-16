import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-brand-red text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                — 09 / Get in touch
              </span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-white text-[44px] md:text-[64px] lg:text-[72px] leading-[0.95] tracking-tight">
              Have a structure that needs to{" "}
              <em className="not-italic">come down?</em>
            </h2>
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.65] text-white/80 max-w-2xl">
              Tell us about your project, site, scope, timeline. Our commercial and operational
              teams will respond with a detailed proposal, methodology and program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Button
              asChild
              variant="brand"
              size="lg"
              className="!bg-white !border-white !text-brand-red hover:!bg-brand-gray-100 hover:!border-brand-gray-100 [&_span]:bg-brand-red [&_span]:text-white"
            >
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60"
            >
              <Link href="/rental-equipment">Rent Equipment</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function RentalTeaser() {
  return (
    <section className="py-16 md:py-24 bg-brand-red text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
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
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";

// Slim closing band. One CTA to /contact, one tel link. No form, no
// offices block, per the client's homepage scope.

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-brand-gray-900 text-white">
      {/* Faint editorial grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
                Get in touch
              </span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-white text-[44px] md:text-[64px] lg:text-[72px] leading-[0.95] tracking-tight">
              Have a project?
              <br />
              <em className="font-light italic text-white/55 normal-case">Get in touch.</em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <Button asChild variant="brand" size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <a
              href="tel:+97143706434"
              className="inline-flex items-center justify-center gap-2 px-6 h-14 rounded-full border-2 border-white/30 text-white font-sans font-bold text-base hover:bg-white hover:text-brand-gray-900 hover:border-white transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              +971 4 370 6434
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

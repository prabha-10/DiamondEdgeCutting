import React from "react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";

// Block 2 from the client's homepage spec. Two cards (Mission on white,
// Vision on dark) with the section head pattern above.

export function MissionVision() {
  return (
    <section className="py-20 md:py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <EditorialSectionHead
          number="02"
          eyebrow="Mission & Vision"
          title={
            <>
              Where we stand,
              <br />
              <em>where we&apos;re going.</em>
            </>
          }
          lede="Two short statements that frame how we work today and what we&rsquo;re building toward."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mt-14 md:mt-20">
          {/* Mission, light card */}
          <article className="bg-white rounded-[28px] p-8 md:p-12 flex flex-col gap-6 border border-brand-gray-300">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
                Our Mission
              </span>
            </div>
            <p className="font-display font-bold text-brand-gray-900 text-[26px] md:text-[34px] leading-[1.12] tracking-tight">
              To deliver innovative, safe, and efficient demolition solutions that exceed client
              expectations while maintaining the highest standards of quality, professionalism, and
              environmental responsibility.
            </p>
            <p className="font-['Inter_Display',sans-serif] text-[16px] leading-[1.65] text-brand-gray-700">
              We are committed to building long-term client relationships based on trust and
              performance.
            </p>
          </article>

          {/* Vision, brand-red card */}
          <article className="bg-brand-red text-white rounded-[28px] p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden">
            {/* Faint grid pattern, like the reference HTML */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
                  Our Vision
                </span>
              </div>
              <p className="font-display font-bold text-white text-[26px] md:text-[34px] leading-[1.12] tracking-tight">
                To be recognised as the leading specialist demolition contractor in the Middle East
                region, setting industry benchmarks for safety, innovation, and operational
                excellence.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

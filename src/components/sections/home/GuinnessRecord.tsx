import React from "react";

// Track-record headline. Ported from the reference HTML's "record" section.
// Dark editorial layout, headline with red word emphasis on the left, a
// corner-bracket framed numeric card on the right.

export function GuinnessRecord() {
  return (
    <section className="py-20 md:py-32 bg-brand-gray-900 text-white relative overflow-hidden">
      {/* Soft red radial behind the right card */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200,16,46,0.18), transparent 65%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left, headline + meta */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-400">
              Guinness World Record · Officially Amazing
            </span>
          </div>

          <h2 className="font-display font-extrabold uppercase text-white text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight">
            Tallest building{" "}
            <em className="not-italic font-extrabold text-brand-red normal-case">ever demolished</em>
            <br />
            using{" "}
            <em className="not-italic font-extrabold text-brand-red normal-case">explosives.</em>
          </h2>

          <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.65] text-white/75 max-w-2xl">
            On 27 November 2020, in association with MODON Properties in Abu Dhabi, Diamond Edge
            Cutting set the Guinness World Record for the tallest building demolished using
            controlled explosives, a feat of engineering precision watched live around the world.
          </p>

          {/* Meta rows */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 pt-8 border-t border-white/10">
            {[
              ["Client", "MODON Properties"],
              ["Location", "Abu Dhabi, UAE"],
              ["Date", "27 Nov 2020"],
              ["Method", "Controlled Demolition"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">
                  {label}
                </span>
                <span className="font-display font-bold uppercase text-white text-[18px] md:text-[20px] tracking-tight leading-[1.05]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right, numeric trophy card with corner-bracket frame */}
        <div className="lg:col-span-5 relative">
          {/* Corner brackets, brand-red */}
          <span
            aria-hidden
            className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-brand-red"
          />
          <span
            aria-hidden
            className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-brand-red"
          />
          <span
            aria-hidden
            className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-brand-red"
          />
          <span
            aria-hidden
            className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-brand-red"
          />

          <div className="bg-[#0c0c10] border border-white/10 rounded-md px-8 py-12 md:py-16 flex flex-col items-center text-center gap-6">
            <div className="font-display font-extrabold uppercase text-white text-[88px] md:text-[120px] lg:text-[140px] leading-none tracking-tight tabular-nums">
              165<span className="text-brand-red">.</span>032
            </div>
            <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand-red">
              Metres
            </div>
            <div className="w-32 h-px bg-white/10" aria-hidden />
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">
                ≈ 541.44 ft · Meena Plaza Tower
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                — Officially the tallest in the world
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

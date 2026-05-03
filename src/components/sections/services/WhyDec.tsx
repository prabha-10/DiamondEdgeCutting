import React from "react";
import { Bot, Calendar, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Bot,
    title: "Largest robotic fleet",
    description:
      "Brokk 500 down to Brokk 160. Husqvarna DXR 300, 305 and 145. Sized for any access constraint.",
  },
  {
    icon: Calendar,
    title: "30+ years of experience",
    description:
      "Roots in European specialist demolition. Operating across the GCC since 2008 with 300+ trained crew.",
  },
  {
    icon: ShieldCheck,
    title: "Authority-compliant by default",
    description:
      "ISO 9001, 14001, 45001 certified. Dubai Municipality G+12 approved. ICV and CICSPA accredited.",
  },
];

export function WhyDec() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14 pb-14 border-b border-brand-gray-300">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand-red"
                aria-hidden
              />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
                Why DEC
              </span>
            </div>
            <h2 className="font-sans font-medium text-brand-gray-900 text-[40px] md:text-[56px] leading-[1.05] tracking-tight">
              Built around the
              <br className="hidden md:block" /> trickiest jobs.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 lg:justify-end">
            <p className="font-['Inter_Display',sans-serif] font-normal text-[17px] leading-[1.55] text-brand-gray-500">
              We get called when a structure is too sensitive, too constrained,
              or too high-stakes for general demolition. Three reasons it works
              out.
            </p>
          </div>
        </div>

        {/* Reasons cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <div
                key={r.title}
                className="bg-brand-red text-white rounded-[24px] p-7 flex flex-col gap-6 min-h-[280px]"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold tracking-[0.14em] text-white/80 tabular-nums">
                    / {num}
                  </span>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <h3 className="font-sans font-semibold text-white text-[22px] leading-[1.2] tracking-tight">
                    {r.title}
                  </h3>
                  <p className="font-['Inter_Display',sans-serif] font-normal text-[14.5px] leading-[1.55] text-white/85">
                    {r.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

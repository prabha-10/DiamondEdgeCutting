"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  num: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const services: Service[] = [
  {
    num: "/001",
    title: "Controlled Demolition",
    description:
      "Major demolition using large machinery and engineered sequencing for safe, predictable structural takedowns.",
    tags: ["Hydraulic", "Manual", "Sequencing", "Heavy Plant"],
    href: "/demolition-services#controlled-demolition",
  },
  {
    num: "/002",
    title: "Robotic Demolition",
    description:
      "GCC's largest specialized robotic fleet, Brokk 500 to 160, for confined, high-precision demolition.",
    tags: ["Brokk 500", "Brokk 160", "Confined Spaces", "Indoor"],
    href: "/demolition-services#robotic-demolition",
  },
  {
    num: "/003",
    title: "Wire & Track Sawing",
    description:
      "Precision cutting for bridges, dams, and heavily reinforced concrete using diamond wire and track saws.",
    tags: ["Diamond Wire", "Track Saw", "Bridges", "Reinforced"],
    href: "/demolition-services#wire-sawing",
  },
  {
    num: "/004",
    title: "Core Drilling & Strip Out",
    description:
      "Selective demolition and heavy core drilling for renovations, retrofits, and MEP penetrations.",
    tags: ["Coring", "Strip Out", "Selective", "MEP"],
    href: "/demolition-services#core-drilling",
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-14 md:py-24 bg-brand-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header (full width) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="font-sans font-medium text-white text-[56px] leading-[1] tracking-tight">
            Our Core Services
          </h2>
          <Link
            href="/demolition-services"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-brand-gray-900 font-medium px-6 py-3 hover:bg-brand-gray-300 transition-colors"
          >
            <span>Explore More</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[467px_1fr] gap-10">
          {/* Left: testimonial card */}
          <aside className="bg-[#17171b] border border-white/10 rounded-[25px] p-9 flex flex-col">
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white/55" />
              <span className="font-['Inter_Display',sans-serif] text-[14px] text-white/65">
                Services
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <span className="font-sans font-medium text-white text-[44px] leading-none tracking-tight">
                  300+
                </span>
                <span className="font-['Inter_Display',sans-serif] text-[14px] text-white/55">
                  Trained professionals
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans font-medium text-white text-[44px] leading-none tracking-tight">
                  17+
                </span>
                <span className="font-['Inter_Display',sans-serif] text-[14px] text-white/55">
                  Years in the GCC
                </span>
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-1 text-brand-red">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="font-['Inter_Display',sans-serif] font-semibold text-white text-[16px] leading-[1.5]">
                DEC delivered our airport demolition on programme with zero safety incidents. Their robotic fleet handled the noise and vibration constraints in a live-environment site perfectly.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-white text-brand-gray-900 flex items-center justify-center font-sans font-semibold text-[14px]">
                  AM
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-white text-[15px] leading-tight">
                    A. Mansour
                  </span>
                  <span className="font-['Inter_Display',sans-serif] text-[13px] text-white/55 leading-tight">
                    Project Director, UAE main contractor
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: services list */}
          <div className="flex flex-col">
            {/* Service items */}
            <div className="flex flex-col">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={service.num}
                onMouseEnter={() => setOpenIndex(index)}
                className="border-b border-white/15 transition-all duration-300"
              >
                {/* Row header, always visible. */}
                <div className="w-full flex items-center justify-between gap-6 py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex-1 flex items-center gap-8 md:gap-16 text-left"
                  >
                    <span className="font-['Inter_Display',sans-serif] text-white/55 text-[15px] tabular-nums">
                      {service.num}
                    </span>
                    <h3 className="font-sans font-medium text-white text-[22px] md:text-[26px] tracking-tight">
                      {service.title}
                    </h3>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-label={isOpen ? "Close" : "Open"}
                    className={cn(
                      "shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                      isOpen
                        ? "bg-white text-brand-gray-900"
                        : "bg-white/10 text-white hover:bg-white/15 border border-white/15"
                    )}
                  >
                    <Plus
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Expanded content */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-700 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pb-8 max-w-3xl">
                      <p className="font-['Inter_Display',sans-serif] font-normal text-white/70 text-[18px] leading-[24px]">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/[0.06] border border-white/15 rounded-full px-4 py-2 text-[14px] font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

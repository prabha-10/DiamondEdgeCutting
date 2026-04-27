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
  image: string;
  href: string;
};

const services: Service[] = [
  {
    num: "/001",
    title: "Controlled Demolition",
    description:
      "Major demolition using large machinery and engineered sequencing for safe, predictable structural takedowns.",
    tags: ["Hydraulic", "Manual", "Sequencing", "Heavy Plant"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    href: "/demolition-services#controlled-demolition",
  },
  {
    num: "/002",
    title: "Robotic Demolition",
    description:
      "GCC's largest specialized robotic fleet — Brokk 500 to 160 — for confined, high-precision demolition.",
    tags: ["Brokk 500", "Brokk 160", "Confined Spaces", "Indoor"],
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&q=80",
    href: "/demolition-services#robotic-demolition",
  },
  {
    num: "/003",
    title: "Wire & Track Sawing",
    description:
      "Precision cutting for bridges, dams, and heavily reinforced concrete using diamond wire and track saws.",
    tags: ["Diamond Wire", "Track Saw", "Bridges", "Reinforced"],
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=80",
    href: "/demolition-services#wire-sawing",
  },
  {
    num: "/004",
    title: "Core Drilling & Strip Out",
    description:
      "Selective demolition and heavy core drilling for renovations, retrofits, and MEP penetrations.",
    tags: ["Coring", "Strip Out", "Selective", "MEP"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
    href: "/demolition-services#core-drilling",
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header (full width) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h2 className="font-sans font-medium text-brand-gray-900 text-[56px] leading-[1] tracking-tight">
            Our Services
          </h2>
          <Link
            href="/demolition-services"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gray-900 text-white font-medium px-6 py-3 hover:bg-brand-gray-700 transition-colors"
          >
            <span>Explore More</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[467px_1fr] gap-10">
          {/* Left: testimonial card */}
          <aside className="bg-white rounded-[25px] p-9 flex flex-col">
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-500" />
              <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                Services
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <span className="font-sans font-medium text-brand-gray-900 text-[44px] leading-none tracking-tight">
                  300+
                </span>
                <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                  Trained professionals
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans font-medium text-brand-gray-900 text-[44px] leading-none tracking-tight">
                  17+
                </span>
                <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                  Years in the GCC
                </span>
              </div>
            </div>

            <div className="mt-auto border-t border-brand-gray-300 pt-8 flex flex-col gap-4">
              <div className="flex items-center gap-1 text-[#FFB23F]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="font-['Inter_Display',sans-serif] font-semibold text-brand-gray-900 text-[16px] leading-[1.5]">
                DEC delivered our airport demolition on programme with zero safety incidents. Their robotic fleet handled the noise and vibration constraints in a live-environment site perfectly.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-brand-gray-900 text-white flex items-center justify-center font-sans font-semibold text-[14px]">
                  AM
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-brand-gray-900 text-[15px] leading-tight">
                    A. Mansour
                  </span>
                  <span className="font-['Inter_Display',sans-serif] text-[13px] text-[#707070] leading-tight">
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
                className="border-b border-brand-gray-300 transition-all duration-300"
              >
                {!isOpen && (
                  <button
                    onClick={() => setOpenIndex(index)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="font-['Inter_Display',sans-serif] text-brand-gray-500 text-[15px] tabular-nums">
                        {service.num}
                      </span>
                      <h3 className="font-sans font-medium text-brand-gray-900 text-[22px] md:text-[26px] tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                    <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-white text-brand-gray-900">
                      <Plus className="w-5 h-5" strokeWidth={2} />
                    </span>
                  </button>
                )}

                {/* Expanded content */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-700 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="relative grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 py-8 pr-16">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-gray-300">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-4 self-center">
                        <h4 className="font-sans font-semibold text-black text-[26px] leading-[33px] tracking-tight">
                          {service.title}
                        </h4>
                        <p className="font-['Inter_Display',sans-serif] font-normal text-[#707070] text-[18px] leading-[24px] max-w-xl">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-white rounded-full px-4 py-2 text-[14px] font-medium text-brand-gray-900"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setOpenIndex(-1)}
                        className="absolute top-8 right-0 shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-brand-gray-900 text-white transition-transform hover:scale-105"
                        aria-label="Close"
                      >
                        <Plus className="w-5 h-5 rotate-45" strokeWidth={2} />
                      </button>
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

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Service = {
  num: string;
  title: string;
  description: string;
  href?: string;
};

const services: Service[] = [
  {
    num: "01",
    title: "Controlled Demolition",
    description: "Large machinery and engineered sequencing for safe, predictable structural takedowns.",
    href: "/demolition-services#controlled-demolition",
  },
  {
    num: "02",
    title: "Robotic Demolition",
    description: "GCC's largest Brokk fleet for confined, high-precision, and emission-controlled environments.",
    href: "/demolition-services#robotic-demolition",
  },
  {
    num: "03",
    title: "Wire & Track Sawing",
    description: "Diamond wire and track saws for bridges, dams, and heavily reinforced concrete.",
    href: "/demolition-services#wire-sawing",
  },
  {
    num: "04",
    title: "Core Drilling & Strip Out",
    description: "Heavy core drilling and selective demolition for renovations, retrofits, and MEP penetrations.",
    href: "/demolition-services#core-drilling",
  },
  {
    num: "05",
    title: "Tunnelling, Refinery & Kiln Works",
    description: "Specialist demolition inside active refineries, kilns, and confined tunnelling environments.",
    href: "/demolition-services",
  },
  {
    num: "06",
    title: "Soft Demolition & Enabling Works",
    description: "Controlled strip-out, non-structural removal, and site preparation ahead of main works.",
    href: "/demolition-services",
  },
  {
    num: "07",
    title: "Floor Sawing & Scanning",
    description: "Flat-slab and slab-on-grade cutting with GPR scanning for MEP and structural penetrations.",
    href: "/demolition-services",
  },
  {
    num: "08",
    title: "Wall & Concrete Cutting",
    description: "Precision wall sawing and hand sawing for openings, pockets, and structural modifications.",
    href: "/demolition-services",
  },
  {
    num: "09",
    title: "Equipment Rental",
    description: "Brokk robots, excavators, mini excavators, skid steers, and waste removal with trained operators.",
    href: "/rental-equipment",
  },
];

export function Services() {
  return (
    <section className="py-10 md:py-16 bg-brand-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-sans font-medium text-white text-[40px] md:text-[56px] leading-[1] tracking-tight">
            Our Services
          </h2>
          <Link
            href="/demolition-services"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-brand-gray-900 font-medium px-6 py-3 hover:bg-brand-gray-300 transition-colors shrink-0"
          >
            <span>Explore All</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/15">
          {services.map((service) => (
            <div
              key={service.num}
              className="flex gap-5 py-6 border-b border-white/10"
            >
              <span className="font-mono text-white/40 text-[13px] tabular-nums shrink-0 pt-0.5">
                {service.num}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-medium text-white text-[20px] tracking-tight">
                  {service.title}
                </h3>
                <p className="font-['Inter_Display',sans-serif] text-[14px] text-white/60 leading-[1.5]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Service = {
  num: string;
  title: string;
  description: string;
  href: string;
  image: string;
  /** Tailwind object-position class when the photo's subject isn't centred. */
  imagePosition?: string;
};

// Titles, order, and anchor ids mirror src/data/services.ts (the detail page)
// so the two sections stay in sync. Source of truth: Website Structure doc.
const services: Service[] = [
  {
    num: "01",
    title: "Robotic Demolition",
    description: "GCC's largest Brokk fleet for confined, high-precision, and emission-controlled environments.",
    href: "/demolition-services#robotic-demolition",
    image: "/service-robotic-demolition.jpg",
  },
  {
    num: "02",
    title: "Controlled & Structural Demolition",
    description: "Large machinery and engineered sequencing for safe, predictable structural takedowns.",
    href: "/demolition-services#controlled-demolition",
    image: "/service-controlled-demolition.jpg",
  },
  {
    num: "03",
    title: "Wire Sawing",
    description: "Diamond wire saws for bridges, dams, and heavily reinforced concrete with no depth limit.",
    href: "/demolition-services#wire-sawing",
    image: "/service-wire-sawing.jpg",
  },
  {
    num: "04",
    title: "Wall Sawing & Track Sawing",
    description: "Track-mounted wall saws for fast, clean openings in reinforced concrete and masonry.",
    href: "/demolition-services#wall-sawing",
    image: "/service-wall-sawing.jpg",
    imagePosition: "object-bottom",
  },
  {
    num: "05",
    title: "Core Drilling",
    description: "Accurate holes from 14mm to 600mm, up to 24m deep, with no dust or vibration.",
    href: "/demolition-services#core-drilling",
    image: "/service-core-drilling.jpg",
  },
  {
    num: "06",
    title: "Refractory, Kiln & Tunnelling",
    description: "Confined-space robotic demolition for refractory linings, kilns, and tunnel cross-passages.",
    href: "/demolition-services#refractory-kiln",
    image: "/service-refractory-kiln.jpg",
  },
  {
    num: "07",
    title: "Floor & Road / Apron Sawing & Sealing",
    description: "Petrol, diesel, and electric saws for expansion joints, trench lines, and slab openings.",
    href: "/demolition-services#floor-sawing",
    image: "/service-floor-sawing.jpg",
  },
  {
    num: "08",
    title: "Soft Demolition & Strip Out (Shell & Core)",
    description: "Whole or selective strip-out back to shell and core for refurbishments and change-of-use.",
    href: "/demolition-services#strip-out",
    image: "/service-strip-out.jpg",
  },
];

const rentalService: Service = {
  num: "09",
  title: "Equipment Rental",
  description: "Brokk robots, excavators, mini excavators, skid steers, and waste removal with trained operators.",
  href: "/rental-equipment",
  image: "/products_brokk500sp-420x280.jpg",
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group flex flex-col bg-brand-red rounded-2xl overflow-hidden hover:bg-brand-red-dark transition-colors"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${service.imagePosition ?? ""}`}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans font-bold text-white text-[17px] leading-[1.2] tracking-tight">
            {service.title}
          </h3>
          <ArrowUpRight
            className="w-4 h-4 shrink-0 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            strokeWidth={2}
          />
        </div>
        <p className="font-['Inter_Display',sans-serif] text-[13px] text-white/80 leading-[1.55] flex-1">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-brand-gray-900 text-white">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>

        <div className="mt-4">
          <div className="bg-brand-red rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-sans font-bold text-white text-[20px] tracking-tight">
                  {rentalService.title}
                </h3>
                <p className="font-['Inter_Display',sans-serif] text-[14px] text-white/85 leading-[1.5]">
                  {rentalService.description}
                </p>
              </div>
              <Link
                href={rentalService.href}
                aria-label="Rent Equipment"
                className="group inline-flex items-center justify-center rounded-full bg-white text-brand-red w-12 h-12 hover:bg-brand-gray-100 transition-colors shrink-0 self-start md:self-auto md:ml-auto"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

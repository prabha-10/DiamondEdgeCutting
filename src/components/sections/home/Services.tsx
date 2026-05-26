import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Service = {
  num: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const services: Service[] = [
  {
    num: "01",
    title: "Controlled Demolition",
    description: "Large machinery and engineered sequencing for safe, predictable structural takedowns.",
    href: "/demolition-services#controlled-demolition",
    image: "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Robotic Demolition",
    description: "GCC's largest Brokk fleet for confined, high-precision, and emission-controlled environments.",
    href: "/demolition-services#robotic-demolition",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Wire & Track Sawing",
    description: "Diamond wire and track saws for bridges, dams, and heavily reinforced concrete.",
    href: "/demolition-services#wire-sawing",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Core Drilling & Strip Out",
    description: "Heavy core drilling and selective demolition for renovations, retrofits, and MEP penetrations.",
    href: "/demolition-services#core-drilling",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "05",
    title: "Tunnelling, Refinery & Kiln Works",
    description: "Specialist demolition inside active refineries, kilns, and confined tunnelling environments.",
    href: "/demolition-services#tunnelling",
    image: "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "06",
    title: "Soft Demolition & Enabling Works",
    description: "Controlled strip-out, non-structural removal, and site preparation ahead of main works.",
    href: "/demolition-services#soft-demolition",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "07",
    title: "Floor Sawing & Scanning",
    description: "Flat-slab and slab-on-grade cutting with GPR scanning for MEP and structural penetrations.",
    href: "/demolition-services#floor-sawing",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    num: "08",
    title: "Wall & Concrete Cutting",
    description: "Precision wall sawing and hand sawing for openings, pockets, and structural modifications.",
    href: "/demolition-services#wall-cutting",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

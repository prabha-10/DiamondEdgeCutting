import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const services = [
  {
    num: "/01",
    title: "Controlled Demolition",
    description: "Major demolition using large machinery and engineered sequencing.",
    href: "/demolition-services#controlled-demolition"
  },
  {
    num: "/02",
    title: "Robotic Demolition",
    description: "GCC's largest specialized fleet (Brokk 500 to 160).",
    href: "/demolition-services#robotic-demolition"
  },
  {
    num: "/03",
    title: "Wire & Track Sawing",
    description: "Precision cutting for bridges, dams, and reinforced concrete.",
    href: "/demolition-services#wire-sawing"
  },
  {
    num: "/04",
    title: "Core Drilling & Strip Out",
    description: "Selective demolition and heavy drilling capabilities.",
    href: "/demolition-services#core-drilling"
  }
];

export function Services() {
  return (
    <section className="py-32 bg-brand-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-brand-gray-900 mb-6 tracking-tight leading-none">
              Our Services
            </h2>
            <p className="text-xl text-brand-gray-700 font-medium leading-relaxed">
              Engineering-led demolition, cutting, drilling, and rental, executed under ISO 9001, 14001, and 45001 management systems.
            </p>
          </div>
          <Button asChild variant="brand" className="shrink-0">
            <Link href="/demolition-services">View All Services</Link>
          </Button>
        </div>

        <div className="flex flex-col border-t border-brand-gray-300">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-12 border-b border-brand-gray-300 hover:bg-brand-gray-100 transition-colors px-4 md:px-8 -mx-4 md:-mx-8"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 w-full md:w-auto">
                <span className="text-brand-gray-500 font-medium text-xl md:text-2xl font-mono">{service.num}</span>
                <h3 className="text-3xl md:text-5xl font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors tracking-tight">
                  {service.title}
                </h3>
              </div>
              <p className="text-brand-gray-700 text-lg font-medium max-w-md mt-4 md:mt-0 md:text-right hidden lg:block">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

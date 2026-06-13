import React from "react";
import Link from "next/link";
import { servicesDetails } from "@/data/services";
import { ArrowUpRight, Check } from "lucide-react";

const serviceImages: Record<string, string> = {
  "robotic-demolition": "/service-robotic-demolition.jpg",
  "controlled-demolition": "/service-controlled-demolition.jpg",
  "wire-sawing": "/service-wire-sawing.jpg",
  "wall-sawing": "/service-wall-sawing.jpg",
  "core-drilling": "/service-core-drilling.jpg",
  "refractory-kiln": "/service-refractory-kiln.jpg",
  "floor-sawing": "/service-floor-sawing.jpg",
  "strip-out": "/service-strip-out.jpg",
};

// Object-position overrides for photos whose subject isn't centred.
const serviceImagePositions: Record<string, string> = {
  "wall-sawing": "object-bottom",
};

export function ServiceDetails() {
  return (
    <section className="pt-0 pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesDetails.map((service) => {
            const image =
              serviceImages[service.id] || "/service-controlled-demolition.jpg";
            return (
              <Link
                key={service.id}
                id={service.id}
                href={service.ctaLink}
                aria-label={`${service.cta} — ${service.title}`}
                className="group bg-white rounded-[20px] overflow-hidden flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300 scroll-mt-28 md:scroll-mt-32"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${serviceImagePositions[service.id] ?? ""}`}
                  />
                </div>

                {/* Body */}
                <div className="p-7 md:p-8 flex flex-col gap-3.5 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[22px] md:text-[24px] tracking-[0.04em] leading-[1.1] group-hover:text-brand-red transition-colors">
                      {service.title}
                    </h2>
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 text-brand-gray-400 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] leading-[1.6] text-brand-gray-600">
                    {service.lead}
                  </p>

                  {service.shines && service.shines.length > 0 && (
                    <ul className="flex flex-col gap-1.5 pt-1">
                      {service.shines.slice(0, 3).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-['Inter_Display',sans-serif] text-[13px] md:text-[14px] leading-[1.45] text-brand-gray-600"
                        >
                          <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

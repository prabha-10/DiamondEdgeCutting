import React from "react";
import Link from "next/link";
import { servicesDetails } from "@/data/services";
import { ArrowUpRight, Check } from "lucide-react";

const serviceImages: Record<string, string> = {
  "robotic-demolition":
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80&auto=format&fit=crop",
  "controlled-demolition":
    "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1200&q=80&auto=format&fit=crop",
  "wire-sawing":
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80&auto=format&fit=crop",
  "wall-sawing":
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  "core-drilling":
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
  "refractory-kiln":
    "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1200&q=80&auto=format&fit=crop",
  "floor-sawing":
    "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80&auto=format&fit=crop",
  "strip-out":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
};

export function ServiceDetails() {
  return (
    <section className="pt-0 pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesDetails.map((service) => {
            const image =
              serviceImages[service.id] ||
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop";
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
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

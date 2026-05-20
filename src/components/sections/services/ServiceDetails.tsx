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
    <section className="py-16 md:py-24 bg-brand-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesDetails.map((service) => {
            const image =
              serviceImages[service.id] ||
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop";
            return (
              <article
                key={service.id}
                id={service.id}
                className="group relative aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden bg-brand-gray-900 scroll-mt-28 md:scroll-mt-32"
              >
                {/* Full-bleed background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient for legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
                  aria-hidden
                />

                {/* CTA arrow top-right */}
                <Link
                  href={service.ctaLink}
                  aria-label={`${service.cta} — ${service.title}`}
                  className="absolute top-6 right-6 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-brand-red hover:border-brand-red transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </Link>

                {/* Frosted-glass content panel pinned to bottom */}
                <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5 z-10">
                  <div className="rounded-[20px] bg-white/12 backdrop-blur-xl border border-white/20 p-5 md:p-6 flex flex-col gap-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                    <h2 className="font-display font-bold text-white text-[24px] md:text-[28px] leading-[1.05] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="font-['Inter_Display',sans-serif] text-[14px] leading-[1.55] text-white/85">
                      {service.lead}
                    </p>

                    {service.shines && service.shines.length > 0 && (
                      <ul className="flex flex-col gap-1.5 pt-1">
                        {service.shines.slice(0, 3).map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 font-['Inter_Display',sans-serif] text-[13px] leading-[1.45] text-white/85"
                          >
                            <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={service.ctaLink}
                      className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-white text-brand-gray-900 font-sans font-semibold text-[13px] px-5 py-2 hover:bg-brand-red hover:text-white transition-colors"
                    >
                      {service.cta}
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

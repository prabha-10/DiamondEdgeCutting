import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { servicesDetails } from "@/data/services";
import { ArrowRight, Check } from "lucide-react";

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
    <div className="flex flex-col">
      {servicesDetails.map((service, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-32 ${
              index % 2 === 0 ? "bg-brand-gray-50" : "bg-white"
            }`}
          >
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Text column */}
                <div
                  className={`lg:col-span-6 flex flex-col gap-8 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex flex-col gap-5">
                    <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold tracking-[0.18em] text-brand-red tabular-nums">
                      / {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-sans font-medium text-brand-gray-900 text-[40px] md:text-[56px] leading-[1.05] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="font-['Inter_Display',sans-serif] font-normal text-[17px] leading-[1.6] text-brand-gray-500 max-w-xl">
                      {service.lead}
                    </p>
                  </div>

                  {service.shines && (
                    <div className="flex flex-col gap-4 pt-6 border-t border-brand-gray-300">
                      <h3 className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                        Capabilities
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {service.shines.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 font-['Inter_Display',sans-serif] text-[15.5px] leading-[1.5] text-brand-gray-900"
                          >
                            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center">
                              <Check className="w-3 h-3" strokeWidth={3} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.equipment && (
                    <div className="flex flex-col gap-3 pt-6 border-t border-brand-gray-300">
                      <h3 className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                        Equipment
                      </h3>
                      <p className="font-['Inter_Display',sans-serif] text-[15px] leading-[1.55] text-brand-gray-900">
                        {service.equipment}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
                    <Button asChild size="lg" variant="brand">
                      <Link href={service.ctaLink}>{service.cta}</Link>
                    </Button>

                    {service.crossSell && (
                      <Link
                        href={service.crossSell.link}
                        className="group inline-flex items-center gap-2 font-['Inter_Display',sans-serif] text-[15px] font-medium text-brand-gray-900 hover:text-brand-red underline-offset-4 hover:underline transition-colors"
                      >
                        {service.crossSell.text}
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Image column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-brand-gray-100 lg:sticky lg:top-32">
                    <img
                      src={
                        serviceImages[service.id] ||
                        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop"
                      }
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/30"
                      aria-hidden
                    />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-white text-[12px] font-semibold tracking-wide">
                        {service.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

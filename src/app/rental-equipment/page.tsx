import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRentalCategoryContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demolition Equipment Rental Dubai | Diamond Edge Cutting",
  description:
    "Rent specialist demolition equipment across Dubai and the UAE. Brokk robotic machines, excavators, mini excavators, skid steers, wheel loaders, waste removal. Operators included.",
};

// Re-fetch from Sanity at most once a minute so Studio edits show up quickly
// without hammering the API. Same policy as /projects.
export const revalidate = 60;

export default async function RentalEquipmentPage() {
  const categories = await getRentalCategoryContent();

  return (
    <>
      {/* Hero */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 bg-white border-b border-brand-gray-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gray-500">
                  Equipment Rental
                </span>
              </div>
              <h1 className="font-display font-extrabold uppercase text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight">
                The GCC&apos;s largest<br />
                <em className="not-italic text-brand-red">specialist fleet.</em>
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-5 lg:items-end">
              <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-600 lg:text-right">
                Every machine ships with a trained operator, full spec sheet, and the safety paperwork your main contractor already expects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-16 md:py-24 bg-brand-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group bg-white rounded-[20px] overflow-hidden flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="p-7 md:p-8 flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[22px] md:text-[24px] tracking-[0.04em] leading-[1.1] group-hover:text-brand-red transition-colors">
                      {cat.title}
                    </h2>
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 text-brand-gray-400 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] leading-[1.6] text-brand-gray-600">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

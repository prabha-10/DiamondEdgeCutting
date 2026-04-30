"use client";

import React, { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  ShieldCheck,
  Clock,
  Award,
  MessageSquare,
} from "lucide-react";

type Stat = {
  score: string;
  label: string;
  icon: React.ElementType;
};

type Testimonial = {
  name: string;
  role: string;
  location: string;
  rating: string;
  quote: string;
  date: string;
};

const stats: Stat[] = [
  { score: "4.9", label: "Safety record", icon: ShieldCheck },
  { score: "5.0", label: "On-time delivery", icon: Clock },
  { score: "5.0", label: "Quality of work", icon: Award },
  { score: "5.0", label: "Communication", icon: MessageSquare },
];

const testimonials: Testimonial[] = [
  {
    name: "Aisha Mansour",
    role: "Project Director",
    location: "Dubai, UAE",
    rating: "5.0",
    quote:
      "Diamond Edge delivered our airport runway demolition on programme with zero incidents. Their robotic fleet handled the noise and vibration constraints in a live-environment site perfectly.",
    date: "Mar 15, 2026",
  },
  {
    name: "Khaled Rahimi",
    role: "Senior Site Manager",
    location: "Abu Dhabi, UAE",
    rating: "5.0",
    quote:
      "On-time delivery on a tight programme. The crew was disciplined and the daily reporting was top-notch. We'll absolutely use them on the next package.",
    date: "Feb 02, 2026",
  },
  {
    name: "James Pearson",
    role: "Principal Engineer",
    location: "Doha, Qatar",
    rating: "5.0",
    quote:
      "From initial quote to hand-over everything was transparent. The 26-metre long-reach made our chimney demolition look effortless on a constrained urban site.",
    date: "Jan 21, 2026",
  },
  {
    name: "Sara Nasser",
    role: "Procurement Lead",
    location: "Dubai, UAE",
    rating: "5.0",
    quote:
      "Their HSE compliance pack is the cleanest I've reviewed in the region. Made our internal audit a non-event.",
    date: "Dec 08, 2025",
  },
  {
    name: "Mohammed Al-Otaibi",
    role: "Principal Contractor",
    location: "Sharjah, UAE",
    rating: "5.0",
    quote:
      "Brokk machines on a refractory shutdown — flawless execution and zero damage to the surrounding kilns. The team's experience shows.",
    date: "Oct 30, 2025",
  },
  {
    name: "Rajesh Verma",
    role: "Construction Director",
    location: "Muscat, Oman",
    rating: "4.9",
    quote:
      "Concrete sawing on a live bridge. Diamond Edge planned every cut, every pour, every contingency. The best demolition partner we've worked with in the GCC.",
    date: "Sep 12, 2025",
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="py-32 bg-brand-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left container — eyebrow + headline + stats (sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-gray-500"
                  aria-hidden
                />
                <span className="font-['Inter_Display',sans-serif] text-[14px] text-[#707070]">
                  Testimonials
                </span>
              </div>

              <h2 className="font-sans font-medium text-brand-gray-700 text-[36px] md:text-[52px] leading-[1.08] tracking-tight">
                We&apos;re proud to deliver demolition{" "}
                <span className="text-black">
                  projects clients consistently trust.
                </span>
              </h2>
            </div>

            {/* Stats — 2×2 grid of mini stat cards */}
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-[16px] p-4 flex flex-col gap-3 border border-brand-gray-300/40"
                  >
                    <Icon
                      className="w-4 h-4 text-brand-gray-500"
                      strokeWidth={1.8}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-['Inter_Display',sans-serif] text-[13px] text-[#707070] leading-tight">
                        {stat.label}
                      </span>
                      <span className="font-sans font-medium text-black text-[28px] leading-none tabular-nums">
                        {stat.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right container — single big red card carousel */}
          <div className="lg:col-span-7">
            <article
              key={index}
              className="relative bg-brand-red text-white rounded-[28px] p-8 md:p-12 flex flex-col gap-8 min-h-[480px] overflow-hidden"
            >
              {/* Decorative quote glyph */}
              <Quote
                className="absolute top-7 right-7 w-16 h-16 text-white/15"
                strokeWidth={1.4}
                aria-hidden
              />

              {/* Top row: avatar + name/role/location, star rating */}
              <div className="flex items-start justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                    <span className="font-sans font-semibold text-white text-[16px]">
                      {initialsOf(current.name)}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-semibold text-white text-[18px] tracking-tight">
                      {current.name}
                    </span>
                    <span className="font-['Inter_Display',sans-serif] text-[14px] text-white/75">
                      {current.role} · {current.location}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 shrink-0">
                  <span className="font-sans font-medium text-white text-[15px] tabular-nums">
                    {current.rating}
                  </span>
                  <Star
                    className="w-4 h-4 text-white fill-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Quote */}
              <p className="relative z-10 font-sans font-medium text-white text-[22px] md:text-[26px] leading-[1.4] tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Footer: date on left, controls (arrows + dots) on right */}
              <div className="mt-auto relative z-10 flex items-center justify-between gap-6 pt-4 border-t border-white/15">
                <span className="font-['Inter_Display',sans-serif] text-[13px] text-white/70">
                  {current.date}
                </span>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === index
                            ? "w-6 h-2 bg-white"
                            : "w-2 h-2 bg-white/35 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center transition-colors hover:bg-white hover:text-brand-red hover:border-white"
                    >
                      <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center transition-colors hover:bg-white hover:text-brand-red hover:border-white"
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

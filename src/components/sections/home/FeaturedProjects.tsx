"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    title: "Concrete Chimney Tower",
    year: "2024",
    location: "Jebel Ali, Dubai",
    slug: "jebel-ali-chimney-tower",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    title: "Marsa Al Arab",
    year: "2023",
    location: "Dubai",
    slug: "marsa-al-arab",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  },
  {
    title: "DXB Concourse 4",
    year: "2024",
    location: "Dubai",
    slug: "dxb-concourse-4",
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80",
  },
  {
    title: "Vale Pelletiser Plant",
    year: "2023",
    location: "Sohar, Oman",
    slug: "vale-oman-pelletiser",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
  },
];

export function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 600;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 32), behavior: "smooth" });
  };

  return (
    <section className="pt-24 pb-40 bg-brand-gray-100 overflow-hidden">
      {/* Header row */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* Left: heading + description stacked */}
          <div className="flex flex-col gap-4">
            <h2 className="font-sans font-semibold text-brand-gray-900 text-[48px] md:text-[56px] leading-none tracking-tight">
              Selected Projects
            </h2>
            <p className="font-['Inter_Display',sans-serif] font-normal text-brand-gray-500 text-[18px] leading-[24px] max-w-[460px]">
              A look at some of the projects we&apos;ve demolished, cut, and dismantled.
            </p>
          </div>

          {/* Right: eyebrow + view all CTA + nav arrows */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gray-900 text-white font-medium text-[14px] px-5 py-2.5 hover:bg-brand-gray-700 transition-colors"
            >
              View All Projects
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={2}
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="w-10 h-10 rounded-full bg-brand-gray-300 text-brand-gray-900 flex items-center justify-center hover:bg-brand-gray-300/80 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="w-10 h-10 rounded-full bg-brand-gray-900 text-white flex items-center justify-center hover:bg-brand-gray-700 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="pl-4 md:pl-8 lg:pl-[max(2rem,calc((100vw-1536px)/2+2rem))]">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProjects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="snap-start shrink-0 w-[80vw] sm:w-[380px] md:w-[420px] lg:w-[460px] group flex flex-col bg-white rounded-2xl p-3"
            >
              <div className="aspect-[4/3] bg-brand-gray-100 rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1 px-3 pt-4 pb-2">
                <h3 className="font-sans font-semibold text-brand-gray-900 text-[22px] tracking-tight leading-tight group-hover:text-brand-red transition-colors">
                  {project.title}
                </h3>
                <div className="font-['Inter_Display',sans-serif] text-brand-gray-500 text-[14px]">
                  {project.year} · {project.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 md:hidden">
        <Link
          href="/projects"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gray-900 text-white font-medium px-6 py-3"
        >
          View all projects
        </Link>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";

export type ProjectListItem = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year?: number | string;
  /** Local-fallback shape (from src/data/projects.ts). */
  scope?: string;
  /** Sanity shape. */
  scopeSummary?: string;
  /** Optional Sanity hero image. Falls back to the Unsplash hash if absent. */
  heroImage?: SanityImage;
};

// Cycle a small set of verified construction/demolition photos when no Sanity image is available.
const imagePool = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop",
];

function imageFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return imagePool[hash % imagePool.length];
}

type Props = {
  projects: ProjectListItem[];
  categories: string[];
};

export default function ProjectsPageClient({ projects, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-24 bg-white overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
                Selected Works
              </span>
            </div>
            <h1 className="font-display font-medium text-brand-gray-900 text-[56px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight">
              Projects.
            </h1>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <p className="lg:col-span-7 font-['Inter_Display',sans-serif] font-normal text-[19px] md:text-[22px] leading-[1.5] text-brand-gray-500 max-w-2xl">
              {projects.length} headline projects across airports, malls, hotels, infrastructure, and refractory works, delivered across the GCC since 2008.
            </p>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gray-900 text-white font-medium text-[15px] px-6 py-3 hover:bg-brand-gray-700 transition-colors"
              >
                Discuss Project
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects grid — clicking a card navigates to /projects/[slug] */}
      <section className="pb-20 bg-white min-h-[500px]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Category filter tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2.5 mb-12">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "rounded-full px-5 py-2 font-['Inter_Display',sans-serif] font-semibold text-[14px] transition-colors",
                      isActive
                        ? "bg-brand-red text-white"
                        : "bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {filteredProjects.map((project) => {
              const heroFromSanity = safeUrlFor(project.heroImage, 900);
              const cardImage = heroFromSanity ?? imageFor(project.slug);
              const scopeText = project.scopeSummary ?? project.scope ?? "";
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative block w-full aspect-[3/4] bg-brand-gray-100 overflow-hidden"
                >
                  <img
                    src={cardImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Legibility scrim — darker toward the bottom, deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Overlaid content, bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1 text-white">
                    <h3 className="font-display font-medium text-[26px] md:text-[30px] leading-[1.05] tracking-tight">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/70">
                      {project.location}
                    </span>

                    {/* Extra details — collapsed by default, expand on hover */}
                    <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-[grid-template-rows,opacity] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-white/25 flex flex-col gap-1 font-mono text-[12px] uppercase tracking-[0.06em] text-white/80">
                          {project.year && <span>{project.year}</span>}
                          {scopeText && <span>{scopeText}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32 font-mono text-brand-gray-500 text-[14px] uppercase tracking-widest">
              No projects in this category.
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-brand-red text-white text-center">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center gap-10">
          <h2 className="font-display font-medium text-white text-[40px] md:text-[64px] leading-[1.05] tracking-tight max-w-3xl">
            Have a similar project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-brand-gray-900 font-medium text-[15px] px-7 py-3.5 hover:bg-brand-gray-300 transition-colors"
          >
            Discuss your project
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}

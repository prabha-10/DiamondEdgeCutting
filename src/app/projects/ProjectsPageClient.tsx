"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

function projectId(index: number, title: string) {
  const tag = title
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .slice(0, 2)
    .join("-")
    .toUpperCase();
  return `.${String(index + 1).padStart(2, "0")} / ${tag}`;
}

type Props = {
  projects: ProjectListItem[];
  categories: string[];
};

export default function ProjectsPageClient({ projects, categories }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-24 bg-white overflow-hidden border-b border-brand-gray-300">
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

      {/* Filter pills */}
      <section className="py-6 bg-white border-b border-brand-gray-300 sticky top-20 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-nowrap overflow-x-auto gap-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 px-5 py-2 rounded-full font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  activeFilter === category
                    ? "bg-brand-gray-900 text-white"
                    : "bg-brand-gray-100 text-brand-gray-500 hover:bg-brand-gray-300/50 hover:text-brand-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid — clicking a card navigates to /projects/[slug] */}
      <section className="py-20 bg-white min-h-[500px]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProjects.map((project, i) => {
              const heroFromSanity = safeUrlFor(project.heroImage, 900);
              const cardImage = heroFromSanity ?? imageFor(project.slug);
              const scopeText = project.scopeSummary ?? project.scope ?? "";
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col gap-6"
                >
                  <div className="relative w-full aspect-[3/4] bg-brand-gray-100 overflow-hidden">
                    <img
                      src={cardImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-8 gap-2">
                    <h3 className="font-mono font-semibold text-brand-gray-900 text-[14px] tracking-tight md:basis-1/3 shrink-0 group-hover:text-brand-red transition-colors">
                      {projectId(i, project.title)}
                    </h3>
                    <div className="font-mono text-[12px] uppercase tracking-[0.06em] text-brand-gray-500 flex flex-col gap-0.5 leading-[1.5]">
                      <span className="text-brand-gray-900 group-hover:text-brand-red transition-colors">
                        {project.title}
                      </span>
                      <span>{project.location}</span>
                      {project.year && <span>{project.year}</span>}
                      {scopeText && <span>{scopeText}</span>}
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
      <section className="py-32 bg-brand-gray-900 text-white text-center">
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

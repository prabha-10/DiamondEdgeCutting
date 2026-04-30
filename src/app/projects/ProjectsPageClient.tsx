"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { projectsData, projectCategories } from "@/data/projects";

// Cycle a small set of verified construction/demolition photos across the projects.
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

export default function ProjectsPageClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const selectedProject =
    selectedSlug !== null
      ? projectsData.find((p) => p.slug === selectedSlug) ?? null
      : null;

  // Lock body scroll while overlay is open + close on Esc
  useEffect(() => {
    if (!selectedProject) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-24 bg-white overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-[#707070]">
                Selected Works
              </span>
            </div>
            <h1 className="font-sans font-medium text-brand-gray-900 text-[56px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight">
              Projects.
            </h1>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <p className="lg:col-span-7 font-['Inter_Display',sans-serif] font-normal text-[19px] md:text-[22px] leading-[1.5] text-[#707070] max-w-2xl">
              18 headline projects across airports, malls, hotels, infrastructure, and refractory works — delivered across the GCC since 2008.
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
      <section className="py-6 bg-white border-b border-brand-gray-200 sticky top-20 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-nowrap overflow-x-auto gap-2 hide-scrollbar">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 px-5 py-2 rounded-full font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${
                  activeFilter === category
                    ? "bg-brand-gray-900 text-white"
                    : "bg-brand-gray-100 text-[#707070] hover:bg-brand-gray-300/50 hover:text-brand-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20 bg-white min-h-[500px]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProjects.map((project, i) => (
              <motion.button
                key={project.slug}
                layoutId={`card-${project.slug}`}
                onClick={() => setSelectedSlug(project.slug)}
                className="group text-left flex flex-col gap-6 cursor-pointer"
              >
                <motion.div
                  layoutId={`img-${project.slug}`}
                  className="relative w-full aspect-[3/4] bg-brand-gray-100 overflow-hidden"
                >
                  <img
                    src={imageFor(project.slug)}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>
                <div className="flex flex-col md:flex-row md:gap-8 gap-2">
                  <h3 className="font-mono font-semibold text-brand-gray-900 text-[14px] tracking-tight md:basis-1/3 shrink-0">
                    {projectId(i, project.title)}
                  </h3>
                  <div className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#707070] flex flex-col gap-0.5 leading-[1.5]">
                    <span className="text-brand-gray-900">{project.title}</span>
                    <span>{project.location}</span>
                    {project.year && <span>{project.year}</span>}
                    <span>{project.scope}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32 font-mono text-[#707070] text-[14px] uppercase tracking-widest">
              No projects in this category.
            </div>
          )}
        </div>
      </section>

      {/* Expand overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedSlug(null)}
              aria-hidden
            />

            <motion.div
              key="modal"
              layoutId={`card-${selectedProject.slug}`}
              className="fixed inset-3 md:inset-10 lg:inset-16 z-50 overflow-hidden bg-white rounded-[24px] flex flex-col"
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
            >
              <button
                onClick={() => setSelectedSlug(null)}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 border border-brand-gray-300 text-brand-gray-900 flex items-center justify-center hover:bg-brand-gray-900 hover:text-white hover:border-brand-gray-900 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
                  <motion.div
                    layoutId={`img-${selectedProject.slug}`}
                    className="lg:col-span-7 relative w-full aspect-[3/4] bg-brand-gray-100 rounded-[16px] overflow-hidden"
                  >
                    <img
                      src={imageFor(selectedProject.slug)}
                      alt={selectedProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.4 }}
                    className="lg:col-span-5 flex flex-col gap-8 py-2"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-red">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-sans font-medium text-brand-gray-900 text-[36px] md:text-[44px] leading-[1.05] tracking-tight">
                      {selectedProject.title}
                    </h2>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-gray-300">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#707070]">
                          Location
                        </span>
                        <span className="font-sans text-brand-gray-900 text-[16px]">
                          {selectedProject.location}
                        </span>
                      </div>
                      {selectedProject.year && (
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#707070]">
                            Year
                          </span>
                          <span className="font-sans text-brand-gray-900 text-[16px]">
                            {selectedProject.year}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 pt-6 border-t border-brand-gray-300">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#707070]">
                        Scope of work
                      </span>
                      <p className="font-['Inter_Display',sans-serif] font-normal text-[16px] leading-[1.55] text-brand-gray-900">
                        {selectedProject.scope}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
                      <Link
                        href={`/projects/${selectedProject.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gray-900 text-white font-medium text-[14px] px-5 py-2.5 hover:bg-brand-gray-700 transition-colors"
                      >
                        View full case study
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      </Link>
                      <Link
                        href="/contact"
                        className="font-['Inter_Display',sans-serif] text-[14px] font-medium text-brand-gray-900 underline-offset-4 hover:underline"
                      >
                        Discuss a similar project →
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="py-32 bg-brand-gray-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center gap-10">
          <h2 className="font-sans font-medium text-white text-[40px] md:text-[64px] leading-[1.05] tracking-tight max-w-3xl">
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

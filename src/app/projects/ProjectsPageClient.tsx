"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, projectCategories } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function ProjectsPageClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <>
      <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-brand-gray-900 mb-12 leading-[0.9] tracking-tighter">
              Projects.
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-brand-gray-300 pt-12">
              <p className="text-2xl md:text-3xl text-brand-gray-700 max-w-2xl font-medium leading-relaxed">
                18 headline projects across airports, malls, hotels, infrastructure, and refractory works.
              </p>
              <Button asChild variant="brand" size="lg" className="shrink-0">
                <Link href="/contact">Discuss Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-brand-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-nowrap overflow-x-auto gap-4 hide-scrollbar">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 px-8 py-3 rounded-full text-lg font-bold transition-all ${
                  activeFilter === category
                    ? "bg-brand-gray-900 text-white"
                    : "bg-brand-gray-50 text-brand-gray-500 hover:bg-brand-gray-100 hover:text-brand-gray-900 border border-brand-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white min-h-[500px]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {filteredProjects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[4/3] bg-brand-gray-100 relative overflow-hidden mb-8">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    <span className="text-brand-gray-500 font-mono text-sm tracking-widest uppercase">[Image: {project.title}]</span>
                  </div>
                  <div className="absolute top-6 left-6 bg-white px-4 py-2 text-sm font-bold tracking-widest uppercase text-brand-gray-900">
                    {project.category}
                  </div>
                </div>
                <div className="flex flex-col border-t border-brand-gray-300 pt-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-3xl font-bold text-brand-gray-900 tracking-tight group-hover:text-brand-red transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-brand-gray-500 font-medium text-lg mb-6 uppercase tracking-wider text-sm">
                    <span>{project.location}</span>
                    {project.year && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-300" />
                        <span>{project.year}</span>
                      </>
                    )}
                  </div>
                  <p className="text-brand-gray-700 text-xl font-medium leading-relaxed mb-8 flex-1">
                    {project.scope}
                  </p>
                  <div className="mt-auto text-lg font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors flex items-center gap-2">
                    View Project Details
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32 text-brand-gray-500 text-2xl font-medium">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      <section className="py-32 bg-brand-gray-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight leading-none">Have a Similar Project?</h2>
          <Button asChild variant="brand" size="lg">
            <Link href="/contact">Discuss Your Project</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialSectionHead } from "./editorial/EditorialSectionHead";
import { projectsData } from "@/data/projects";

const featured = [
  "meena-plaza",
  "jebel-ali-chimney-tower",
  "marsa-al-arab",
  "one-zaabeel",
  "dwc-al-maktoum-airport",
  "icd-brookfield",
];

const projects = featured
  .map((slug) => projectsData.find((p) => p.slug === slug))
  .filter(Boolean) as typeof projectsData;

export function ProjectsTeaser() {
  return (
    <section className="py-20 md:py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <EditorialSectionHead
          number="05"
          eyebrow="Selected Projects"
          title={
            <>
              Work that
              <br />
              <em>speaks for itself.</em>
            </>
          }
          lede="From record-breaking controlled demolitions to precision concrete cutting on live airport concourses — a selection of landmark jobs across the GCC."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-white border border-brand-gray-300 rounded-[20px] p-7 md:p-8 flex flex-col gap-5 hover:bg-brand-red hover:border-brand-red transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-red group-hover:text-white/70 transition-colors duration-300">
                  {project.category}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-brand-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  strokeWidth={2}
                />
              </div>

              <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[22px] md:text-[24px] tracking-tight leading-[1.05] group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>

              <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] leading-[1.6] text-brand-gray-600 flex-1 group-hover:text-white/80 transition-colors duration-300">
                {project.scope}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-brand-gray-200 group-hover:border-white/20 transition-colors duration-300">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-500 group-hover:text-white/60 transition-colors duration-300">
                  {project.location}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-400 group-hover:text-white/50 transition-colors duration-300">
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 h-14 rounded-full bg-brand-gray-900 text-white font-sans font-bold text-base hover:bg-brand-red transition-colors duration-200"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

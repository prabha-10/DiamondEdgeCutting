import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "../../../../sanity/lib/queries";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { projectsData } from "@/data/projects";

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  year?: string | number;
  scopeSummary?: string;
  heroImage?: SanityImage;
};

export async function ProjectsTeaser() {
  const featured = (await getFeaturedProjects()) as SanityProject[];

  // Sanity drives the selection via the "Featured on Homepage" toggle. When
  // Sanity isn't configured (local dev without env), fall back to the first 6
  // local projects so the section still renders.
  const source =
    featured.length > 0
      ? featured.map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category ?? "",
          location: p.location ?? "",
          year: String(p.year ?? ""),
          scope: p.scopeSummary ?? "",
          heroImage: p.heroImage ?? null,
        }))
      : projectsData.slice(0, 6).map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category ?? "",
          location: p.location ?? "",
          year: String(p.year ?? ""),
          scope: p.scope ?? "",
          heroImage: null as SanityImage | null,
        }));

  const projects = source;

  return (
    <section className="py-20 md:py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight [&_em]:font-light [&_em]:italic [&_em]:text-brand-red [&_em]:normal-case">
              Work that<br /><em>speaks for itself.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 items-end text-right">
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-700">
              From record-breaking controlled demolitions to precision concrete cutting on live airport concourses — a selection of landmark jobs across the GCC.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-full bg-brand-gray-900 text-white font-sans font-bold text-base hover:bg-brand-red transition-colors duration-200"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {projects.map((project) => {
            const imageUrl = safeUrlFor(project.heroImage, 800);
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-brand-white border border-brand-gray-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-red/30 transition-all duration-300"
              >
                {/* Hero image with category badge */}
                <div className="relative w-full aspect-[4/3] bg-brand-gray-900 overflow-hidden shrink-0">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-gray-200">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gray-400">
                        Project Image
                      </span>
                    </div>
                  )}
                  {project.category && (
                    <span className="absolute top-3 left-3 bg-brand-red text-white font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Title + meta */}
                <div className="p-5 md:p-6 flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-bold text-brand-gray-900 text-[18px] md:text-[20px] tracking-tight leading-[1.1]">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-500">
                      {project.location}
                      {project.location && project.year ? " · " : ""}
                      {project.year}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 shrink-0 mt-0.5 text-brand-gray-400 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

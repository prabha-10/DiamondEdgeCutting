import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "../../../../sanity/lib/queries";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { projectsData } from "@/data/projects";

const featuredSlugs = [
  "meena-plaza",
  "jebel-ali-chimney-tower",
  "marsa-al-arab",
  "one-zaabeel",
  "dwc-al-maktoum-airport",
  "icd-brookfield",
];

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
  const sanityProjects = (await getAllProjects()) as SanityProject[];

  const projects = featuredSlugs.map((slug) => {
    const sanity = sanityProjects.find((p) => p.slug === slug);
    const fallback = projectsData.find((p) => p.slug === slug);
    return {
      slug,
      title: sanity?.title ?? fallback?.title ?? slug,
      category: sanity?.category ?? fallback?.category ?? "",
      location: sanity?.location ?? fallback?.location ?? "",
      year: String(sanity?.year ?? fallback?.year ?? ""),
      scope: sanity?.scopeSummary ?? fallback?.scope ?? "",
      heroImage: sanity?.heroImage ?? null,
    };
  });

  return (
    <section className="py-20 md:py-32 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
              — 05 / Selected Projects
            </span>
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
                className="group bg-white border border-brand-gray-300 rounded-[20px] overflow-hidden flex flex-col hover:border-brand-red transition-colors duration-300"
              >
                {/* Hero image */}
                <div className="relative w-full aspect-[16/9] bg-brand-gray-900 overflow-hidden shrink-0">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-extrabold uppercase text-white/10 text-[32px] tracking-tight text-center px-4">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-gray-900/0 group-hover:bg-brand-red/20 transition-colors duration-300" />
                </div>

                {/* Card body */}
                <div className="p-7 md:p-8 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-red group-hover:text-brand-red transition-colors duration-300">
                      {project.category}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-brand-gray-400 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="font-display font-bold uppercase text-brand-gray-900 text-[20px] md:text-[22px] tracking-tight leading-[1.05]">
                    {project.title}
                  </h3>

                  <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] leading-[1.6] text-brand-gray-600 flex-1">
                    {project.scope}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-gray-200">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-500">
                      {project.location}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-400">
                      {project.year}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

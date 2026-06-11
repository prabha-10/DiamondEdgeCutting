import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { HeroGallery } from "./HeroGallery";
import { projectsData } from "@/data/projects";
import { getProjectBySlug, getAllProjectSlugs } from "../../../../sanity/lib/queries";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";

// Cycle a small set of verified construction/demolition photos when no Sanity image is available.
const fallbackImagePool = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop",
];

function fallbackImageFor(slug: string, offset = 0) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return fallbackImagePool[(hash + offset) % fallbackImagePool.length];
}

type NormalisedProject = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year?: string | number;
  scopeSummary: string;
  description?: string;
  keyHighlights?: string[];
  heroImageUrl: string;
  galleryUrls: string[];
  relatedServices?: string[];
  source: "sanity" | "local";
};

async function loadProject(slug: string): Promise<NormalisedProject | null> {
  // Try Sanity first
  try {
    const doc = await getProjectBySlug(slug);
    if (doc && doc.title) {
      const heroFromSanity = safeUrlFor(doc.heroImage, 1600);
      const galleryFromSanity = Array.isArray(doc.gallery)
        ? doc.gallery
            .map((g: SanityImage) => safeUrlFor(g, 1200))
            .filter((u: string | null): u is string => Boolean(u))
        : [];
      return {
        title: doc.title,
        slug: doc.slug || slug,
        category: doc.category || "Project",
        location: doc.location || "",
        year: doc.year,
        scopeSummary: doc.scopeSummary || "",
        description: doc.description,
        keyHighlights: doc.keyHighlights,
        heroImageUrl: heroFromSanity || fallbackImageFor(slug),
        galleryUrls:
          galleryFromSanity.length > 0
            ? galleryFromSanity
            : [1, 2, 3, 4].map((i) => fallbackImageFor(slug, i)),
        relatedServices: doc.relatedServices,
        source: "sanity",
      };
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] project fetch failed (${msg.slice(0, 120)}); using local fallback.`);
  }

  // Fallback — local data
  const local = projectsData.find((p) => p.slug === slug);
  if (!local) return null;
  return {
    title: local.title,
    slug: local.slug,
    category: local.category,
    location: local.location,
    year: local.year,
    scopeSummary: local.scope,
    heroImageUrl: fallbackImageFor(slug),
    galleryUrls: [1, 2, 3, 4].map((i) => fallbackImageFor(slug, i)),
    source: "local",
  };
}

export async function generateStaticParams() {
  // Try Sanity first
  try {
    const slugs = await getAllProjectSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs
        .map((s: { slug?: string }) => s?.slug)
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({ slug }));
    }
  } catch {
    // ignore — fall back to local
  }
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) return { title: "Not Found" };
  const where = project.location ? ` — ${project.location}` : "";
  return {
    title: `${project.title} Demolition${where}`,
    description: `${project.scopeSummary || project.title}. Delivered by Diamond Edge Cutting${
      project.location ? ` in ${project.location}` : ""
    }.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();

  return (
    <>
      <Script
        id={`project-detail-${project.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            name: project.title,
            description: project.description || project.scopeSummary,
            locationCreated: project.location
              ? { "@type": "Place", name: project.location }
              : undefined,
            creator: { "@id": "https://diamondedgecutting.com/#organization" },
          }),
        }}
      />

      {/* Hero — eyebrow, title, meta row */}
      <section className="relative pt-44 pb-16 bg-white overflow-hidden border-b border-brand-gray-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-start gap-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-brand-gray-500 hover:text-brand-red transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
              All Projects
            </Link>
            <h1 className="font-display font-medium text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tight text-right">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero image + auto-cycling gallery */}
      <section className="bg-white pt-10 pb-0">
        <div className="container mx-auto px-4 md:px-8">
          <HeroGallery
            heroImageUrl={project.heroImageUrl}
            galleryUrls={project.galleryUrls}
            title={project.title}
            scopeSummary={project.scopeSummary}
            category={project.category}
            location={project.location}
            year={project.year}
          />
        </div>
      </section>

      {/* Body — overview + optional related services sidebar */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 items-start">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-6">
                <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Overview
                </span>
                <div className="flex flex-col gap-4 w-full">
                  {(
                    project.description ||
                    `Diamond Edge Cutting was appointed to deliver specialist demolition services for ${project.title}${
                      project.location ? ` in ${project.location}` : ""
                    }. The project required stringent safety protocols and precision engineering, executed on programme with full authority compliance.`
                  )
                    // Split on blank lines into blocks, then collapse single
                    // mid-sentence newlines so each block reflows to full width.
                    .split(/\n\s*\n/)
                    .map((block) => block.replace(/\s*\n\s*/g, " ").trim())
                    .filter(Boolean)
                    .map((block, i) => (
                      <p
                        key={i}
                        className="font-['Inter_Display',sans-serif] font-normal text-[18px] md:text-[20px] leading-[1.6] text-brand-gray-900"
                      >
                        {block}
                      </p>
                    ))}
                </div>
              </div>

              {/* Key highlights */}
              {project.keyHighlights && project.keyHighlights.length > 0 && (
                <div className="flex flex-col gap-6 pt-12 border-t border-brand-gray-300">
                  <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Key Highlights
                  </span>
                  <ul className="flex flex-col gap-3">
                    {project.keyHighlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-['Inter_Display',sans-serif] text-[16px] leading-[1.55] text-brand-gray-900"
                      >
                        <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-brand-red text-white text-center">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center gap-10">
          <h2 className="font-display font-medium text-white text-[40px] md:text-[64px] leading-[1.05] tracking-tight max-w-3xl">
            Have a similar project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-brand-gray-900 font-medium text-[15px] px-7 py-3.5 hover:bg-brand-gray-300 transition-colors"
          >
            Discuss Your Project
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}

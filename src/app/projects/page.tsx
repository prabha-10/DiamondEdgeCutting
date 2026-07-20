import type { Metadata } from "next";
import ProjectsPageClient, { type ProjectListItem } from "./ProjectsPageClient";
import { ProjectSchema } from "@/components/seo/ProjectSchema";
import { projectsData } from "@/data/projects";
import { getAllProjects } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Demolition Projects Across Dubai, UAE & GCC | Diamond Edge Cutting",
  description: "Explore DEC's demolition project portfolio across Dubai, Abu Dhabi, and the GCC. Airports, malls, towers, refineries, and infrastructure delivered since 2008.",
};

// Re-fetch from Sanity at most once a minute so Studio edits show up quickly
// without hammering the API.
export const revalidate = 60;

export default async function ProjectsPage() {
  // Guarded for the same reason as ProjectsTeaser: a Sanity error must degrade
  // to the local catalogue, not abort the build.
  let sanityProjects: ProjectListItem[] | null = null;
  try {
    sanityProjects = (await getAllProjects()) as ProjectListItem[] | null;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] projects fetch failed (${msg.slice(0, 120)}); using local fallback.`);
  }

  const resolvedProjects: ProjectListItem[] =
    sanityProjects && sanityProjects.length > 0
      ? sanityProjects
      : // Fallback when Sanity isn't configured yet — keep the site usable.
        projectsData.map((p) => ({
          slug: p.slug,
          title: p.title,
          category: p.category,
          location: p.location,
          year: p.year,
          scope: p.scope,
        }));

  // Show the full catalogue so every category filter returns results.
  // Dedupe by slug — guards against duplicate documents in Sanity rendering
  // the same project card twice.
  const seenSlugs = new Set<string>();
  const projects: ProjectListItem[] = resolvedProjects.filter((p) => {
    if (!p.slug || seenSlugs.has(p.slug)) return false;
    seenSlugs.add(p.slug);
    return true;
  });

  // Always expose the six core category filters; append any extra categories
  // that appear in Studio so new ones still get a pill.
  const categoryOrder = ["Commercial", "Residential", "Airport", "Hotel", "Industrial", "Infrastructure"];
  const presentCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const extraCategories = presentCategories.filter((c) => !categoryOrder.includes(c));
  const categories = ["All", ...categoryOrder, ...extraCategories];

  return (
    <>
      <ProjectSchema projects={projects} />
      <ProjectsPageClient projects={projects} categories={categories} />
    </>
  );
}

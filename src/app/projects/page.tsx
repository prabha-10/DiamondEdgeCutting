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
  const sanityProjects = (await getAllProjects()) as ProjectListItem[] | null;

  const projects: ProjectListItem[] =
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

  // Derive filter pills dynamically — adding a new category in Studio
  // automatically adds a filter pill on the next revalidation.
  const categoryOrder = ["Commercial", "Residential", "Airport", "Hotel", "Industrial", "Infrastructure"];
  const presentCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const sortedCategories = [
    ...categoryOrder.filter((c) => presentCategories.includes(c)),
    ...presentCategories.filter((c) => !categoryOrder.includes(c)),
  ];
  const categories = ["All", ...sortedCategories];

  return (
    <>
      <ProjectSchema projects={projects} />
      <ProjectsPageClient projects={projects} categories={categories} />
    </>
  );
}

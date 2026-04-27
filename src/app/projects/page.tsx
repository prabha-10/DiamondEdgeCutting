import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import { ProjectSchema } from "@/components/seo/ProjectSchema";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Demolition Projects Across Dubai, UAE & GCC | Diamond Edge Cutting",
  description: "Explore DEC's demolition project portfolio across Dubai, Abu Dhabi, and the GCC. Airports, malls, towers, refineries, and infrastructure delivered since 2008.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectSchema projects={projectsData} />
      <ProjectsPageClient />
    </>
  );
}

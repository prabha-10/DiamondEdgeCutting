import React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { Overview } from "@/components/sections/home/Overview";
import { Services } from "@/components/sections/home/Services";
import { ProjectsTeaser } from "@/components/sections/home/ProjectsTeaser";
import { Certifications } from "@/components/sections/home/Certifications";
import { Leadership } from "@/components/sections/home/Leadership";

// Re-fetch Sanity content (featured projects, team) at most once a minute so
// Studio edits reach production without a redeploy. Same policy as /projects.
export const revalidate = 60;

// Homepage scope, per client revision (New Microsoft Word Document):
// Hero → Certifications (Block 2) → Who we are + Mission/Vision (one block)
// → Services → Featured Projects → Guinness record → Team → Clients.
// Mission/Vision is merged into Overview; the closing red CTA was removed.

export default function Home() {
  return (
    <>
      <Hero />
      <Certifications />
      <Overview />
      <Services />
      <Leadership />
      <ProjectsTeaser />
      <ClientLogos />
    </>
  );
}

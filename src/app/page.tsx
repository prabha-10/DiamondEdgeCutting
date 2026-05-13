import React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { Overview } from "@/components/sections/home/Overview";
import { Services } from "@/components/sections/home/Services";
import { ProjectsTeaser } from "@/components/sections/home/ProjectsTeaser";
import { RentalTeaser } from "@/components/sections/home/RentalTeaser";
import { MissionVision } from "@/components/sections/home/MissionVision";
import { GuinnessRecord } from "@/components/sections/home/GuinnessRecord";
import { Certifications } from "@/components/sections/home/Certifications";
import { Leadership } from "@/components/sections/home/Leadership";
import { FinalCTA } from "@/components/sections/home/FinalCTA";

// Homepage scope, per client docx (Website Structure Rob 24-02-2026):
// 1. Company Overview   2. Mission & Vision   3. Certifications   4. Our Team
// + Hero entry, ClientLogos banner, core services + specialist plant rental
// teaser pair (2.1 + 2.2 in the doc), slim closing CTA.

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Overview />
      <Services />
      <MissionVision />
      <GuinnessRecord />
      <ProjectsTeaser />
      <RentalTeaser />
      <Certifications />
      <Leadership />
      <FinalCTA />
    </>
  );
}

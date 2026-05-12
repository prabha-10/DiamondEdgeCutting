import React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { Overview } from "@/components/sections/home/Overview";
import { MissionVision } from "@/components/sections/home/MissionVision";
import { Certifications } from "@/components/sections/home/Certifications";
import { Leadership } from "@/components/sections/home/Leadership";
import { FinalCTA } from "@/components/sections/home/FinalCTA";

// Homepage scope, per client docx (Website Structure Rob 24-02-2026):
// 1. Company Overview   2. Mission & Vision   3. Certifications   4. Our Team
// + Hero entry and slim closing CTA.

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <MissionVision />
      <Certifications />
      <Leadership />
      <FinalCTA />
    </>
  );
}

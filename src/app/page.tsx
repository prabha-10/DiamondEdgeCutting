import React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { Overview } from "@/components/sections/home/Overview";
import { Stats } from "@/components/sections/home/Stats";
import { Services } from "@/components/sections/home/Services";
import { RentalTeaser } from "@/components/sections/home/RentalTeaser";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { Certifications } from "@/components/sections/home/Certifications";
import { MissionVision } from "@/components/sections/home/MissionVision";
import { Leadership } from "@/components/sections/home/Leadership";

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <Stats />
      <Services />
      <RentalTeaser />
      <FeaturedProjects />
      <ClientLogos />
      <Certifications />
      <MissionVision />
      <Leadership />
    </>
  );
}

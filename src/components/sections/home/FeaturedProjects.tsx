"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
// In a real project with full GSAP integration, we would use useGSAP here.
// For now, we will just structure the horizontal scrolling section with standard CSS overflow.

const featuredProjects = [
  {
    title: "Concrete Chimney Tower",
    location: "Jebel Ali, Dubai",
    scope: "Complete demolition of a 90m concrete chimney to ground using custom spider robotic machine.",
    slug: "jebel-ali-chimney-tower",
    image: "placeholder-chimney" // Replace with actual image path
  },
  {
    title: "Marsa Al Arab",
    location: "Dubai",
    scope: "Demolition of 3600 Bar, Verdana Beach building, breakwater concrete elements, and slipway.",
    slug: "marsa-al-arab",
    image: "placeholder-marsa"
  },
  {
    title: "Dubai International Airport, Concourse 4",
    location: "Dubai",
    scope: "Controlled demolition of 23 Northern Apron Buildings.",
    slug: "dxb-concourse-4",
    image: "placeholder-dxb"
  },
  {
    title: "Vale Oman Pelletiser Plant",
    location: "Sohar, Oman",
    scope: "Refractory linings removal at Sohar pelletiser plant.",
    slug: "vale-oman-pelletiser",
    image: "placeholder-vale"
  }
];

export function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-white overflow-hidden border-t border-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h2 className="text-5xl md:text-7xl font-bold text-brand-gray-900 max-w-2xl leading-none tracking-tight">
          Selected Works
        </h2>
        <Button asChild variant="outline" className="rounded-full px-8 h-12 hidden md:flex shrink-0">
          <Link href="/projects">
            All Projects
          </Link>
        </Button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="pl-4 md:pl-8 lg:pl-[max(2rem,calc((100vw-1536px)/2+2rem))]">
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProjects.map((project, index) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={index}
              className="snap-start shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] group flex flex-col"
            >
              <div className="aspect-[4/3] bg-brand-gray-100 overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-brand-gray-100 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                   <span className="text-brand-gray-500 font-mono text-sm tracking-widest uppercase">[Image Placeholder]</span>
                </div>
              </div>
              <div className="flex flex-col border-t border-brand-gray-300 pt-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-brand-gray-900 group-hover:text-brand-red transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-brand-gray-500 whitespace-nowrap">{project.location}</span>
                </div>
                <p className="text-brand-gray-700 font-medium">
                  {project.scope}
                </p>
              </div>
            </Link>
          ))}
          
          {/* View All Card */}
          <div className="snap-start shrink-0 w-[200px] md:w-[300px] flex items-center justify-center mr-8">
             <Link 
              href="/projects"
              className="w-32 h-32 rounded-full border border-brand-gray-300 flex items-center justify-center group hover:bg-brand-gray-900 hover:border-brand-gray-900 transition-colors"
            >
              <ArrowRight className="w-8 h-8 text-brand-gray-900 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 md:hidden">
        <Button asChild variant="outline" className="w-full rounded-full h-14">
          <Link href="/projects">All Projects</Link>
        </Button>
      </div>
    </section>
  );
}

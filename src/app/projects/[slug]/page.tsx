import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: "Not Found"
    };
  }

  return {
    title: `${project.title} Demolition - ${project.location}`,
    description: `${project.scope}. Delivered by Diamond Edge Cutting in ${project.location}.`,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            "name": project.title,
            "description": project.scope,
            "locationCreated": {
              "@type": "Place",
              "name": project.location
            },
            "creator": {
              "@id": "https://diamondedgecutting.com/#organization"
            }
          })
        }}
      />

      <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8 text-brand-gray-500 font-bold tracking-widest uppercase text-sm">
              <span>{project.location}</span>
              {project.year && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  <span>{project.year}</span>
                </>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span>{project.category}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-brand-gray-900 leading-[0.9] tracking-tighter">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-8 flex flex-col gap-24">
              {/* Project Overview */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Overview</h2>
                <div className="text-xl text-brand-gray-700 font-medium leading-relaxed space-y-8 max-w-3xl">
                  <p>
                    Diamond Edge Cutting was appointed to deliver specialist demolition services for {project.title} located in {project.location}. The project required stringent safety protocols and precision engineering.
                  </p>
                  <p>
                    Our experienced team deployed advanced machinery to meet the tight programme requirements while ensuring zero disruption to surrounding operational areas.
                  </p>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="border-t border-brand-gray-300 pt-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Scope</h2>
                <ul className="flex flex-col gap-6">
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 shrink-0" />
                    <span className="text-brand-gray-700 text-xl font-medium">{project.scope}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 shrink-0" />
                    <span className="text-brand-gray-700 text-xl font-medium">Site establishment and hazard isolation</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 shrink-0" />
                    <span className="text-brand-gray-700 text-xl font-medium">Waste segregation and recycling-led disposal</span>
                  </li>
                </ul>
              </div>

              {/* Image Gallery */}
              <div className="border-t border-brand-gray-300 pt-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[4/3] bg-brand-gray-100 flex items-center justify-center transition-transform duration-700 hover:scale-105">
                      <span className="text-brand-gray-500 font-mono text-sm uppercase tracking-widest">[Image {i}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-brand-gray-50 border border-brand-gray-100 p-10 flex flex-col gap-8 mb-12">
                <h3 className="text-3xl font-bold text-brand-gray-900 tracking-tight">Details</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col border-b border-brand-gray-200 pb-6">
                    <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Sector</span>
                    <span className="font-bold text-brand-gray-900 text-xl">{project.category}</span>
                  </div>
                  <div className="flex flex-col border-b border-brand-gray-200 pb-6">
                    <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Location</span>
                    <span className="font-bold text-brand-gray-900 text-xl">{project.location}</span>
                  </div>
                  {project.year && (
                    <div className="flex flex-col">
                      <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Year</span>
                      <span className="font-bold text-brand-gray-900 text-xl">{project.year}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-brand-gray-300 pt-10">
                <h3 className="text-2xl font-bold text-brand-gray-900 mb-8 tracking-tight">Related Services</h3>
                <div className="flex flex-col gap-6">
                  <Link 
                    href="/demolition-services#robotic-demolition"
                    className="group flex flex-col gap-2"
                  >
                    <span className="font-bold text-brand-gray-900 text-xl group-hover:text-brand-red transition-colors">
                      Robotic Demolition
                    </span>
                    <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                      View Service <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link 
                    href="/demolition-services#controlled-demolition"
                    className="group flex flex-col gap-2"
                  >
                    <span className="font-bold text-brand-gray-900 text-xl group-hover:text-brand-red transition-colors">
                      Controlled Demolition
                    </span>
                    <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                      View Service <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { servicesDetails } from "@/data/services";
import { ArrowRight } from "lucide-react";

export function ServiceDetails() {
  return (
    <div className="flex flex-col">
      {servicesDetails.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id} 
          className={`py-32 ${index % 2 === 0 ? 'bg-brand-gray-50' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-start`}>
              
              <div className="flex flex-col w-full lg:w-1/2">
                <span className="text-brand-gray-500 font-mono text-xl mb-4">/0{index + 1}</span>
                <h2 className="text-4xl md:text-6xl font-bold text-brand-gray-900 mb-8 tracking-tight">{service.title}</h2>
                <p className="text-xl text-brand-gray-700 leading-relaxed font-medium mb-12">
                  {service.lead}
                </p>
                
                {service.shines && (
                  <div className="mb-12 border-t border-brand-gray-300 pt-8">
                    <h3 className="text-2xl font-bold text-brand-gray-900 mb-6">Capabilities</h3>
                    <ul className="flex flex-col gap-4">
                      {service.shines.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 shrink-0" />
                          <span className="text-brand-gray-700 text-lg font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.equipment && (
                  <div className="mb-12 border-t border-brand-gray-300 pt-8">
                    <h3 className="text-2xl font-bold text-brand-gray-900 mb-4">Equipment</h3>
                    <p className="text-brand-gray-700 text-lg font-medium">{service.equipment}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button asChild size="lg" variant="brand">
                    <Link href={service.ctaLink}>{service.cta}</Link>
                  </Button>
                  
                  {service.crossSell && (
                    <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg group">
                      <Link href={service.crossSell.link}>
                        {service.crossSell.text} 
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="w-full lg:w-1/2 aspect-[4/5] bg-brand-gray-100 overflow-hidden relative sticky top-32">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 hover:scale-105">
                  <span className="text-brand-gray-500 font-mono text-sm tracking-widest uppercase">[Image: {service.title}]</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ServiceHero() {
  return (
    <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
      <div className="container relative z-20 mx-auto px-4 md:px-8">
        <div className="max-w-5xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-brand-gray-900 mb-12 leading-[0.9] tracking-tighter">
            Services.
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-brand-gray-300 pt-12">
            <p className="text-2xl md:text-3xl text-brand-gray-700 max-w-2xl font-medium leading-relaxed">
              Engineering-led demolition, cutting, drilling, and strip-out. From 90-metre chimney towers to confined-space works.
            </p>
            <Button asChild variant="brand" size="lg" className="shrink-0">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 bg-brand-red text-white relative overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M-10,10 l20,-20 M0,40 l40,-40 M30,50 l20,-20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            Have a Project? Let's Talk.
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Whether it's a controlled tower demolition in central Dubai, refractory work in a refinery, or a long-term equipment rental for your site, we deliver predictable execution. Tell us about your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild variant="brand" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">Get a Project Quote</Link>
            </Button>
            
            <div className="hidden sm:block w-px h-8 bg-white/30 mx-2" />
            
            <a 
              href="tel:+97143706434" 
              className="flex items-center justify-center gap-3 text-lg font-medium hover:text-brand-gray-100 transition-colors w-full sm:w-auto"
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-white/80">Or call us directly:</span>
              <span className="font-bold">+971 4 370 6434</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

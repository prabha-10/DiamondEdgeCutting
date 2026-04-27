import type { Metadata } from "next";
import { ContactSchema } from "@/components/seo/ContactSchema";
import { ContactForm } from "./ContactForm";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Diamond Edge Cutting | Demolition & Equipment Rental Dubai",
  description: "Get in touch with Diamond Edge Cutting. Dubai HQ and Abu Dhabi office. Demolition project quotes, equipment rental inquiries, and operator availability.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSchema />

      <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-brand-gray-900 leading-[0.9] tracking-tighter mb-12">
              Contact.
            </h1>
            <div className="border-t border-brand-gray-300 pt-12">
              <p className="text-2xl md:text-3xl text-brand-gray-700 max-w-2xl font-medium leading-relaxed">
                Send us your project brief, equipment requirements, or general inquiry. We typically reply within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Send an Inquiry</h2>
              <ContactForm />
            </div>

            {/* Office Details Column */}
            <div className="lg:col-span-5 flex flex-col gap-16">
              
              <div className="flex flex-col gap-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Offices</h2>
                
                <div className="flex flex-col gap-8 border-t border-brand-gray-300 pt-8">
                  {/* Dubai HQ */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-brand-gray-900 tracking-tight">
                      Dubai HQ
                    </h3>
                    <div className="text-brand-gray-700 text-lg font-medium leading-relaxed">
                      <p>Plot 597-604, Dubai Investment Park 2</p>
                      <p>P.O. Box 430971, Dubai, UAE</p>
                      <p className="mt-2 text-brand-gray-500">Fax: +971 4 370 6432</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 border-t border-brand-gray-300 pt-8">
                  {/* Abu Dhabi Office */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-brand-gray-900 tracking-tight">
                      Abu Dhabi Office
                    </h3>
                    <div className="text-brand-gray-700 text-lg font-medium leading-relaxed">
                      <p>9th Floor, ADNIC Building, Khalifa Street</p>
                      <p>P.O. Box 45526, Abu Dhabi, UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Direct</h2>
                
                <div className="flex flex-col gap-6 border-t border-brand-gray-300 pt-8">
                  <a href="tel:+97143706434" className="group flex items-center justify-between border-b border-brand-gray-200 pb-6">
                    <div className="flex flex-col">
                      <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Phone</span>
                      <span className="font-bold text-brand-gray-900 text-2xl group-hover:text-brand-red transition-colors">+971 4 370 6434</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-brand-gray-300 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                  </a>
                  
                  <a href="mailto:info@diamondedgecutting.com" className="group flex items-center justify-between border-b border-brand-gray-200 pb-6">
                    <div className="flex flex-col">
                      <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Email</span>
                      <span className="font-bold text-brand-gray-900 text-xl group-hover:text-brand-red transition-colors break-all">info@diamondedgecutting.com</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-brand-gray-300 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                  </a>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Hours</span>
                      <div className="text-brand-gray-900 font-medium text-lg">
                        <span className="block">Sun - Thu: 8:00 AM - 6:00 PM</span>
                        <span className="block text-brand-gray-500">Fri - Sat: Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="h-[600px] w-full bg-brand-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-brand-gray-500 font-mono text-sm tracking-widest uppercase">[Google Maps Embed]</span>
        </div>
      </section>
    </>
  );
}

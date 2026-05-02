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

      {/* Hero, Bungee-style: tiny eyebrow, big inviting headline, divider, email + reply note */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[13px] text-[#707070]">
              Get in touch
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <h1 className="lg:col-span-9 font-sans font-medium text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[1.05] tracking-tight">
                Got a project in mind?
                <br />
                Let&apos;s plan it together.
              </h1>
              <span className="lg:col-span-3 font-['Inter_Display',sans-serif] text-[14px] text-[#707070] lg:text-right lg:pb-4">
                Replies within 24 hours · Sun – Thu, 8:00 – 18:00 GST
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form section, form on the right, empty space on the left */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Empty left column on desktop */}
            <div className="hidden lg:block lg:col-span-5" aria-hidden />

            {/* Form Column */}
            <div className="lg:col-span-7 flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Send an Inquiry</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Direct + Offices below the form, 2 column row */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-16 border-t border-brand-gray-300">

            {/* Direct */}
            <div className="flex flex-col gap-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Direct</h2>

              <div className="flex flex-col gap-6 border-t border-brand-gray-300 pt-8">
                <a href="tel:+97143706434" className="group flex items-center justify-between border-b border-brand-gray-300 pb-6">
                  <div className="flex flex-col">
                    <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest mb-2">Phone</span>
                    <span className="font-bold text-brand-gray-900 text-2xl group-hover:text-brand-red transition-colors">+971 4 370 6434</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-brand-gray-300 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                </a>

                <a href="mailto:info@diamondedgecutting.com" className="group flex items-center justify-between border-b border-brand-gray-300 pb-6">
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

            {/* Offices */}
            <div className="flex flex-col gap-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight">Offices</h2>

              <div className="flex flex-col gap-8 border-t border-brand-gray-300 pt-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-brand-gray-900 tracking-tight">Dubai HQ</h3>
                  <div className="text-brand-gray-700 text-lg font-medium leading-relaxed">
                    <p>Plot 597-604, Dubai Investment Park 2</p>
                    <p>P.O. Box 430971, Dubai, UAE</p>
                    <p className="mt-2 text-brand-gray-500">Fax: +971 4 370 6432</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 border-t border-brand-gray-300 pt-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-brand-gray-900 tracking-tight">Abu Dhabi Office</h3>
                  <div className="text-brand-gray-700 text-lg font-medium leading-relaxed">
                    <p>9th Floor, ADNIC Building, Khalifa Street</p>
                    <p>P.O. Box 45526, Abu Dhabi, UAE</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map, entire container clickable, opens Google Maps in new tab */}
      <a
        href="https://www.google.com/maps/place/DIAMOND+EDGE+CUTTING+LLC/@24.985382,55.1885506,17z/data=!4m15!1m8!3m7!1s0x3e5f7311c2c99bc1:0xc8741ee5922448b5!2sDIAMOND+EDGE+CUTTING+LLC!8m2!3d24.985369!4d55.188579!10e1!16s%2Fg%2F11rhsrwtb1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Diamond Edge Cutting location in Google Maps"
        className="group relative block h-[600px] w-full bg-brand-gray-100 overflow-hidden cursor-pointer"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.43349123013!2d55.1885506!3d24.985381999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f7311c2c99bc1%3A0xc8741ee5922448b5!2sDIAMOND%20EDGE%20CUTTING%20LLC!5e0!3m2!1sen!2sin!4v1777547666281!5m2!1sen!2sin"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.97)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Diamond Edge Cutting, Dubai HQ map"
        />

        {/* Centered colored brand pin (no pulsing halo) */}
        <div
          className="absolute pointer-events-none"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fill="#C8102E"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
              d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.6 6.55 11.55 7.05 12s.45.45.45.45.45-.0 .45-.45c.5-.45 7.05-6.4 7.05-12C19.5 5.36 16.14 2 12 2z"
            />
            <circle cx="12" cy="9.5" r="2.6" fill="#ffffff" />
          </svg>
        </div>

        {/* "Open in Google Maps" affordance, visible on hover */}
        <span className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-brand-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
          Open in Google Maps
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
      </a>
    </>
  );
}

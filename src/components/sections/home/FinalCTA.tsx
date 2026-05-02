import React from "react";
import { ContactForm } from "@/app/contact/ContactForm";
import { Phone, Mail, Clock } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-28 md:py-32 overflow-hidden bg-brand-gray-900 text-white">
      {/* Background image + dark overlay */}
      <img
        src="https://images.unsplash.com/photo-1711618732376-416cf6af54f6?w=2000&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-brand-red/40"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column, heading + direct contact options */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-28">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand-red"
                  aria-hidden
                />
                <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-white/70">
                  Start your project
                </span>
              </div>
              <h2 className="font-sans font-medium text-white text-[40px] md:text-[56px] lg:text-[64px] leading-[1.04] tracking-tight">
                Let&apos;s plan your next
                <br className="hidden md:block" /> demolition project.
              </h2>
              <p className="font-['Inter_Display',sans-serif] font-normal text-[17px] leading-[1.55] text-white/75 max-w-md">
                Tell us about the scope. We&apos;ll come back with a method
                statement and budget within 24 hours, no commitment.
              </p>
            </div>

            {/* Direct contact strip */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/15">
              <a
                href="tel:+97143706434"
                className="group flex items-center gap-3 text-white hover:text-brand-red transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-colors">
                  <Phone className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-sans font-medium text-[18px] tracking-tight">
                  +971 4 370 6434
                </span>
              </a>
              <a
                href="mailto:info@diamondedgecutting.com"
                className="group flex items-center gap-3 text-white hover:text-brand-red transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-colors">
                  <Mail className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-sans font-medium text-[16px] tracking-tight break-all">
                  info@diamondedgecutting.com
                </span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Clock className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-['Inter_Display',sans-serif] text-[14px]">
                  Sun – Thu, 8:00 – 18:00 GST
                </span>
              </div>
            </div>
          </div>

          {/* Right column, white form card */}
          <div className="lg:col-span-7">
            <div className="bg-white text-brand-gray-900 rounded-[28px] p-6 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
              <h3 className="font-sans font-medium text-brand-gray-900 text-[26px] md:text-[32px] mb-8 tracking-tight">
                Send an Inquiry
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { rentalCategories } from "@/data/navigation";

// lucide-react in this project ships without brand glyphs, so the LinkedIn
// mark is an inline SVG.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const serviceLinks = [
  { name: "Robotic Demolition", href: "/demolition-services#robotic-demolition" },
  { name: "Controlled & Structural Demolition", href: "/demolition-services#controlled-demolition" },
  { name: "Wire Sawing", href: "/demolition-services#wire-sawing" },
  { name: "Wall & Track Sawing", href: "/demolition-services#wall-sawing" },
  { name: "Core Drilling", href: "/demolition-services#core-drilling" },
  { name: "Refractory, Kiln & Tunnelling", href: "/demolition-services#refractory-kiln" },
  { name: "Floor & Apron Sawing", href: "/demolition-services#floor-sawing" },
  { name: "Soft Demolition & Strip Out", href: "/demolition-services#strip-out" },
  { name: "View all services", href: "/demolition-services" },
];

export function Footer() {
  return (
    <footer className="bg-brand-gray-900 text-white relative">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-brand-charcoal rounded-2xl px-5 py-4 w-fit"
              aria-label="Diamond Edge Cutting — Home"
            >
              <img
                src="/dec-logo.png"
                alt="Diamond Edge Cutting"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 text-base leading-relaxed max-w-xs">
              Delivering safe, precise, and efficient demolition solutions across the GCC since 2008.
            </p>
            <a
              href="https://www.linkedin.com/company/diamond-edge-cutting-llc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors text-base font-medium"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                <LinkedInIcon className="w-4 h-4" />
              </span>
              Follow us on LinkedIn
            </a>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="flex flex-col gap-4">
              {serviceLinks.map((link, i) => {
                const isLast = i === serviceLinks.length - 1;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={
                        isLast
                          ? "inline-flex items-center gap-1.5 text-brand-red hover:text-white transition-colors text-base font-semibold mt-1"
                          : "text-white/70 hover:text-white transition-colors text-base font-medium"
                      }
                    >
                      {link.name}
                      {isLast && <span aria-hidden>&rarr;</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Rental */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Equipment</h3>
            <ul className="flex flex-col gap-4">
              {rentalCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-base font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <div className="flex flex-col gap-6 text-base text-white/70 font-medium">
              <div className="flex flex-col gap-2">
                <a href="tel:+97143706434" className="hover:text-white transition-colors">
                  +971 4 370 6434
                </a>
                <a href="mailto:info@diamondedgecutting.com" className="hover:text-white transition-colors">
                  info@diamondedgecutting.com
                </a>
              </div>
              <div>
                <p className="text-white mb-2 font-bold">Dubai HQ</p>
                <p>Plot 597-604, DIP 2<br/>Dubai, UAE</p>
              </div>
              <div>
                <p className="text-white mb-2 font-bold">Working Hours</p>
                <p>Monday – Friday: 8:00 AM – 5:00 PM<br/>Saturday: 9:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/70 font-medium">
          <p>&copy; {new Date().getFullYear()} Diamond Edge Cutting. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

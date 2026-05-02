import React from "react";
import Link from "next/link";
import { rentalCategories } from "@/data/navigation";

const serviceLinks = [
  { name: "Robotic Demolition", href: "/demolition-services#robotic-demolition" },
  { name: "Controlled Demolition", href: "/demolition-services#controlled-demolition" },
  { name: "Wire Sawing", href: "/demolition-services#wire-sawing" },
  { name: "Wall & Track Sawing", href: "/demolition-services#wall-sawing" },
  { name: "Core Drilling", href: "/demolition-services#core-drilling" },
  { name: "Refractory & Tunnelling", href: "/demolition-services#refractory-kiln" },
  { name: "Floor & Apron Sawing", href: "/demolition-services#floor-sawing" },
  { name: "Soft Demolition / Strip Out", href: "/demolition-services#strip-out" },
];

export function Footer() {
  return (
    <footer className="bg-brand-gray-900 text-white relative">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/dec-logo.png"
                alt="Diamond Edge Cutting"
                className="h-28 md:h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-brand-gray-500 text-base leading-relaxed max-w-xs">
              Delivering safe, precise, and efficient demolition solutions across the GCC since 2008.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
            <ul className="flex flex-col gap-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-500 hover:text-white transition-colors text-base font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
                    className="text-brand-gray-500 hover:text-white transition-colors text-base font-medium"
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
            <div className="flex flex-col gap-6 text-base text-brand-gray-500 font-medium">
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
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-brand-gray-500 font-medium">
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

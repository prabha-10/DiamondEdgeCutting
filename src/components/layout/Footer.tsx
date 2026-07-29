import React from "react";
import Link from "next/link";
import { getServiceContent, getRentalCategoryContent } from "@/lib/content";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export async function Footer() {
  // Services and Equipment menus mirror the CMS card order from the Demolition
  // Services and Rental Equipment pages (both resolvers sort by `order` asc).
  const [services, rentals] = await Promise.all([
    getServiceContent(),
    getRentalCategoryContent(),
  ]);
  const serviceLinks = services.map((s) => ({
    name: s.title,
    href: `/demolition-services#${s.id}`,
  }));
  const equipmentLinks = rentals.map((c) => ({ name: c.title, href: "/rental-equipment" }));

  return (
    <footer className="bg-brand-gray-900 text-white relative">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white rounded-2xl px-5 py-4 w-full max-w-xs"
              aria-label="Diamond Edge Cutting — Home"
            >
              <img
                src="/dec-logo.png"
                alt="Diamond Edge Cutting"
                className="h-28 md:h-44 w-auto max-w-full object-contain"
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
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-base font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demolition-services"
                  className="inline-flex items-center gap-1.5 text-brand-red hover:text-white transition-colors text-base font-semibold mt-1"
                >
                  View all services<span aria-hidden>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Rental */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Equipment</h3>
            <ul className="flex flex-col gap-4">
              {equipmentLinks.map((link) => (
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
          <p>&copy; {new Date().getFullYear()} Diamond Edge Cutting LLC. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

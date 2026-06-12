"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIntro } from "@/context/IntroContext";

type NavDropdownItem = { name: string; href: string };
type NavLink = { name: string; href: string; dropdown?: NavDropdownItem[] };

export function Header({ rentalCategories }: { rentalCategories?: { title: string; slug: string }[] }) {
  const navigationLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Demolition Services", href: "/demolition-services" },
    { name: "Rental Equipment", href: "/rental-equipment" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { introComplete } = useIntro();

  // On inner pages there's no intro, show immediately
  const isHomepage = pathname === "/";
  const headerVisible = !isHomepage || introComplete;
  
  // Force solid white header on inner pages
  const isSolid = isScrolled || !isHomepage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] pt-4 pb-3 transition-all duration-500",
        isSolid
          ? "bg-white shadow-md border-b border-brand-gray-300"
          : "bg-white/5 backdrop-blur-md border-b border-white/10"
      )}
      style={{
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 200ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 200ms, background-color 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo — compact diamond emblem + wordmark, mirrors the reference site
            so the brand reads clearly at small header heights. */}
        <Link href="/" className="flex items-center gap-3 z-50 group" aria-label="Diamond Edge Cutting — Home">
          <img
            src="/dec-logo.png"
            alt="Diamond Edge Cutting"
            className={cn(
              "h-16 md:h-20 w-auto object-contain scale-[1.18] origin-left transition-[filter] duration-300",
              isSolid ? "" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            )}
          />
        </Link>

        {/* Desktop Navigation, no pill container, items float freely */}
        <nav className="hidden lg:flex items-center gap-2">
          {navigationLinks.map((link) => {
            const isActive = link.dropdown
              ? pathname.startsWith(link.href)
              : pathname === link.href;

            return (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div
                    className={cn(
                      "flex items-center gap-1 cursor-pointer px-4 py-2 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-brand-charcoal text-white"
                        : isSolid
                        ? "text-brand-gray-900 hover:bg-brand-gray-100"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    <Link href={link.href} className="text-base font-bold">
                      {link.name}
                    </Link>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:rotate-180",
                        isActive
                          ? "text-white"
                          : isSolid
                          ? "text-brand-gray-500"
                          : "text-white/70"
                      )}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-80">
                      <div
                        className={cn(
                          "rounded-2xl shadow-xl overflow-hidden py-2 flex flex-col border",
                          isSolid
                            ? "bg-white border-brand-gray-300"
                            : "bg-white/95 backdrop-blur-xl border-white/40"
                        )}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "block px-5 py-3 text-sm font-semibold leading-snug transition-colors",
                              isSolid
                                ? "text-brand-gray-900 hover:bg-brand-gray-100"
                                : "text-brand-gray-900 hover:bg-brand-gray-100"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-full text-base font-bold transition-all duration-200",
                      isActive
                        ? "bg-brand-charcoal text-white"
                        : isSolid
                        ? "text-brand-gray-900 hover:bg-brand-gray-100"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button asChild variant="brand" className="font-bold">
            <Link href="/contact">Discuss Your Project</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 bg-brand-gray-100 rounded-full text-brand-gray-900 transition-colors hover:bg-brand-gray-300"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </header>

    {/* Mobile Navigation Menu — rendered as sibling of <header> so it escapes
        the header's `transform` containing block and uses true viewport-fixed sizing. */}
    <div
      className={cn(
        "fixed inset-0 z-[90] bg-white lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
      aria-hidden={!isMobileMenuOpen}
    >
      {/* Spacer for fixed header */}
      <div className="h-[88px] shrink-0" aria-hidden />

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-6 flex flex-col gap-5">
        {navigationLinks.map((link) => {
          const hasDropdown = !!link.dropdown && link.dropdown.length > 0;
          const isActive = hasDropdown ? pathname.startsWith(link.href) : pathname === link.href;
          const isExpanded = mobileOpenDropdown === link.name;

          if (!hasDropdown) {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans font-semibold text-[26px] tracking-tight transition-colors",
                  isActive ? "text-brand-red" : "text-brand-gray-900"
                )}
              >
                {link.name}
              </Link>
            );
          }

          return (
            <div key={link.name} className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  setMobileOpenDropdown(isExpanded ? null : link.name)
                }
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span
                  className={cn(
                    "font-sans font-semibold text-[26px] tracking-tight transition-colors",
                    isActive ? "text-brand-red" : "text-brand-gray-900"
                  )}
                >
                  {link.name}
                </span>
                <span
                  className={cn(
                    "shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                    isExpanded
                      ? "bg-brand-gray-100 text-brand-gray-900 rotate-180"
                      : "bg-brand-gray-900 text-white"
                  )}
                  aria-hidden
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2} />
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col pl-4 gap-3 border-l-2 border-brand-gray-300 mt-4">
                    <Link
                      href={link.href}
                      className="font-['Inter_Display',sans-serif] text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-red"
                    >
                      View all
                    </Link>
                    {link.dropdown!.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="font-['Inter_Display',sans-serif] text-[15px] font-medium text-brand-gray-700 hover:text-brand-red transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-brand-gray-300 px-6 py-6 flex flex-col gap-4 shrink-0">
        <Button asChild size="lg" variant="brand" className="w-full">
          <Link href="/contact">Discuss Your Project</Link>
        </Button>
        <a
          href="tel:+97143706434"
          className="flex justify-center items-center gap-2 py-2 font-['Inter_Display',sans-serif] text-brand-gray-700 font-medium text-[15px]"
        >
          <Phone className="w-4 h-4" strokeWidth={1.8} />
          <span>+971 4 370 6434</span>
        </a>
      </div>
    </div>
    </>
  );
}

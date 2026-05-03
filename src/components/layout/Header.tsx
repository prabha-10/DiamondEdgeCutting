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
    {
      name: "Rental Equipment",
      href: "/rental-equipment",
      dropdown: (rentalCategories || []).map((c) => ({
        name: c.title,
        href: `/rental-equipment/${c.slug}`,
      })),
    },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { introComplete } = useIntro();

  // On inner pages there's no intro, show immediately
  const isHomepage = pathname === "/";
  const headerVisible = !isHomepage || introComplete;

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-6 pb-4 transition-all duration-500",
        isScrolled
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div
            className={cn(
              "w-9 h-9 group-hover:bg-brand-red transition-colors flex items-center justify-center rounded-full font-bold text-lg leading-none border",
              isScrolled
                ? "bg-brand-red text-white border-brand-red"
                : "bg-white/20 text-white border-white/30"
            )}
          >
            D
          </div>
          <span
            className={cn(
              "font-bold text-xl tracking-tight transition-colors",
              isScrolled ? "text-brand-gray-900" : "text-white"
            )}
          >
            Diamond Edge
          </span>
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
                        ? isScrolled
                          ? "bg-brand-red text-white"
                          : "bg-white text-brand-red"
                        : isScrolled
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
                          ? isScrolled
                            ? "text-white"
                            : "text-brand-red"
                          : isScrolled
                          ? "text-brand-gray-500"
                          : "text-white/70"
                      )}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 w-64">
                      <div
                        className={cn(
                          "rounded-2xl shadow-xl overflow-hidden py-2 flex flex-col border",
                          isScrolled
                            ? "bg-white border-brand-gray-300"
                            : "bg-white/10 backdrop-blur-xl border-white/20"
                        )}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "px-5 py-3 text-sm font-semibold transition-colors",
                              isScrolled
                                ? "text-brand-gray-900 hover:bg-brand-gray-100"
                                : "text-white hover:bg-white/10"
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
                        ? isScrolled
                          ? "bg-brand-red text-white"
                          : "bg-white text-brand-red"
                        : isScrolled
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
            <Link href="/contact">Start Your Project</Link>
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

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] bg-white lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8 overflow-y-auto">
          <nav className="flex flex-col gap-8 mt-8">
            {navigationLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                {link.dropdown ? (
                  <div className="flex flex-col gap-4">
                    <span className="text-2xl font-bold text-brand-gray-900 border-b border-brand-gray-100 pb-4">
                      {link.name}
                    </span>
                    <div className="flex flex-col pl-4 gap-4 border-l border-brand-gray-100">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg text-brand-gray-700 font-medium hover:text-brand-red"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-2xl font-bold transition-colors",
                      pathname === link.href ? "text-brand-red" : "text-brand-gray-900"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-auto pt-12 flex flex-col gap-4">
            <Button asChild size="lg" variant="brand" className="w-full">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <a
              href="tel:+97143706434"
              className="flex justify-center items-center gap-2 py-4 text-brand-gray-700 font-medium text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>+971 4 370 6434</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

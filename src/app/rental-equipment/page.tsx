import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/rental/CategoryCard";
import { EquipmentCard, type EquipmentCardData } from "@/components/rental/EquipmentCard";
import {
  getAllRentalCategories,
  getFeaturedEquipment,
} from "../../../sanity/lib/queries";
import type { SanityImage } from "@/lib/sanity-image";

export const metadata: Metadata = {
  title: "Demolition Equipment Rental Dubai | Brokk, Excavators, Skid Steers",
  description:
    "Rent specialist demolition equipment across Dubai and the UAE. Brokk robotic machines, excavators, mini excavators, skid steers, wheel loaders, waste removal. Operators included.",
  openGraph: {
    title: "Equipment Rental | Diamond Edge Cutting",
    description:
      "The GCC's largest specialist demolition fleet, mobilised on your programme.",
    type: "website",
  },
};

// Re-fetch every 60s so Studio edits show up quickly without manual deploys.
export const revalidate = 60;

type CategoryRow = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  hasAttachmentTab?: boolean;
  equipmentCount?: number;
  heroImage?: SanityImage;
};

type FeaturedRow = {
  _id: string;
  title: string;
  subtitle?: string;
  manufacturer?: string;
  slug: string;
  categorySlug: string;
  heroImage?: SanityImage;
};

export default async function RentalEquipmentLandingPage() {
  const [categories, featured] = await Promise.all([
    getAllRentalCategories() as Promise<CategoryRow[]>,
    getFeaturedEquipment() as Promise<FeaturedRow[]>,
  ]);

  const featuredCards: EquipmentCardData[] = (featured ?? []).map((f) => ({
    _id: f._id,
    title: f.title,
    subtitle: f.subtitle,
    manufacturer: f.manufacturer,
    slug: f.slug,
    categorySlug: f.categorySlug,
    heroImage: f.heroImage,
  }));

  return (
    <>
      <Script
        id="rental-landing-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Equipment Rental Categories",
            itemListElement: (categories ?? []).map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://diamondedgecutting.com/rental-equipment/${c.slug}`,
              name: c.title,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 bg-white overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
                Equipment Rental
              </span>
            </div>
            <h1 className="font-display font-medium text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.98] tracking-tight">
              The GCC&apos;s largest specialist fleet,
              <br className="hidden md:block" /> mobilised on your programme.
            </h1>
            <p className="font-['Inter_Display',sans-serif] text-[18px] md:text-[20px] leading-[1.55] text-brand-gray-700 max-w-2xl">
              Brokk and Husqvarna DXR robotic demolition, 13 to 50 ton excavators,
              mini excavators, skid steers, wheel loaders, and waste removal.
              Trained operators, ISO 45001 compliance, same-day quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button asChild variant="brand">
                <Link href="/contact">Talk to the hire team</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#categories">Browse fleet</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-gray-900 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center font-['Inter_Display',sans-serif] text-[13px] md:text-[14px] tracking-wide text-white/85">
            300+ trained crew &nbsp;·&nbsp; ISO 45001 safety &nbsp;·&nbsp; Dubai
            Municipality G+12 approved &nbsp;·&nbsp; Same-day quotes for live
            tenders
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section id="categories" className="scroll-mt-24 py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-3 mb-12">
            <span className="font-['Inter_Display',sans-serif] text-[12px] uppercase tracking-[0.18em] text-brand-red">
              Fleet by category
            </span>
            <h2 className="font-display font-medium text-brand-gray-900 text-[32px] md:text-[44px] tracking-tight leading-[1.1]">
              Six categories, every demolition job covered.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(categories ?? []).map((c) => (
              <CategoryCard key={c._id} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured equipment strip */}
      {featuredCards.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-gray-50 border-t border-brand-gray-300">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div className="flex flex-col gap-3">
                <span className="font-['Inter_Display',sans-serif] text-[12px] uppercase tracking-[0.18em] text-brand-red">
                  Featured
                </span>
                <h2 className="font-display font-medium text-brand-gray-900 text-[28px] md:text-[36px] tracking-tight">
                  Editor picks from the fleet
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCards.map((it) => (
                <EquipmentCard key={it._id} item={it} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry CTA band */}
      <section className="py-16 md:py-24 bg-brand-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="font-display font-medium text-white text-[32px] md:text-[44px] tracking-tight leading-[1.1] mb-6">
            Need a tailored package?
          </h2>
          <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] text-white/75 leading-[1.55] mb-10 max-w-2xl mx-auto">
            Send us your project scope, location, and dates. We come back with
            availability, pricing, and operator options within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild variant="brand">
              <Link href="/contact">
                Request a quote
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </Button>
            <a
              href="tel:+97143706434"
              className="inline-flex items-center gap-2 font-sans font-medium text-white/85 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              Or call the hire team: +971 4 370 6434
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

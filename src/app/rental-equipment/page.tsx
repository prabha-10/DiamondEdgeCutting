import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EquipmentCard, type EquipmentCardData } from "@/components/rental/EquipmentCard";
import { getAllEquipment } from "../../../sanity/lib/queries";
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

export const revalidate = 60;

type EquipmentRow = {
  _id: string;
  title: string;
  subtitle?: string;
  manufacturer?: string;
  slug: string;
  categorySlug: string;
  categoryTitle: string;
  unitsInStock?: number | null;
  heroImage?: SanityImage;
};

export default async function RentalEquipmentLandingPage() {
  const allEquipment = (await getAllEquipment()) as EquipmentRow[];

  const groups = (allEquipment ?? []).reduce(
    (acc, item) => {
      const key = item.categorySlug;
      if (!acc.has(key))
        acc.set(key, { title: item.categoryTitle, slug: key, items: [] });
      acc.get(key)!.items.push(item);
      return acc;
    },
    new Map<string, { title: string; slug: string; items: EquipmentRow[] }>()
  );

  const groupList = [...groups.values()];

  return (
    <>
      <Script
        id="rental-landing-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Rental Equipment",
            itemListElement: groupList.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://diamondedgecutting.com/rental-equipment/${g.slug}`,
              name: g.title,
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
                <a href="#fleet">Browse fleet</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment grouped by category */}
      <div id="fleet" className="bg-white">
        {groupList.map((g) => {
          const cards: EquipmentCardData[] = g.items.map((item) => ({
            _id: item._id,
            title: item.title,
            subtitle: item.subtitle,
            manufacturer: item.manufacturer,
            slug: item.slug,
            categorySlug: item.categorySlug,
            unitsInStock: item.unitsInStock,
            heroImage: item.heroImage,
          }));

          return (
            <section
              key={g.slug}
              id={g.slug}
              className="scroll-mt-[140px] py-14 md:py-20 border-b border-brand-gray-200 last:border-b-0"
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-10">
                  <h2 className="font-display font-medium text-brand-gray-900 text-[28px] md:text-[40px] tracking-tight leading-[1.1]">
                    {g.title}
                  </h2>
                  <Link
                    href={`/rental-equipment/${g.slug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 font-['Inter_Display',sans-serif] text-[14px] font-medium text-brand-gray-500 hover:text-brand-gray-900 transition-colors"
                  >
                    View all
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {cards.map((item) => (
                    <EquipmentCard key={item._id} item={item} />
                  ))}
                </div>
                <div className="mt-8 sm:hidden">
                  <Link
                    href={`/rental-equipment/${g.slug}`}
                    className="inline-flex items-center gap-1.5 font-['Inter_Display',sans-serif] text-[14px] font-medium text-brand-gray-500 hover:text-brand-gray-900 transition-colors"
                  >
                    View all {g.title}
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        {groupList.length === 0 && (
          <section className="py-24">
            <div className="container mx-auto px-4 md:px-8 text-center">
              <p className="font-['Inter_Display',sans-serif] text-[16px] text-brand-gray-500">
                Equipment catalogue is being updated. Please{" "}
                <Link href="/contact" className="underline hover:text-brand-gray-900">
                  contact us
                </Link>{" "}
                for availability.
              </p>
            </div>
          </section>
        )}
      </div>

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
              <Link href="/contact">Request a quote</Link>
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

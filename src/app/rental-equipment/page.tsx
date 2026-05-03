import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Wrench, CalendarClock, ArrowRight, Phone } from "lucide-react";
import { getAllCategories } from "../../../sanity/lib/queries";
import { equipmentCategories as fallbackCategories } from "@/lib/equipment-data";

export const metadata: Metadata = {
  title: "Demolition Equipment Rental Dubai | Brokk, Excavators, Skid Steers",
  description:
    "Rent specialist demolition equipment across Dubai and UAE. Brokk robotic machines, mini excavators, skid steers, wheel loaders, waste removal. Operators included.",
  openGraph: {
    title: "Equipment Rental | Diamond Edge Cutting",
    description:
      "Rent the GCC's largest specialist demolition fleet. 6 categories, operator-led, mobilised on your programme.",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative pt-48 pb-28 bg-brand-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tighter">
          Specialist demolition and heavy-equipment rental across the UAE
        </h1>
        <p className="text-xl md:text-2xl text-brand-gray-400 max-w-3xl font-medium leading-relaxed mb-12">
          From the GCC&apos;s largest robotic demolition fleet to mini excavators, skid steers,
          wheel loaders, and waste removal. Every machine ships with a trained operator where
          required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="brand" size="lg">
            <Link href="/contact">Request equipment quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            <a href="#categories">Browse all categories</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Value props                                                        */
/* ------------------------------------------------------------------ */
const valueProps = [
  {
    icon: ShieldCheck,
    title: "Trained operators included",
    body: "All operators HSE-certified, ISO 45001-compliant. Wet or dry hire on approved equipment.",
  },
  {
    icon: Wrench,
    title: "Maintained to manufacturer standard",
    body: "Daily checks, monthly servicing, full asset register, ready for site.",
  },
  {
    icon: CalendarClock,
    title: "Project-flexible terms",
    body: "Hourly, daily, weekly, monthly, or full-project hire. Same-day quotes for live tenders.",
  },
];

function ValuePropsSection() {
  return (
    <section className="py-20 bg-white border-b border-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {valueProps.map((vp) => (
            <div key={vp.title} className="flex flex-col gap-4">
              <vp.icon className="w-8 h-8 text-brand-red" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-brand-gray-900">{vp.title}</h3>
              <p className="text-brand-gray-700 font-medium leading-relaxed">{vp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Category card                                                      */
/* ------------------------------------------------------------------ */
function CategoryCard({ cat }: { cat: any }) {
  const imgSrc = cat.imageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop";
  const tags: string[] = cat.trustTags || [];

  return (
    <Link
      href={`/rental-equipment/${cat.slug}`}
      className="group flex flex-col bg-white border border-brand-gray-300 rounded-xl overflow-hidden hover:border-brand-red hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imgSrc}
          alt={cat.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {cat.shortLabel && (
          <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white bg-brand-red/40 backdrop-blur-md rounded">
            {cat.shortLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-2xl font-medium text-brand-gray-900">{cat.title}</h3>
        <p className="text-base text-brand-gray-700 leading-relaxed line-clamp-3">
          {cat.overview || cat.description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="border border-brand-gray-300 rounded px-2.5 py-1 text-sm text-brand-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-1 mt-2 text-brand-red font-medium text-sm">
          Browse models
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Category grid                                                      */
/* ------------------------------------------------------------------ */
function CategoryGridSection({ categories }: { categories: any[] }) {
  return (
    <section id="categories" className="py-24 bg-brand-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight mb-4">
            Equipment categories
          </h2>
          <p className="text-lg text-brand-gray-700 font-medium leading-relaxed">
            Specialist categories covering everything from robotic demolition to waste removal.
            Click any category to see models and specs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat: any) => (
            <CategoryCard key={cat._id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust strip                                                        */
/* ------------------------------------------------------------------ */
function TrustStripSection() {
  return (
    <section className="bg-brand-gray-900 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-center text-white/80 text-sm tracking-wide font-medium">
          300+ trained crew &nbsp;&middot;&nbsp; ISO 45001 safety &nbsp;&middot;&nbsp; Dubai
          Municipality G+12 approved &nbsp;&middot;&nbsp; Same-day quotes for live tenders
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */
function FinalCTASection() {
  return (
    <section className="py-20 bg-brand-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 tracking-tight mb-6">
          Have a project? Tell us what you need.
        </h2>
        <p className="text-xl text-brand-gray-700 font-medium leading-relaxed mb-10">
          Send us your project scope, location, and dates. We&apos;ll come back with availability,
          pricing, and operator options within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button asChild variant="brand" size="lg">
            <Link href="/contact">Request a quote</Link>
          </Button>
          <a
            href="tel:+97143706434"
            className="flex items-center gap-2 text-brand-gray-700 font-medium hover:text-brand-red transition-colors"
          >
            <Phone className="w-5 h-5" />
            Or call our hire team: +971 4 370 6434
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function RentalEquipmentPage() {
  let categories = [];
  try {
    categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      categories = fallbackCategories.map(c => ({
        _id: c.slug,
        title: c.title,
        slug: c.slug,
        overview: c.description,
        shortLabel: c.shortLabel,
        trustTags: c.trustTags,
        imageUrl: c.imageUrl
      }));
    }
  } catch (error) {
    categories = fallbackCategories.map(c => ({
      _id: c.slug,
      title: c.title,
      slug: c.slug,
      overview: c.description,
      shortLabel: c.shortLabel,
      trustTags: c.trustTags,
      imageUrl: c.imageUrl
    }));
  }

  return (
    <>
      <Script
        id="rental-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Equipment Rental Categories",
            itemListElement: categories.map((cat: any, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://diamondedgecutting.com/rental-equipment/${cat.slug}`,
              name: cat.title,
            })),
          }),
        }}
      />
      <HeroSection />
      <ValuePropsSection />
      <CategoryGridSection categories={categories} />
      <TrustStripSection />
      <FinalCTASection />
    </>
  );
}

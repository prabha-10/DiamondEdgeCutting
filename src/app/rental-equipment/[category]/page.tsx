import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  equipmentCategories, 
  equipmentItems, 
} from "@/lib/equipment-data";
import { EquipmentCard } from "@/components/rental/EquipmentCard";
import { EmptyStateHelper } from "@/components/rental/EmptyStateHelper";
import { InquirySidebar } from "@/components/inquiry/InquirySidebar";
import { DemolitionButton } from "@/components/ui/DemolitionButton";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return equipmentCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = equipmentCategories.find((c) => c.slug === slug);
  
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      images: [category.imageUrl],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = equipmentCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const items = equipmentItems.filter((item) => item.categorySlug === slug);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-brand-gray-50 border-b border-brand-gray-300">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium text-brand-gray-500">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/rental-equipment" className="hover:text-brand-red transition-colors">Rental Equipment</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-gray-900">{category.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-brand-gray-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-5xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            {category.title}
          </h1>
          <p className="text-xl text-brand-gray-400 max-w-3xl font-medium leading-relaxed mb-8">
            {category.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold">
            {category.trustTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 text-white/80 rounded-full border border-white/10">
                {tag}
              </span>
            ))}
            <span className="px-3 py-1 bg-brand-red/20 text-brand-red rounded-full border border-brand-red/20">
              ISO 45001 Safety
            </span>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          {/* Left Rail: Equipment Grid */}
          <div className="flex flex-col gap-12">
            <div className="flex items-center justify-between border-b border-brand-gray-300 pb-6">
              <h2 className="text-3xl font-bold text-brand-gray-900">
                Available Models
              </h2>
              <p className="text-sm font-bold text-brand-gray-500">
                Showing {items.length} of {category.modelCount} models
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
              {items.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
              
              {/* Empty state helper if few items */}
              {items.length < 3 && (
                <EmptyStateHelper categoryName={category.title.toLowerCase()} />
              )}
            </div>

            {/* Final CTA for page */}
            <div className="mt-12 p-8 md:p-12 bg-brand-gray-900 rounded-2xl text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Need something specific?</h2>
                <p className="text-brand-gray-400 font-medium leading-relaxed">
                  Tell us what your project needs. We will come back with the right machines, pricing, and operator availability within 24 hours.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <DemolitionButton variant="primary" size="lg" onClick={() => window.location.href='/contact'}>
                  Request equipment quote
                </DemolitionButton>
                <a 
                  href="tel:+97143706434"
                  className="flex items-center justify-center gap-2 text-white/80 font-bold hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +971 4 370 6434
                </a>
              </div>
            </div>
          </div>

          {/* Right Rail: Sidebar */}
          <InquirySidebar />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ChevronRight, Check, Download } from "lucide-react";
import { EquipmentGallery } from "@/components/rental/EquipmentGallery";
import { EquipmentSpecsGrid } from "@/components/rental/EquipmentSpecsGrid";
import { RelatedEquipment } from "@/components/rental/RelatedEquipment";
import { InquiryForm } from "@/components/rental/InquiryForm";
import { Button } from "@/components/ui/Button";
import {
  getEquipmentBySlug,
  getAllEquipmentParams,
} from "../../../../../sanity/lib/queries";
import type { SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

type Props = {
  params: Promise<{ category: string; model: string }>;
};

type SpecRow = { label?: string; value?: string };

type EquipmentDoc = {
  _id: string;
  title: string;
  subtitle?: string;
  manufacturer?: string;
  description: string;
  useCases?: string[];
  specs?: SpecRow[];
  unitsInStock?: number | null;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  specSheet?: { asset?: { url?: string } };
  categorySlug: string;
  categoryTitle: string;
  categoryIsAttachment?: boolean;
  categoryParentSlug?: string | null;
  subCategory?: string | null;
  related?: Array<{
    _id: string;
    title: string;
    subtitle?: string;
    slug: string;
    categorySlug: string;
    heroImage?: SanityImage;
  }>;
};

export async function generateStaticParams() {
  const rows = (await getAllEquipmentParams()) as Array<{
    slug?: string;
    categorySlug?: string;
  }>;
  return (rows ?? [])
    .filter((r) => r.slug && r.categorySlug)
    .map((r) => ({ category: r.categorySlug as string, model: r.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const doc = (await getEquipmentBySlug(model)) as EquipmentDoc | null;
  if (!doc) return { title: "Not Found" };
  return {
    title: `${doc.title} hire in Dubai & UAE | ${doc.categoryTitle}`,
    description:
      doc.subtitle?.slice(0, 155) ??
      doc.description?.slice(0, 155) ??
      `Rent ${doc.title} from Diamond Edge Cutting`,
  };
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { category: urlCategory, model } = await params;
  const doc = (await getEquipmentBySlug(model)) as EquipmentDoc | null;
  if (!doc) notFound();

  // Resolve the category slug used in the URL: for attachment items, the URL
  // uses the parent carrier's slug, not the attachment category's own slug.
  const canonicalCategorySlug = doc.categoryIsAttachment
    ? doc.categoryParentSlug
    : doc.categorySlug;

  // If the URL's category segment doesn't match the canonical, treat as 404
  // so we don't serve the same model from two URLs.
  if (canonicalCategorySlug && urlCategory !== canonicalCategorySlug) {
    notFound();
  }

  const stockBadge =
    typeof doc.unitsInStock === "number"
      ? `${doc.unitsInStock} in stock`
      : "Available on request";

  const specSheetUrl = doc.specSheet?.asset?.url ?? null;

  return (
    <>
      <Script
        id="equipment-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: doc.title,
            description: doc.description,
            brand: doc.manufacturer
              ? { "@type": "Brand", name: doc.manufacturer }
              : undefined,
            category: doc.categoryTitle,
            url: `https://diamondedgecutting.com/rental-equipment/${canonicalCategorySlug}/${model}`,
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-brand-gray-50 border-b border-brand-gray-300 pt-24 md:pt-28">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-500">
            <Link href="/rental-equipment" className="hover:text-brand-red transition-colors">
              Equipment Rental
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/rental-equipment/${canonicalCategorySlug}`}
              className="hover:text-brand-red transition-colors"
            >
              {doc.categoryTitle}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gray-900">{doc.title}</span>
          </nav>
        </div>
      </div>

      {/* Top section, 2-col on desktop */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <EquipmentGallery
                hero={doc.heroImage}
                gallery={doc.gallery}
                title={doc.title}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
              {doc.manufacturer && (
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-red">
                  {doc.manufacturer}
                </span>
              )}
              <h1 className="font-sans font-medium text-brand-gray-900 text-[36px] md:text-[52px] leading-[1.0] tracking-tight">
                {doc.title}
              </h1>
              {doc.subtitle && (
                <p className="font-['Inter_Display',sans-serif] text-[18px] md:text-[20px] leading-[1.5] text-brand-gray-700 max-w-xl">
                  {doc.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1.5 rounded-full bg-brand-gray-100 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-900 border border-brand-gray-300">
                  {stockBadge}
                </span>
                {doc.subCategory && (
                  <span className="px-3 py-1.5 rounded-full bg-brand-gray-100 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-700 border border-brand-gray-300">
                    {doc.subCategory}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <Button asChild variant="brand">
                  <a href="#inquiry">Request a quote</a>
                </Button>
                {specSheetUrl && (
                  <a
                    href={specSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gray-300 text-brand-gray-900 font-medium text-[14px] hover:bg-brand-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Spec sheet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Specs + Use cases */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                  Overview
                </span>
                <p className="font-['Inter_Display',sans-serif] text-[17px] md:text-[18px] leading-[1.65] text-brand-gray-900 max-w-3xl whitespace-pre-line">
                  {doc.description}
                </p>
              </div>

              {doc.useCases && doc.useCases.length > 0 && (
                <div className="flex flex-col gap-4 pt-12 border-t border-brand-gray-300">
                  <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                    Use cases
                  </span>
                  <ul className="flex flex-col gap-3">
                    {doc.useCases.map((u, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-['Inter_Display',sans-serif] text-[16px] leading-[1.55] text-brand-gray-900"
                      >
                        <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <EquipmentSpecsGrid specs={doc.specs} />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="scroll-mt-24 py-16 md:py-24 bg-brand-gray-50 border-t border-brand-gray-300">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <InquiryForm equipmentId={doc._id} equipmentTitle={doc.title} />
        </div>
      </section>

      {/* Related equipment */}
      {doc.related && doc.related.length > 0 && (
        <RelatedEquipment
          items={doc.related.map((r) => ({
            _id: r._id,
            title: r.title,
            subtitle: r.subtitle,
            slug: r.slug,
            categorySlug: canonicalCategorySlug ?? doc.categorySlug,
            heroImage: r.heroImage,
          }))}
        />
      )}
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EquipmentCard, type EquipmentCardData } from "@/components/rental/EquipmentCard";
import { AttachmentTabs } from "@/components/rental/AttachmentTabs";
import { EquipmentPhotoPlaceholder } from "@/components/rental/EquipmentPhotoPlaceholder";
import {
  getRentalCategoryBySlug,
  getAllRentalCategorySlugs,
} from "../../../../sanity/lib/queries";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

type Props = { params: Promise<{ category: string }> };

type CategoryDoc = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  hasAttachmentTab?: boolean;
  heroImage?: SanityImage;
  attachmentCategoryTitles?: { _id: string; title: string; slug: string }[];
  equipment: Array<{
    _id: string;
    title: string;
    subtitle?: string;
    manufacturer?: string;
    slug: string;
    subCategory?: string | null;
    subCategoryOrder?: number | null;
    order?: number;
    unitsInStock?: number | null;
    heroImage?: SanityImage;
  }>;
  attachmentEquipment?: Array<{
    _id: string;
    title: string;
    subtitle?: string;
    manufacturer?: string;
    slug: string;
    categorySlug: string;
    subCategory?: string | null;
    subCategoryOrder?: number | null;
    order?: number;
    unitsInStock?: number | null;
    heroImage?: SanityImage;
  }>;
};

export async function generateStaticParams() {
  const slugs = (await getAllRentalCategorySlugs()) as { slug?: string }[];
  return (slugs ?? [])
    .map((s) => s?.slug)
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const doc = (await getRentalCategoryBySlug(category)) as CategoryDoc | null;
  if (!doc) return { title: "Not Found" };
  return {
    title: `${doc.title} for hire in Dubai & UAE`,
    description: doc.description?.slice(0, 155),
  };
}

// Group equipment array by subCategory, preserving sub-category-order ordering.
function groupBySubCategory<
  T extends { subCategory?: string | null; subCategoryOrder?: number | null }
>(items: T[]): { name: string; order: number; items: T[] }[] {
  const map = new Map<string, { name: string; order: number; items: T[] }>();
  for (const item of items) {
    const name = item.subCategory ?? "Other";
    const order = item.subCategoryOrder ?? 999;
    const existing = map.get(name);
    if (existing) existing.items.push(item);
    else map.set(name, { name, order, items: [item] });
  }
  return [...map.values()].sort((a, b) => a.order - b.order);
}

function EquipmentGroup<
  T extends { _id: string; title: string; subCategory?: string | null }
>({
  groups,
  toCard,
}: {
  groups: { name: string; order: number; items: T[] }[];
  toCard: (item: T) => EquipmentCardData;
}) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((g) => (
        <div key={g.name} className="flex flex-col gap-6">
          {/* Sub-category heading. Hide if every group is "Other" (single group). */}
          {(groups.length > 1 || g.name !== "Other") && (
            <div className="flex items-center gap-3 border-b border-brand-gray-300 pb-3">
              <h3 className="font-display font-semibold text-brand-gray-900 text-[20px] tracking-tight">
                {g.name}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500 tabular-nums">
                {g.items.length} model{g.items.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.items.map((it) => (
              <EquipmentCard key={it._id} item={toCard(it)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function RentalCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const doc = (await getRentalCategoryBySlug(slug)) as CategoryDoc | null;
  if (!doc) notFound();

  const heroUrl = safeUrlFor(doc.heroImage, 1600);
  const machineCards: EquipmentCardData[] = doc.equipment.map((e) => ({
    _id: e._id,
    title: e.title,
    subtitle: e.subtitle,
    manufacturer: e.manufacturer,
    slug: e.slug,
    categorySlug: doc.slug,
    unitsInStock: e.unitsInStock,
    heroImage: e.heroImage,
  }));
  const attachmentCards: EquipmentCardData[] = (doc.attachmentEquipment ?? []).map(
    (e) => ({
      _id: e._id,
      title: e.title,
      subtitle: e.subtitle,
      manufacturer: e.manufacturer,
      slug: e.slug,
      // Attachment items live under the carrier's category slug in URLs.
      categorySlug: doc.slug,
      unitsInStock: e.unitsInStock,
      heroImage: e.heroImage,
    })
  );

  const machineGroups = groupBySubCategory(doc.equipment);
  const attachmentGroups = groupBySubCategory(doc.attachmentEquipment ?? []);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-gray-50 border-b border-brand-gray-300 pt-24 md:pt-28">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-500">
            <Link href="/rental-equipment" className="hover:text-brand-red transition-colors">
              Equipment Rental
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-gray-900">{doc.title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-gray-300">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[12px] uppercase tracking-[0.18em] text-brand-red">
                Equipment Rental
              </span>
            </div>
            <h1 className="font-display font-medium text-brand-gray-900 text-[40px] md:text-[64px] leading-[1.0] tracking-tight">
              {doc.title}
            </h1>
            <p className="font-['Inter_Display',sans-serif] text-[17px] md:text-[18px] text-brand-gray-700 leading-[1.6] max-w-2xl">
              {doc.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-brand-gray-100">
              {heroUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroUrl}
                  alt={doc.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <EquipmentPhotoPlaceholder />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment list (with optional attachment tab) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {(() => {
            const machinesPane = (
              <EquipmentGroup
                groups={machineGroups}
                toCard={(e) => ({
                  _id: e._id,
                  title: e.title,
                  subtitle: e.subtitle,
                  manufacturer: e.manufacturer,
                  slug: e.slug,
                  categorySlug: doc.slug,
                  unitsInStock: e.unitsInStock,
                  heroImage: e.heroImage,
                })}
              />
            );
            if (doc.hasAttachmentTab && attachmentCards.length > 0) {
              const attachmentsPane = (
                <EquipmentGroup
                  groups={attachmentGroups}
                  toCard={(e) => ({
                    _id: e._id,
                    title: e.title,
                    subtitle: e.subtitle,
                    manufacturer: e.manufacturer,
                    slug: e.slug,
                    categorySlug: doc.slug,
                    unitsInStock: e.unitsInStock,
                    heroImage: e.heroImage,
                  })}
                />
              );
              return (
                <AttachmentTabs
                  machineCount={machineCards.length}
                  attachmentCount={attachmentCards.length}
                  machinesPane={machinesPane}
                  attachmentsPane={attachmentsPane}
                />
              );
            }
            return machinesPane;
          })()}
        </div>
      </section>

      {/* Inquiry CTA band */}
      <section className="py-16 md:py-24 bg-brand-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="font-display font-medium text-white text-[32px] md:text-[44px] tracking-tight leading-[1.1] mb-6">
            Need a tailored package?
          </h2>
          <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] text-white/75 leading-[1.55] mb-10 max-w-2xl mx-auto">
            Send us your project scope, location, and dates. We reply within 24
            hours, often same-day for live tenders.
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
              +971 4 370 6434
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

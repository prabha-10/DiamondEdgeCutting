import React from "react";
import Link from "next/link";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { EquipmentPhotoPlaceholder } from "./EquipmentPhotoPlaceholder";
import { InquiryButton } from "@/components/inquiry/InquiryButton";

export type EquipmentCardData = {
  _id: string;
  title: string;
  subtitle?: string;
  manufacturer?: string;
  slug: string;
  /** Resolved category slug for the URL. For attachment items this is the
   *  parent carrier category, not the attachment category itself. */
  categorySlug: string;
  unitsInStock?: number | null;
  heroImage?: SanityImage;
};

export function EquipmentCard({ item }: { item: EquipmentCardData }) {
  const imageUrl = safeUrlFor(item.heroImage, 900);
  const stockBadge =
    typeof item.unitsInStock === "number"
      ? `${item.unitsInStock} in stock`
      : "Available on request";
  const detailHref = `/rental-equipment/${item.categorySlug}/${item.slug}`;

  return (
    <article className="group flex flex-col bg-white rounded-[20px] overflow-hidden border border-brand-gray-300 hover:border-brand-gray-900 transition-colors duration-300">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <EquipmentPhotoPlaceholder />
        )}

        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.14em] text-brand-gray-900 border border-brand-gray-300">
          {stockBadge}
        </span>
      </Link>

      <div className="flex flex-col gap-3 p-5">
        {item.manufacturer && (
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500">
            {item.manufacturer}
          </span>
        )}
        <Link
          href={detailHref}
          className="font-display font-semibold text-brand-gray-900 text-[20px] tracking-tight leading-[1.2] hover:text-brand-red transition-colors"
        >
          {item.title}
        </Link>
        {item.subtitle && (
          <p className="font-['Inter_Display',sans-serif] text-[14px] leading-[1.5] text-brand-gray-700 line-clamp-2">
            {item.subtitle}
          </p>
        )}

        <div className="pt-3 border-t border-brand-gray-300">
          <InquiryButton
            item={{
              id: item.slug,
              title: item.title,
              category: item.categorySlug,
              image: imageUrl ?? "",
              equipmentId: item._id,
              categorySlug: item.categorySlug,
            }}
          />
        </div>
      </div>
    </article>
  );
}

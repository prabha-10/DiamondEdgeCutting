import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { EquipmentPhotoPlaceholder } from "./EquipmentPhotoPlaceholder";

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

  return (
    <Link
      href={`/rental-equipment/${item.categorySlug}/${item.slug}`}
      className="group flex flex-col bg-white rounded-[20px] overflow-hidden border border-brand-gray-300 hover:border-brand-gray-900 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
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
      </div>

      <div className="flex flex-col gap-2 p-5">
        {item.manufacturer && (
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500">
            {item.manufacturer}
          </span>
        )}
        <h3 className="font-sans font-semibold text-brand-gray-900 text-[20px] tracking-tight leading-[1.2]">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="font-['Inter_Display',sans-serif] text-[14px] leading-[1.5] text-brand-gray-700 line-clamp-2">
            {item.subtitle}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-4 border-t border-brand-gray-300">
          <span className="font-sans font-medium text-[13px] text-brand-gray-900 group-hover:text-brand-red transition-colors">
            View details
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-brand-gray-500 group-hover:text-brand-red transition-colors"
            strokeWidth={2}
          />
        </div>
      </div>
    </Link>
  );
}

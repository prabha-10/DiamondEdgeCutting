import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { EquipmentPhotoPlaceholder } from "./EquipmentPhotoPlaceholder";

export type CategoryCardData = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  equipmentCount?: number;
  hasAttachmentTab?: boolean;
  heroImage?: SanityImage;
};

export function CategoryCard({ category }: { category: CategoryCardData }) {
  const imageUrl = safeUrlFor(category.heroImage, 900);

  return (
    <Link
      href={`/rental-equipment/${category.slug}`}
      className="group flex flex-col bg-white rounded-[20px] overflow-hidden border border-brand-gray-300 hover:border-brand-gray-900 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <EquipmentPhotoPlaceholder />
        )}
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans font-semibold text-brand-gray-900 text-[22px] tracking-tight leading-[1.2]">
            {category.title}
          </h3>
          {typeof category.equipmentCount === "number" && (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-gray-500 shrink-0 mt-1">
              {category.equipmentCount} models
            </span>
          )}
        </div>

        <p className="font-['Inter_Display',sans-serif] text-[15px] leading-[1.55] text-brand-gray-700 line-clamp-3">
          {category.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-brand-gray-300">
          <span className="font-sans font-medium text-[14px] text-brand-gray-900 group-hover:text-brand-red transition-colors">
            View fleet
          </span>
          <span className="w-9 h-9 rounded-full bg-brand-gray-100 group-hover:bg-brand-red text-brand-gray-900 group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

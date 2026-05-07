"use client";

import React, { useState } from "react";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";
import { EquipmentPhotoPlaceholder } from "./EquipmentPhotoPlaceholder";

type Props = {
  hero?: SanityImage;
  gallery?: SanityImage[];
  title: string;
};

export function EquipmentGallery({ hero, gallery, title }: Props) {
  const heroUrl = safeUrlFor(hero, 1600);
  const thumbs = (gallery ?? []).map((g, i) => ({ id: i, url: safeUrlFor(g, 600) })).filter((g) => g.url);
  // Active selection: 0 = hero (if exists), 1+ = gallery thumbs.
  const [active, setActive] = useState(0);

  const heroDisplayUrl =
    active === 0
      ? heroUrl
      : safeUrlFor(gallery![active - 1], 1600);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-brand-gray-100">
        {heroDisplayUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroDisplayUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <EquipmentPhotoPlaceholder label="Photography on request" />
        )}
      </div>

      {(heroUrl || thumbs.length > 0) && (
        <div className="grid grid-cols-5 gap-2">
          {/* Hero thumb only if a hero exists. */}
          {heroUrl && (
            <button
              type="button"
              onClick={() => setActive(0)}
              className={`relative aspect-square rounded-[12px] overflow-hidden border-2 transition-colors ${
                active === 0 ? "border-brand-red" : "border-transparent hover:border-brand-gray-300"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={safeUrlFor(hero, 200) || ""}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          )}
          {thumbs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i + 1)}
              className={`relative aspect-square rounded-[12px] overflow-hidden border-2 transition-colors ${
                active === i + 1
                  ? "border-brand-red"
                  : "border-transparent hover:border-brand-gray-300"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.url!} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

type Props = {
  heroImageUrl: string;
  galleryUrls: string[];
  title: string;
  scopeSummary?: string;
  category?: string;
  location?: string;
  year?: string | number;
};

export function HeroGallery({
  heroImageUrl,
  galleryUrls,
  title,
  scopeSummary,
  category,
  location,
  year,
}: Props) {
  const allImages = [heroImageUrl, ...galleryUrls];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  const info = [
    { label: "Sector", value: category },
    { label: "Location", value: location || "—" },
    ...(year ? [{ label: "Year", value: String(year) }] : []),
  ].filter((row) => row.value);

  // Small thumbnail strip — sits in the right column beneath the project info.
  const thumbnailGrid = galleryUrls.length > 0 && (
    <div className="grid grid-cols-4 gap-2">
      {galleryUrls.slice(0, 4).map((url, i) => {
        const idx = i + 1;
        return (
          <button
            key={url}
            onClick={() => setCurrent(idx)}
            className={`relative w-full aspect-square rounded-[10px] overflow-hidden bg-brand-gray-100 transition-all duration-300 ${
              current === idx
                ? "ring-2 ring-brand-red ring-offset-2 opacity-100"
                : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`View gallery image ${i + 1}`}
          >
            <img
              src={url}
              alt={`${title} — gallery ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );

  // Right-hand column: project facts + scope pills + small thumbnails.
  const infoColumn = (
    <div className="lg:col-span-4 flex flex-col gap-8">
      <div className="flex flex-col border-t border-brand-gray-300">
        {info.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-4 border-b border-brand-gray-300"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-500">
              {label}
            </span>
            <span className="font-sans text-brand-gray-900 text-[16px] text-right">{value}</span>
          </div>
        ))}
      </div>

      {scopeSummary && (
        <div className="flex flex-col gap-2 border-b border-brand-gray-300 pb-4">
          {scopeSummary
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item, i) => (
              <div key={item} className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-gray-500">
                  {i === 0 ? "Scope" : ""}
                </span>
                <span className="font-sans text-brand-gray-900 text-[16px] text-right">{item}</span>
              </div>
            ))}
        </div>
      )}

      {thumbnailGrid}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Left: main display */}
      <div className="lg:col-span-8 flex flex-col gap-4 lg:gap-5">
        <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden bg-brand-gray-100">
          {allImages.map((url, i) => (
            <img
              key={url}
              src={url}
              alt={`${title} — view ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: project info */}
      {infoColumn}
    </div>
  );
}

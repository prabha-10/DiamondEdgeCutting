"use client";

import { useState, useEffect } from "react";

type Props = {
  heroImageUrl: string;
  galleryUrls: string[];
  title: string;
  scopeSummary?: string;
};

export function HeroGallery({ heroImageUrl, galleryUrls, title, scopeSummary }: Props) {
  const allImages = [heroImageUrl, ...galleryUrls];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  if (galleryUrls.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden bg-brand-gray-100">
        <img src={heroImageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
      {/* Main display — cycles through allImages */}
      <div className="lg:col-span-8">
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

      {/* 2×2 thumbnail grid + scope pills */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2.5">
          {galleryUrls.slice(0, 4).map((url, i) => {
            const idx = i + 1;
            return (
              <button
                key={url}
                onClick={() => setCurrent(idx)}
                className={`relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-brand-gray-100 transition-all duration-300 ${
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

        {scopeSummary && (
          <div className="flex flex-wrap gap-2">
            {scopeSummary.split(",").map((item) => item.trim()).filter(Boolean).map((item) => (
              <span
                key={item}
                className="inline-block bg-brand-gray-100 border border-brand-gray-300 rounded-full px-3.5 py-1 font-sans text-[13px] font-medium text-brand-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

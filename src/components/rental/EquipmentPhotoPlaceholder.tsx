import React from "react";

/**
 * Photography-on-request placeholder. Renders when an equipment doc has no
 * heroImage uploaded (which is the default until the client uploads real
 * photography via Studio). Diamond glyph watermark on a muted gray field,
 * per PRD: "Do not use Unsplash placeholders for equipment."
 */
export function EquipmentPhotoPlaceholder({
  className = "",
  label = "Photography on request",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative w-full h-full bg-brand-gray-100 flex items-center justify-center overflow-hidden ${className}`}
      aria-label="Photography on request"
    >
      {/* Diamond glyph watermark */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 m-auto w-2/5 h-2/5 text-brand-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="50,10 90,50 50,90 10,50" />
        <polygon points="50,25 75,50 50,75 25,50" />
      </svg>
      <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gray-500 px-3 py-1.5 bg-white/80 rounded-full">
        {label}
      </span>
    </div>
  );
}

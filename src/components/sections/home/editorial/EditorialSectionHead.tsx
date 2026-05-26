import React from "react";

type Props = {
  /** Two-digit section number, e.g. "01" */
  number: string;
  /** All-caps mono eyebrow, e.g. "Company Overview" */
  eyebrow: string;
  /** Display headline, can include <em> for italic accents */
  title: React.ReactNode;
  /** Optional right-rail lede paragraph */
  lede?: React.ReactNode;
};

/**
 * Section head pattern reused across the homepage editorial blocks.
 * Renders the numbered mono label + display H2 on the left, optional
 * lede paragraph on the right (stacks vertically on mobile).
 *
 * Mirrors the .section-head / .num / .lede pattern from the client's
 * reference HTML.
 */
export function EditorialSectionHead({ number, eyebrow, title, lede }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-7 flex flex-col gap-5">
        <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight [&_em]:font-light [&_em]:italic [&_em]:text-brand-red [&_em]:normal-case">
          {title}
        </h2>
      </div>
      {lede && (
        <div className="lg:col-span-5">
          <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-700">
            {lede}
          </p>
        </div>
      )}
    </div>
  );
}

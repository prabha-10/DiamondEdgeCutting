import React from "react";

export type SpecRow = { label?: string; value?: string };

export function EquipmentSpecsGrid({ specs }: { specs?: SpecRow[] | null }) {
  if (!specs || specs.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      <span className="font-['Inter_Display',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-red">
        Specs
      </span>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 border-t border-brand-gray-300 pt-5">
        {specs.map((s, i) =>
          s.label || s.value ? (
            <div
              key={i}
              className="flex items-baseline justify-between gap-6 py-2 border-b border-brand-gray-300/70"
            >
              <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-brand-gray-500">
                {s.label}
              </dt>
              <dd className="font-sans text-[15px] font-medium text-brand-gray-900 text-right">
                {s.value}
              </dd>
            </div>
          ) : null
        )}
      </dl>
    </div>
  );
}

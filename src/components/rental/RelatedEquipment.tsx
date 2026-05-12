import React from "react";
import { EquipmentCard, type EquipmentCardData } from "./EquipmentCard";

export function RelatedEquipment({
  items,
  title = "Related equipment",
}: {
  items: EquipmentCardData[];
  title?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="py-20 md:py-24 bg-brand-gray-50 border-t border-brand-gray-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display font-medium text-brand-gray-900 text-[32px] md:text-[40px] tracking-tight leading-[1.1]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <EquipmentCard key={it._id} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

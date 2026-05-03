"use client";

import React from "react";
import Image from "next/image";
import { EquipmentItem } from "@/lib/equipment-data";
import { InquiryButton } from "@/components/inquiry/InquiryButton";

interface EquipmentCardProps {
  item: EquipmentItem;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-brand-gray-300 rounded-xl overflow-hidden hover:border-brand-red hover:-translate-y-1 transition-all duration-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-medium text-brand-gray-900 mb-1">
            {item.title}
          </h3>
          <p className="text-sm italic text-brand-gray-700">
            {item.keySpec}
          </p>
        </div>

        <p className="text-base text-brand-gray-700 leading-relaxed mb-6 line-clamp-3">
          {item.description}
        </p>

        <InquiryButton 
          item={{
            id: item.id,
            title: item.title,
            category: item.categorySlug,
            image: item.imageUrl
          }} 
        />
      </div>
    </div>
  );
}

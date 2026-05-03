"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { InquiryItem } from "@/lib/inquiry-storage";

interface InquiryItemCardProps {
  item: InquiryItem;
  onRemove: () => void;
}

export function InquiryItemCard({ item, onRemove }: InquiryItemCardProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white border border-brand-gray-300 rounded-lg group transition-colors hover:border-brand-gray-500">
      <div className="relative w-12 h-12 rounded md overflow-hidden flex-shrink-0 bg-brand-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-brand-gray-900 truncate">
          {item.title}
        </h4>
        <p className="text-xs text-brand-gray-500 truncate capitalize">
          {item.category.replace(/-/g, ' ')}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="p-1.5 rounded-full text-brand-gray-400 hover:text-brand-red hover:bg-brand-red/5 transition-all"
        aria-label={`Remove ${item.title}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

"use client";

import React from "react";
import { ClipboardList, Trash2, Phone } from "lucide-react";
import { useInquiry } from "./InquiryProvider";
import { InquiryItemCard } from "./InquiryItemCard";
import { Button } from "@/components/ui/Button";

export function InquirySidebar() {
  const { items, removeItem, clearItems, openModal } = useInquiry();
  const hasItems = items.length > 0;

  return (
    <aside className="hidden lg:block sticky top-32 self-start w-[360px] h-[calc(100vh-10rem)] flex flex-col bg-white border border-brand-gray-300 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-brand-gray-300 flex items-center justify-between bg-brand-gray-50/50">
        <h3 className="font-bold text-brand-gray-900 flex items-center gap-2">
          Your inquiry 
          <span className="bg-brand-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {items.length}
          </span>
        </h3>
        {hasItems && (
          <button 
            onClick={clearItems}
            className="text-xs font-bold text-brand-gray-500 hover:text-brand-red flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {!hasItems ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-16 h-16 rounded-full bg-brand-gray-100 flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-brand-gray-400" />
            </div>
            <p className="text-sm font-medium text-brand-gray-900 mb-2">
              Your inquiry is empty
            </p>
            <p className="text-xs text-brand-gray-500 max-w-[200px]">
              Add equipment as you browse to build your project inquiry list.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <InquiryItemCard 
                key={item.id} 
                item={item} 
                onRemove={() => removeItem(item.id)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {hasItems && (
        <div className="p-5 border-t border-brand-gray-300 bg-brand-gray-50/30">
          <Button
            variant="brand"
            onClick={() => openModal("multi")}
            className="w-full mb-4 py-3"
          >
            Inquire about all ({items.length})
          </Button>
          
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider font-bold text-brand-gray-500 text-center">
              Or call our hire team
            </p>
            <a 
              href="tel:+97143706434"
              className="flex items-center justify-center gap-2 text-brand-gray-900 font-bold hover:text-brand-red transition-colors"
            >
              <Phone className="w-4 h-4" />
              +971 4 370 6434
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}

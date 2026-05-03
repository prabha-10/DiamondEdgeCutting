"use client";

import React from "react";
import { Check } from "lucide-react";
import { DemolitionButton } from "@/components/ui/DemolitionButton";
import { useInquiry } from "./InquiryProvider";
import { InquiryItem } from "@/lib/inquiry-storage";

interface InquiryButtonProps {
  item: Omit<InquiryItem, "addedAt">;
}

export function InquiryButton({ item }: InquiryButtonProps) {
  const { addItem, isInBasket, setDrawerExpanded, openModal } = useInquiry();
  const alreadyInBasket = isInBasket(item.id);

  const handleLeftClick = () => {
    if (alreadyInBasket) {
      // Open sidebar/drawer
      if (window.innerWidth < 1024) {
        setDrawerExpanded(true);
      } else {
        // Desktop sidebar is already visible on category pages
        // Maybe add a flash or scroll-to-item effect here if needed
      }
    } else {
      addItem(item);
      // Brief feedback for mobile
      if (window.innerWidth < 1024) {
        setDrawerExpanded(true);
        setTimeout(() => setDrawerExpanded(false), 1500);
      }
    }
  };

  const handleRightClick = () => {
    openModal("single", { ...item, addedAt: Date.now() });
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-auto">
      <DemolitionButton
        variant="secondary"
        onClick={handleLeftClick}
        className="text-sm px-4 py-3"
      >
        {alreadyInBasket ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-red" />
            View Inquiry
          </span>
        ) : (
          "Add to Inquiry"
        )}
      </DemolitionButton>

      <DemolitionButton
        variant="primary"
        onClick={handleRightClick}
        className="text-sm px-4 py-3"
      >
        Get Quote
      </DemolitionButton>
    </div>
  );
}

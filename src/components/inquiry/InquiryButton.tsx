"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    <div className="grid grid-cols-2 gap-2 mt-auto">
      <Button
        variant="outline"
        onClick={handleLeftClick}
        className="text-[13px] px-3 h-11 min-w-0"
      >
        {alreadyInBasket ? (
          <span className="flex items-center gap-1.5 truncate">
            <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="truncate">View Inquiry</span>
          </span>
        ) : (
          <span className="truncate">Add to Inquiry</span>
        )}
      </Button>

      <Button
        variant="brand"
        noIcon
        onClick={handleRightClick}
        className="!h-11 text-[13px] !px-4 min-w-0 truncate"
      >
        Get Quote
      </Button>
    </div>
  );
}

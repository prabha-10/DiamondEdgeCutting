"use client";

import React from "react";
import { Check } from "lucide-react";
import { useInquiry } from "@/components/inquiry/InquiryProvider";
import { InquiryItem } from "@/lib/inquiry-storage";

type Props = {
  item: Omit<InquiryItem, "addedAt">;
};

/**
 * Single-button Add to Inquiry CTA for the model detail page. Pairs with
 * the existing "Request a quote" button (which scrolls to the inline form).
 * Once added, swaps to "View Inquiry" and opening the cart drawer.
 */
export function AddToInquiryButton({ item }: Props) {
  const { addItem, isInBasket, setDrawerExpanded } = useInquiry();
  const alreadyInBasket = isInBasket(item.id);

  const onClick = () => {
    if (alreadyInBasket) {
      // Open the cart drawer (mobile) or let the desktop chip catch the eye.
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setDrawerExpanded(true);
      } else {
        setDrawerExpanded(true);
      }
      return;
    }
    addItem(item);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setDrawerExpanded(true);
      setTimeout(() => setDrawerExpanded(false), 1500);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 h-14 rounded-full border-2 border-brand-gray-900 text-brand-gray-900 font-bold text-base bg-transparent hover:bg-brand-gray-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gray-900 focus-visible:ring-offset-2 whitespace-nowrap"
    >
      {alreadyInBasket ? (
        <>
          <Check className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
          View Inquiry
        </>
      ) : (
        "Add to Inquiry"
      )}
    </button>
  );
}

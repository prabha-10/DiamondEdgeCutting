"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Trash2, Phone, X } from "lucide-react";
import { useInquiry } from "./InquiryProvider";
import { InquiryItemCard } from "./InquiryItemCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function InquiryStickyBar() {
  const { 
    items, 
    removeItem, 
    clearItems, 
    openModal, 
    isDrawerExpanded, 
    setDrawerExpanded 
  } = useInquiry();
  
  const hasItems = items.length > 0;

  if (!hasItems) return null;

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {/* Backdrop */}
        {isDrawerExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerExpanded(false)}
            className="fixed inset-0 bg-black/50 z-[60]"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed left-0 right-0 z-[70] bg-white transition-all duration-300 ease-in-out",
          isDrawerExpanded 
            ? "bottom-0 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)]" 
            : "bottom-[var(--phone-nav-height,64px)] border-t border-brand-gray-300 shadow-lg"
        )}
      >
        {/* Collapsed View (always part of the drawer, but shown differently) */}
        {!isDrawerExpanded ? (
          <div 
            onClick={() => setDrawerExpanded(true)}
            className="flex items-center justify-between px-4 h-16 bg-brand-gray-900 text-white cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-brand-red text-white text-[10px] w-5 h-5 rounded-full font-bold">
                {items.length}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider">In inquiry</span>
              
              <div className="flex -space-x-2 ml-2">
                {items.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className="relative w-7 h-7 rounded-full border-2 border-brand-gray-900 overflow-hidden bg-white"
                  >
                    <Image src={item.image} alt="" fill className="object-cover" />
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="w-7 h-7 rounded-full border-2 border-brand-gray-900 bg-brand-gray-700 flex items-center justify-center text-[8px] font-bold">
                    +{items.length - 3}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white/70 flex items-center gap-1">
                Inquire
                <ChevronUp className="w-4 h-4" />
              </span>
            </div>
          </div>
        ) : (
          /* Expanded View (Drawer) */
          <div className="flex flex-col max-h-[70vh]">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-gray-100">
              <h3 className="font-bold text-brand-gray-900 flex items-center gap-2">
                Your inquiry ({items.length})
              </h3>
              <button 
                onClick={() => setDrawerExpanded(false)}
                className="p-2 -mr-2 text-brand-gray-400 hover:text-brand-gray-900"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {items.map((item) => (
                <InquiryItemCard 
                  key={item.id} 
                  item={item} 
                  onRemove={() => removeItem(item.id)} 
                />
              ))}
              
              <button 
                onClick={clearItems}
                className="text-xs font-bold text-brand-gray-400 hover:text-brand-red flex items-center justify-center gap-1 py-2 mt-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all items
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-brand-gray-100 bg-brand-gray-50 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setDrawerExpanded(false)}
                  className="py-4 text-sm"
                >
                  Continue browsing
                </Button>
                <Button
                  variant="brand"
                  onClick={() => openModal("multi")}
                  className="py-4 text-sm"
                >
                  Inquire now
                </Button>
              </div>
              
              <a 
                href="tel:+97143706434"
                className="flex items-center justify-center gap-2 py-2 text-brand-gray-700 font-bold hover:text-brand-red transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call our hire team: +971 4 370 6434
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

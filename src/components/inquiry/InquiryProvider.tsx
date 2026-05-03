"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { 
  InquiryItem, 
  getBasketFromStorage, 
  saveBasketToStorage, 
  clearBasketFromStorage 
} from "@/lib/inquiry-storage";

type InquiryContextValue = {
  items: InquiryItem[];
  addItem: (item: Omit<InquiryItem, "addedAt">) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  isInBasket: (id: string) => boolean;
  
  // Modal state
  isModalOpen: boolean;
  modalMode: "single" | "multi";
  modalSingleItem: InquiryItem | null;
  openModal: (mode: "single" | "multi", singleItem?: InquiryItem) => void;
  closeModal: () => void;
  
  // Mobile drawer state
  isDrawerExpanded: boolean;
  setDrawerExpanded: (val: boolean) => void;
};

const InquiryContext = createContext<InquiryContextValue | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"single" | "multi">("multi");
  const [modalSingleItem, setModalSingleItem] = useState<InquiryItem | null>(null);
  const [isDrawerExpanded, setDrawerExpanded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from storage
  useEffect(() => {
    const storedItems = getBasketFromStorage();
    setItems(storedItems);
    setIsHydrated(true);
  }, []);

  // Sync to storage
  useEffect(() => {
    if (isHydrated) {
      saveBasketToStorage(items);
    }
  }, [items, isHydrated]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "dec_inquiry_basket") {
        const newItems = getBasketFromStorage();
        setItems(newItems);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addItem = useCallback((item: Omit<InquiryItem, "addedAt">) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, { ...item, addedAt: Date.now() }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
    clearBasketFromStorage();
  }, []);

  const isInBasket = useCallback((id: string) => {
    return items.some((item) => item.id === id);
  }, [items]);

  const openModal = useCallback((mode: "single" | "multi", singleItem?: InquiryItem) => {
    setModalMode(mode);
    setModalSingleItem(singleItem || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,
        isInBasket,
        isModalOpen,
        modalMode,
        modalSingleItem,
        openModal,
        closeModal,
        isDrawerExpanded,
        setDrawerExpanded,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}

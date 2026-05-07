"use client";

export type InquiryItem = {
  id: string; // slug, kept for backwards compatibility
  title: string;
  category: string;
  image: string;
  addedAt: number;
  /** Sanity _id, e.g. "equipment.brokk-500". Set by EquipmentCard so the
   *  inquiry submit can pass a real reference to /api/inquiries. */
  equipmentId?: string;
  /** Routable parent slug, used when navigating from cart back to detail. */
  categorySlug?: string;
};

export type StorageBasket = {
  items: InquiryItem[];
  expiresAt: number;
};

const STORAGE_KEY = "dec_inquiry_basket";
const EXPIRY_DAYS = 30;

export const getBasketFromStorage = (): InquiryItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const data: StorageBasket = JSON.parse(stored);
    
    // Check expiry
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error reading inquiry basket from storage:", error);
    return [];
  }
};

export const saveBasketToStorage = (items: InquiryItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    const expiresAt = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const data: StorageBasket = {
      items,
      expiresAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving inquiry basket to storage:", error);
  }
};

export const clearBasketFromStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

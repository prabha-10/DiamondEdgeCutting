"use client";

export type InquiryItem = {
  id: string; // slug
  title: string;
  category: string;
  image: string;
  addedAt: number;
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

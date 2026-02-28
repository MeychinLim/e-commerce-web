import { CartType } from './../app/types/cart';
import { create } from "zustand";

export type ShopStoreType = {
  cart: CartType | null;
  setCart: (cart: CartType | null) => void;
  clearCart: () => void;
};

export const useShopStore = create((set): ShopStoreType => ({
  cart: null,
  setCart: (cart: CartType | null) => set({ cart }),
  clearCart: () => set({ cart: null }),
}))
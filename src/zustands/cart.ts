import { CartItemType, CartType, OfferType } from "@/app/types/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartStore = {
  cart: CartType | null;
  setCart: (cart: CartType | null) => void;
  addItemToCart: (item: CartItemType) => void;
  removeItemFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyOffer: (offer: OfferType) => void;
  removeOffer: (offerId: number) => void;
  setPaymentMethod: (paymentMethodId: number) => void;
  updateCartTotals: (
    subTotal: number,
    total: number,
    discountFee: number,
    taxFee: number,
  ) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: null,

      setCart: (cart) => set({ cart }),

      addItemToCart: (item) =>
        set((state) => {
          if (!state.cart) {
            const newCart: CartType = {
              id: Date.now(),
              customerId: 0,
              merchantId: 0,
              subTotal: item.price * item.quantity,
              total: item.price * item.quantity,
              discountPercent: 0,
              discountFee: 0,
              deliveryFee: 0,
              offers: [],
              taxIncluded: false,
              taxPercentage: 0,
              taxFee: 0,
              items: [item],
            };
            return { cart: newCart };
          }

          const existingItemIndex = state.cart.items.findIndex(
            (cartItem) => cartItem.productId === item.productId,
          );

          const updatedItems = [...state.cart.items];

          if (existingItemIndex > -1) {
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity:
                updatedItems[existingItemIndex].quantity + item.quantity,
            };
          } else {
            updatedItems.push(item);
          }

          return { cart: { ...state.cart, items: updatedItems } };
        }),

      removeItemFromCart: (productId) =>
        set((state) => {
          if (!state.cart) return state;
          return {
            cart: {
              ...state.cart,
              items: state.cart.items.filter((i) => i.productId !== productId),
            },
          };
        }),

      updateItemQuantity: (productId, quantity) =>
        set((state) => {
          if (!state.cart || quantity <= 0) return state;
          const updatedItems = state.cart.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          );
          return { cart: { ...state.cart, items: updatedItems } };
        }),

      clearCart: () =>
        set((state) => {
          if (!state.cart) return state;
          return {
            cart: {
              ...state.cart,
              items: [],
              offers: [],
              subTotal: 0,
              total: 0,
              discountFee: 0,
              taxFee: 0,
            },
          };
        }),

      applyOffer: (offer) =>
        set((state) => {
          if (!state.cart || state.cart.offers.some((o) => o.id === offer.id))
            return state;
          return {
            cart: { ...state.cart, offers: [...state.cart.offers, offer] },
          };
        }),

      removeOffer: (offerId) =>
        set((state) => {
          if (!state.cart) return state;
          return {
            cart: {
              ...state.cart,
              offers: state.cart.offers.filter((o) => o.id !== offerId),
            },
          };
        }),

      setPaymentMethod: (paymentMethodId) =>
        set((state) => {
          if (!state.cart) return state;
          return {
            cart: {
              ...state.cart,
              paymentMethodId: { id: paymentMethodId, name: "" },
            },
          };
        }),

      updateCartTotals: (subTotal, total, discountFee, taxFee) =>
        set((state) => {
          if (!state.cart) return state;
          return {
            cart: { ...state.cart, subTotal, total, discountFee, taxFee },
          };
        }),
    }),
    {
      name: "shopping-cart", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // defaults to localStorage
    },
  ),
);

import { CustomerType } from "@/app/types/customer";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type CustomerStore = {
  customer: CustomerType|null;
  setCustomer: (customer: CustomerType | null) => void;
  logout: () => void;
};

type LanguagePersist = (
  config: StateCreator<CustomerStore>,
  options: PersistOptions<CustomerStore>
) => StateCreator<CustomerStore>;

export const useCustomerStore = create<CustomerStore, []>(
  (persist as LanguagePersist)(
    (set) => ({
      customer: null,
      setCustomer: (customer: CustomerType | null) => set({ customer: customer }),
      logout: () => set(() => ({ customer: null })),
    }),
    {
      name: "customer",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

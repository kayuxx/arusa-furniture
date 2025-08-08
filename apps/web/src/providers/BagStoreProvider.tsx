"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type BagStore, createBagStore } from "@/stores/bag-store";

export type BagStoreApi = ReturnType<typeof createBagStore>;

export const BagStoreContext = createContext<BagStoreApi | undefined>(
  undefined,
);

export interface BagStoreProviderProps {
  children: ReactNode;
}

export const BagStoreProvider = ({ children }: BagStoreProviderProps) => {
  const storeRef = useRef<BagStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createBagStore();
  }

  return (
    <BagStoreContext.Provider value={storeRef.current}>
      {children}
    </BagStoreContext.Provider>
  );
};

export const useBagStore = <T,>(selector: (store: BagStore) => T): T => {
  const bagStoreContext = useContext(BagStoreContext);

  if (!bagStoreContext) {
    throw new Error(`useBagStore must be used within BagStoreProvider`);
  }

  return useStore(bagStoreContext, selector);
};

import { createStore } from "zustand/vanilla";

export type BagState = {
  product_id: string;
  quantity: number;
};

export type BagActions = {
  addProduct: (value: BagState) => void;
  removeProduct: (value: BagState) => void;
};

export type BagStore = {
  products: BagState[];
} & BagActions;

export const defaultInitState: BagState[] = [];

export const createBagStore = (initState: BagState[] = defaultInitState) => {
  return createStore<BagStore>()((set) => ({
    products: initState,
    addProduct: (value) =>
      set((state) => ({
        products: [...state.products, value],
      })),
    removeProduct: (value) =>
      set((state) => ({
        products: state.products.filter(
          (e) => e.product_id !== value.product_id,
        ),
      })),
  }));
};

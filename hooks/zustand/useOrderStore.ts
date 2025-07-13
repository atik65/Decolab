import { create } from "zustand";

interface ProductInfo {
  productId: string;
  sizeId: string;
  digitId?: string;
  colorId: string;
  lightColorId: string;
  houseNumber: string;
  text?: string;
  designId: string;
  fontId: string;
  quantity: number;
}

interface OrderStore {
  productInfo: ProductInfo;
  setProductInfo: (productInfo: ProductInfo) => void;
  resetProductInfo: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  productInfo: {
    productId: "",
    sizeId: "",
    digitId: "",
    colorId: "",
    lightColorId: "",
    houseNumber: "",
    text: "",
    designId: "",
    fontId: "",
    quantity: 1,
  },

  // set product info
  //   setProductInfo: (productInfo: ProductInfo) => set({ productInfo }),
  setProductInfo: (productInfo: ProductInfo) =>
    set((state) => ({ ...state, productInfo })),

  // reset product info
  resetProductInfo: () =>
    set((state) => ({
      ...state,
      productInfo: {
        productId: "",
        sizeId: "",
        digitId: "",
        colorId: "",
        lightColorId: "",
        houseNumber: "",
        text: "",
        designId: "",
        fontId: "",
        quantity: 1,
      },
    })),
}));

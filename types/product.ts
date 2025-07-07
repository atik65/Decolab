export interface Product {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
}

type Size = {
  id: number;
  title: string;
  value: string;
};

type Digit = {
  id: number;
  title: number;
  value: number;
};

type Color = {
  id: number;
  name: string;
  colorCode: string;
};

type LightColor = {
  id: number;
  name: string;
  colorCode: string;
};

type Design = {
  id: number;
  url: string;
  name: string;
};

type Font = {
  id: number;
  name: string;
  url: string;
};

export interface ProductLN {
  // id: number;
  title: string;
  images: string[];
  mainImage: string;
  hoveredImage: string;
  category: string;
  price: string;
  description: string;
  sizes: Size[];
  digits: Digit[];
  colors: Color[];
  lightColors: LightColor[];
  designs: Design[];
  fonts: Font[];
}

export interface FinalProduct {
  id: number;
  ar: ProductLN;
  en: ProductLN;
}

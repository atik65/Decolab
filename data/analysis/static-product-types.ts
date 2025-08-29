// Enhanced types for scalable product pricing

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

// New pricing variant system
type PricingVariant = {
  id: string;
  price: number;
  currency: string;
  conditions: {
    sizeId?: number;
    digitCount?: number;
    [key: string]: unknown;
  };
  description?: string;
};

// Base pricing for simple products
type BasePricing = {
  type: "base";
  price: number;
  currency: string;
};

// Variant pricing for complex products
type VariantPricing = {
  type: "variant";
  variants: PricingVariant[];
  defaultVariantId?: string;
};

// Combined pricing type
type PricingConfig = BasePricing | VariantPricing;

// Product categories enum
export enum ProductCategory {
  HOUSE_NUMBERS = "house_numbers",
  WALL_SIGNS = "wall_signs",
  GROUND_SIGNS = "ground_signs",
  CUSTOM_DESIGN = "custom_design",
  CAR_SHADE = "car_shade",
}

// Enhanced product interface
export interface ProductLN {
  title: string;
  images: string[];
  mainImage: string;
  hoveredImage: string;
  category: ProductCategory;
  description: string;
  pricing: PricingConfig;
  minPrice: number;
  maxPrice: number;

  sizes: Size[];
  digits?: Digit[];
  colors: Color[];
  lightColors: LightColor[];
  designs: Design[];
  fonts: Font[];

  isCustomizable: boolean;
  minDigits?: number;
  maxDigits?: number;
  availableInstallationTypes?: string[];
}

export interface FinalProduct {
  id: number;
  ar: ProductLN;
  en: ProductLN;
}

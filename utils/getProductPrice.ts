import { ProductDetails } from "@/types/api/products";
import {
  calculateCustomizationPrice,
  VariantConditions,
  buildVariantConditions,
} from "@/lib/variantSystem";

/**
 * Get product price based on size and digitCount (backward compatible)
 * @deprecated Use calculateCustomizationPrice from variantSystem for more flexibility
 */
export const getProductPrice = (
  product?: ProductDetails,
  size?: number,
  digitCount?: number,
): number | null => {
  if (!product) {
    return null;
  }

  const customization: VariantConditions = {};

  if (size !== undefined) {
    customization.sizeId = size;
  }

  if (digitCount !== undefined) {
    customization.digitCount = digitCount;
  }

  const { price } = calculateCustomizationPrice(product, customization);
  return price;
};

/**
 * Generic price calculation using variant conditions
 * Works with any condition keys (sizeId, digitCount, materialId, etc.)
 */
export const getPrice = (
  product?: ProductDetails,
  options?: VariantConditions,
): number | null => {
  if (!product) {
    return null;
  }

  const customization = options || {};
  const { price } = calculateCustomizationPrice(product, customization);

  return price;
};

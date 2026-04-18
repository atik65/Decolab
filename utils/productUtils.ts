/**
 * Product Utility Functions
 * Transform user selections into complete cart items
 */

import {
  ProductDetails,
  Size,
  Color,
  Design,
  LightColor,
  Font,
} from "@/types/api/products";
import {
  validateCustomization,
  buildVariantConditions,
} from "@/lib/variantSystem";

// ============================================================================
// TYPES
// ============================================================================

export interface UserSelectedOptions {
  productId: string;
  sizeId: string;
  colorId: string;
  lightColorId: string;
  houseNumber: string;
  text: string;
  designId: string;
  fontId?: string;
  quantity: number;
  digitCount: string;
  price: number;
}

export interface CompleteCartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  category: string;
  size?: Size;
  color?: Color;
  lightColor?: LightColor;
  design?: Design;
  font?: Font;
  houseNumber: string;
  text: string;
  quantity: number;
  digitCount: string;
  price: number;
  totalPrice: number;
}

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

/**
 * Transform user selected options into a complete cart item
 * @param product - The full product object
 * @param userOptions - User's selected options
 * @returns Complete cart item with all details
 */
export const prepareCartItem = (
  product: ProductDetails,
  userOptions: UserSelectedOptions,
): CompleteCartItem | null => {
  console.log("product from cart createtion = ", product);

  try {
    // Validate variant conditions first (if variant pricing)
    if (product.pricing?.type === "variant") {
      const variantConditions = buildVariantConditions(product, userOptions);
      const validation = validateCustomization(product, variantConditions);

      if (!validation.isValid) {
        console.error("Variant validation failed:", validation.message);
        return null;
      }
    }

    // Find size object
    const size =
      product.sizes.length > 0
        ? product.sizes.find(
            (s: Size) => String(s.id) === String(userOptions.sizeId),
          )
        : undefined;

    if (product.sizes.length > 0 && !size) {
      console.error("Size not found");
      return null;
    }

    // Find color object
    const color =
      product.colors.length > 0
        ? product.colors.find(
            (c) => String(c.id) === String(userOptions.colorId),
          )
        : undefined;

    if (product.colors.length > 0 && !color) {
      console.error("Color not found");
      return null;
    }

    // Find light color object
    const lightColor =
      product.lightColors.length > 0
        ? product.lightColors.find(
            (lc) => String(lc.id) === String(userOptions.lightColorId),
          )
        : undefined;

    if (product.lightColors.length > 0 && !lightColor) {
      console.error("Light color not found");
      return null;
    }

    // Find design object
    const design =
      product.designs.length > 0
        ? product.designs.find(
            (d) => String(d.id) === String(userOptions.designId),
          )
        : undefined;

    if (product.designs.length > 0 && !design) {
      console.error("Design not found");
      return null;
    }

    // Find font object
    const font =
      product.fonts.length > 0
        ? product.fonts.find((f) => String(f.id) === String(userOptions.fontId))
        : undefined;

    if (product.fonts.length > 0 && !font) {
      console.error("Font not found");
      return null;
    }

    // Calculate total price
    const totalPrice = userOptions.price * userOptions.quantity;

    // Return complete cart item
    return {
      productId: userOptions.productId,
      productTitle: product.title,
      productImage: product.mainImage,
      category: product.category,
      size:
        product?.sizes?.length > 0 && size
          ? {
              id: size.id,
              title: size.title,
              value: size.value,
            }
          : undefined,
      color: color
        ? {
            id: color.id,
            name: color.name,
            colorCode: color.colorCode,
            image: color.image,
          }
        : undefined,
      lightColor: lightColor
        ? {
            id: lightColor.id,
            name: lightColor.name,
            colorCode: lightColor.colorCode,
            image: lightColor.image,
          }
        : undefined,
      design: design
        ? {
            id: design.id,
            url: design.url,
            name: design.name,
            image: design.image,
          }
        : undefined,
      font: font
        ? {
            id: font?.id,
            name: font?.name,
            image: font?.image,
          }
        : undefined,
      houseNumber: userOptions.houseNumber,
      text: userOptions.text,
      quantity: userOptions.quantity,
      digitCount: userOptions.digitCount,
      price: userOptions.price,
      totalPrice: totalPrice,
    };
  } catch (error) {
    console.error("Error preparing cart item:", error);
    return null;
  }
};

/**
 * Helper function to validate if all required options are selected
 * Updated to use generic variant system validation
 */
export const validateUserOptions = (
  userOptions: UserSelectedOptions,
): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = [];

  if (!userOptions.productId) missingFields.push("productId");
  // Basic validation - Formik handles the specific product logic
  if (!userOptions.quantity || userOptions.quantity < 1)
    missingFields.push("quantity");
  if (!userOptions.price || userOptions.price <= 0) missingFields.push("price");

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export default prepareCartItem;

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
  fontId: string;
  quantity: number;
  digitCount: string;
  price: number;
}

export interface CompleteCartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  category: string;
  size: Size;
  color: Color;
  lightColor: LightColor;
  design: Design;
  font: Font;
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
  try {
    // Find size object
    const size = product.sizes.find(
      (s: Size) => String(s.id) === String(userOptions.sizeId),
    );
    if (!size) {
      console.error("Size not found");
      return null;
    }

    // Find color object
    const color = product.colors.find(
      (c) => String(c.id) === String(userOptions.colorId),
    );
    if (!color) {
      console.error("Color not found");
      return null;
    }

    // Find light color object
    const lightColor = product.lightColors.find(
      (lc) => String(lc.id) === String(userOptions.lightColorId),
    );
    if (!lightColor) {
      console.error("Light color not found");
      return null;
    }

    // Find design object
    const design = product.designs.find(
      (d) => String(d.id) === String(userOptions.designId),
    );
    if (!design) {
      console.error("Design not found");
      return null;
    }

    // Find font object
    const font = product.fonts.find(
      (f) => String(f.id) === String(userOptions.fontId),
    );
    if (!font) {
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
      size: {
        id: size.id,
        title: size.title,
        value: size.value,
      },
      color: {
        id: color.id,
        name: color.name,
        colorCode: color.colorCode,
        image: color.image,
      },
      lightColor: {
        id: lightColor.id,
        name: lightColor.name,
        colorCode: lightColor.colorCode,
        image: lightColor.image,
      },
      design: {
        id: design.id,
        url: design.url,
        name: design.name,
        image: design.image,
      },
      font: {
        id: font.id,
        name: font.name,
        image: font.image,
      },
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
 */
export const validateUserOptions = (
  userOptions: UserSelectedOptions,
): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = [];

  if (!userOptions.productId) missingFields.push("productId");
  if (!userOptions.sizeId) missingFields.push("sizeId");
  if (!userOptions.colorId) missingFields.push("colorId");
  if (!userOptions.lightColorId) missingFields.push("lightColorId");
  if (!userOptions.designId) missingFields.push("designId");
  if (!userOptions.fontId) missingFields.push("fontId");
  if (!userOptions.quantity || userOptions.quantity < 1)
    missingFields.push("quantity");
  if (!userOptions.price || userOptions.price <= 0) missingFields.push("price");

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export default prepareCartItem;

/**
 * Generic Variant System for Product Pricing
 * Works with any condition keys (sizeId, digitCount, materialId, etc.)
 * Based on attribute-based flexible architecture
 */

import { ProductDetails, Variant } from "@/types/api/products";

/**
 * Generic variant conditions - can have any key-value pairs
 */
export interface VariantConditions {
  sizeId?: number;
  digitCount?: number;
  [key: string]: number | string | undefined; // Allow any future dimensions
}

/**
 * Pricing dimension represents a factor that affects price
 */
export interface PricingDimension {
  key: string; // e.g., 'sizeId', 'digitCount'
  label: string; // e.g., 'Size', 'Digit Count'
  values: DimensionValue[];
}

export interface DimensionValue {
  id: number | string;
  label: string;
  displayValue?: string;
}

/**
 * Finds a matching variant for customer selections
 * This is the CORE generic matching function
 *
 * @param variants - Array of product variants
 * @param customization - Customer's selected options
 * @returns Matching variant or null
 */
export function findMatchingVariant(
  variants: Variant[],
  customization: VariantConditions,
): Variant | null {
  if (!variants || variants.length === 0) {
    return null;
  }

  for (const variant of variants) {
    if (matchesAllConditions(variant.conditions, customization)) {
      return variant;
    }
  }

  return null;
}

/**
 * Check if customization satisfies ALL variant conditions
 * This is KEY - it's completely generic and works with any condition keys
 *
 * @param conditions - Variant conditions from backend
 * @param customization - Customer selected options
 * @returns true if all conditions match
 */
export function matchesAllConditions(
  conditions: Record<string, any>,
  customization: VariantConditions,
): boolean {
  // All conditions must match
  return Object.entries(conditions).every(([key, value]) => {
    const customValue = customization[key];
    // Convert both to strings for comparison to handle type differences
    return String(customValue) === String(value);
  });
}

/**
 * Calculate price for a product based on customization
 *
 * @param product - Product details
 * @param customization - Customer selections
 * @returns Object with price and matched variant
 */
export function calculateCustomizationPrice(
  product: ProductDetails,
  customization: VariantConditions,
): { price: number | null; variant: Variant | null } {
  // Base pricing - simple fixed price
  if (product.pricing?.type === "base") {
    return {
      price: product.pricing.price ?? product.minPrice ?? 0,
      variant: null,
    };
  }

  // Variant pricing - find matching variant
  if (product.pricing?.type === "variant" && product.pricing.variants) {
    const matchedVariant = findMatchingVariant(
      product.pricing.variants,
      customization,
    );

    if (matchedVariant) {
      return {
        price: matchedVariant.price,
        variant: matchedVariant,
      };
    }

    // No match found - return null to indicate invalid selection
    return {
      price: null,
      variant: null,
    };
  }

  // Fallback
  return {
    price: product.minPrice ?? 0,
    variant: null,
  };
}

/**
 * Detect which pricing dimensions are active for a product
 * This tells the frontend what customization options affect pricing
 *
 * @param product - Product details
 * @returns Object indicating which dimensions are active
 */
export function detectPricingDimensions(
  product: ProductDetails,
): PricingDimension[] {
  const dimensions: PricingDimension[] = [];

  // Size dimension
  if (product.sizes && product.sizes.length > 0) {
    dimensions.push({
      key: "sizeId",
      label: "Size",
      values: product.sizes.map((size) => ({
        id: size.id,
        label: size.title,
        displayValue: size.value,
      })),
    });
  }

  // Digit count dimension
  if (product.minDigits && product.maxDigits) {
    const digitValues: DimensionValue[] = [];
    for (let i = product.minDigits; i <= product.maxDigits; i++) {
      digitValues.push({
        id: i,
        label: `${i} ${i === 1 ? "digit" : "digits"}`,
        displayValue: String(i),
      });
    }

    dimensions.push({
      key: "digitCount",
      label: "Digit Count",
      values: digitValues,
    });
  }

  // Future: Add more dimensions here
  // Color dimension (if colors affect pricing in the future)
  // Material dimension, etc.

  return dimensions;
}

/**
 * Check if product should use variant pricing
 * Returns recommendation based on available dimensions
 *
 * @param product - Product details
 * @returns Recommendation object
 */
export function shouldUseVariantPricing(product: ProductDetails): {
  recommended: boolean;
  reason: string;
  dimensionCount: number;
} {
  const dimensions = detectPricingDimensions(product);

  if (dimensions.length === 0) {
    return {
      recommended: false,
      reason: "No pricing dimensions detected - use base pricing",
      dimensionCount: 0,
    };
  }

  if (dimensions.length >= 1) {
    return {
      recommended: true,
      reason: `${dimensions.length} dimension(s) detected - variant pricing recommended`,
      dimensionCount: dimensions.length,
    };
  }

  return {
    recommended: false,
    reason: "Unknown configuration",
    dimensionCount: 0,
  };
}

/**
 * Get required variant condition keys based on product configuration
 * Used for validation - tells which fields must be selected
 * This analyzes actual variant conditions to determine what's required
 *
 * @param product - Product details
 * @returns Array of required condition keys
 */
export function getRequiredVariantKeys(product: ProductDetails): string[] {
  const required: string[] = [];

  if (product.pricing?.type === "variant" && product.pricing.variants) {
    // Analyze actual variant conditions to see what keys are used
    const conditionKeys = new Set<string>();

    product.pricing.variants.forEach((variant) => {
      if (variant.conditions) {
        Object.keys(variant.conditions).forEach((key) => {
          conditionKeys.add(key);
        });
      }
    });

    return Array.from(conditionKeys);
  }

  return required;
}

/**
 * Check if a specific field is used in variant pricing
 * @param product - Product details
 * @param fieldKey - Field to check (e.g., 'sizeId', 'digitCount')
 * @returns true if the field affects variant pricing
 */
export function isFieldUsedInVariants(
  product: ProductDetails,
  fieldKey: string,
): boolean {
  if (product.pricing?.type === "variant" && product.pricing.variants) {
    return product.pricing.variants.some(
      (variant) => variant.conditions && fieldKey in variant.conditions,
    );
  }
  return false;
}

/**
 * Validate customer customization against product requirements
 *
 * @param product - Product details
 * @param customization - Customer selections
 * @returns Validation result with missing fields
 */
export function validateCustomization(
  product: ProductDetails,
  customization: VariantConditions,
): {
  isValid: boolean;
  missingFields: string[];
  message?: string;
} {
  const missingFields: string[] = [];

  // Check required variant keys
  if (product.pricing?.type === "variant") {
    const requiredKeys = getRequiredVariantKeys(product);

    for (const key of requiredKeys) {
      if (!customization[key]) {
        missingFields.push(key);
      }
    }

    // If all required keys are present, verify a variant exists
    if (missingFields.length === 0) {
      const variant = findMatchingVariant(
        product.pricing.variants,
        customization,
      );

      if (!variant) {
        return {
          isValid: false,
          missingFields: [],
          message: "No matching variant found for selected options",
        };
      }
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    message:
      missingFields.length > 0
        ? `Missing required fields: ${missingFields.join(", ")}`
        : undefined,
  };
}

/**
 * Build variant conditions from form values
 * Extracts only the keys that affect pricing
 *
 * @param product - Product details
 * @param formValues - All form values
 * @returns Variant conditions object
 */
export function buildVariantConditions(
  product: ProductDetails,
  formValues: Record<string, any>,
): VariantConditions {
  const conditions: VariantConditions = {};
  const requiredKeys = getRequiredVariantKeys(product);

  // Map form field names to variant condition keys
  // Handle both form field names (size, digitCount) and payload names (sizeId, digitCount)
  const fieldMapping: Record<string, string[]> = {
    sizeId: ["size", "sizeId"], // Check both 'size' (form) and 'sizeId' (payload)
    digitCount: ["digitCount"], // Always 'digitCount'
  };

  for (const conditionKey of requiredKeys) {
    // Get all possible form field names for this condition
    const possibleFieldNames = fieldMapping[conditionKey] || [conditionKey];

    // Try each possible field name until we find a value
    let value = undefined;
    for (const fieldName of possibleFieldNames) {
      if (
        formValues[fieldName] !== undefined &&
        formValues[fieldName] !== null &&
        formValues[fieldName] !== ""
      ) {
        value = formValues[fieldName];
        break;
      }
    }

    if (value !== undefined) {
      // Convert to number if it's a string
      conditions[conditionKey] =
        typeof value === "string" ? parseInt(value, 10) : value;
    }
  }

  return conditions;
}

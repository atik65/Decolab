import { ProductDetails } from "@/types/api/products";

export const getProductPrice = (
  product?: ProductDetails,
  size?: number,
  digitCount?: number
) => {
  const price = getPrice(product, {
    ...(size && { sizeId: size }),
    ...(digitCount && { digitCount }),
  });

  return price;
};

export const getPrice = (
  product?: ProductDetails,
  options?: {
    sizeId?: number;
    digitCount?: number;
  }
): number | null => {
  if (!product) {
    return null;
  }

  // console.log("product = ", product);

  if (product?.pricing?.type === "base") {
    return product?.pricing?.price ?? null;
  }

  const variant = product?.pricing?.variants.find((v) => {
    return (
      v.conditions.sizeId == options?.sizeId &&
      v.conditions.digitCount == options?.digitCount
    );
  });

  // console.log("variant = ", variant);

  return variant ? variant.price : null;
};

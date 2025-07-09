import { PricingCalculator, ProductLN } from "@/data/research-product";

export const getProductPrice = (
  product: ProductLN,
  size?: number,
  digitCount?: number
) => {
  const price = PricingCalculator.getPrice(product, {
    ...(size && { sizeId: size }),
    ...(digitCount && { digitCount }),
  });

  return price;
};

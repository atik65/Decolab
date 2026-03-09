"use client";
import React from "react";
import ProductImageSlider from "./ProductImageSlider";
import ProductInformation from "./ProductInformation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { cn } from "@/lib/utils";

const ProductInfoContainer = () => {
  const locale = useGetLocale();

  return (
    <div
      className={cn(
        "container mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 gap-x-10 gap-y-5 pt-10",
        locale === "ar" && "[direction:rtl] text-right",
      )}
    >
      <div>
        <ProductImageSlider />
      </div>

      <div>
        <ProductInformation />
      </div>
    </div>
  );
};

export default ProductInfoContainer;

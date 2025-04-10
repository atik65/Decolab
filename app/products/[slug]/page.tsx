import AdditionalInfoTabs from "@/app/_pages/product-details/AdditionalInfoTabs";
import ProductInfo from "@/app/_pages/product-details/ProductInfo";
import RelatedProducts from "@/app/_pages/product-details/RealtedProducts";
import React from "react";

const page = () => {
  return (
    <div>
      <ProductInfo />
      <AdditionalInfoTabs />
      <RelatedProducts />
    </div>
  );
};

export default page;

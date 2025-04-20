import AdditionalInfoTabs from "@/app/_pages/product-details/AdditionalInfoTabs";
import ProductInfoContainer from "@/app/_pages/product-details/ProductInfoContainer";
import RelatedProducts from "@/app/_pages/product-details/RealtedProducts";
import React from "react";

const page = () => {
  return (
    <div>
      <ProductInfoContainer />
      <AdditionalInfoTabs />
      <RelatedProducts />
    </div>
  );
};

export default page;

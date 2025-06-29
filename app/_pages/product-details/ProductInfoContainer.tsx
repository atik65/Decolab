import React from "react";
import ProductImageSlider from "./ProductImageSlider";
import ProductInformation from "./ProductInformation";

const ProductInfoContainer = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 gap-x-10 gap-y-5 pt-10">
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

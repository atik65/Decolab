import React from "react";
import ProductImageSlider from "./ProductImageSlider";

const products = {
  images: [
    // "/images/home/banner1.jpg",
    // "/images/home/banner2.jpg",
    "/images/home/banner3.jpg",
    "/images/home/banner4.jpg",
    "/images/home/banner5.jpg",
    "/images/home/banner6.jpg",
    "/images/home/banner7.jpg",
    "/images/home/banner8.jpg",
  ],
};

const ProductInfo = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 px-4">
      <div>
        <ProductImageSlider product={products} />
      </div>

      <div>Product information and add to cart</div>
    </div>
  );
};

export default ProductInfo;

import React from "react";
import ProductCard from "@/components/shared/product/ProductCard";

import ShopTopSection from "./ShopTopSection";

const ShopContainer = () => {
  // Mock data for products
  // const products = [
  //   {
  //     id: 1,
  //     image: "/images/watch.jpg",
  //     title: "Smart watches wood edition",
  //     categories: ["Accessories", "Clocks"],
  //     price: "$359.00",
  //     isHot: false,
  //     rating: 0,
  //   },
  //   {
  //     id: 2,
  //     image: "/images/penguin.jpg",
  //     title: "Penatibus parturient orci morbi",
  //     categories: ["Toys"],
  //     price: "$444.00",
  //     isHot: false,
  //     rating: 0,
  //   },
  //   {
  //     id: 3,
  //     image: "/images/bowtie.jpg",
  //     title: "Wooden bow tie man",
  //     categories: ["Accessories"],
  //     price: "$359.00",
  //     isHot: true,
  //     rating: 5,
  //   },
  // ];

  return (
    <div className="container mx-auto px-4 mt-8">
      <ShopTopSection />
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShopContainer;

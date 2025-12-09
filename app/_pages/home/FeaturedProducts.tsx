"use client";

import ProductCard from "@/components/shared/product/ProductCard";
import React from "react";
import { motion } from "framer-motion";
// import { products } from "@/data/products";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useGetProducts } from "@/hooks/tanstack/useProducts";
import { FeaturedProductsSkeleton } from "@/components/shared/loading-skeletons/loading-skeleton";

const FeaturedProducts = () => {
  const locale = useGetLocale();

  const { data, isLoading } = useGetProducts();

  const products = data?.results || [];

  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* header part */}
      <div className="flex flex-col items-start mb-8">
        <h2 className="text-[24px]  md:text-[24px] xl:text-[32px] font-bold text-gray-800 mb-2">
          {locale === "en" ? "Featured Products" : "منتجات مميزة"}
        </h2>
        <div className="w-16 h-0.5 bg-[#99b998]"></div>
      </div>

      {/* products container */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-x-8  px-0">
        {products.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index < 5 ? index * 0.2 : (index - 5) * 0.2,
              }}
              viewport={{
                once: true,
              }}
            >
              <ProductCard product={item} />
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default FeaturedProducts;

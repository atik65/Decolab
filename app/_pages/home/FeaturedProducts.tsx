"use client";

import ProductCard from "@/components/shared/product/ProductCard";
import React from "react";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* header part */}
      <div className="flex flex-col items-start mb-8">
        <h2 className="text-[20px] md:text-[24px] xl:text-[32px] font-bold text-gray-800 mb-2">
          Featured Products
        </h2>
        <div className="w-16 h-0.5 bg-[#99b998]"></div>
      </div>

      {/* products container */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-x-8  px-0">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: item < 5 ? item * 0.2 : (item - 5) * 0.2,
              }}
              viewport={{
                once: true,
              }}
            >
              <ProductCard />
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default FeaturedProducts;

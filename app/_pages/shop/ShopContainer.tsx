"use client";

import React from "react";
import ProductCard from "@/components/shared/product/ProductCard";

import ShopTopSection from "./ShopTopSection";
import { useGetProducts } from "@/hooks/tanstack/useProducts";
import {
  ShopSkeleton,
  NoProductsFound,
} from "@/components/shared/loading-skeletons/loading-skeleton";
import ShopHeroBanner from "./ShopHeroBanner";
import CategoryFilter from "./CategoryFilter";
import WhyChooseUs from "./WhyChooseUs";
import {
  TestimonialsSection,
  HowItWorksSection,
  FAQSection,
} from "./BottomSections";
// import { products } from "@/data/products";

const ShopContainer = () => {
  const { data, isLoading } = useGetProducts();

  const products = data?.results || [];

  if (isLoading) {
    return (
      <>
        <ShopHeroBanner />
        <ShopSkeleton />
      </>
    );
  }

  // Show NoProductsFound when products array is empty
  if (!products || products.length === 0) {
    return (
      <>
        <ShopHeroBanner />
        <NoProductsFound />
      </>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <ShopHeroBanner />

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Our Products
          </h2>
          <p className="text-gray-600 text-center">
            Browse our collection of premium signage solutions
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {/* <CategoryFilter /> */}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />
    </>
  );
};

export default ShopContainer;

"use client";

import React from "react";
import ProductCard from "@/components/shared/product/ProductCard";
import { useGetProductNSearch } from "@/hooks/tanstack/useProducts";
import {
  ShopSkeleton,
  NoProductsFound,
} from "@/components/shared/loading-skeletons/loading-skeleton";
// import CategoryFilter from "./CategoryFilter";

import { useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";

import Filters from "./Filters";
import { useState } from "react";

const ShopContainer = () => {
  const params = useSearchParams();
  const category = params.get("category") || "";
  const [layout, setLayout] = useState<"grid-2" | "grid-3" | "grid-4">(
    "grid-3",
  );

  // console.log("Category from params:", encodeURIComponent(category));

  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const { data, isLoading } = useGetProductNSearch({
    search,
    category: encodeURIComponent(category),
  });

  const products = data?.results || [];

  if (isLoading) {
    return (
      <>
        {/* shop header component for customize the filter and layouts */}
        <Filters
          categoryName={category}
          totalItems={products?.length || 0}
          layout={layout}
          setLayout={setLayout}
        />

        <ShopSkeleton />
      </>
    );
  }

  // Show NoProductsFound when products array is empty
  if (!products || products.length === 0) {
    return (
      <>
        {/* shop header component for customize the filter and layouts */}
        <Filters
          categoryName={category}
          totalItems={products?.length || 0}
          layout={layout}
          setLayout={setLayout}
        />

        <NoProductsFound />
      </>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      {/* <ShopHeroBanner /> */}

      {/* <ShapeHero
        badge="DECOLAB"
        title1={
          locale === "en"
            ? `Discover Premium ${
                category && decodeURIComponent(category)
              } Solutions`
            : "اكتشف حلول اللافتات المميزة"
        }
        // title2={locale === "en" ? "and Vision" : "ورؤيتنا"}
        description={
          locale === "en"
            ? "Learn more about our history, mission, and values."
            : "تعرف على تاريخنا ومهمتنا وقيمنا."
        }
      /> */}

      {/* shop header component for customize the filter and layouts */}
      <Filters
        categoryName={category}
        totalItems={products.length}
        layout={layout}
        setLayout={setLayout}
      />

      {/* Products Section */}
      <div className="container mx-auto px-4 pt-2 pb-8">
        {/* Search Results Banner */}
        {/* Search Results Banner */}
        {search && (
          <div className="mb-6 flex items-center justify-center px-2">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-brand-primary/10 border-2 border-brand-primary/30 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 animate-in fade-in slide-in-from-top-2 duration-300 w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-xs sm:text-sm text-gray-700 font-medium text-center">
                  Searching for:{" "}
                  <span className="font-bold text-brand-primary break-all">
                    &quot;{search}&quot;
                  </span>
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({products.length}{" "}
                  {products.length === 1 ? "result" : "results"})
                </span>
              </div>
              <button
                onClick={() => setSearch("")}
                className="p-1.5 hover:bg-red-50 rounded-full transition-colors group flex-shrink-0"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 ${layout === "grid-3" ? "lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"} gap-4`}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {/* <CategoryFilter /> */}

      {/* Why Choose Us */}
      {/* <WhyChooseUs /> */}

      {/* How It Works */}
      {/* <HowItWorksSection /> */}

      {/* Testimonials */}
      {/* <TestimonialsSection /> */}

      {/* FAQ */}
      {/* <FAQSection /> */}
    </>
  );
};

export default ShopContainer;

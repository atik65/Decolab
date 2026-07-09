"use client";

import { useState } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import Image from "next/image";

interface Category {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  icon: string;
  count: number;
  image: string;
}

const categories: Category[] = [
  {
    id: "all",
    name: { en: "All Products", ar: "جميع المنتجات" },
    icon: "📦",
    count: 0,
    image: "/images/home/banner9.jpg",
  },
  {
    id: "signage",
    name: { en: "Signage Works", ar: "أعمال اللافتات" },
    icon: "🪧",
    count: 0,
    image: "/images/home/banner9.jpg",
  },
  {
    id: "banners",
    name: { en: "Banner & Stickers", ar: "البانر والملصقات" },
    icon: "🎨",
    count: 0,
    image: "/products/font-design/14.jpeg",
  },
  {
    id: "house-numbers",
    name: { en: "House Numbers", ar: "أرقام المنازل" },
    icon: "🏠",
    count: 0,
    image: "/products/house-numbers/6.jpeg",
  },
];

interface CategoryFilterProps {
  onCategoryChange?: (categoryId: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const locale = useGetLocale();

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {locale === "en" ? "Browse by Category" : "تصفح حسب الفئة"}
        </h2>
        <p className="text-gray-600">
          {locale === "en"
            ? "Find exactly what you're looking for"
            : "ابحث عما تريده بالضبط"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
              activeCategory === category.id
                ? "ring-4 ring-brand-secondary shadow-xl scale-105"
                : "ring-1 ring-gray-200 hover:ring-2 hover:ring-brand-secondary hover:shadow-lg"
            }`}
          >
            {/* Background Image */}
            <div className="relative h-32 md:h-40 overflow-hidden bg-gray-100">
              <Image
                src={category?.image || "/images/home/banner9.jpg"}
                alt={category.name[locale]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <span className="text-4xl mb-2">{category.icon}</span>
              <h3 className="text-white font-bold text-center text-sm md:text-base">
                {category.name[locale]}
              </h3>
            </div>

            {/* Active Indicator */}
            {activeCategory === category.id && (
              <div className="absolute top-2 right-2 bg-brand-secondary text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

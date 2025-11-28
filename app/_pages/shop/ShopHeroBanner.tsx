"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";

const ShopHeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useGetLocale();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search:", searchQuery);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#87A786] via-[#87A786] to-[#6d8a6c] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {locale === "en"
              ? "Discover Premium Signage Solutions"
              : "اكتشف حلول اللافتات المميزة"}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {locale === "en"
              ? "Custom house numbers, banners, and professional signage for your home and business"
              : "أرقام منازل مخصصة ولافتات وحلول احترافية لمنزلك وعملك"}
          </p>

          {/* Search Bar */}
          {/* <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder={
                  locale === "en"
                    ? "Search for products..."
                    : "ابحث عن المنتجات..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#87A786] hover:bg-[#6d8a6c] text-white font-semibold transition-colors flex items-center gap-2"
              >
                <Search size={20} />
                <span className="hidden sm:inline">
                  {locale === "en" ? "Search" : "بحث"}
                </span>
              </button>
            </div>
          </form> */}

          {/* Quick Categories */}
          {/* <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-white/80 text-sm">
              {locale === "en" ? "Popular:" : "شائع:"}
            </span>
            {["House Numbers", "Banners", "Stickers", "Signage"].map(
              (category) => (
                <button
                  key={category}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm rounded-full transition-colors border border-white/30"
                >
                  {category}
                </button>
              )
            )}
          </div> */}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-8 md:h-12"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ShopHeroBanner;

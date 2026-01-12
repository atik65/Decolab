"use client";

// import { useState } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";

const ShopHeroBanner = () => {
  // const [searchQuery] = useState("");
  const locale = useGetLocale();

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

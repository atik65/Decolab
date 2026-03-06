"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FiltersProps {
  show?: boolean;
  categoryName: string;
  totalItems: number;
  layout: "grid-2" | "grid-3" | "grid-4";
  setLayout: (layout: "grid-2" | "grid-3" | "grid-4") => void;
}

const Filters = ({
  show = true,
  categoryName,
  totalItems,
  layout,
  setLayout,
}: FiltersProps) => {
  const [availability, setAvailability] = useState("all");
  const [priceSort, setPriceSort] = useState("default");
  const [sort, setSort] = useState("default");

  const clearAll = () => {
    setAvailability("all");
    setPriceSort("default");
    setSort("default");
  };

  const hasActiveFilters =
    availability !== "all" || priceSort !== "default" || sort !== "default";

  if (!show) return null;

  return (
    <div className="w-full bg-white flex flex-col pt-6 pb-4">
      {/* Category Heading */}
      <div className="container mx-auto px-4 mb-6 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 capitalize">
          {categoryName || "Shop"}
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-600">
          {/* Left Side: Filters */}
          <div className="flex items-center gap-1 md:gap-3 flex-wrap w-full md:w-auto">
            {/* Availability */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Availability
              </span>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="h-7 border border-gray-200 rounded-full px-3 text-xs gap-1 bg-transparent focus:ring-0 focus:ring-offset-0 shadow-none min-w-0 w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="in-stock">In stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-200 mx-1 hidden sm:block" />

            {/* Price */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Price
              </span>
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="h-7 border border-gray-200 rounded-full px-3 text-xs gap-1 bg-transparent focus:ring-0 focus:ring-offset-0 shadow-none min-w-0 w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="low-to-high">Low to High</SelectItem>
                  <SelectItem value="high-to-low">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear All - only shows when filters active */}
            {hasActiveFilters && (
              <>
                <div className="h-4 w-px bg-gray-200 mx-1 hidden md:block" />
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Clear all
                </button>
              </>
            )}
          </div>

          {/* Right Side: Count + Sort + Layout */}
          <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto justify-between md:justify-end">
            {/* Item count */}
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {totalItems} items
            </span>

            {/* Sort */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Sort
              </span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-7 border border-gray-200 rounded-full px-3 text-xs gap-1 bg-transparent focus:ring-0 focus:ring-offset-0 shadow-none min-w-0 w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Recommended</SelectItem>
                  <SelectItem value="newest">Newest in</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center gap-0.5 border-l border-gray-200 pl-3 ml-1">
              {/* 2x2 grid (3 col) */}
              <button
                onClick={() => setLayout("grid-3")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  layout === "grid-3"
                    ? "text-gray-900"
                    : "text-gray-300 hover:text-gray-600",
                )}
                title="3 Columns"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect x="1" y="1" width="6" height="6" rx="0.5" />
                  <rect x="9" y="1" width="6" height="6" rx="0.5" />
                  <rect x="1" y="9" width="6" height="6" rx="0.5" />
                  <rect x="9" y="9" width="6" height="6" rx="0.5" />
                </svg>
              </button>

              {/* 3x3 grid (4 col) */}
              <button
                onClick={() => setLayout("grid-4")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  layout === "grid-4"
                    ? "text-gray-900"
                    : "text-gray-300 hover:text-gray-600",
                )}
                title="4 Columns"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" />
                  <rect x="6.25" y="1" width="3.5" height="3.5" rx="0.5" />
                  <rect x="11.5" y="1" width="3.5" height="3.5" rx="0.5" />
                  <rect x="1" y="6.25" width="3.5" height="3.5" rx="0.5" />
                  <rect x="6.25" y="6.25" width="3.5" height="3.5" rx="0.5" />
                  <rect x="11.5" y="6.25" width="3.5" height="3.5" rx="0.5" />
                  <rect x="1" y="11.5" width="3.5" height="3.5" rx="0.5" />
                  <rect x="6.25" y="11.5" width="3.5" height="3.5" rx="0.5" />
                  <rect x="11.5" y="11.5" width="3.5" height="3.5" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gray-100 mt-4" />
    </div>
  );
};

export default Filters;

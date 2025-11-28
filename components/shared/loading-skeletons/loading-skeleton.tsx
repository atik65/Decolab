import { Skeleton } from "@/components/ui/skeleton";

// ProductCard Loading Skeleton - matches your ProductCard structure
export const ProductCardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden mx-auto p-0 bg-[#f9f9f9] group cursor-pointer">
      {/* Image skeleton - matches your 48 height */}
      <div className="overflow-hidden">
        <Skeleton className="w-full h-48 bg-gray-200" />
      </div>

      {/* Content skeleton - matches your mt-2 spacing */}
      <div className="mt-2">
        {/* Title skeleton - matches your font-bold text-[14px] md:text-[16px] */}
        <Skeleton className="h-4 md:h-5 w-3/4 mb-2 bg-gray-200" />

        {/* Category skeleton - matches your text-[12px] md:text-[14px] */}
        <Skeleton className="h-3 md:h-4 w-1/2 mb-1 bg-gray-200" />
      </div>

      {/* Price section skeleton - matches your h-6 mt-1 */}
      <div className="h-6 mt-1 overflow-hidden">
        <Skeleton className="h-4 w-20 bg-gray-200" />
      </div>
    </div>
  );
};

// Product Grid Loading Skeleton
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Featured Products Section Skeleton
export const FeaturedProductsSkeleton = () => {
  return (
    <div className="w-full container mx-auto px-4 py-8">
      {/* Section title skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-64 bg-gray-200" />
      </div>

      {/* Products grid */}
      <ProductGridSkeleton count={4} />
    </div>
  );
};

export const ShopSkeleton = () => {
  return (
    <div className="w-full container mx-auto px-4 py-8">
      {/* Section title skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-64 bg-gray-200" />
      </div>

      {/* Products grid */}
      <ProductGridSkeleton count={4} />
    </div>
  );
};

export const NoProductsFound = () => {
  return (
    <div className="w-full container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
          {/* Icon with animation */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-8 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No Products Found
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              We couldn't find any products matching your criteria.
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or browse our categories.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gradient-to-r from-[#87A786]/10 to-[#87A786]/5 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#87A786]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Suggestions:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#87A786] mt-1">•</span>
                <span>Check the spelling of your search terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#87A786] mt-1">•</span>
                <span>Try using more general keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#87A786] mt-1">•</span>
                <span>Browse our popular categories below</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/shop"
              className="px-6 py-3 bg-gradient-to-r from-[#87A786] to-[#6d8a6c] hover:from-[#6d8a6c] hover:to-[#87A786] text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Products
            </a>
            <a
              href="/"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

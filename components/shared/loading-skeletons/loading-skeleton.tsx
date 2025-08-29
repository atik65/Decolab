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

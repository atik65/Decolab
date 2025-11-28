import { Skeleton } from "@/components/ui/skeleton";

const ProductInfoSkt = () => {
  return (
    <div className="bg-white shadow-md p-6">
      {/* Breadcrumb Skeleton */}
      <nav aria-label="Breadcrumb">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-12 bg-gray-200" />
          <span className="text-gray-400">/</span>
          <Skeleton className="h-4 w-16 bg-gray-200" />
          <span className="text-gray-400">/</span>
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
      </nav>

      {/* Product Title Skeleton */}
      <Skeleton className="mt-4 h-8 w-3/4 bg-gray-200" />

      {/* Category Badge Skeleton */}
      <div className="mt-2">
        <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
      </div>

      {/* Description Skeleton */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-5/6 bg-gray-200" />
        <Skeleton className="h-4 w-4/6 bg-gray-200" />
      </div>

      {/* Price Skeleton */}
      <Skeleton className="mt-4 h-7 w-32 bg-gray-200" />

      {/* Product Options Skeletons */}
      <div className="space-y-4 mt-6">
        {/* Size Select Skeleton */}
        <div>
          <Skeleton className="h-4 w-16 mb-2 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Digits Select Skeleton */}
        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Color Options Skeleton */}
        <div>
          <Skeleton className="h-4 w-20 mb-2 bg-gray-200" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-10 rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* House Number Input Skeleton */}
        <div>
          <Skeleton className="h-4 w-28 mb-2 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Text Area Skeleton */}
        <div>
          <Skeleton className="h-4 w-12 mb-2 bg-gray-200" />
          <Skeleton className="h-24 w-full bg-gray-200" />
        </div>

        {/* Design Selection Skeleton */}
        <div>
          <Skeleton className="h-4 w-20 mb-2 bg-gray-200" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Font Selection Skeleton */}
        <div>
          <Skeleton className="h-4 w-16 mb-2 bg-gray-200" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full bg-gray-200" />
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and Order Button Skeleton */}
      <div className="mt-6 flex items-center space-x-3">
        {/* Quantity Selector Skeleton */}
        <div className="flex items-center space-x-1">
          <Skeleton className="h-10 w-10 bg-gray-200" />
          <Skeleton className="h-10 w-10 bg-gray-200" />
          <Skeleton className="h-10 w-10 bg-gray-200" />
        </div>

        {/* Order Button Skeleton */}
        <Skeleton className="h-10 w-full bg-gray-200" />
      </div>

      {/* Social Share Skeleton */}
      <div className="mt-5">
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkt;

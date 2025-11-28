import { Skeleton } from "@/components/ui/skeleton";

const SummarySkt = () => {
  return (
    <div className="rounded-lg">
      {/* Title Skeleton */}
      <Skeleton className="h-8 w-48 mb-4 bg-gray-200" />

      <div className="space-y-4">
        {/* Product Image + Info Skeleton */}
        <div className="flex items-start gap-4 border-b pb-4">
          {/* Image with badge */}
          <div className="relative">
            <Skeleton className="w-16 h-16 bg-gray-200" />
            <div className="absolute -top-2 -right-2 bg-gray-300 w-5 h-5 rounded-full" />
          </div>

          {/* Product Info */}
          <div className="flex-1 w-full">
            <div className="flex justify-between w-full mb-2">
              <Skeleton className="h-5 w-32 bg-gray-200" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-200 mt-1" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 mt-1" />
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-3 border-b pb-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-2"
            >
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </div>
          ))}

          {/* Design/Font Image Skeletons */}
          <div className="flex justify-between items-center gap-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-16 w-24 bg-gray-200" />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Skeleton className="h-4 w-16 bg-gray-200" />
            <Skeleton className="h-12 w-20 bg-gray-200" />
          </div>
        </div>

        {/* Order Summary Totals Skeleton */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32 bg-gray-200" />
            <Skeleton className="h-4 w-20 bg-gray-200" />
          </div>
          <div className="flex justify-between pt-2 border-t">
            <Skeleton className="h-6 w-16 bg-gray-200" />
            <Skeleton className="h-6 w-24 bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySkt;

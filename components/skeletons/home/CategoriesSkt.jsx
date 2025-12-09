import { Skeleton } from "@/components/ui/skeleton";

const CategoriesSkt = () => {
  return (
    <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 min-w-[200px]">
      {[...Array(3)].map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CategoriesSkt;

const CategoryCardSkeleton = () => {
  return (
    <div className="relative grid grid-cols-12 gap-x-3 bg-[#f9f9f9] p-5 py-8">
      {/* Text Content Skeleton */}
      <div className="flex items-start flex-col justify-center pl-5 col-span-9 xl:col-span-8">
        <div className="text-left md:text-left space-y-3 w-full">
          {/* Subtitle Skeleton */}
          <Skeleton className="h-4 w-3/4 bg-gray-300" />
          {/* Title Skeleton */}
          <Skeleton className="h-7 w-full bg-gray-300" />
          {/* Read More Skeleton */}
          <Skeleton className="h-3 w-20 bg-gray-300 mt-4" />
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="col-span-3 xl:col-span-4">
        <Skeleton className="w-full h-20 sm:h-32 md:h-20 lg:h-20 xl:h-32 2xl:h-40 bg-gray-300" />
      </div>
    </div>
  );
};

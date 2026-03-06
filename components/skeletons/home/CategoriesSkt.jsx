import { Skeleton } from "@/components/ui/skeleton";

const CategoriesSkt = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-6 px-4">
      {[...Array(3)].map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CategoriesSkt;

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-gray-200 animate-pulse">
        <Skeleton className="w-full h-full bg-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="p-2 md:p-6 flex flex-col flex-grow items-center justify-center">
        {/* Title Skeleton */}
        <Skeleton className="h-4 sm:h-5 md:h-6 w-3/4 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

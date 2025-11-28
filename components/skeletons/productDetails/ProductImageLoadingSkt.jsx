import { Skeleton } from "@/components/ui/skeleton";

const ProductImageLoadingSkt = () => {
  return (
    <section className="sticky top-20">
      <div className="relative">
        <div>
          {/* Main Image Skeleton */}
          <div className="w-full flex justify-center mb-5 lg:mb-0 lg:p-5 lg:pb-4 lg:pt-0">
            <Skeleton className="mx-auto h-[300px] sm:h-[402px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[550px] w-[90%] lg:w-[90%] rounded-[15px] bg-gray-200" />
          </div>

          {/* Thumbnails Skeleton */}
          <div className="w-full sm:w-[90%] mx-auto">
            <div className="flex gap-[10px] justify-start">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-16 w-20 md:h-[90px] xl:h-[80px] md:w-40 bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Navigation Button Skeletons */}
          <div className="absolute -left-0 top-1/2 transform -translate-y-1/2 z-10">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
          <div className="absolute -right-0 top-1/2 transform -translate-y-1/2 z-10">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductImageLoadingSkt;

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import CategoriesSkt from "@/components/skeletons/home/CategoriesSkt";
import { useRouter } from "@bprogress/next";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export interface Category {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  image?: string;
}

export interface CategoresResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

const HomeCategories = ({ className }: { className?: string }) => {
  const { data: categoriesData, isLoading } =
    useGetCategories<CategoresResponse>();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const locale = useGetLocale();

  // Show loading skeleton while fetching
  if (isLoading) {
    return <CategoriesSkt />;
  }

  // If no categories, return null
  if (!categoriesData || !categoriesData.results) {
    return null;
  }

  return (
    <div className={cn("relative mt-12 px-2 sm:px-4", className)}>
      {/* ─── Header & Navigation ─── */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 font-montserrat uppercase tracking-normal">
            {locale === "en" ? "Our Categories" : "فئاتنا"}
          </h2>
          <div className="h-1 w-20 bg-[#189CD9] rounded-full" />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            ref={prevRef}
            aria-label="Previous Category"
            className="p-2 md:p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-[#189CD9] hover:text-white hover:border-[#189CD9] transition-all duration-300 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-active:scale-90 transition-transform" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Category"
            className="p-2 md:p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-[#189CD9] hover:text-white hover:border-[#189CD9] transition-all duration-300 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-active:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* ─── Swiper Slider ─── */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={3}
        loop={true}
        speed={600}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error - Swiper types are not fully compatible with TypeScript
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error - Swiper types are not fully compatible with TypeScript
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="categories-swiper !pb-10"
      >
        {categoriesData.results.map((category, i) => (
          <SwiperSlide key={category.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CategoryCard data={category} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCategories;

function CategoryCard({ data }: { data: Category }) {
  const locale = useGetLocale();
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/shop?category=${encodeURIComponent(data?.name || "")}`);
  };

  return (
    <div
      onClick={handleRedirect}
      className="group cursor-pointer bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] md:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(24,156,217,0.15)] transition-all duration-500 flex flex-col h-full border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={data?.image || "/images/placeholder.jpg"}
          alt={data?.name || "Category"}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
          quality={100}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* "Explre" Pill - visible on desktop hover */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
          <span className="bg-white text-gray-900 px-6 py-2 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
            {locale === "en" ? "Explore Now" : "استكشف الآن"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 md:p-6 flex flex-col flex-grow items-center text-center">
        <h3 className="text-[10px] sm:text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-montserrat uppercase transition-colors duration-300 group-hover:text-[#189CD9] line-clamp-1">
          {data?.name_ar && locale === "ar" ? data.name_ar : data.name}
        </h3>
        {/* <p className="hidden sm:line-clamp-2 text-xs md:text-sm text-gray-500 leading-relaxed">
          {data?.description_ar && locale === "ar"
            ? data.description_ar
            : data.description}
        </p> */}

        {/* Mobile Arrow - visible only on mobile */}
        {/* <div className="mt-1 md:hidden flex items-center gap-0.5 text-[#189CD9] font-bold text-[8px] uppercase tracking-tighter">
          <span className="truncate max-w-[50px]">
            {locale === "en" ? "View" : "عرض"}
          </span>
          <ChevronRight className="w-2 h-2" />
        </div> */}
      </div>
    </div>
  );
}

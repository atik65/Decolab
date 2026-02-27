"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useGetLocale } from "@/hooks/useGetLocale";
import Link from "next/link";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import CategoriesSkt from "@/components/skeletons/home/CategoriesSkt";
import { useRouter } from "@bprogress/next";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// const dummyCategoriesImages = [
//   "/images/home/banner9.jpg",
//   "/products/font-design/14.jpeg",
//   "/products/house-numbers/6.jpeg",
// ];

// const categories = [
//   {
//     id: 1,
//     image: "/images/home/banner9.jpg",

//     en: {
//       title: "Signage Works",
//       subtitle: "Professional Signage Solutions",
//     },
//     ar: {
//       title: "أعمال اللافتات",
//       subtitle: "حلول اللافتات المهنية",
//     },
//   },
//   {
//     id: 2,
//     image: "/products/font-design/14.jpeg",

//     en: {
//       title: "Banner & Stickers",
//       subtitle: "Custom Banners and Stickers",
//     },
//     ar: {
//       title: "البانر والملصقات",
//       subtitle: "بانر وملصقات مخصصة",
//     },
//   },
//   {
//     id: 3,
//     image: "/products/house-numbers/6.jpeg",

//     en: {
//       title: "House Numbers",
//       subtitle: "Stylish House Number Plates",
//     },
//     ar: {
//       title: "أرقام المنازل",
//       subtitle: "لوحات أرقام المنازل الأنيقة",
//     },
//   },
// ];

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

  console.log("Categories Data:", categoriesData);

  // Show loading skeleton while fetching
  if (isLoading) {
    return <CategoriesSkt />;
  }

  // If no categories, return null
  if (!categoriesData) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 ",
        className,
      )}
    >
      {categoriesData?.results?.map((category, i) => (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.3 }}
          key={category.id}
          className=""
        >
          <div className="hidden md:block">
            <CategoryCard imageIndex={i} data={category} />{" "}
          </div>

          <div className="md:hidden">
            <CategoryCardMobile imageIndex={i} data={category} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HomeCategories;

function CategoryCard({
  data,
  imageIndex,
}: {
  data?: Category;
  imageIndex: number;
}) {
  const locale = useGetLocale();

  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/shop?category=${encodeURIComponent(data?.name || "")}`)
      }
      className="relative grid grid-cols-12 gap-x-3 bg-[#f9f9f9] p-5 group overflow-hidden py-8"
    >
      <div className=" flex items-start flex-col justify-center cursor-pointer  pl-5 col-span-9 xl:col-span-8 group">
        <div className="text-left md:text-left space-y-1 group-hover:-translate-y-6 duration-300">
          <p className="text-[14px] 2xl:text-[16px]  text-gray-500">
            {data?.description_ar && locale === "ar"
              ? data?.description_ar
              : data?.description}
          </p>
          <h1 className="text-[20px] lg:text-[20px] 2xl:text-[32px] font-bold text-gray-900">
            {data?.name_ar && locale === "ar" ? data?.name_ar : data?.name}
          </h1>
        </div>
        {/* 
        <p className="group-hover:text-black -translate-y-5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5  border-b-2 border-[#189CD9] duration-400 text-[12px]  font-bold text-gray-500"> */}
        <Link
          href={"/shop"}
          style={{
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="group-hover:text-black opacity-0 translate-y-4 group-hover:-translate-y-5 group-hover:opacity-100  border-b-2 border-[#189CD9] font-bold text-gray-500 text-[10px] ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
        >
          {locale === "en" ? "READ MORE" : "اقرأ المزيد"}
        </Link>
      </div>
      <div className="col-span-3 xl:col-span-4 cursor-pointer">
        <Image
          // src={dummyCategoriesImages[imageIndex] || "/images/home/banner9.jpg"}
          src={data?.image || ""}
          alt=""
          width={500}
          height={500}
          className="w-full  group-hover:scale-110 group-hover:translate-x-3 h-20 sm:h-32 md:h-20 lg:h-20 xl:h-32 2xl:h-40 object-cover  duration-500"
        />
      </div>
    </div>
  );
}

function CategoryCardMobile({
  data,
  imageIndex,
}: {
  data: Category;
  imageIndex: number;
}) {
  const locale = useGetLocale();
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer w-auto">
      {/* Image */}
      <div className="relative h-20 sm:h-40 overflow-hidden bg-gray-100 rounded-lg">
        <img
          // src={dummyCategoriesImages[imageIndex]}
          src={data?.image || ""}
          alt={locale === "ar" && data.name_ar ? data.name_ar : data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2">
        <div className="space-y-1">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
            {locale === "ar" && data.description_ar
              ? data.description_ar
              : data.description}
          </p>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
            {locale === "ar" && data.name_ar ? data.name_ar : data.name}
          </h3>
        </div>

        {/* Read More Link */}
        <div className="flex items-center gap-1 text-[#189CD9] group-hover:gap-2 transition-all duration-300">
          <span className="text-[10px] sm:text-xs font-semibold">
            {locale === "en" ? "EXPLORE" : "استكشف"}
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

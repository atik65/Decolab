"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// import { FinalProduct } from "@/types/product";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Product } from "@/types/api/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const locale = useGetLocale();

  console.log("locale = ", locale);

  const [hoveredImage] = useState(product.hovered_image);
  const [mainImage] = useState(product.main_image);
  const [currentImage, setCurrentImage] = useState(product.main_image);

  const container = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // image change on hover start
      imageRef.current?.addEventListener("mouseenter", () => {
        gsap.to(imageRef.current, {
          opacity: 0.8,
          scale: 1.1,
          duration: 0.2,

          onComplete: () => {
            setCurrentImage(hoveredImage);
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1.1,
              delay: 0.1,
              duration: 0.3,
            });
          },
        });
      });

      // image change on hover end
      imageRef.current?.addEventListener("mouseleave", () => {
        gsap.to(imageRef.current, {
          opacity: 0.8,
          scale: 1,
          duration: 0.2,
          onComplete: () => {
            setCurrentImage(mainImage);
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.1,
            });
          },
        });
      });
    },
    {
      scope: container,
    },
  );

  // const locale: string = useLocale();

  // console.log("locale = ", locale);

  return (
    <Link
      ref={container}
      href={`/products/${product.id}`}
      className="w-full  overflow-hidden mx-auto  p-0 bg-[#f9f9f9] group cursor-pointer "
    >
      <div className="overflow-hidden relative rounded-lg">
        <Image
          ref={imageRef}
          height={500}
          width={500}
          // className="w-full mx-auto object-contain mt-0 pt-0 group-hover:scale-105 duration-300 "
          className="w-full mx-auto object-cover h-72 md:h-[450px] mt-0 pt-0"
          src={currentImage || "/images/home/bed.png"}
          alt={"Product"}
        />

        <p
          className={cn(
            "absolute bottom-2 text-gray-900 font-bold text-[12px] md:text-[14px] bg-gray-200 w-fit px-2 py-1 text-xs rounded-full",
            locale === "ar" ? "left-2" : "right-2",
          )}
        >
          {locale == "ar" ? product.category.name_ar : product.category.name}
        </p>
      </div>
      <div className={cn("mt-2", locale === "ar" && "text-right")}>
        <h2 className="font-bold text-[15px] md:text-[16px]">
          {locale == "ar" ? product.title_ar : product.title}
        </h2>
        {/* <p className="text-gray-900 font-bold text-[12px] md:text-[14px] bg-gray-100 w-fit px-2 py-1 mt-1 rounded-full">
          {locale == "ar" ? product.category.name_ar : product.category.name}
        </p> */}
      </div>
      <div
        className={cn(
          "h-6 mt-1 flex flex-col overflow-hidden w-full items-start text-left",
          locale === "ar" && "items-end text-right",
        )}
      >
        <div className="pb-0 group-hover:-translate-y-5 group-hover:opacity-0 duration-300">
          <span
            className={cn(
              "inline-block font-bold text-[#189CD9] text-sm",
              locale === "ar" && "text-right",
            )}
          >
            {/* {product[locale].price} */}

            {product.pricing_type === "base" ? (
              <span>{product.base_price} KD</span>
            ) : (
              <span>{product.min_price} KD</span>
            )}
          </span>
        </div>

        <div
          style={{
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className={cn(
            "flex flex-col opacity-0 translate-y-0 group-hover:-translate-y-6 group-hover:opacity-100 duration-300",
            locale === "ar" ? "items-end" : "items-start",
          )}
        >
          <p className="text-[12px] font-bold">
            {locale === "en" ? "Explore Details" : "تفاصيل التفاصيل"}
          </p>
          <div className="w-16 h-[2px] bg-[#189CD9]"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProductCardProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  price?: number;
}

const ProductCard = ({
  imageUrl,
  title,
  subtitle,
  price,
}: ProductCardProps) => {
  console.table({
    imageUrl,
    title,
    subtitle,
    price,
  });

  const [hoveredImage] = useState("/images/home/banner8.jpg");
  const [mainImage] = useState("/images/home/banner9.jpg");
  const [currentImage, setCurrentImage] = useState(mainImage);

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
              duration: 0.5,
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
              duration: 0.3,
            });
          },
        });
      });
    },
    {
      scope: container,
    }
  );

  return (
    <Link
      ref={container}
      href={`/products/${"box-on-the-wall"}`}
      className="w-full  overflow-hidden mx-auto  p-0 bg-[#f9f9f9] group cursor-pointer"
    >
      <div className="overflow-hidden">
        <Image
          ref={imageRef}
          height={500}
          width={500}
          // className="w-full mx-auto object-contain mt-0 pt-0 group-hover:scale-105 duration-300 "
          className="w-full mx-auto object-contain mt-0 pt-0 "
          src={currentImage}
          alt={"Product"}
        />
      </div>
      <div className="mt-2">
        <div className="font-bold text-[14px] md:text-[16px]">
          Box On The Wall{" "}
        </div>
        <p className="text-gray-700 text-[12px] md:text-[14px]">Minimalism</p>
      </div>
      <div className="h-6 mt-1  overflow-hidden">
        <div className=" pb-0 group-hover:-translate-y-5 group-hover:opacity-0 duration-300">
          <span className="inline-block font-bold text-[#99b998]  text-sm  ">
            $100
          </span>
        </div>

        {/* add to cart */}
        <div
          style={{
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="flex flex-col items-start opacity-0 translate-y-0 group-hover:-translate-y-6 group-hover:opacity-100 duration-300"
        >
          <h2 className="text-[12px] font-bold">Add To Cart</h2>
          <div className="w-16 h-[2px] bg-[#99b998]"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

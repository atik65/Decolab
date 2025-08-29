"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
// import { ProductDetails } from "@/types/product";
import { ImageOff } from "lucide-react";
import ImageZoomViewModal from "@/components/shared/ImageZoomViewModal";
// import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
// import { findProductById } from "@/data/products";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";

const TfiAngleLeft = dynamic(() =>
  import("react-icons/tfi").then((mod) => mod.TfiAngleLeft)
);
const TfiAngleRight = dynamic(() =>
  import("react-icons/tfi").then((mod) => mod.TfiAngleRight)
);

// import ReactImageMagnify from "react-image-magnify";

// import {
//   Magnifier,
//   GlassMagnifier,
//   SideBySideMagnifier,
//   PictureInPictureMagnifier,
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION,
// } from "react-image-magnifiers";

// interface ProductImageSliderProps {
//   product: Product | null;
// }

const ProductImageSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide

  const { slug } = useParams();

  const { data: product } = useGetProductDetails(slug?.toString() || "");

  const locale = useGetLocale();
  const currentProduct = product?.[locale];

  if (!currentProduct?.images?.length) {
    return (
      <section>
        {/* add a icons */}
        <div className="flex justify-center gap-2">
          {/* lucide icons of no image */}
          <ImageOff size={96} className="text-[#430000]" />
        </div>
        <p className="text-center text-sm">No images available</p>
      </section>
    );
  }

  return (
    <section className="sticky top-20">
      <div className="relative">
        {" "}
        <div className=" ">
          <div className="">
            {/* Main Image Slider */}
            <Swiper
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track the real index
              thumbs={{
                swiper: thumbsSwiper,
              }}
              modules={[Navigation, Thumbs]}
              spaceBetween={50}
              slidesPerView={1}
              navigation={{
                nextEl: ".custom-swiper-button-next-prod",
                prevEl: ".custom-swiper-button-prev-prod",
              }}
            >
              {currentProduct?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <SlideComponent imgURI={img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full sm:w-[90%] mx-auto ">
            {/* Thumbs Slider */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
            >
              {currentProduct?.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <ThumbsComponent
                    activeIndex={activeIndex}
                    imgURI={img}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="custom-swiper-button-prev-prod absolute -left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
            {/* <Image
              height={200}
              width={200}
              src="/images/home/left-arrow.svg"
              alt="Previous"
              className="w-8 h-8 sm:w-11 sm:h-11 bg-[#CFB284] rounded-full p-2 hidden md:block"
            />

            <Image
              height={200}
              width={200}
              src="/images/home/PREV.svg"
              alt="Previous"
              className="w-9 h-9 sm:w-11 sm:h-11  rounded-full p-2 block md:hidden"
            /> */}
            <TfiAngleLeft size={20} />
          </div>

          <div className="custom-swiper-button-next-prod absolute -right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
            {/* <Image
              src="/images/home/right-arrow.svg"
              alt="Next"
              height={200}
              width={200}
              className="w-8 h-8 sm:w-11 sm:h-11 bg-[#CFB284] rounded-full p-2 hidden md:block"
            />
            <Image
              height={200}
              width={200}
              src="/images/home/NEXT.svg"
              alt="Previous"
              className="w-9 h-9 sm:w-11 sm:h-11  rounded-full p-2 block md:hidden"
            /> */}

            <TfiAngleRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductImageSlider;

const ThumbsComponent = ({
  imgURI,
  index,
  activeIndex,
}: {
  imgURI: string;
  index: number;
  activeIndex: number;
}) => {
  return (
    <div className="cursor-pointer select-none">
      <Image
        height={500}
        width={500}
        alt="product image"
        // src={"/images/home/bed.png"}
        src={imgURI}
        className={` border-[5px] h-16 w-20 md:h-[90px] xl:h-[80px] md:w-40 object-cover ${
          index === activeIndex ? "border-[#99b998]" : "border-transparent "
        }`}
      />
    </div>
  );
};

const SlideComponent = ({ imgURI }: { imgURI: string }) => {
  return (
    <div className="w-full flex justify-center mb-5 lg:mb-0 lg:p-5 lg:pb-4 lg:pt-0  ">
      {/* <Image
        // src={"/images/home/bed.png"}
        src={imgURI}
        alt="Product Image"
        height={500}
        width={500}
        className=" w-[90%] lg:w-[90%] object-contain   rounded-[15px]  mx-auto  md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px]  "
      /> */}
      <ImageZoomViewModal
        imgURI={imgURI}
        className="mx-auto h-[300px] sm:h-[402px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[550px] object-contain items-center"
      />
    </div>
  );
};

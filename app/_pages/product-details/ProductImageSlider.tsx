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
import { Product } from "@/types/product";
// import ReactImageMagnify from "react-image-magnify";

// import {
//   Magnifier,
//   GlassMagnifier,
//   SideBySideMagnifier,
//   PictureInPictureMagnifier,
//   MOUSE_ACTIVATION,
//   TOUCH_ACTIVATION,
// } from "react-image-magnifiers";

interface ProductImageSliderProps {
  product: Product | null;
}

const ProductImageSlider = ({ product }: ProductImageSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0); // Track the active slide

  if (!product?.images?.length) {
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
    <section className="">
      <div className="relative">
        {" "}
        <div className="lg:absolute left-0 right-0 -top-[100px] 2xl:-top-[100px]  ">
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
              {product?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <SlideComponent imgURI={img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full sm:w-[85%] mx-auto ">
            {/* Thumbs Slider */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs, FreeMode]}
            >
              {product?.images.map((img, index) => (
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

          <div className="custom-swiper-button-prev-prod absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
            <Image
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
            />
          </div>

          <div className="custom-swiper-button-next-prod absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
            <Image
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
            />
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
    <div className="cursor-pointer">
      <Image
        height={500}
        width={500}
        alt="product image"
        // src={"/images/home/bed.png"}
        src={imgURI}
        className={`rounded-[15px] border-[5px] h-16 w-20 sm:h-[70px] md:w-40 object-cover ${
          index === activeIndex ? "border-[#CFB284]" : "border-transparent "
        }`}
      />
    </div>
  );
};

const SlideComponent = ({ imgURI }: { imgURI: string }) => {
  return (
    <div className="w-full flex justify-center mb-5 lg:mb-0 lg:p-5 lg:pb-4 ">
      {/* <Image
        // src={"/images/home/bed.png"}
        src={imgURI}
        alt="Product Image"
        height={500}
        width={500}
        className=" w-[90%] lg:w-[90%] object-contain   rounded-[15px]  mx-auto  md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px]  "
      /> */}
      <ImageZoomViewModal imgURI={imgURI} />
    </div>
  );
};

// const SlideComponent = ({ imgURI }: { imgURI: string }) => {
//   return (
//     <div className="w-full flex justify-center mb-5 lg:mb-0 lg:p-5 lg:pb-4">
//       <ReactImageMagnify
//         {...{
//           smallImage: {
//             alt: "Wristwatch by Ted Baker London",
//             isFluidWidth: true,
//             src: imgURI,
//           },
//           largeImage: {
//             src: imgURI,
//             width: 1200,
//             height: 1800,
//           },

//           imageClassName:
//             "w-full lg:w-[90%] object-cover   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px]  bg-red-500",

//           enlargedImagePosition: "beside",
//           enlargedImageClassName:
//             "w-full lg:w-[90%] object-cover   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] absolute left-0 right-0 -top-[100px] 2xl:-top-[100px]  ",
//         }}
//       />
//     </div>
//   );
// };

// const SlideComponent = ({ imgURI }: { imgURI: string }) => {
//   return (
//     <div className="w-full flex justify-center mb-5 lg:mb-0 lg:p-5 lg:pb-4">

//       <GlassMagnifier
//         imageSrc={imgURI}
//         imageAlt="Example"
//         largeImageSrc={imgURI} // Optional
//         activation={MOUSE_ACTIVATION}
//         activationDelay={100}
//         largeImagePosition="beside"
//         largeImageClassName="w-full lg:w-[90%] object-cover   rounded-[15px]  mx-auto h-[360px] md:h-[402px] lg:h-[425px] xl:h-[430px] 2xl:h-[500px] absolute left-0 right-0 -top-[100px] 2xl:-top-[100px]  "
//         largeImageStyle={{
//           width: "100%",
//           height: "100%",
//         }}
//       />
//     </div>
//   );
// };

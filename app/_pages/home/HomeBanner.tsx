"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Slide {
  id: number;
  bg: string;
  title: string;
  description: string;
}

const slides = [
  //   {
  //     id: 0,
  //     bg: "/images/home-banner.png",
  //   },
  //   {
  //     id: 1,
  //     bg: "/images/home/banner1.jpg",
  //   },
  //   {
  //     id: 2,
  //     bg: "/images/home/banner2.jpg",
  //   },

  {
    id: 7,
    bg: "/images/home/banner7.jpg",
    title: "Making Businesses Stand Out: Our Eye-Catching Signage Designs",
    description:
      "Vibrant red signage with bold typography and a striking logo, showcasing our expertise in creating impactful and inviting storefront designs",
  },
  {
    id: 8,
    bg: "/images/home/banner8.jpg",
    title: "Custom-Designed Illuminated Signs for a Global Audience",
    description:
      "Our backlit signage solutions combine aesthetic appeal with functional design, as exemplified by this warmly illuminated sign with a palm tree motif and bilingual lettering.",
  },
  {
    id: 9,
    bg: "/images/home/banner9.jpg",
    title:
      "Elegance Meets Tradition: Our Illuminated House Numbers and Diwaniya Designs",
    description:
      "Custom diwaniya accessories and house numbers that blend traditional Arabic elements with modern design, reflecting our clients' unique identities and enhancing the beauty of their spaces",
  },
  {
    id: 10,
    bg: "/images/home/banner14.jpg",
    title: "Elegance in Addressing: Custom House Number Plaques",

    description:
      "Personalized house number plaque combining functionality and style for a distinctive curb appeal.",
  },
  {
    id: 111,
    bg: "/images/home/banner13.jpg",
    title: "Illuminated Elegance: Al Mala Café's Striking Nighttime Signage",
    description:
      "Illuminated signage with elegant Arabic calligraphy and natural motifs, creating a welcoming and memorable storefront experience.",
  },
  {
    id: 4,
    bg: "/images/home/banner4.jpg",
    title:
      "Bold Design and Vibrant Colors: Showcasing Impactful Signage Solutions",
    description:
      "Custom-designed, illuminated signage that blends functionality and aesthetics to enhance brand presence, showcasing our expertise in creating impactful visual solutions.",
  },

  //   {
  //     id: 11,
  //     bg: "/images/home/banner11.jpg",
  //   },
  //   {
  //     id: 12,
  //     bg: "/images/home/banner12.jpg",
  //   },

  //   {
  //     id: 5,
  //     bg: "/images/home/banner5.jpg",
  //   },
  //   {
  //     id: 3,
  //     bg: "/images/home/banner3.jpg",
  //   },
  //   {
  //     id: 6,
  //     bg: "/images/home/banner6.jpg",
  //   },

  //   {
  //     id: 4,
  //     bg: "/images/home/banner4.jpg",
  //   },
];

const HomeBanner = () => {
  //   const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

  return (
    <div className="relative ">
      <Swiper
        // effect={"fade"}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 5000 }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        //   infinite
        loop
        // navigation={{
        //   nextEl: ".custom-swiper-button-next",
        //   prevEl: ".custom-swiper-button-prev",
        // }}

        // breakpoints={{
        //   640: {
        //     slidesPerView: 1,
        //   },
        //   768: {
        //     slidesPerView: 1,
        //   },
        //   1024: {
        //     slidesPerView: 1,
        //   },
        // }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* <div className="h-[70vh] lg:grid grid-cols-2 bg-[ABE108]">
              <div className="hidden lg:flex flex-col items-start justify-center gap-4  h-[70vh] px-10 bg-[ABE108]">
                <h1 className="text-[22px] md:text-[36px] font-bold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, nihil.
                </h1>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  asperiores iure quos. Rerum, optio eius.
                </p>
              </div>

              <Image
                src={slide.bg}
                alt="banner"
                width={1920}
                height={500}
                className=" h-full w-full object-contain bg-gray-100 "
              />
            </div> */}

            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}

        {/* Custom Pagination Component */}
        <CustomPagination slides={slides} />
      </Swiper>

      {/* Custom Navigation Buttons with PNG Icons */}

      {/* <div className="custom-swiper-button-prev absolute left-10 bottom-5 z-10 cursor-pointer">
        <Image
          height={200}
          width={200}
          src="/images/home/PREV.svg"
          alt="Previous"
          className="w-5 h-5 sm:w-8 sm:h-8"
        />
      </div>
      <div className="custom-swiper-button-next absolute right-10 bottom-5 z-10 cursor-pointer">
        <Image
          height={200}
          width={200}
          src="/images/home/NEXT.svg"
          alt="Next"
          className="w-5 h-5 sm:w-8 sm:h-8"
        />
      </div> */}
    </div>
  );
};

export default HomeBanner;

// custom pagination component
const CustomPagination = ({ slides }: { slides: Slide[] }) => {
  const swiper = useSwiper(); // Get the Swiper instance
  const [activeIndex, setActiveIndex] = useState(0);

  // Update the active index when the swiper changes
  swiper.on("slideChange", () => {
    setActiveIndex(swiper.realIndex);
  });

  return (
    <div className="absolute bottom-5 md:bottom-5 left-1/2 md:left-10 transform -translate-x-1/2 md:translate-x-0 z-20 flex space-x-2 sm:space-x-5 justify-center  h-4 sm:h-7 items-center  select-none">
      {slides.map((_, index) => (
        <div key={index}>
          {activeIndex === index ? (
            <div
              onClick={() => swiper.slideTo(index)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-[#ABE108] font-medium text-sm">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div className="w-5 sm:w-12 h-0.5 bg-[#ABE108]"></div>
            </div>
          ) : (
            <div
              onClick={() => swiper.slideTo(index)}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <span className="text-black font-medium text-[10px]">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div className="w-2 sm:w-6 h-[2px] bg-black group-hover:w-12 duration-200"></div>
            </div>
          )}
        </div>
      ))}

      {/* <div className="flex justify-center space-x-4 mt-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">01</span>
          <div className="w-6 h-0.5 bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">02</span>
          <div className="w-6 h-0.5 bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">03</span>
          <div className="w-6 h-0.5 bg-gray-300"></div>
        </div>
      </div> */}
    </div>
  );
};

const SlideItem = ({ slide }: { slide: Slide }) => {
  return (
    <div className="h-auto md:h-[75vh] grid grid-cols-1 md:grid-cols-2 md:bg-[#f9f9f9]">
      <div className="flex flex-col items-start md:justify-center gap-4 h-auto py-10 pb-16 md:py-0  md:h-[70vh] px-10 pr-20 bg-[ABE108] overflow-hidden order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.h1
            // initial={{ opacity: 0, x: -100 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[22px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[46px] font-bold text-center md:text-start leading-[1.2] md:leading-[1.4] lg:leading-[1.5] 2xl:leading-[1.6] "
          >
            {slide.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 400 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-5 md:mt-10 text-center md:text-start leading-6 md:leading-7 lg:leading-8 2xl:leading-10 text-[14px] md:text-[16px] "
          >
            {slide.description}
          </motion.p>

          {/* shop now */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="pt-8 md:mt-12 flex justify-center md:justify-start"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-white py-4 px-12 uppercase font-bold animate-bounce delay-900"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Image
        src={slide.bg}
        alt="banner"
        width={1920}
        height={500}
        className="h-auto sm:h-[50vh] md:h-full w-full object-contain bg-gray-100 order-1 md:order-2"
      />
    </div>
  );
};

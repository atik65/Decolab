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
import { useGetLocale } from "@/hooks/useGetLocale";
import HomeCategories from "./HomeCategories";

interface Slide {
  id: number;
  bg: string;
  en: {
    title: string;
    description: string;
  };
  ar: {
    title: string;
    description: string;
  };
}

const slides = [
  {
    id: 7,
    bg: "/images/home/banner7.jpg",

    en: {
      title: "Making Businesses Stand Out: Our Eye-Catching Signage Designs",
      description:
        "Vibrant red signage with bold typography and a striking logo, showcasing our expertise in creating impactful and inviting storefront designs",
    },
    ar: {
      title: "جعل الأعمال التجارية تتميز: تصاميم اللافتات الجذابة لدينا",
      description:
        "لافتات حمراء زاهية مع خطوط جريئة وشعار مميز، تعرض خبرتنا في إنشاء تصاميم واجهات المتاجر المؤثرة والجذابة",
    },
  },
  {
    id: 8,
    bg: "/images/home/banner8.jpg",

    en: {
      title: "Custom-Designed Illuminated Signs for a Global Audience",
      description:
        "Our backlit signage solutions combine aesthetic appeal with functional design, as exemplified by this warmly illuminated sign with a palm tree motif and bilingual lettering.",
    },
    ar: {
      title: "لافتات مضيئة مصممة خصيصاً للجمهور العالمي",
      description:
        "حلول اللافتات المضيئة من الخلف تجمع بين الجاذبية الجمالية والتصميم الوظيفي، كما يتضح من هذه اللافتة المضيئة بدفء مع نقش شجرة النخيل والأحرف ثنائية اللغة",
    },
  },
  {
    id: 9,
    bg: "/images/home/banner9.jpg",

    en: {
      title:
        "Elegance Meets Tradition: Our Illuminated House Numbers and Diwaniya Designs",
      description:
        "Custom diwaniya accessories and house numbers that blend traditional Arabic elements with modern design, reflecting our clients' unique identities and enhancing the beauty of their spaces",
    },
    ar: {
      title: "الأناقة تلتقي بالتراث: أرقام المنازل المضيئة وتصاميم الديوانية",
      description:
        "إكسسوارات الديوانية المخصصة وأرقام المنازل التي تمزج العناصر العربية التقليدية مع التصميم الحديث، مما يعكس الهوية الفريدة لعملائنا ويعزز جمال مساحاتهم",
    },
  },
  {
    id: 10,
    bg: "/images/home/banner14.jpg",

    en: {
      title: "Elegance in Addressing: Custom House Number Plaques",
      description:
        "Personalized house number plaque combining functionality and style for a distinctive curb appeal.",
    },
    ar: {
      title: "الأناقة في العنونة: لوحات أرقام المنازل المخصصة",
      description:
        "لوحة أرقام منزل مخصصة تجمع بين الوظيفة والأناقة لجاذبية مميزة للرصيف",
    },
  },
  {
    id: 111,
    bg: "/images/home/banner13.jpg",

    en: {
      title: "Illuminated Elegance: Al Mala Café's Striking Nighttime Signage",
      description:
        "Illuminated signage with elegant Arabic calligraphy and natural motifs, creating a welcoming and memorable storefront experience.",
    },
    ar: {
      title: "الأناقة المضيئة: لافتة مقهى الملا الليلية المميزة",
      description:
        "لافتة مضيئة مع خط عربي أنيق ونقوش طبيعية، تخلق تجربة واجهة متجر مرحبة ولا تُنسى",
    },
  },
  {
    id: 4,
    bg: "/images/home/banner4.jpg",

    en: {
      title:
        "Bold Design and Vibrant Colors: Showcasing Impactful Signage Solutions",
      description:
        "Custom-designed, illuminated signage that blends functionality and aesthetics to enhance brand presence, showcasing our expertise in creating impactful visual solutions.",
    },
    ar: {
      title: "التصميم الجريء والألوان الزاهية: عرض حلول اللافتات المؤثرة",
      description:
        "لافتات مضيئة مصممة خصيصاً تمزج بين الوظيفة والجمالية لتعزيز حضور العلامة التجارية، تعرض خبرتنا في إنشاء الحلول البصرية المؤثرة",
    },
  },
];

const HomeBanner = () => {
  return (
    <div className="relative ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{ delay: 5000 }}
        spaceBetween={50}
        slidesPerView={1}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}

        {/* Custom Pagination Component */}
        <CustomPagination slides={slides} />
      </Swiper>
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
    </div>
  );
};

const SlideItem = ({ slide }: { slide: Slide }) => {
  const locale = useGetLocale();

  return (
    <div className="h-auto md:h-[75vh] grid grid-cols-1 md:grid-cols-2 md:bg-[#f9f9f9]">
      <div className="flex flex-col items-start md:justify-center gap-4 h-auto pb-16 md:py-0  md:h-[70vh] px-5 md:px-10 md:pr-20 bg-[ABE108] overflow-hidden order-2 md:order-1">
        {/* categories for small screen */}
        <div className="md:hidden">
          <HomeCategories className="flex" />
        </div>

        {/* text for large screen */}
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="hidden md:block"
        >
          <motion.h1
            // initial={{ opacity: 0, x: -100 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[22px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[46px] font-bold text-center md:text-start leading-[1.2] md:leading-[1.4] lg:leading-[1.5] 2xl:leading-[1.6] "
          >
            {slide[locale].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 400 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-5 md:mt-10 text-center md:text-start leading-6 md:leading-7 lg:leading-8 2xl:leading-10 text-[14px] md:text-[16px] "
          >
            {slide[locale].description}
          </motion.p>

          {/* shop now */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="pt-8 md:mt-12 flex justify-center md:justify-start"
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-white py-4 px-12 uppercase font-bold animate-bounce delay-900"
              >
                {locale === "en" ? "Shop Now" : "تسوق الآن"}
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

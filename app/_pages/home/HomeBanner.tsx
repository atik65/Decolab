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
    <div className="relative w-full overflow-hidden bg-white ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        slidesPerView={1}
        loop
        speed={1000}
        className="h-[60vh] md:h-[calc(100vh-140px)]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => <SlideItem slide={slide} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;

const SlideItem = ({
  slide,
  isActive,
}: {
  slide: Slide;
  isActive: boolean;
}) => {
  const locale = useGetLocale();

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* ─── Background Image ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.bg}
          alt="banner"
          fill
          priority
          className="lg:aspect-[16/9] object-cover object-top"
          quality={100}
        />
        {/* Subtle Gradient for legibility without hiding the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/ to-black/10 md:bg-gradient-to-r md:from-black/60 md:to-black/40" />
      </div>

      {/* ─── Minimal Content Layer ─── */}
      <div className="relative z-10 container mx-auto h-full px-6 md:px-12 flex flex-col justify-end md:justify-center items-start text-white pb-12 md:pb-0">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Minimal Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold font-montserrat leading-tight tracking-tight drop-shadow-md"
          >
            {slide[locale].title}
          </motion.h1>

          {/* Minimal Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-lg text-white/90 max-w-lg font-light leading-relaxed drop-shadow-sm"
          >
            {slide[locale].description}
          </motion.p>

          {/* Compact CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2"
          >
            <Link href="/shop">
              <button className="bg-[#189CD9] hover:bg-white hover:text-[#189CD9] text-white py-3 px-8 rounded-sm transition-all duration-300 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] shadow-lg shadow-black/10">
                {locale === "en" ? "Shop Now" : "تسوق الآن"}
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Decorative Progress Bar ─── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 6, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-[#189CD9] z-20 origin-left w-full opacity-60"
      />
    </div>
  );
};

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetLocale } from "@/hooks/useGetLocale";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  bg: string;
  bgMobile?: string;
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
    bg: "/images/home/banner/banner-1-940.webp",
    bgMobile: "/images/home/banner/banner-1-1080x1350.webp",

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
    bg: "/images/home/banner/banner-2-940.webp",
    bgMobile: "/images/home/banner/banner-2-1080x1350.webp",

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
  // {
  //   id: 9,
  //   bg: "/images/home/banner9.jpg",

  //   en: {
  //     title:
  //       "Elegance Meets Tradition: Our Illuminated House Numbers and Diwaniya Designs",
  //     description:
  //       "Custom diwaniya accessories and house numbers that blend traditional Arabic elements with modern design, reflecting our clients' unique identities and enhancing the beauty of their spaces",
  //   },
  //   ar: {
  //     title: "الأناقة تلتقي بالتراث: أرقام المنازل المضيئة وتصاميم الديوانية",
  //     description:
  //       "إكسسوارات الديوانية المخصصة وأرقام المنازل التي تمزج العناصر العربية التقليدية مع التصميم الحديث، مما يعكس الهوية الفريدة لعملائنا ويعزز جمال مساحاتهم",
  //   },
  // },
  // {
  //   id: 10,
  //   bg: "/images/home/banner14.jpg",

  //   en: {
  //     title: "Elegance in Addressing: Custom House Number Plaques",
  //     description:
  //       "Personalized house number plaque combining functionality and style for a distinctive curb appeal.",
  //   },
  //   ar: {
  //     title: "الأناقة في العنونة: لوحات أرقام المنازل المخصصة",
  //     description:
  //       "لوحة أرقام منزل مخصصة تجمع بين الوظيفة والأناقة لجاذبية مميزة للرصيف",
  //   },
  // },
  // {
  //   id: 111,
  //   bg: "/images/home/banner13.jpg",

  //   en: {
  //     title: "Illuminated Elegance: Al Mala Café's Striking Nighttime Signage",
  //     description:
  //       "Illuminated signage with elegant Arabic calligraphy and natural motifs, creating a welcoming and memorable storefront experience.",
  //   },
  //   ar: {
  //     title: "الأناقة المضيئة: لافتة مقهى الملا الليلية المميزة",
  //     description:
  //       "لافتة مضيئة مع خط عربي أنيق ونقوش طبيعية، تخلق تجربة واجهة متجر مرحبة ولا تُنسى",
  //   },
  // },
  // {
  //   id: 4,
  //   bg: "/images/home/banner4.jpg",

  //   en: {
  //     title:
  //       "Bold Design and Vibrant Colors: Showcasing Impactful Signage Solutions",
  //     description:
  //       "Custom-designed, illuminated signage that blends functionality and aesthetics to enhance brand presence, showcasing our expertise in creating impactful visual solutions.",
  //   },
  //   ar: {
  //     title: "التصميم الجريء والألوان الزاهية: عرض حلول اللافتات المؤثرة",
  //     description:
  //       "لافتات مضيئة مصممة خصيصاً تمزج بين الوظيفة والجمالية لتعزيز حضور العلامة التجارية، تعرض خبرتنا في إنشاء الحلول البصرية المؤثرة",
  //   },
  // },
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
      // className="w-full aspect-video md:h-auto"
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
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={slide.bg}
            alt="banner desktop"
            fill
            priority
            className="object-cover object-top"
            quality={100}
          />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src={slide.bgMobile || slide.bg}
            alt="banner mobile"
            fill
            priority
            className="object-cover object-center"
            quality={100}
          />
        </div>

        {/* Subtle Gradient for legibility without hiding the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
      </div>

      {/* ─── Minimal Content Layer ─── */}
      <div
        className={cn(
          "relative z-10 container mx-auto h-full px-6 md:px-0 flex flex-col justify-end md:justify-end  items-start text-white pb-12 md:pb-16",
          locale === "ar" && "items-end text-right",
        )}
      >
        <div
          className={cn(
            "max-w-2xl space-y-4 md:space-y-6",
            locale === "ar" && "text-right flex flex-col items-end",
          )}
        >
          {/* Minimal Title */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold font-montserrat leading-tight tracking-tight drop-shadow-md",
              locale === "ar" && "text-right",
            )}
          >
            {slide[locale].title}
          </motion.h1> */}

          {/* Minimal Description */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "text-sm md:text-lg text-white/90 max-w-lg font-light leading-relaxed drop-shadow-sm",
              locale === "ar" && "text-right",
            )}
          >
            {slide[locale].description}
          </motion.p> */}

          {/* Compact CTA Button with Eye-Catchy Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isActive
                ? {
                  opacity: 1,
                  y: 0,
                  scale: [1, 1.05, 1],
                }
                : { opacity: 0, y: 20 }
            }
            transition={{
              opacity: { duration: 0.8, delay: 0.7 },
              y: { duration: 0.8, delay: 0.7 },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="pt-2"
          >
            <Link href="/shop">
              <button className={`relative group/shimmer overflow-hidden bg-[#189CD9] hover:bg-white hover:text-[#189CD9] text-white py-3 sm:py-5 px-8 sm:px-12 rounded-full transition-all duration-300 font-bold text-[10px] md:text-base shadow-lg shadow-black/10 ${locale === "ar" ? "text-sm" : ""}`}>
                <span className="relative z-10">
                  {locale === "en" ? "Shop Now" : "تسوق الآن"}
                </span>

                {/* Continuous Shimmer Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"
                    style={{
                      width: "200%",
                      animation: "shimmer 2.5s infinite linear",
                    }}
                  />
                </div>
              </button>
            </Link>
          </motion.div>

          <style jsx global>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </div>
      </div>

      {/* ─── Bottom Decorative Progress Bar ─── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 6, ease: "linear" }}
        className={cn(
          "absolute bottom-0 h-1 bg-[#189CD9] z-20 w-full opacity-60",
          locale === "ar" ? "right-0 origin-right" : "left-0 origin-left",
        )}
      />
    </div>
  );
};

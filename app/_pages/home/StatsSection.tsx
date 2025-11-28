"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";

const stats = {
  en: [
    { number: 2500, suffix: "+", label: "Happy Customers" },
    { number: 5000, suffix: "+", label: "Products Delivered" },
    { number: 15, suffix: "+", label: "Years Experience" },
    { number: 50, suffix: "+", label: "Product Categories" },
  ],
  ar: [
    { number: 2500, suffix: "+", label: "عميل سعيد" },
    { number: 5000, suffix: "+", label: "منتج تم توصيله" },
    { number: 15, suffix: "+", label: "سنوات من الخبرة" },
    { number: 50, suffix: "+", label: "فئة منتج" },
  ],
};

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-5xl lg:text-6xl font-black">
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const locale = useGetLocale();
  const currentStats = stats[locale];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-[#87A786] to-[#6d8a6c] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            {locale === "en" ? "Our Impact in Numbers" : "تأثيرنا بالأرقام"}
          </h2>
          <div className="w-16 h-0.5 bg-white/80 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {currentStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                {/* Counter */}
                <div className="text-white mb-1 md:mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white/90 text-xs md:text-sm lg:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

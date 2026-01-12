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
    <section className="relative py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Subtle Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-3">
            {locale === "en" ? "Our Impact in Numbers" : "تأثيرنا بالأرقام"}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
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
              <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200">
                {/* Counter */}
                <div className="text-slate-800 mb-1 md:mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-slate-600 text-xs md:text-sm lg:text-base font-medium">
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

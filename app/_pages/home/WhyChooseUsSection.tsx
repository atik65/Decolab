"use client";
import { motion } from "framer-motion";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Gem, Palette, Truck, Users, Wrench, Zap } from "lucide-react";

const features = {
  en: [
    {
      title: "Free Delivery",
      description: "Competitive pricing without hidden fees",
      icon: Truck,
    },
    {
      title: "Free Installation Support",
      description: "Always here to help with your questions and concerns",
      icon: Wrench,
    },
    {
      title: "Premium Quality",
      description: "High-quality materials and craftsmanship in every product",
      icon: Gem,
    },
    {
      title: "Custom Design",
      description: "Personalized solutions tailored to your unique needs",
      icon: Palette,
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround time without compromising quality",
      icon: Zap,
    },
    {
      title: "Expert Team",
      description: "15+ years of experience in signage and design",
      icon: Users,
    },
  ],
  ar: [
    {
      title: "توصيل مجاني",
      description: "أسعار تنافسية بدون رسوم خفية",
      icon: Truck,
    },
    {
      title: "دعم تركيب مجاني",
      description: "دائمًا هنا للمساعدة في أسئلتك ومخاوفك",
      icon: Wrench,
    },
    {
      title: "جودة ممتازة",
      description: "مواد عالية الجودة وحرفية في كل منتج",
      icon: Gem,
    },
    {
      title: "تصميم مخصص",
      description: "حلول شخصية مصممة لاحتياجاتك الفريدة",
      icon: Palette,
    },
    {
      title: "توصيل سريع",
      description: "وقت تنفيذ سريع دون المساس بالجودة",
      icon: Zap,
    },
    {
      title: "فريق خبراء",
      description: "أكثر من 15 عامًا من الخبرة في اللافتات والتصميم",
      icon: Users,
    },
  ],
};

const WhyChooseUsSection = () => {
  const locale = useGetLocale();
  const currentFeatures = features[locale];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2399b998' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {locale === "en" ? (
              <>
                Why Choose <span className="text-[#99b998]">One Direction</span>
              </>
            ) : (
              <>
                لماذا تختار <span className="text-[#99b998]">ون دايركشن</span>
              </>
            )}
          </motion.h2>

          <motion.div
            className="w-16 h-0.5 bg-[#99b998] mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {locale === "en"
              ? "Discover the reasons why thousands of customers trust us for their signage needs"
              : "اكتشف الأسباب التي تجعل الآلاف من العملاء يثقون بنا لتلبية احتياجات اللافتات الخاصة بهم"}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {currentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-100 group-hover:border-[#99b998] transition-all duration-300 h-full">
                {/* Icon Container */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#99b998]/10 group-hover:bg-[#99b998]/20 flex items-center justify-center text-3xl md:text-4xl mb-5 transition-colors duration-300"
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-[#99b998]" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#99b998] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>

                {/* Hover indicator line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-[#99b998] rounded-b-2xl"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

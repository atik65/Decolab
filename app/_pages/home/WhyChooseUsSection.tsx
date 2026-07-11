"use client";
import { motion } from "framer-motion";
import { useGetLocale } from "@/hooks/useGetLocale";
import {
  Gem,
  Palette,
  Truck,
  Users,
  Wrench,
  Zap,
  // ShieldCheck,
  // Star,
  // HeartHandshake,
  // BadgeCheck,
  Sparkles,
} from "lucide-react";

const features = {
  en: [
    {
      title: "Free Delivery",
      description:
        "Your order arrives at your doorstep at zero extra cost — always.",
      icon: Truck,
      color: "var(--brand-primary)",
      bg: "color-mix(in srgb, var(--brand-primary), transparent 92%)",
    },
    {
      title: "Free Installation Support",
      description:
        "Our experts walk you through every installation step, hassle-free.",
      icon: Wrench,
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      title: "Premium Quality",
      description:
        "Best-in-class materials and meticulous craftsmanship in every product.",
      icon: Gem,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
    },
    {
      title: "Custom Design",
      description:
        "Bespoke solutions crafted to reflect your unique brand identity perfectly.",
      icon: Palette,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
    },
    {
      title: "Fast Turnaround",
      description:
        "Rapid production and delivery timelines without cutting any corners.",
      icon: Zap,
      color: "#f97316",
      bg: "rgba(249,115,22,0.08)",
    },
    {
      title: "Expert Team",
      description:
        "15+ years of proven expertise in signage, branding & creative design.",
      icon: Users,
      color: "var(--brand-primary)",
      bg: "color-mix(in srgb, var(--brand-primary), transparent 92%)",
    },
  ],
  ar: [
    {
      title: "توصيل مجاني",
      description: "طلبك يصل إلى باب منزلك دون أي تكلفة إضافية — دائمًا.",
      icon: Truck,
      color: "var(--brand-primary)",
      bg: "color-mix(in srgb, var(--brand-primary), transparent 92%)",
    },
    {
      title: "دعم تركيب مجاني",
      description: "خبراؤنا يرشدونك في كل خطوة من خطوات التركيب بكل سهولة.",
      icon: Wrench,
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
    },
    {
      title: "جودة ممتازة",
      description: "أفضل المواد وحرفية دقيقة في كل منتج نصنعه.",
      icon: Gem,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
    },
    {
      title: "تصميم مخصص",
      description: "حلول مصممة خصيصًا لتعكس هوية علامتك التجارية بشكل مثالي.",
      icon: Palette,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
    },
    {
      title: "تسليم سريع",
      description: "جداول إنتاج وتسليم سريعة دون التنازل عن الجودة.",
      icon: Zap,
      color: "#f97316",
      bg: "rgba(249,115,22,0.08)",
    },
    {
      title: "فريق الخبراء",
      description: "أكثر من 15 عامًا من الخبرة في اللافتات والعلامات التجارية.",
      icon: Users,
      color: "var(--brand-primary)",
      bg: "color-mix(in srgb, var(--brand-primary), transparent 92%)",
    },
  ],
};

// const trusts = {
//   en: [
//     { icon: ShieldCheck, label: "100% Satisfaction Guaranteed" },
//     { icon: BadgeCheck, label: "ISO Certified Processes" },
//     { icon: HeartHandshake, label: "Trusted by 2,500+ Clients" },
//     { icon: Star, label: "5-Star Rated Service" },
//   ],
//   ar: [
//     { icon: ShieldCheck, label: "ضمان 100% رضا العملاء" },
//     { icon: BadgeCheck, label: "عمليات معتمدة بشهادة ISO" },
//     { icon: HeartHandshake, label: "موثوق به من قِبل 2500+ عميل" },
//     { icon: Star, label: "خدمة مصنفة 5 نجوم" },
//   ],
// };

const WhyChooseUsSection = () => {
  const locale = useGetLocale();
  const currentFeatures = features[locale];
  // const currentTrusts = trusts[locale];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 20, stiffness: 100 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* ── Ambient background shapes ────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* top-right */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(24,156,217,0.07) 0%, transparent 65%)",
          }}
        />
        {/* bottom-left */}
        <div
          className="absolute -bottom-40 -left-40 w-[440px] h-[440px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(24,156,217,0.06) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ── Very subtle dot grid ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Section Header ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background:
                "color-mix(in srgb, var(--brand-primary), transparent 92%)",
              border:
                "1px solid color-mix(in srgb, var(--brand-primary), transparent 78%)",
            }}
          >
            <Sparkles
              className="w-3.5 h-3.5"
              style={{ color: "var(--brand-primary)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--brand-primary)" }}
            >
              {locale === "en" ? "Our Advantages" : "مميزاتنا"}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-[56px] font-bold text-slate-900 leading-tight mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {locale === "en" ? (
              <>
                Why Businesses Choose{" "}
                <span
                  className="relative whitespace-nowrap"
                  style={{ color: "var(--brand-primary)" }}
                >
                  Decolab
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    style={{ height: "8px" }}
                  >
                    <path
                      d="M2 7 Q75 1 150 5 Q225 9 298 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </>
            ) : (
              <>
                لماذا تختار الشركات{" "}
                <span
                  className="relative whitespace-nowrap"
                  style={{ color: "var(--brand-primary)" }}
                >
                  ون دايركشن
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 10"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{ height: "8px" }}
                  >
                    <path
                      d="M2 7 Q75 1 150 5 Q225 9 298 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            {locale === "en"
              ? "From custom signage to fast delivery — we've built every process around your success."
              : "من اللافتات المخصصة إلى التسليم السريع — بنينا كل عملية حول نجاحك."}
          </motion.p>
        </motion.div>

        {/* ── Feature Cards ─────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {currentFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="group relative"
              >
                <div
                  className="relative h-full bg-white rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300"
                  style={{
                    border: "1.5px solid #f1f5f9",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Hover shadow upgrade */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1.5px ${feature.color}30`,
                    }}
                  />

                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-t-2xl"
                    style={{ background: feature.color }}
                  />

                  {/* Faded number */}
                  <span
                    className="absolute top-4 right-5 text-5xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "rgba(0,0,0,0.032)" }}
                  >
                    {num}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: feature.bg,
                      border: `1.5px solid ${feature.color}22`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] md:text-lg font-bold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-slate-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { FC } from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

const ElegantShape: FC<ElegantShapeProps> = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-indigo-200/40",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/60",
            "shadow-[0_8px_32px_0_rgba(99,102,241,0.15)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
};

type HeroGeometricProps = {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  className?: string;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const HeroGeometric: FC<HeroGeometricProps> = ({
  badge = "ONE DIRECTION",
  title1 = "",
  title2 = "",
  description = "",
  className = "",
}) => {
  return (
    <div
      className={cn(
        "relative min-h-[300px] sm:min-h-auto sm:py-32 w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-200 via-white to-blue-50/30",
        className
      )}
    >
      {/* Soft ambient gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-100/30 via-transparent to-rose-100/30 blur-3xl" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-200/40"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-200/40"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[65%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-200/40"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-200/40"
          className="right-[15%] md:right-[10%] top-[10%] md:top-[25%]"
        />

        {/* <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-200/40"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 ">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-3 md:mb-5"
            >
              <Circle className="h-2 w-2 fill-rose-500 text-rose-500" />
              <span className="text-sm text-slate-600 tracking-wide font-medium">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-5 md:mb-8 tracking-tight">
              {title1 && (
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#189CD9] to-violet-700">
                  {title1}
                </span>

                // <span className="text-[#189CD9">{title1}</span>
              )}

              {title2 && (
                <>
                  <br />
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-[#189CD9]"
                    )}
                  >
                    {title2}
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {description && (
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-0 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* little animated mouse like  */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute bottom-14  left-1/2 -translate-x-1/2 "
      >
        {/* <div class="flex justify-center animate-bounce duration-800"> */}
        <div className="flex justify-center ">
          <div className="w-6 h-10 border-2 border-indigo-600/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-indigo-600/90 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* Gradient vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-slate-50/50 pointer-events-none" />
    </div>
  );
};

export { HeroGeometric };

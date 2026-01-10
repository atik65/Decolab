"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useLocale } from "next-intl";

const SLIDES = [
  "Free delivery on Every Order",
  "Fast, professional installation",
  "24/7 Customer support",
  "Premium materials and craftsmanship",
];

const AnnounceBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const hovering = useRef(false);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    stop();
    intervalRef.current = window.setInterval(() => {
      if (!hovering.current) {
        setDirection(1);
        setIndex((i) => (i + 1) % SLIDES.length);
      }
    }, 3500);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  };

  const locale = useLocale();
  console.log("Current locale:", locale);

  return (
    <div
      id="announce-bar"
      className="w-full  direction-ltr bg-[#99b998] text-white text-center py-0 text-sm md:text-base relative"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      aria-live="polite"
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center">
        {locale === "ar" ? (
          <button
            onClick={next}
            aria-label="Next announcement"
            className="text-white/90 hover:text-white p-2 rounded-full ml-3"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="text-white/90 hover:text-white p-2 rounded-full mr-3"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}

        <div className="flex-1 max-w-2xl overflow-hidden relative h-8 flex items-center">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute w-full"
            >
              <span className="block text-sm md:text-base font-medium">
                {SLIDES[index]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {locale === "ar" ? (
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="text-white/90 hover:text-white p-2 rounded-full mr-3"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={next}
            aria-label="Next announcement"
            className="text-white/90 hover:text-white p-2 rounded-full ml-3"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnounceBar;

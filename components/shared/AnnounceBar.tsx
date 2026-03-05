"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Facebook,
  Instagram,
  Phone,
} from "lucide-react";

const SLIDES = [
  {
    full: "Free delivery on Every Order",
    short: "Free Delivery",
  },
  {
    full: "Fast, professional installation",
    short: "Pro Installation",
  },
  {
    full: "24/7 Customer support",
    short: "24/7 Support",
  },
  {
    full: "Premium materials and craftsmanship",
    short: "Premium Craftsmanship",
  },
];

const PHONE_NUMBER = "+971 50 123 4567";
const FACEBOOK_URL = "https://facebook.com";
const INSTAGRAM_URL = "https://instagram.com";

const AnnounceBar: React.FC = () => {
  const [index, setIndex] = useState(0);
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
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const next = () => {
    setIndex((i) => (i + 1) % SLIDES.length);
  };

  return (
    <div
      id="announce-bar"
      className="w-full direction-ltr bg-[#189CD9] text-white py-0 text-sm relative"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      aria-live="polite"
    >
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* ─── left Zone: Phone Number ─── */}
        <div className="flex items-center justify-start">
          {/* Desktop: full phone number */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200 text-sm"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{PHONE_NUMBER}</span>
          </a>

          {/* Mobile: icon only */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            aria-label={`Call ${PHONE_NUMBER}`}
            className="md:hidden text-white/70 hover:text-white transition-colors duration-200 p-1"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
        {/* Empty spacer on mobile so the center stays centered */}
        <div className="hidden" />

        {/* ─── Center Zone: Sliding Announcement ─── */}
        <div className="flex items-center justify-center">
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="text-white/70 hover:text-white p-2 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div className="overflow-hidden relative h-8 flex items-center min-w-[180px] md:min-w-[320px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-full text-center"
              >
                {/* Full text on desktop, short text on mobile */}
                <span className="hidden md:block text-sm font-medium">
                  {SLIDES[index].full}
                </span>
                <span className="block md:hidden text-xs font-medium">
                  {SLIDES[index].short}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            aria-label="Next announcement"
            className="text-white/70 hover:text-white p-2 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* ─── right Zone: Social Icons (hidden on mobile) ─── */}
        <div className="flex justify-end items-center gap-3">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnounceBar;

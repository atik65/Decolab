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
import Link from "next/link";

const SLIDES = [
  {
    full: "Free delivery & Installation",
    short: "Free Delivery & Installation",
  },
  // {
  //   full: "Fast, professional installation",
  //   short: "Pro Installation",
  // },
  // {
  //   full: "24/7 Customer support",
  //   short: "24/7 Support",
  // },
  // {
  //   full: "Premium materials and craftsmanship",
  //   short: "Premium Craftsmanship",
  // },
];

const PHONE_NUMBER = "+971 50 123 4567";
const FACEBOOK_URL = "https://facebook.com";
const INSTAGRAM_URL = "https://instagram.com";

/**
 * WavyText Component
 * Animates each character in a staggered vertical wave for a "flag-like" effect.
 * Optimized for speed and smooth transitions.
 */
const WavyText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01, // Extra fast stagger
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const charVariants = {
    hidden: { y: 5, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -5, opacity: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-center justify-center whitespace-pre ${className}`}
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block">
          <motion.span
            animate={{ y: [0, -3, 0] }} // Subtle wave
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: i * 0.05, // Offset for wave effect
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
};

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
    }, 4000); // 4 seconds
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
      className="w-full direction-ltr bg-[#189CD9] text-white py-0.5 text-sm relative z-[100]"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      aria-live="polite"
    >
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-[1fr_auto_1fr] items-center min-h-[40px]">
        {/* ─── Left Zone: Phone Number ─── */}
        <div className="flex items-center justify-start">
          <Link
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            className="hidden md:flex items-center gap-1.5 text-white/90 hover:text-white hover:scale-105 transition-all duration-300 text-sm font-medium"
          >
            <Phone className="h-3.5 w-3.5 fill-white/10" />
            <span>{PHONE_NUMBER}</span>
          </Link>

          <Link
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            aria-label={`Call ${PHONE_NUMBER}`}
            className="md:hidden text-white/90 hover:text-white transition-all duration-300 p-2 active:scale-95"
          >
            <Phone className="h-4 w-4" />
          </Link>
        </div>

        {/* ─── Center Zone: Wavy Announcement ─── */}
        <div className="flex items-center justify-center gap-1">
          {SLIDES?.length > 1 && (
            <button
              onClick={prev}
              aria-label="Previous announcement"
              className="text-white/60 hover:text-white p-2 rounded-full transition-all duration-300 flex-shrink-0 hover:bg-white/10"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          )}

          <div className="relative overflow-hidden h-10 flex items-center min-w-[180px] md:min-w-[360px] justify-center">
            {/* Desktop View */}
            <div className="hidden md:block w-full">
              <AnimatePresence mode="wait">
                <WavyText
                  key={index}
                  text={SLIDES[index].full}
                  className="text-sm font-semibold tracking-wide"
                />
              </AnimatePresence>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden w-full">
              <AnimatePresence mode="wait">
                <WavyText
                  key={`${index}-mobile`}
                  text={SLIDES[index].short}
                  className="text-xs font-semibold tracking-wide"
                />
              </AnimatePresence>
            </div>
          </div>

          {SLIDES?.length > 1 && (
            <button
              onClick={next}
              aria-label="Next announcement"
              className="text-white/60 hover:text-white p-2 rounded-full transition-all duration-300 flex-shrink-0 hover:bg-white/10"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ─── Right Zone: Social Icons ─── */}
        <div className="flex justify-end items-center gap-4">
          <Link
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Facebook className="h-4 w-4 fill-white/5" />
          </Link>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Instagram className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnounceBar;

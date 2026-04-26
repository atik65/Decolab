"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetLocale } from "@/hooks/useGetLocale";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const BackNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useGetLocale();
  const isRTL = locale === "ar";

  // Check if we are on the homepage (considering locale prefix)
  // We check if the path is just the locale (e.g. /en or /ar) or the root /
  const isHomePage =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === "/" ||
    pathname === "";

  return (
    <div className="flex lg:hidden items-center h-full flex-1 min-w-0">
      <AnimatePresence mode="wait">
        {!isHomePage && (
          <div className="flex items-center gap-2">
            <motion.button
              key="back-button"
              initial={{ opacity: 0, scale: 0.8, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: isRTL ? 10 : -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => router.back()}
              className={cn(
                "group flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300 active:scale-90 flex-shrink-0",
                isRTL ? "ml-2" : "mr-2",
              )}
              aria-label="Go back"
            >
              {isRTL ? (
                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
              )}
            </motion.button>

            <motion.div
              layout
              initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -10 : 10 }}
              className="flex items-center h-full overflow-hidden"
            >
              <Link
                href="/"
                className="transition-all duration-300 hover:opacity-80 flex items-center h-full"
              >
                <Image
                  src="/images/logo.svg"
                  alt="One Direction Logo"
                  width={120}
                  height={40}
                  className="w-28 h-auto object-contain"
                  priority
                />
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackNavigation;
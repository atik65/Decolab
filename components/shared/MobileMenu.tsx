"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetLocale } from "@/hooks/useGetLocale";
import {
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Instagram,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  labelAr?: string;
  icon?: React.ReactNode;
}

export const staticNavLinks: NavLink[] = [
  // { href: "/shop", label: "shop", labelAr: "تسوق", icon: <Home /> },
  // { href: "/about", label: "about", labelAr: "حول", icon: <Users /> },
  // {
  //   href: "/contact",
  //   label: "contact",
  //   labelAr: "اتصل",
  //   icon: <MessageCircle />,
  // },
];

const MobileMenu = ({
  onOpenChange,
  onSearchOpen,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSearchOpen: () => void;
}) => {
  const [navLinks, setNavLinks] = useState<NavLink[]>(staticNavLinks);
  const { data: categoriesData, isLoading } =
    useGetCategories<CategoresResponse>();
  const locale = useGetLocale();

  useEffect(() => {
    if (!isLoading && categoriesData) {
      const categoryLinks = categoriesData.results.map((category) => ({
        href: `/shop?category=${encodeURIComponent(category.name)}`,
        label: category.name,
        labelAr: category.name_ar,
      }));
      setNavLinks([...categoryLinks, ...staticNavLinks]);
    }
  }, [isLoading, categoriesData]);

  return (
    <div className="flex flex-col h-full bg-white font-roboto w-full">
      {/* ─── Header Section ─── */}
      <div
        className={cn(
          "flex items-center p-6 border-b border-gray-100",
          locale === "ar" ? "justify-end" : "justify-start",
        )}
      >
        <Link href="/" onClick={() => onOpenChange(false)}>
          <Image
            src="/images/logo.svg"
            alt="One Direction Logo"
            width={140}
            height={50}
            className="w-32 h-auto object-contain transition-opacity hover:opacity-80"
          />
        </Link>
      </div>

      {/* ─── Scrollable Navigation ─── */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <h3
          className={cn(
            "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6",
            locale === "ar" && "text-right font-montserrat tracking-normal",
          )}
        >
          {locale === "en" ? "Our Categories" : "فئاتنا"}
        </h3>

        {/* ─── Search Bar Trigger ─── */}
        <div className="mb-6">
          <button
            onClick={() => {
              onOpenChange(false);
              setTimeout(() => {
                onSearchOpen();
              }, 150);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-100 transition-all duration-300 group",
              locale === "ar" && "flex-row-reverse text-right",
            )}
          >
            <Search className="w-5 h-5 text-gray-400 group-hover:text-[#189CD9] transition-colors" />
            <span className="text-sm font-medium">
              {locale === "en"
                ? "Search for products..."
                : "البحث عن المنتجات..."}
            </span>
          </button>
        </div>

        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "group flex items-center justify-between py-3 border-b border-transparent hover:border-gray-50 transition-all duration-300 rounded-lg outline-none",
                locale === "ar" && "flex-row-reverse hover:bg-gray-50/50",
              )}
            >
              <span
                className={cn(
                  "text-base font-medium text-gray-800 group-hover:text-[#189CD9] group-hover:translate-x-1 transition-all duration-300",
                  locale === "ar" &&
                    "font-montserrat group-hover:-translate-x-1 group-hover:translate-x-0",
                )}
              >
                {locale === "ar" && link.labelAr ? link.labelAr : link.label}
              </span>
              <span className="text-gray-300 group-hover:text-[#189CD9] transition-colors">
                {locale === "ar" ? (
                  <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* ─── Professional Footer Container ─── */}
      <div className="bg-gray-50 p-6 border-t border-gray-100 mt-auto">
        <div
          className={cn(
            "flex flex-col space-y-4 mb-8",
            locale === "ar" && "items-end",
          )}
        >
          <a
            href="tel:+971501234567"
            className={cn(
              "flex items-center gap-3 text-sm text-gray-600 hover:text-[#189CD9] transition-colors",
              locale === "ar" && "flex-row-reverse",
            )}
          >
            <Phone className="w-4 h-4 text-gray-400" />
            <span dir="ltr" className="font-medium tracking-wide">
              +971 50 123 4567
            </span>
          </a>

          <a
            href="mailto:info@onedirection.com"
            className={cn(
              "flex items-center gap-3 text-sm text-gray-600 hover:text-[#189CD9] transition-colors",
              locale === "ar" && "flex-row-reverse",
            )}
          >
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="font-medium">info@onedirection.com</span>
          </a>
        </div>

        <div
          className={cn(
            "flex items-center justify-between pt-5 border-t border-gray-200",
            locale === "ar" && "flex-row-reverse",
          )}
        >
          <p className="text-[11px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()}{" "}
            {locale === "en" ? "One Direction" : "وان دايركشن"}
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#189CD9] transition-transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

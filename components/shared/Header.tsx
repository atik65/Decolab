"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import SearchBar from "./SearchBar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./language-switch/LocaleSwitcher";
// import { useGetLocale } from "@/hooks/useGetLocale";
import Image from "next/image";
import MobileMenuSidebar from "./MobileMenuSidebar";
import AnnounceBar from "./AnnounceBar";
// import CreateSheetOrder from "./CreateSheetOrder";

gsap.registerPlugin(useGSAP);

interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/shop", label: "shop" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
  };

  const logoRef = useRef<HTMLAnchorElement>(null);
  // const linksRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(
      logoRef.current,
      {
        opacity: 0,
        x: -200,
        duration: 0.5,
        ease: "power3.out",
      },
      "same"
    );

    // tl.from(".nav-link", {
    //   opacity: 0,
    //   y: -100,
    //   duration: 0.5,
    //   ease: "power3.out",
    //   stagger: 0.1,
    //   scope: linksRef.current,
    // });

    tl.from(
      actionRef.current,
      {
        opacity: 0,
        x: 200,
        duration: 0.5,
        ease: "power3.out",
      },
      "same"
    );
  });

  const t = useTranslations("NavLinks");
  // const locale = useGetLocale();

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm z-40 sticky top-0 transition-all duration-300">
      <AnnounceBar />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Mobile Menu Button */}
          {/* <button
            className="md:hidden text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button> */}
          <MobileMenuSidebar
            isOpen={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          />

          {/* Logo */}
          <div className="w-[22%] h-full flex items-center">
            <Link
              ref={logoRef}
              href="/"
              className="text-2xl font-bold tracking-tight hidden lg:block transition-all duration-300 hover:opacity-80 relative group"
            >
              {/* {locale === "en" ? "One Direction" : "اتجاه واحد"} */}
              <Image
                src="/images/logo.svg"
                alt="One Direction"
                className="w-full transition-transform duration-300 group-hover:scale-105"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav
            // ref={linksRef}
            className="hidden lg:flex justify-center items-center gap-2 xl:gap-8 w-[70%]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link relative text-[15px] xl:text-base font-semibold text-gray-700 hover:text-black transition-all duration-300 ease-out px-4 py-2 rounded-md hover:bg-gray-50 group"
              >
                <span className="relative z-10">{t(link.label)}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#99b998] transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div
            ref={actionRef}
            className="flex justify-end items-center gap-3 lg:gap-4 w-auto md:w-[15%]"
          >
            <div className="p-2 rounded-full hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:shadow-sm">
              <SearchBar />
            </div>
            {/* <CreateSheetOrder /> */}

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="p-2 py-0 bg-gray-100 rounded-full hover:bg-gray-50 transition-all duration-300">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-6 shadow-xl z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto relative">
              <form
                className="flex items-center gap-2"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-6 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#99b998] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#99b998] text-white rounded-lg hover:bg-[#88a887] transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                >
                  Search
                </button>
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -right-2 -top-2 p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {/* <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`absolute top-20 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-2 text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;

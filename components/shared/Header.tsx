"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./language-switch/LocaleSwitcher";
// import { useGetLocale } from "@/hooks/useGetLocale";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "houseNumbers" },
  { href: "/", label: "diwaniya" },
  { href: "/", label: "islamicPhrases" },
  { href: "/", label: "advertisements" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
  };

  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
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

    tl.from(".nav-link", {
      opacity: 0,
      y: -100,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1,
      scope: linksRef.current,
    });

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
    <header className="w-full bg-white border-b border-gray-200  z-40 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="w-[15%] h-full flex items-center">
            <Link
              ref={logoRef}
              href="/"
              className="text-2xl font-bold tracking-tight hidden md:block "
            >
              {/* {locale === "en" ? "One Direction" : "اتجاه واحد"} */}
              <Image
                src="/images/logo.svg"
                alt="One Direction"
                className="w-full"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav
            ref={linksRef}
            className="hidden md:flex justify-center space-x-8 w-[70%]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div
            ref={actionRef}
            className="flex justify-end items-center space-x-4 w-auto md:w-[15%] "
          >
            {/* <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              LOGIN / REGISTER
            </Link> */}
            {/* <button
              className="text-gray-700 hover:text-black transition-colors relative"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button> */}

            <SearchBar />

            {/* <Link
              href="/wishlist"
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link> */}
            <LocaleSwitcher />
            {/* <Link
              href="/cart"
              className="flex items-center text-gray-700 hover:text-black transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="ml-2 text-sm font-medium">$0.00</span>
            </Link> */}
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-50">
            <div className="container mx-auto relative">
              <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-r hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div
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
              {/* <Link
                href="/login"
                className="py-2 text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                LOGIN / REGISTER
              </Link> */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

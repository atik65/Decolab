"use client";

import React from "react";
// import logo from "/images/logo.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ChevronRight,
  Home,
  Users,
  MessageCircle,
  Megaphone,
} from "lucide-react";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "houseNumbers", icon: <Home size={20} /> },
  { href: "/", label: "diwaniya", icon: <Users size={20} /> },
  { href: "/", label: "islamicPhrases", icon: <MessageCircle size={20} /> },
  { href: "/", label: "advertisements", icon: <Megaphone size={20} /> },
];

// Fallback text mapping
const fallbackText: Record<string, string> = {
  houseNumbers: "House Numbers",
  diwaniya: "Diwaniya",
  islamicPhrases: "Islamic Phrases",
  advertisements: "Advertisements",
};

const MobileMenu = ({
  //   isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const t = useTranslations("NavLinks");

  return (
    <div className="flex flex-col h-full">
      {/* Header with Logo */}
      <Link
        onClick={() => onOpenChange(false)}
        href="/"
        className="flex items-center justify-start py-2 px-3 border-b border-gray-100"
      >
        {/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-md"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Brand</h2>
            <p className="text-xs text-gray-500">Mobile Menu</p>
          </div>
        </div> */}
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-40 "
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-0">
          {navLinks.map((link) => (
            <Link
              onClick={() => onOpenChange(false)}
              key={link.label}
              href={link.href}
              className="nav-item group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="nav-icon text-gray-600 group-hover:text-blue-600 transition-colors transform group-hover:scale-110">
                  {link.icon}
                </div>
                <span className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {t(link.label) || fallbackText[link.label] || link.label}
                </span>
              </div>
              <ChevronRight className="nav-chevron w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-200 transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          © 2025 Your Brand
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;

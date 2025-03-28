"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "House Numbers" },
  { href: "/", label: "Diwaniya" },
  { href: "/", label: "Islamic Phrases" },
  { href: "/", label: "Advertisement Signage" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
  };

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
          <Link href="/" className="text-2xl font-bold tracking-tight">
            One Direction
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6 ">
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

            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/cart"
              className="flex items-center text-gray-700 hover:text-black transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="ml-2 text-sm font-medium">$0.00</span>
            </Link>
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

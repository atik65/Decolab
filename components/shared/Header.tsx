"use client";

import React, { useRef, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { X, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";
import LocaleSwitcher from "./language-switch/LocaleSwitcher";
// import { useGetLocale } from "@/hooks/useGetLocale";
import Image from "next/image";
import MobileMenuSidebar from "./MobileMenuSidebar";
import AnnounceBar from "./AnnounceBar";
import LinkedLogo from "./LinkedLogo";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import CartSheet from "./CartSheet";
import BackNavigation from "./BackNavigation";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface NavLink {
  href: string;
  label: string;
  labelAr?: string;
}

export const staticNavLinks: NavLink[] = [
  // { href: "/shop", label: "shop", labelAr: "المتجر" },
  // { href: "/about", label: "about", labelAr: "من نحن" },
  // { href: "/contact", label: "contact", labelAr: "اتصل بنا" },
];

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [navLinks, setNavLinks] = useState<NavLink[]>(staticNavLinks);

  const { data: categoriesData, isLoading } =
    useGetCategories<CategoresResponse>();

  React.useEffect(() => {
    if (!isLoading && categoriesData) {
      const showableCategories = categoriesData.results
        .filter((category) => category.is_showable_navbar)
        .map((category) => ({
          href: `/shop?category=${encodeURIComponent(category.name)}`,
          label: category.name,
          labelAr: category.name_ar,
        }));
      setNavLinks([...showableCategories, ...staticNavLinks]);
    }
  }, [isLoading, categoriesData]);

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
      "same",
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
      "same",
    );
  });

  // const t = useTranslations("NavLinks");
  const locale = useLocale();
  const pathname = usePathname();
  const isHomePage =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === "/" ||
    pathname === "";

  // cinematic landing page: floating glass bar that hides while scrolling down
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  React.useEffect(() => {
    if (!isHomePage) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 500 && y > lastY + 2);
      if (y < lastY - 2) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  if (isHomePage) {
    return (
      <>
        <div className="relative z-[95]">
          <AnnounceBar variant="cinematic" />
        </div>

        <header
          className="cn-header"
          style={{
            top: scrolled ? 12 : 68,
            transform: hidden ? "translateY(-160%)" : "translateY(0)",
            transition:
              "top 0.6s cubic-bezier(0.77,0,0.18,1), transform 0.7s cubic-bezier(0.77,0,0.18,1)",
          }}
        >
          <div className="mx-auto max-w-[1500px] px-3 sm:px-6">
            <div
              className={cn(
                "flex items-center justify-between h-14 lg:h-[62px] rounded-full px-4 sm:px-6 border border-black/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-colors duration-500",
                scrolled ? "bg-white/90" : "bg-white/80",
              )}
            >
              <MobileMenuSidebar
                isOpen={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
                onSearchOpen={() => setIsSearchOpen(true)}
              />

              <div className="flex items-center h-full">
                <LinkedLogo
                  ref={logoRef}
                  logoSrc="/decolab/black-logo-large.png"
                  width={150}
                  height={40}
                  imgClassName="h-7 lg:h-8 w-auto"
                />
              </div>

              <nav className="hidden lg:flex justify-center items-center gap-1 xl:gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-[12px] xl:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#1a1613]/70 hover:text-[#1a1613] transition-colors duration-300 group"
                  >
                    {locale === "ar" && link.labelAr
                      ? link.labelAr
                      : link?.label?.split("_")?.join(" ")}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#1a1613] transition-all duration-300 group-hover:w-1/2" />
                  </Link>
                ))}
              </nav>

              <div ref={actionRef} className="flex items-center gap-1 sm:gap-3">
                <div
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hidden md:block rounded-full hover:bg-black/5 transition-all duration-300 cursor-pointer"
                >
                  <Search size={20} className="text-[#1a1613]" />
                </div>
                <CartSheet />
                <div className="h-5 w-px bg-black/15 hidden md:block" />
                <div className="rounded-full overflow-hidden min-w-[80px] hover:bg-black/5 transition-colors">
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>

          <SearchBar
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            showTrigger={false}
          />
        </header>
      </>
    );
  }

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
            onSearchOpen={() => setIsSearchOpen(true)}
          />

          {/* <div className="w-60 h-full flex items-center">
            <Link
              ref={logoRef}
              href="/"
              className="text-2xl font-bold tracking-tight block lg:hidden transition-all duration-300 hover:opacity-80 relative group"
            >
              <Image
                src="/images/logo.svg"
                alt="Decolab"
                className="w-full transition-transform duration-300 group-hover:scale-105"
                width={100}
                height={100}
              />
            </Link>
          </div> */}

          <BackNavigation />

          {/* Logo (Desktop Only) */}
          <div className="hidden lg:flex w-[22%] h-full items-center">
            <LinkedLogo
              ref={logoRef}
              className="text-2xl font-bold tracking-tight"
              imgClassName="w-full"
              width={100}
              height={100}
            />
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
                {/* <span className="relative z-10">{t(link.label)}</span> */}
                <span
                  className={`relative z-10 uppercase ${locale === "en" ? "text-base" : ""}`}
                >
                  {locale === "ar" && link.labelAr
                    ? link.labelAr
                    : link?.label?.split("_")?.join(" ")}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-3/4"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div
            ref={actionRef}
            className="flex justify-end items-center gap-3 lg:gap-4 w-auto md:w-[15%]"
          >
            <div
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hidden md:block rounded-full hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:shadow-sm"
            >
              <span className="text-gray-700 hover:text-black transition-colors">
                <Search size={20} />
              </span>
            </div>

            <CartSheet />

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="bg-gray-100 rounded-full hover:bg-gray-50 transition-all duration-300 overflow-hidden min-w-[85px]">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        {/* Global Search Drawer Instance */}
        <SearchBar
          isOpen={isSearchOpen}
          onOpenChange={setIsSearchOpen}
          showTrigger={false}
        />
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

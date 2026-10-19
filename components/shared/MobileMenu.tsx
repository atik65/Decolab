"use client";

import "@/app/_pages/home/cinematic/cinematic.css";
import "@/app/_pages/product-details/cinematic/pd.css";
import "@/app/_pages/checkout/cinematic/checkout.css";
import "@/app/_pages/checkout/cinematic/cartsheet.css";
import "./mobile-menu.css";
import React from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import { cartCopy } from "@/app/_pages/checkout/cinematic/cartCopy";
import { contact, WHATSAPP_URL } from "@/app/_pages/home/cinematic/content";
import LinkedLogo from "./LinkedLogo";
import InstagramLink from "./InstagramLink";

const mmCopy = {
  en: {
    search: "Search products",
    collections: "Collections",
    all: "All products",
    about: "About us",
    contact: "Contact",
    order: "Order on WhatsApp",
    menu: "Menu",
  },
  ar: {
    search: "ابحث عن منتج",
    collections: "المجموعات",
    all: "جميع المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    order: "اطلب عبر واتساب",
    menu: "القائمة",
  },
} as const;

const MobileMenu = ({
  onOpenChange,
  onSearchOpen,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSearchOpen: () => void;
}) => {
  const locale = useGetLocale();
  const t = mmCopy[locale];
  const banner = cartCopy[locale].banner;
  const { data, isLoading } = useGetCategories<CategoresResponse>();
  const close = () => onOpenChange(false);

  const rows = [
    { key: "all", href: "/shop", label: t.all },
    ...(data?.results ?? []).map((c) => ({
      key: String(c.id),
      href: `/shop?category=${encodeURIComponent(c.name)}`,
      label: locale === "ar" ? c.name_ar || c.name : c.name,
    })),
  ];

  return (
    <div className="cine cn-white cn-cs cn-mm" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="cn-mm-head">
        <LinkedLogo onClick={close} imgClassName="h-8 w-auto object-contain" />
      </header>

      <p className="cn-cs-banner">
        <i className="cn-dot" />
        {banner}
      </p>

      <div className="cn-cs-body cn-mm-body">
        <button
          type="button"
          className="cn-mm-search"
          onClick={() => {
            close();
            setTimeout(onSearchOpen, 400);
          }}
        >
          <Search size={16} aria-hidden="true" />
          {t.search}
        </button>

        <span className="cn-kicker f-display cn-mm-label">
          <i className="cn-dot" />
          {t.collections}
        </span>

        <nav aria-label={t.menu}>
          <ul className="cn-mm-list">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="cn-mm-skel">
                    <i />
                  </li>
                ))
              : rows.map((r, i) => (
                  <li key={r.key}>
                    <Link href={r.href} onClick={close}>
                      <small className="f-logo" dir="ltr">
                        {String(i + 1).padStart(2, "0")}
                      </small>
                      <span className="f-display">{r.label}</span>
                      <span className="cn-cat-arrow" aria-hidden="true">
                        <ArrowUpRight size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>

        <div className="cn-mm-sub">
          <Link href="/about" onClick={close}>
            {t.about}
          </Link>
          <Link href="/contact" onClick={close}>
            {t.contact}
          </Link>
        </div>
      </div>

      <footer className="cn-cs-foot cn-mm-foot">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-btn" onClick={close}>
          {t.order}
          <span className="cn-btn-ico">
            <MessageCircle size={16} />
          </span>
        </a>

        <InstagramLink isAr={locale === "ar"} tone="light" />

        <div className="cn-mm-contact">
          <a href={`https://wa.me/${contact.phone.replace(/[\s+]/g, "")}`} target="_blank" rel="noopener noreferrer">
            <Phone size={14} aria-hidden="true" />
            <span dir="ltr" style={{ direction: "ltr", unicodeBidi: "isolate" }}>
              {contact.phone}
            </span>
          </a>
          <a href="mailto:onedirectionkwt@gmail.com">
            <Mail size={14} aria-hidden="true" />
            <span dir="ltr" style={{ direction: "ltr", unicodeBidi: "isolate" }}>
              onedirectionkwt@gmail.com
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MobileMenu;

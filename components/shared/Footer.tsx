import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Instagram } from "lucide-react";

const Footer = () => {
  const locale = useGetLocale();

  const footerLinks = {
    about: [
      { name: locale === "en" ? "About Us" : "من نحن", href: "/about" },
      // {
      //   name: locale === "en" ? "Our Brand" : "علامتنا التجارية",
      //   href: "/",
      // },
      {
        name: locale === "en" ? "Meet the Founders" : "تعرف على المؤسسين",
        href: "/",
      },
      // {
      //   name: locale === "en" ? "How it works" : "كيف يعمل",
      //   href: "/how-it-works",
      // },
      { name: locale === "en" ? "F.A.Q." : "الأسئلة الشائعة", href: "/" },
      // {
      //   name: locale === "en" ? "Craftsmanship" : "الحرفية",
      //   href: "/craftsmanship",
      // },
    ],
    support: [
      { name: locale === "en" ? "Support" : "الدعم", href: "/" },
      {
        name: locale === "en" ? "Care Guide" : "دليل العناية",
        href: "/",
      },
      // {
      //   name: locale === "en" ? "Shipping & Returns" : "الشحن والإرجاع",
      //   href: "/shipping-returns",
      // },
      {
        name: locale === "en" ? "Warranty Policy" : "سياسة الضمان",
        href: "/",
      },
      // {
      //   name: locale === "en" ? "Privacy Policy" : "سياسة الخصوصية",
      //   href: "/",
      // },
    ],
  };

  const contactInfo = {
    phone: "+971 50 123 4567",
    email: "info@onedirection.com",
    address:
      locale === "en"
        ? "Panasonic Tower, 1b Fahad Al-Salem Street, Kuwait City, Kuwait"
        : "برج باناسونيك، 1ب شارع فهد السالم، مدينة الكويت، الكويت",
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-8 pb-5 text-gray-600 font-roboto">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">
          {/* Column 1: Identity & Contact */}
          <div className="lg:col-span-2 space-y-8">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/logo.svg"
                alt="One Direction"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <div className="space-y-4 text-sm md:text-base max-w-sm">
              <Link
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="block hover:text-[#189CD9] transition-colors duration-300"
              >
                {contactInfo.phone}
              </Link>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="block underline underline-offset-4 hover:text-[#189CD9] transition-colors duration-300"
              >
                {contactInfo.email}
              </Link>
              <p className="leading-relaxed text-gray-500">
                {contactInfo.address}
              </p>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="space-y-6">
            <h4 className="font-montserrat font-bold text-gray-900 border-b border-gray-100 pb-2 inline-block">
              {locale === "en" ? "About Us" : "من نحن"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#189CD9] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h4 className="font-montserrat font-bold text-gray-900 border-b border-gray-100 pb-2 inline-block">
              {locale === "en" ? "Support" : "الدعم"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#189CD9] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment & Attribution Section */}
        <div className="border-t border-gray-100 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                {locale === "en" ? "Payment Available" : "الدفع متاح"}
              </span>
              <Image
                src="/images/icons/payment.png"
                alt="Payment Methods"
                width={120}
                height={30}
                className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500 cursor-help"
              />
            </div>

            <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest text-gray-400">
              <p>
                © {new Date().getFullYear()}{" "}
                {locale === "en" ? "One Direction" : "وان دايركشن"}.
                <span className="ml-1 opacity-60">Powered by Atik</span>
              </p>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-900 hover:text-[#189CD9] transition-colors duration-300"
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

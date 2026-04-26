import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

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
    phone: "+965 6688 9159",
    email: "onedirectionkwt@gmail.com",
    address:
      locale === "en"
        ? "Shuwaikh Industrial Area 1 Plot: 1, Parcel: 79C, Street: 19"
        : "شويخ الصناعية 1، قطعة 1، قسيمة 79C، شارع 19",
  };

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-white border-t border-gray-100 pt-8 pb-5 text-gray-600 font-roboto"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">
          {/* Column 1: Identity & Contact */}
          <div
            className={cn(
              "lg:col-span-2 space-y-8 text-center md:text-left",
              locale === "ar" && "lg:text-right lg:order-3",
            )}
          >
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/logo.svg"
                alt="One Direction"
                width={180}
                height={60}
                className={cn(
                  "h-12 w-auto object-contain mx-auto md:ml-0 md:mr-auto",
                  locale === "ar" && "lg:ml-auto lg:mr-0",
                )}
              />
            </Link>

            <div
              className={cn(
                "space-y-4 text-sm md:text-base max-w-sm mx-auto md:ml-0 md:mr-auto",
                locale === "ar" && "lg:ml-auto lg:mr-0",
              )}
            >
              <Link
                href={`https://wa.me/${contactInfo.phone.replace(/[\s+]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#189CD9] transition-colors duration-300 !font-roboto"
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
          <div
            className={cn(
              "space-y-6 text-center md:text-left",
              locale === "ar" && "lg:text-right lg:order-2",
            )}
          >
            <h4 className="font-montserrat font-bold text-gray-900 border-b border-gray-100 pb-2 inline-block">
              {locale === "en" ? "About Us" : "من نحن"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
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
          <div
            className={cn(
              "space-y-6 text-center md:text-left",
              locale === "ar" && "lg:text-right lg:order-1",
            )}
          >
            <h4 className="font-montserrat font-bold text-gray-900 border-b border-gray-100 pb-2 inline-block">
              {locale === "en" ? "Support" : "الدعم"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
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
          <div
            className={cn(
              "flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left",
              locale === "ar" && "md:flex-row-reverse",
            )}
          >
            <div
              className={cn(
                "flex flex-col sm:flex-row items-center gap-4 sm:gap-6",
                locale === "ar" && "sm:flex-row-reverse",
              )}
            >
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

            <div
              className={cn(
                "flex items-center gap-6 text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400",
                locale === "ar" && "md:flex-row-reverse",
              )}
            >
              <p>
                © {new Date().getFullYear()}{" "}
                {locale === "en" ? "One Direction" : "وان دايركشن"}.
              </p>
              <Link
                href="https://iamatik.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#189CD9] transition-colors duration-300 group"
              >
                <span className="opacity-60">
                  {locale === "en" ? "Developed by" : "تم التطوير بواسطة"}
                </span>
                <span className="font-bold text-gray-500 group-hover:text-[#189CD9]">Atik</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import LinkedLogo from "./LinkedLogo";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import InstagramLink from "./InstagramLink";

const Footer = () => {
  const locale = useGetLocale();
  const isAr = locale === "ar";

  const footerLinks = {
    about: [
      { name: locale === "en" ? "About Us" : "من نحن", href: "/about" },
      {
        name: locale === "en" ? "Meet the Founders" : "تعرف على المؤسسين",
        href: "/",
      },
      { name: locale === "en" ? "F.A.Q." : "الأسئلة الشائعة", href: "/" },
    ],
    support: [
      { name: locale === "en" ? "Support" : "الدعم", href: "/" },
      {
        name: locale === "en" ? "Care Guide" : "دليل العناية",
        href: "/",
      },
      {
        name: locale === "en" ? "Warranty Policy" : "سياسة الضمان",
        href: "/warranty-policy",
      },
    ],
  };

  const contactInfo = {
    phone: "+965 6688 9159",
    email: "onedirectionkwt@gmail.com",
    address: isAr
      ? "شويخ الصناعية 1، قطعة 1، قسيمة 79C، شارع 19"
      : "Shuwaikh Industrial Area 1 Plot: 1, Parcel: 79C, Street: 19",
  };

  const tagline = isAr
    ? "لافتات مضيئة — أرقام منازل LED — حروف ثلاثية الأبعاد — طباعة البانر والفلاش"
    : "Illuminated signage — LED house numbers — 3D letters — Banner and Flash Printing";

  const colTitle =
    "text-[11px] font-bold uppercase tracking-[0.22em] text-white/45";
  const linkCls =
    "inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors duration-300 hover:text-[#ffb347]";

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className="bg-[#f7f5f0] p-3 sm:p-4 font-roboto"
    >
      <div className="relative overflow-hidden rounded-[clamp(14px,1.6vw,26px)] bg-[#0a0908] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          className={cn(
            "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14",
            isAr && "text-right",
          )}
        >
          {/* Identity & contact */}
          <div
            className={cn(
              "space-y-7 sm:col-span-2",
              isAr && "flex flex-col items-end lg:order-3",
            )}
          >
            <LinkedLogo
              logoSrc="/decolab/whie-logo-large.png"
              width={180}
              height={48}
              imgClassName={cn("h-10 w-auto object-contain", isAr && "ml-auto")}
              className="block w-fit"
              containerClassName={cn("block", isAr && "ml-auto w-fit")}
            />

            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              {tagline}
            </p>

            <ul
              className={cn(
                "max-w-md space-y-4 text-sm md:text-[15px]",
                isAr && "flex flex-col items-end",
              )}
            >
              <li>
                <Link
                  href={`https://wa.me/${contactInfo.phone.replace(/[\s+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/85 transition-colors hover:text-[#ffb347]"
                >
                  <Phone size={16} className="shrink-0 text-white/40" />
                  <span dir="ltr" className="roboto-num">
                    {contactInfo.phone}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-white/85 transition-colors hover:text-[#ffb347]"
                >
                  <Mail size={16} className="shrink-0 text-white/40" />
                  <span dir="ltr">{contactInfo.email}</span>
                </Link>
              </li>
              <li
                className={cn(
                  "flex items-start gap-3 text-white/55",
                  isAr && "[direction:rtl]",
                )}
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" />
                <span className="min-w-0 leading-relaxed">{contactInfo.address}</span>
              </li>
            </ul>

            {/* Instagram */}
            <InstagramLink isAr={isAr} />
          </div>

          {/* About */}
          <div className={cn("space-y-5", isAr && "lg:order-2")}>
            <h4 className={colTitle}>
              {locale === "en" ? "About Us" : "من نحن"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkCls}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className={cn("space-y-5", isAr && "lg:order-1")}>
            <h4 className={colTitle}>{locale === "en" ? "Support" : "الدعم"}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkCls}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment & attribution */}
        <div className="mt-10 border-t border-white/10 pt-6 lg:mt-14">
          <div
            className={cn(
              "flex flex-col items-start justify-between gap-6 md:flex-row md:items-center",
              isAr && "md:flex-row-reverse items-end md:items-center",
            )}
          >
            <div
              className={cn(
                "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5",
                isAr && "sm:flex-row-reverse items-end sm:items-center",
              )}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                {locale === "en" ? "Payment Available" : "الدفع متاح"}
              </span>
              <span className="rounded-full bg-white px-4 py-2">
                <Image
                  src="/images/icons/payment.png"
                  alt="Payment Methods"
                  width={120}
                  height={30}
                  className="h-5 w-auto"
                />
              </span>
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-white/40",
                isAr && "flex-row-reverse",
              )}
            >
              <p>
                © {new Date().getFullYear()}{" "}
                {locale === "en" ? "Decolab" : "ديكولاب"}.
              </p>
              <Link
                href="https://iamatik.me"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-1.5 transition-colors duration-300 hover:text-[#ffb347]",
                  isAr && "flex-row-reverse",
                )}
              >
                <span className="opacity-70">
                  {locale === "en" ? "Developed by" : "تم التطوير بواسطة"}
                </span>
                <span className="font-bold text-white/70 group-hover:text-[#ffb347]">
                  Atik
                </span>
                <ArrowUpRight size={12} className="opacity-60" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

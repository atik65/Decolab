import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
// import { Montserrat, Roboto_Flex, Cairo } from "next/font/google";
import { Cairo, Manrope, Michroma, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import CustomRootProvider from "@/providers/CustomRootProvider";



const vexa = localFont({
  src: "../../public/fonts/vexa.otf",
  variable: "--font-vexa",
  weight: "400",
  style: "normal",
});

const dgRarah = localFont({
  src: "../../public/fonts/DGRafah.otf",
  variable: "--font-dgrarah",
  weight: "400",
  style: "normal",
});

const geDiner = localFont({
  src: "../../public/fonts/ge_dinar.otf",
  variable: "--font-ge-diner",
  weight: "400",
  style: "normal",
});

/*
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300"],
});

const roboto = Roboto_Flex({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  style: ["normal"],
});
*/

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  style: ["normal"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Decolab – Illuminated Signage, LED House Numbers & Custom Advertising",
  description:
    "Decolab is a Kuwait-based advertising company specializing in illuminated signage, LED house numbers, acrylic 3D letters, and custom printing and installation of banners and stickers. High-quality materials and fast installation service guaranteed.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // const allFonts = `${montserrat.variable} ${roboto.variable} ${geDiner.variable} ${vexa.variable} ${dgRarah.variable} ${cairo.variable}`;
  const allFonts = `${michroma.variable} ${unbounded.variable} ${manrope.variable} ${geDiner.variable} ${vexa.variable} ${dgRarah.variable} ${cairo.variable}`;

  return (
    <html
      lang={locale || routing.defaultLocale}
      className={allFonts}
      data-locale={locale}
    >
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <CustomRootProvider>{children}</CustomRootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

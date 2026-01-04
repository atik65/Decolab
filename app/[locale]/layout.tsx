import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Montserrat, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import CustomRootProvider from "@/providers/CustomRootProvider";

const vexa = localFont({
  src: "../../public/fonts/vexa.otf",
  variable: "--font-vexa",
  weight: "400",
  style: "normal",
});

const geDiner = localFont({
  src: "../../public/fonts/ge_dinar.otf",
  variable: "--font-ge-diner",
  weight: "400",
  style: "normal",
});

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

export const metadata: Metadata = {
  title:
    "One Direction – Illuminated Signage, LED House Numbers & Custom Advertising",
  description:
    "One Direction is a Kuwait-based advertising company specializing in illuminated signage, LED house numbers, acrylic 3D letters, and custom printing and installation of banners and stickers. High-quality materials and fast installation service guaranteed.",
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

  console.log("locale", locale);

  const allFonts = `${montserrat.variable} ${roboto.variable} ${geDiner.variable} ${vexa.variable}`;

  return (
    <html lang={locale} className={allFonts} data-locale={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <CustomRootProvider>{children}</CustomRootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

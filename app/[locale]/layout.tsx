import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Montserrat, Roboto_Condensed, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import CustomRootProvider from "@/providers/CustomRootProvider";

const museo = localFont({
  src: "../../public/fonts/Museo300-Regular.otf",
  variable: "--font-museo",
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

  return (
    // <html lang={locale} className={` ${montserrat.className}  `}>
    //   <body
    //   // className={`${josefinSans.className} ${josefinSans.className} antialiased`}
    //   // className={` ${museo.className} ${montserrat.className} antialiased`}
    //   // className={`font-montserrat antialiased`}
    //   >
    //     {/* <Header /> */}
    //     <NextIntlClientProvider>
    //       <CustomRootProvider>{children}</CustomRootProvider>
    //     </NextIntlClientProvider>
    //     {/* <ContactSection />
    //     <Footer /> */}
    //   </body>
    // </html>

    <html
      lang={locale}
      className={`${montserrat.variable} ${roboto.variable} ${museo.variable}`}
    >
      <body className={`${montserrat.className} antialiased`}>
        <NextIntlClientProvider>
          <CustomRootProvider>{children}</CustomRootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

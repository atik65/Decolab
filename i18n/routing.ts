import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ar", "en"],

  // Used when no locale matches
  defaultLocale: "ar",
  localePrefix: "as-needed",
  
  // Disable locale detection to rely only on the URL
  // This prevents redirects based on cookies or accept-language header
  // localeDetection: false,
});

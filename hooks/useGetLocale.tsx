"use client";

import { useLocale } from "next-intl";
type ProductLocale = "ar" | "en";

export const useGetLocale = () => {
  const locale = (useLocale() as ProductLocale) || "ar";

  return locale;
};

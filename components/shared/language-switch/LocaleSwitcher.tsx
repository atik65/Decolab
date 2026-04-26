"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const queryString = searchParams.toString();
    const targetPath = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(targetPath, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center h-10 px-4 transition-all duration-300 select-none cursor-pointer ",
        isPending && "opacity-50"
      )}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {locale === "en" ? (
        <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-widest uppercase">
          <span className="text-black">EN</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 group-hover:text-gray-600 transition-colors">AR</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-widest uppercase">
          <span className="text-black">AR</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 group-hover:text-gray-600 transition-colors">EN</span>
        </div>
      )}
    </button>
  );
}

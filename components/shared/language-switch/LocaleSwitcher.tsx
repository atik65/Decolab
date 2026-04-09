import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  //   console.log("locale = ", locale);

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option className="outline-none cursor-pointer " key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}

// "use client";

// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";

// export default function LocaleSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const switchLocale = (newLocale: string) => {
//     if (newLocale !== locale) {
//       router.replace(pathname, { locale: newLocale });
//       router.refresh();
//     }
//   };

//   return (
//     <div className="relative">
//       <select
//         className="bg-white text-gray-900 px-0 text-xs sm:text-base sm:px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 cursor-pointer focus:ring-[#006A4E]"
//         value={locale}
//         onChange={(e) => switchLocale(e.target.value)}
//       >
//         <option value="ar" className="cursor-pointer">
//           Arabic
//         </option>
//         <option value="en" className="cursor-pointer">
//           English
//         </option>
//       </select>
//     </div>
//   );
// }

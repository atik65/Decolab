"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "@/i18n/navigation";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import { useGetLocale } from "@/hooks/useGetLocale";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const text = {
  en: {
    title: "Search",
    placeholder: "Search for products",
    hint: "Start typing to see products you are looking for.",
    popular: "Browse by category",
    search: "Search",
    close: "Close search",
  },
  ar: {
    title: "بحث",
    placeholder: "ابحث عن المنتجات",
    hint: "ابدأ الكتابة لعرض المنتجات التي تبحث عنها.",
    popular: "تصفح حسب الفئة",
    search: "بحث",
    close: "إغلاق البحث",
  },
} as const;

const SearchBar = ({
  isOpen: externalOpen,
  onOpenChange: externalOnOpenChange,
  showTrigger = true,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const locale = useGetLocale();
  const t = text[locale];

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {showTrigger && (
        <DrawerTrigger className="">
          {" "}
          <span
            className="text-gray-700 hover:text-black transition-colors relative h-full "
            aria-label="Toggle search"
          >
            <Search size={20} />
          </span>
        </DrawerTrigger>
      )}
      <DrawerContent className="!h-[min(52svh,460px)] md:!h-[min(520px,calc(100svh-32px))]">
        <DrawerTitle className="sr-only">{t.title}</DrawerTitle>
        <SearchInput open={open} onOpenChange={setOpen} />
        <DrawerClose className="sr-only">{t.close}</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchBar;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchInput = ({ onOpenChange }: Props) => {
  const router = useRouter();
  const locale = useGetLocale();
  const t = text[locale];
  const isRtl = locale === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categoriesData } = useGetCategories<CategoresResponse>();
  const categories = categoriesData?.results ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    onOpenChange(false);
  };

  const goCategory = (name: string) => {
    router.push(`/shop?category=${encodeURIComponent(name)}`);
    onOpenChange(false);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-5 sm:px-10 sm:pb-10 sm:pt-8 md:px-16"
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 border-b border-black/10 pb-4 sm:gap-5 sm:pb-6"
      >
        <button type="submit" aria-label={t.search} className="shrink-0">
          <Search className="h-5 w-5 text-black/45 sm:h-7 sm:w-7" />
        </button>
        <input
          type="text"
          placeholder={t.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          style={{ direction: isRtl ? "rtl" : "ltr" }}
          className="min-w-0 flex-1 bg-transparent text-xl font-semibold text-[#1a1613] outline-none placeholder:text-black/30 sm:text-3xl md:text-4xl"
        />
        {searchTerm.trim() && (
          <button
            type="submit"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#1a1613] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black sm:flex"
          >
            {t.search}
            <ArrowUpRight size={16} className={cn(isRtl && "-scale-x-100")} />
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label={t.close}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 text-[#1a1613] transition-colors hover:bg-black hover:text-white sm:h-12 sm:w-12"
        >
          <X size={20} />
        </button>
      </form>

      <p className="mt-4 text-sm text-black/55 sm:text-base">{t.hint}</p>

      {categories.length > 0 && (
        <div className="mt-8 sm:mt-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/45">
            {t.popular}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goCategory(c.name)}
                className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#1a1613] transition-colors hover:border-[#1a1613] hover:bg-[#1a1613] hover:text-white"
              >
                {isRtl && c.name_ar ? c.name_ar : c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

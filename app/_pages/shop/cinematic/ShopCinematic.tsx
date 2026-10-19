"use client";

import "../../home/cinematic/cinematic.css";
import "./shop.css";
import { useCallback } from "react";
import { useQueryState } from "nuqs";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import Closing from "../../home/cinematic/Closing";
import ShopHero from "./ShopHero";
import ShopBrowser from "./ShopBrowser";
import ShopPromises from "./ShopPromises";

/** Cinematic shop: same visual language as the home page. */
const ShopCinematic = () => {
  const locale = useGetLocale();
  const lenis = useSmoothScroll();
  const [category, setCategory] = useQueryState("category", { defaultValue: "" });
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const browse = useCallback(() => {
    const target = document.getElementById("collection");
    if (!target) return;
    if (lenis.current) lenis.current.scrollTo(target, { offset: -90, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, [lenis]);

  return (
    <div className="cine cn-shop" dir={locale === "ar" ? "rtl" : "ltr"}>
      <ShopHero locale={locale} category={category} onBrowse={browse} />
      <ShopBrowser
        locale={locale}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      <ShopPromises locale={locale} />
      <Closing locale={locale} />
    </div>
  );
};

export default ShopCinematic;

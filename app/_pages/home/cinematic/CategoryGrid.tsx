"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetCategories } from "@/hooks/tanstack/useProducts";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import SmartImage from "./SmartImage";
import { useReveal } from "./useReveal";
import { copy, fallbackCategories, fallbackImages, Locale } from "./content";

interface Item {
  id: number;
  name: string;
  name_ar: string;
  image?: string;
}

const CategoryGrid = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const { data, isLoading, isError } = useGetCategories<CategoresResponse>();

  const items: Item[] = data?.results?.length
    ? data.results
    : isError || (!isLoading && !data?.results?.length)
      ? fallbackCategories
      : [];
  const ready = !isLoading;

  useReveal(root, [ready, items.length]);

  const cols = ready ? Math.min(Math.max(items.length, 2), 4) : 4;

  return (
    <section ref={root} className="cn-section cn-paper" id="categories">
      <div className="cn-wrap">
        <div className="cn-sec-head">
          <h2 className="cn-sec-title f-display cn-rv">
            <i className="cn-dot" />
            {t.catTitle}
          </h2>
          <div className="cn-sec-meta cn-rv">
            <span className="f-logo">
              {String(items.length || 4).padStart(2, "0")} {t.catCount}
            </span>
            <Link href="/shop" className="cn-link">
              {t.viewAll}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="cn-cat-grid" style={{ ["--cols" as string]: cols }}>
          {!ready
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="cn-skel" />)
            : items.map((c, i) => {
                const name = locale === "ar" && c.name_ar ? c.name_ar : c.name;
                return (
                  <Link
                    key={c.id}
                    href={`/shop?category=${encodeURIComponent(c.name)}`}
                    className="cn-cat cn-rv"
                    aria-label={name}
                  >
                    <div className="cn-cat-media">
                      <span>
                        <SmartImage
                          src={c.image}
                          fallback={fallbackImages[i % fallbackImages.length]}
                          alt={name}
                          sizes="(max-width: 900px) 50vw, 25vw"
                        />
                      </span>
                    </div>
                    <span className="cn-cat-idx f-logo">{String(i + 1).padStart(2, "0")}</span>
                    <div className="cn-cat-foot">
                      <h3 className="cn-cat-name f-display">{name}</h3>
                      <span className="cn-cat-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

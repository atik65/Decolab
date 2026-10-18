"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetProducts } from "@/hooks/tanstack/useProducts";
import SmartImage from "./SmartImage";
import { useReveal } from "./useReveal";
import { copy, fallbackImages, Locale } from "./content";

const MAX = 8;

const Products = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const { data, isLoading } = useGetProducts();

  const all = data?.results ?? [];
  const items = all.slice(0, MAX);
  const ready = !isLoading;

  useReveal(root, [ready, items.length]);

  const rem = (4 - (items.length % 4)) % 4;
  const spanDesktop = rem === 0 ? 4 : rem;
  const spanMobile = items.length % 2 === 0 ? 2 : 1;

  return (
    <section ref={root} className="cn-section cn-paper cn-white" id="products">
      <div className="cn-wrap">
        <div className="cn-sec-head">
          <h2 className="cn-sec-title f-display cn-rv">
            <i className="cn-dot" />
            {t.prodTitle}
          </h2>
          <div className="cn-sec-meta cn-rv">
            <Link href="/shop" className="cn-link">
              {t.viewAll}
              {all.length > MAX ? ` (${all.length})` : ""}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="cn-prod-grid">
          {!ready
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="cn-skel" style={{ aspectRatio: "4 / 5.6" }} />
              ))
            : items.map((p, i) => {
                const title = locale === "ar" ? p.title_ar || p.title : p.title;
                const cat = p.category
                  ? locale === "ar"
                    ? p.category.name_ar || p.category.name
                    : p.category.name
                  : "";
                const isBase = p.pricing_type === "base";
                const price = isBase ? p.base_price : p.min_price;
                const showFrom = !isBase && p.min_price !== p.max_price;
                const fb = fallbackImages[i % fallbackImages.length];
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="cn-prod cn-rv"
                    aria-label={title}
                  >
                    {cat && <span className="cn-prod-tag">{cat}</span>}
                    <div className="cn-prod-media">
                      <div className="cn-p1">
                        <span>
                          <SmartImage
                            src={p.main_image}
                            fallback={fb}
                            alt={title}
                            sizes="(max-width: 1000px) 50vw, 25vw"
                          />
                        </span>
                      </div>
                      <div className="cn-p2" aria-hidden="true">
                        <span>
                          <SmartImage
                            src={p.hovered_image || p.main_image}
                            fallback={fallbackImages[(i + 1) % fallbackImages.length]}
                            alt=""
                            sizes="(max-width: 1000px) 50vw, 25vw"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="cn-prod-info">
                      <div>
                        <h3 className="cn-prod-title">{title}</h3>
                        <p className="cn-prod-price">
                          {showFrom && `${t.from} `}
                          <b lang="en">{price}</b> <span lang="en">{t.kd}</span>
                        </p>
                      </div>
                      <span className="cn-cat-arrow" aria-hidden="true">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </Link>
                );
              })}

          {ready && (
            <Link
              href="/shop"
              className="cn-prod-more cn-rv"
              style={
                {
                  ["--span" as string]: spanDesktop,
                  ["--span-m" as string]: spanMobile,
                } as React.CSSProperties
              }
            >
              <h3 className="f-display">{t.moreTitle}</h3>
              <span className="cn-cat-arrow">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;

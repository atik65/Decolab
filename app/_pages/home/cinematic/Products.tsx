"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetProducts } from "@/hooks/tanstack/useProducts";
import ProductTile from "./ProductTile";
import { useReveal } from "./useReveal";
import { copy, Locale } from "./content";

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
                <div
                  key={i}
                  className="cn-skel"
                  style={{ aspectRatio: "4 / 5.6" }}
                />
              ))
            : items.map((p, i) => (
                <ProductTile key={p.id} p={p} i={i} locale={locale} />
              ))}

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

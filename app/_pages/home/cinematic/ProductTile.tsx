"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Product } from "@/types/api/products";
import SmartImage from "./SmartImage";
import { copy, fallbackImages, Locale } from "./content";

const SIZES = "(max-width: 1000px) 50vw, 25vw";

/** One product in the hairline grid (shared by the home page and the shop). */
const ProductTile = ({
  p,
  i,
  locale,
}: {
  p: Product;
  i: number;
  locale: Locale;
}) => {
  const t = copy[locale];
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
      href={`/products/${p.id}`}
      className="cn-prod cn-rv"
      aria-label={title}
    >
      {cat && <span className="cn-prod-tag">{cat}</span>}
      <div className="cn-prod-media">
        <div className="cn-p1">
          <span>
            <SmartImage src={p.main_image} fallback={fb} alt={title} sizes={SIZES} />
          </span>
        </div>
        <div className="cn-p2" aria-hidden="true">
          <span>
            <SmartImage
              src={p.hovered_image || p.main_image}
              fallback={fallbackImages[(i + 1) % fallbackImages.length]}
              alt=""
              sizes={SIZES}
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
};

export default ProductTile;

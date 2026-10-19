"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "./pd.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useGetProductDetails, useGetProducts } from "@/hooks/tanstack/useProducts";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import ProductTile from "../../home/cinematic/ProductTile";
import Closing from "../../home/cinematic/Closing";
import { copy } from "../../home/cinematic/content";
import ShopPromises from "../../shop/cinematic/ShopPromises";
import ProductDescription from "../ProductDescription";
import { useProductForm } from "../useProductForm";
import ProductGallery from "./ProductGallery";
import ProductBuy from "./ProductBuy";
import { pdCopy } from "./pdContent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RELATED = 4;

const ProductCinematic = () => {
  const { slug } = useParams();
  const id = Array.isArray(slug) ? slug[0] : slug?.toString() || "";
  const locale = useGetLocale();
  const t = pdCopy[locale];
  useSmoothScroll();

  const { data, isLoading } = useGetProductDetails(id);
  const product = data?.[locale];
  const form = useProductForm(product, slug);

  const { data: list } = useGetProducts();
  const related = useMemo(() => {
    const all = (list?.results ?? []).filter((p) => String(p.id) !== id);
    const cat = product?.category;
    const same = cat ? all.filter((p) => p.category?.name === cat || p.category?.name_ar === cat) : [];
    const rest = all.filter((p) => !same.includes(p));
    return [...same, ...rest].slice(0, RELATED);
  }, [list, id, product?.category]);

  const images = useMemo(() => {
    if (!product) return [];
    const seen = new Set<string>();
    return [product.mainImage, product.hoveredImage, ...(product.images ?? [])].filter((s) => {
      if (!s || seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  }, [product]);

  const root = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const ready = Boolean(product);
  useReveal(root, [ready, related.length, id]);

  /* intro: title lines + panel rows rise in once the product is on screen */
  useGSAP(
    () => {
      if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const spans = root.current!.querySelectorAll(".cn-pd-buy .cn-line > span");
      const rows = root.current!.querySelectorAll(".cn-pd-in");
      gsap.set(spans, { yPercent: 115 });
      gsap.set(rows, { opacity: 0, y: 22 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(spans, { yPercent: 0, duration: 1.2 }, 0.35)
        .to(rows, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, 0.5);
    },
    { scope: root, dependencies: [ready, id], revertOnUpdate: true },
  );

  /* mobile order bar: shown while the real buttons are off-screen */
  const [bar, setBar] = useState(false);
  useEffect(() => {
    const el = actions.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top > 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);
  useEffect(() => {
    document.body.classList.toggle("cn-pd-bar-on", bar);
    return () => document.body.classList.remove("cn-pd-bar-on");
  }, [bar]);

  const moreSpan = (RELATED - (related.length % RELATED)) % RELATED;
  const priced = form.currentPrice !== null && form.currentPrice > 0;
  const orderNow = () => {
    form.submitType.current = "orderNow";
    form.handleSubmit();
  };

  return (
    <div ref={root} className="cine cn-pd" dir={locale === "ar" ? "rtl" : "ltr"}>
      {isLoading || (!product && !data) ? (
        <section className="cn-pd-main cn-section cn-paper cn-white" aria-busy="true">
          <div className="cn-wrap cn-pd-grid">
            <div className="cn-skel cn-pd-skel-stage" />
            <div className="cn-pd-skel">
              <i />
              <i style={{ width: "70%" }} />
              <i style={{ width: "40%" }} />
              <i style={{ height: 120 }} />
              <i style={{ height: 52 }} />
            </div>
          </div>
        </section>
      ) : !product ? (
        <section className="cn-pd-main cn-section cn-paper cn-white">
          <div className="cn-wrap">
            <div className="cn-shop-empty cn-pd-missing">
              <h1 className="f-display">{t.notFoundTitle}</h1>
              <p>{t.notFoundBody}</p>
              <Link href="/shop" className="cn-btn">
                {t.backToShop}
                <span className="cn-btn-ico">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="cn-pd-main cn-section cn-paper cn-white">
            <div className="cn-wrap cn-pd-grid">
              <ProductGallery key={id + locale} images={images} title={product.title} locale={locale} />
              <ProductBuy product={product} form={form} locale={locale} actionsRef={actions} />
            </div>
          </section>

          {product.description?.trim() && (
            <section className="cn-section cn-paper cn-pd-details">
              <div className="cn-wrap cn-pd-details-grid">
                <div className="cn-pd-details-head">
                  <span className="cn-kicker f-display cn-rv">
                    <i className="cn-dot" />
                    {t.detailsKicker}
                  </span>
                  <h2 className="f-display cn-rv">{t.detailsTitle}</h2>
                </div>
                <div className="cn-pd-desc cn-rv">
                  <ProductDescription description={product.description} />
                </div>
              </div>
            </section>
          )}

          <ShopPromises locale={locale} />

          {related.length > 0 && (
            <section className="cn-section cn-paper cn-white cn-pd-related">
              <div className="cn-wrap">
                <div className="cn-sec-head">
                  <h2 className="cn-sec-title f-display cn-rv">
                    <i className="cn-dot" />
                    {t.related}
                  </h2>
                  <div className="cn-sec-meta cn-rv">
                    <Link href="/shop" className="cn-link">
                      {t.viewAll}
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
                <div className="cn-prod-grid">
                  {related.map((p, i) => (
                    <ProductTile key={p.id} p={p} i={i} locale={locale} />
                  ))}
                  {moreSpan > 0 && (
                    <Link
                      href="/shop"
                      className="cn-prod-more cn-rv"
                      style={
                        {
                          ["--span" as string]: moreSpan,
                          ["--span-m" as string]: related.length % 2 === 0 ? 2 : 1,
                        } as React.CSSProperties
                      }
                    >
                      <h3 className="f-display">{copy[locale].moreTitle}</h3>
                      <span className="cn-cat-arrow">
                        <ArrowUpRight size={22} />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}

          <Closing locale={locale} />

          <div className="cn-pd-bar" data-on={bar} aria-hidden={!bar}>
            <div>
              <small>{t.price}</small>
              <b lang="en">{priced ? `${form.currentPrice!.toFixed(3)} KD` : "—"}</b>
            </div>
            <button type="button" className="cn-pd-btn cn-pd-btn-solid" onClick={orderNow} tabIndex={bar ? 0 : -1}>
              {t.orderNow}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCinematic;

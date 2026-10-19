"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, MessageCircle, Search, X } from "lucide-react";
import { useGetCategories, useGetProductNSearch } from "@/hooks/tanstack/useProducts";
import { CategoresResponse } from "@/app/_pages/home/HomeCategories";
import ProductTile from "../../home/cinematic/ProductTile";
import { useReveal } from "../../home/cinematic/useReveal";
import { Locale, WHATSAPP_URL } from "../../home/cinematic/content";
import { shopCopy } from "./shopContent";

type Sort = "recommended" | "newest" | "priceAsc" | "priceDesc";
type Cols = 3 | 4;

interface Props {
  locale: Locale;
  category: string;
  setCategory: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}

const SKELETONS = 8;

const priceOf = (p: { pricing_type: string; base_price: number | null; min_price: string }) =>
  Number(p.pricing_type === "base" ? p.base_price : p.min_price) || 0;

const ShopBrowser = ({ locale, category, setCategory, search, setSearch }: Props) => {
  const t = shopCopy[locale];
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const pillReady = useRef(false);

  const [sort, setSort] = useState<Sort>("recommended");
  const [cols, setCols] = useState<Cols>(4);
  const [q, setQ] = useState(search);

  const { data: catData } = useGetCategories<CategoresResponse>();
  const { data, isLoading, isError, refetch } = useGetProductNSearch({
    search,
    category: encodeURIComponent(category),
  });

  const cats = catData?.results ?? [];
  const raw = data?.results;
  const items = useMemo(() => {
    const list = [...(raw ?? [])];
    if (sort === "newest") list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    if (sort === "priceAsc") list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "priceDesc") list.sort((a, b) => priceOf(b) - priceOf(a));
    return list;
  }, [raw, sort]);
  const ready = !isLoading;

  useReveal(root, [ready, items.map((p) => p.id).join(","), cols]);

  /* search box: debounce into the URL, follow external changes (e.g. header search) */
  useEffect(() => {
    if (document.activeElement !== input.current) setQ(search);
  }, [search]);
  useEffect(() => {
    if (q === search) return;
    const id = window.setTimeout(() => setSearch(q), 350);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  /* sliding pill behind the active category chip */
  const placePill = useCallback((animate: boolean) => {
    const tr = track.current;
    const p = pill.current;
    const active = tr?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!tr || !p || !active) return;
    const vars = { x: active.offsetLeft, width: active.offsetWidth, opacity: 1 };
    if (animate && pillReady.current) {
      gsap.to(p, { ...vars, duration: 0.7, ease: "expo.out" });
      active.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    } else {
      gsap.set(p, vars);
    }
    pillReady.current = true;
  }, []);

  useLayoutEffect(() => {
    placePill(true);
  }, [category, cats.length, locale, placePill]);

  useEffect(() => {
    const tr = track.current;
    if (!tr || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => placePill(false));
    ro.observe(tr);
    Array.from(tr.children).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [cats.length, locale, placePill]);

  const decoded = category ? decodeURIComponent(category) : "";
  const catLabel = (() => {
    const c = cats.find((x) => x.name === decoded);
    return c ? (locale === "ar" ? c.name_ar || c.name : c.name) : decoded;
  })();
  const filtered = Boolean(search || decoded);
  const reset = () => {
    setQ("");
    setSearch("");
    setCategory("");
  };

  /* fill the last row with the custom-order tile (same trick as the home grid) */
  const rem = (cols - (items.length % cols)) % cols;
  const spanDesktop = rem === 0 ? cols : rem;
  const spanMobile = items.length % 2 === 0 ? 2 : 1;

  const count = data?.count ?? items.length;

  return (
    <section ref={root} className="cn-section cn-paper cn-white cn-shop-browser" id="collection">
      <div className="cn-wrap">
        <div className="cn-sec-head">
          <h2 className="cn-sec-title f-display cn-rv">
            <i className="cn-dot" />
            {t.sectionTitle}
          </h2>
          <div className="cn-sec-meta cn-rv" aria-live="polite">
            <span>
              <b lang="en">{ready ? count : "–"}</b> {count === 1 ? t.piece : t.pieces}
            </span>
          </div>
        </div>

        <div className="cn-shop-bar cn-rv">
          <div className="cn-shop-chips" role="group" aria-label={t.sectionTitle} ref={track}>
            <span ref={pill} className="cn-shop-pill" aria-hidden="true" />
            <button type="button" aria-pressed={!decoded} onClick={() => setCategory("")}>
              {t.all}
            </button>
            {cats.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={decoded === c.name}
                onClick={() => setCategory(c.name)}
              >
                {locale === "ar" ? c.name_ar || c.name : c.name}
              </button>
            ))}
          </div>

          <div className="cn-shop-tools">
            <label className="cn-shop-search">
              <Search size={16} aria-hidden="true" />
              <input
                ref={input}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.search}
                aria-label={t.search}
              />
              {q && (
                <button
                  type="button"
                  aria-label={t.clearSearch}
                  onClick={() => {
                    setQ("");
                    setSearch("");
                    input.current?.focus();
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </label>

            <label className="cn-shop-sort">
              <span>{t.sort}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                {(Object.keys(t.sortOptions) as Sort[]).map((k) => (
                  <option key={k} value={k}>
                    {t.sortOptions[k]}
                  </option>
                ))}
              </select>
            </label>

            <div className="cn-shop-cols" role="group" aria-label={t.columns}>
              {([3, 4] as Cols[]).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={cols === n}
                  aria-label={`${n} ${t.columns}`}
                  onClick={() => setCols(n)}
                >
                  {Array.from({ length: n }).map((_, i) => (
                    <i key={i} />
                  ))}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered && (
          <p className="cn-shop-status cn-rv">
            {decoded && (
              <span>
                {t.inCategory} <b>{catLabel}</b>
              </span>
            )}
            {search && (
              <span>
                {t.forQuery} <b>“{search}”</b>
              </span>
            )}
            <button type="button" className="cn-link" onClick={reset}>
              {t.reset}
            </button>
          </p>
        )}

        {isError ? (
          <div className="cn-shop-empty">
            <h3 className="f-display">{t.errorTitle}</h3>
            <p>{t.errorBody}</p>
            <button type="button" className="cn-btn" onClick={() => refetch()}>
              {t.retry}
              <span className="cn-btn-ico">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>
        ) : ready && items.length === 0 ? (
          <div className="cn-shop-empty">
            <h3 className="f-display">{t.emptyTitle}</h3>
            <p>{t.emptyBody}</p>
            <div className="cn-cta-row">
              {filtered && (
                <button type="button" className="cn-btn" onClick={reset}>
                  {t.reset}
                  <span className="cn-btn-ico">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              )}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cn-btn cn-btn-ghost"
              >
                {t.custom}
                <span className="cn-btn-ico">
                  <MessageCircle size={16} />
                </span>
              </a>
            </div>
          </div>
        ) : (
          <div className="cn-prod-grid" data-cols={cols}>
            {!ready
              ? Array.from({ length: SKELETONS }).map((_, i) => (
                  <div key={i} className="cn-skel" style={{ aspectRatio: "4 / 5.6" }} />
                ))
              : items.map((p, i) => <ProductTile key={p.id} p={p} i={i} locale={locale} />)}

            {ready && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cn-prod-more cn-rv"
                style={
                  {
                    ["--span" as string]: spanDesktop,
                    ["--span-m" as string]: spanMobile,
                  } as React.CSSProperties
                }
              >
                <h3 className="f-display">{t.customTitle}</h3>
                <span className="cn-cat-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopBrowser;

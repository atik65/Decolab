"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import SmartImage from "../../home/cinematic/SmartImage";
import { fallbackImages, Locale } from "../../home/cinematic/content";
import { pdCopy } from "./pdContent";

gsap.registerPlugin(useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

/** Image stage + thumbnails. Cross-fades with a slow settle; swipe, arrows and a lightbox. */
const ProductGallery = ({
  images,
  title,
  locale,
}: {
  images: string[];
  title: string;
  locale: Locale;
}) => {
  const t = pdCopy[locale];
  const rtl = locale === "ar";
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const swipe = useRef<number | null>(null);
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const n = images.length;

  const go = useCallback((to: number) => setIdx(((to % n) + n) % n), [n]);

  /* settle animation for the incoming photo; clip-reveal the stage on first paint */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const img = root.current?.querySelector(`.cn-pd-slide[data-i="${idx}"] .cn-pd-img`);
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (first.current) {
        first.current = false;
        tl.fromTo(
          ".cn-pd-stage",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut" },
          0,
        );
      }
      if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8 }, 0);
    },
    { scope: root, dependencies: [idx], revertOnUpdate: false },
  );

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(idx + (rtl ? -1 : 1));
      if (e.key === "ArrowLeft") go(idx + (rtl ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, idx, go, rtl]);

  const Prev = rtl ? ChevronRight : ChevronLeft;
  const Next = rtl ? ChevronLeft : ChevronRight;

  return (
    <div ref={root} className="cn-pd-gallery">
      <div
        className="cn-pd-stage"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(idx + (rtl ? -1 : 1));
          if (e.key === "ArrowLeft") go(idx + (rtl ? 1 : -1));
        }}
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
        }}
      >
        {images.map((src, i) => (
          <div key={src + i} className="cn-pd-slide" data-i={i} data-on={i === idx}>
            <div className="cn-pd-img">
              <SmartImage
                src={src}
                fallback={fallbackImages[i % fallbackImages.length]}
                alt={i === idx ? title : ""}
                sizes="(max-width: 1000px) 100vw, 52vw"
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        <span className="cn-pd-count f-logo" dir="ltr">
          {pad(idx + 1)} / {pad(n)}
        </span>

        <button type="button" className="cn-pd-zoom" aria-label={t.zoom} onClick={() => setZoom(true)}>
          <Maximize2 size={16} />
        </button>

        {n > 1 && (
          <>
            <button
              type="button"
              className="cn-pd-nav cn-pd-prev"
              aria-label={t.prev}
              onClick={() => go(idx - 1)}
            >
              <Prev size={20} />
            </button>
            <button
              type="button"
              className="cn-pd-nav cn-pd-next"
              aria-label={t.next}
              onClick={() => go(idx + 1)}
            >
              <Next size={20} />
            </button>
          </>
        )}
      </div>

      {n > 1 && (
        <div className="cn-pd-thumbs" role="tablist">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={`${pad(i + 1)}`}
              onClick={() => go(i)}
            >
              <span>
                <SmartImage
                  src={src}
                  fallback={fallbackImages[i % fallbackImages.length]}
                  alt=""
                  sizes="120px"
                />
              </span>
              <i />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div className="cn-pd-lightbox" role="dialog" aria-modal="true" onClick={() => setZoom(false)}>
          <button type="button" className="cn-pd-close" aria-label={t.close} onClick={() => setZoom(false)}>
            <X size={20} />
          </button>
          <div className="cn-pd-lightbox-img" onClick={(e) => e.stopPropagation()}>
            <SmartImage
              src={images[idx]}
              fallback={fallbackImages[idx % fallbackImages.length]}
              alt={title}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

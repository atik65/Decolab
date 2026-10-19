"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroSlides, Locale, WHATSAPP_URL } from "../../home/cinematic/content";
import { heroIndexFor, shopCopy } from "./shopContent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  locale: Locale;
  /** selected category name from the URL ("" = all) */
  category: string;
  onBrowse: () => void;
}

const ShopHero = ({ locale, category, onBrowse }: Props) => {
  const t = shopCopy[locale];
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const name = category ? decodeURIComponent(category) : "";
  const idx = heroIndexFor(name);
  const lines = name ? [name] : [...t.heroLines];
  const body = name ? t.categoryBody : t.heroBody;
  const titleKey = `${locale}:${name}`;

  /* intro + title swap when the category changes */
  useGSAP(
    () => {
      const el = stage.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        el.dataset.ready = "true";
        return;
      }
      const spans = el.querySelectorAll(".cn-line > span");
      const fades = el.querySelectorAll(".cn-shop-fade");
      const photo = el.querySelector(`.cn-shop-photo[data-i="${idx}"] .cn-shop-img`);

      gsap.set(spans, { yPercent: 115 });
      gsap.set(fades, { opacity: 0, y: 22 });
      el.dataset.ready = "true";

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (first.current) {
        first.current = false;
        gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
        tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut" }, 0);
      }
      if (photo) tl.fromTo(photo, { scale: 1.22 }, { scale: 1.04, duration: 2.2 }, 0);
      tl.to(spans, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.5).to(
        fades,
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 },
        0.8,
      );
    },
    { scope: wrap, dependencies: [titleKey, idx], revertOnUpdate: true },
  );

  /* scroll-out drift: desktop only (phones scroll the hero away natively) */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(".cn-shop-photos", { yPercent: 8, force3D: true }, 0)
          .to(".cn-shop-copy", { y: -40, opacity: 0, ease: "power1.out" }, 0)
          .to(".cn-shop-strip", { y: -28, opacity: 0, ease: "power1.out" }, 0);
      });
    },
    { scope: wrap },
  );

  /* the floating WhatsApp button would sit on the hero copy */
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top bottom",
      end: "bottom 55%",
      onToggle: (self) => document.body.classList.toggle("cn-hero-active", self.isActive),
    });
    document.body.classList.add("cn-hero-active");
    return () => {
      st.kill();
      document.body.classList.remove("cn-hero-active");
    };
  }, []);

  return (
    <section ref={wrap} className="cn-shop-hero" id="shop-top">
      <div ref={stage} className="cn-hero-stage cn-shop-stage" data-ready="false">
        <div className="cn-shop-photos">
          {heroSlides.map((s, i) => (
            <div key={s.src} className="cn-shop-photo" data-i={i} data-on={i === idx}>
              <div className="cn-shop-img">
                <Image
                  src={s.src}
                  alt=""
                  fill
                  priority={i === 0}
                  quality={80}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: s.position }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cn-hero-shade" />

        <div className="cn-hero-content cn-shop-copy">
          <span className="cn-kicker f-display cn-shop-fade">
            <i className="cn-dot" />
            {t.kicker}
          </span>
          <h1 className="f-display" aria-label={lines.join(" ")}>
            {lines.map((l) => (
              <span key={l} className="cn-line" aria-hidden="true">
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p className="cn-shop-fade">{body}</p>
          <div className="cn-hero-ctas cn-shop-fade">
            <button type="button" className="cn-btn" onClick={onBrowse}>
              {t.browse}
              <span className="cn-btn-ico">
                <ArrowDown size={16} />
              </span>
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-text-link">
              {t.custom}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <ul className="cn-shop-strip cn-shop-fade" aria-label={t.noteTitle}>
          {t.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopHero;

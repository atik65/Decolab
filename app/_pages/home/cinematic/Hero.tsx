"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { copy, heroSlides, Locale } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLIDE_MS = 6500;

const Hero = ({ locale, play }: { locale: Locale; play: boolean }) => {
  const t = copy[locale];
  const isRtl = locale === "ar";
  const wrap = useRef<HTMLElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const current = useRef(0);
  const zTop = useRef(1);
  const progress = useRef<gsap.core.Tween | null>(null);
  const started = useRef(false);
  const [active, setActive] = useState(0);

  /** swap to slide `next` (wipe) and (re)start its progress bar */
  const goTo = useCallback(
    (next: number, animate = true) => {
      const root = hero.current;
      if (!root) return;
      const slides = root.querySelectorAll<HTMLElement>(".cn-slide");
      const imgs = root.querySelectorAll<HTMLElement>(".cn-slide-img");
      const fills = root.querySelectorAll<HTMLElement>(".cn-seg b");
      const n = slides.length;
      next = (next + n) % n;

      if (animate && next !== current.current) {
        const el = slides[next];
        gsap.set(el, {
          zIndex: ++zTop.current,
          clipPath: isRtl ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        });
        gsap.to(el, { clipPath: "inset(0 0% 0 0%)", duration: 1.4, ease: "expo.inOut" });
        gsap.fromTo(
          imgs[next],
          { scale: 1.22, xPercent: isRtl ? -5 : 5 },
          { scale: 1.06, xPercent: 0, duration: 2, ease: "expo.out" },
        );
        gsap.to(imgs[next], { scale: 1, duration: SLIDE_MS / 1000 + 1, ease: "none", delay: 2 });
      }

      current.current = next;
      setActive(next);

      progress.current?.kill();
      fills.forEach((f, i) => gsap.set(f, { scaleX: i < next ? 1 : 0 }));
      progress.current = gsap.to(fills[next], {
        scaleX: 1,
        duration: SLIDE_MS / 1000,
        ease: "none",
        onComplete: () => goTo(next + 1),
      });
    },
    [isRtl],
  );

  useGSAP(
    () => {
      const el = hero.current!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = el.querySelectorAll<HTMLElement>(".cn-slide");
      slides.forEach((s, i) => {
        gsap.set(s, {
          zIndex: i === 0 ? 1 : 0,
          clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        });
      });
      if (reduce) return;

      /* start state: first photo is below the fold, copy is masked */
      gsap.set(slides[0], { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".cn-slide-img", { scale: 1.3 });
      gsap.set(".cn-line > span", { yPercent: 115 });
      gsap.set(".cn-hero-content p, .cn-hero-ctas, .cn-hero-meta", { opacity: 0, y: 24 });

      const tl = gsap.timeline({ paused: true });
      tl.to(slides[0], { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.inOut" }, 0)
        .to(el.querySelector(".cn-slide-img"), { scale: 1.06, duration: 2.4, ease: "expo.out" }, 0)
        .to(
          ".cn-line > span",
          { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.12 },
          1.05,
        )
        .to(
          ".cn-hero-content p, .cn-hero-ctas, .cn-hero-meta",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
          1.45,
        )
        .to(
          el.querySelector(".cn-slide-img"),
          { scale: 1, duration: SLIDE_MS / 1000, ease: "none" },
          2.4,
        )
        .add(() => {
          if (!started.current) {
            started.current = true;
            goTo(0, false);
          }
        }, 2.0);
      intro.current = tl;

      /* scroll: photo drifts, copy fades, next section rises over it */
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          })
          .to(".cn-slides", { yPercent: 10, scale: 1.08 }, 0)
          .to(".cn-hero-content", { y: -60, opacity: 0 }, 0)
          .to(".cn-hero-meta", { y: -40, opacity: 0 }, 0)
          .to(".cn-hero-dim", { opacity: 0.7 }, 0.15);
      });
    },
    { scope: wrap, dependencies: [locale], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    intro.current?.play();
  }, [play]);

  /* pause autoplay while the tab is hidden */
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) progress.current?.pause();
      else progress.current?.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      progress.current?.kill();
    };
  }, []);

  const slide = heroSlides[active];

  return (
    <section ref={wrap} className="cn-hero-wrap" id="top">
      <div ref={hero} className="cn-hero">
        <div className="cn-hero-stage">
        <div className="cn-slides">
          {heroSlides.map((s, i) => (
            <div key={s.src} className="cn-slide">
              <div className="cn-slide-img">
                <Image
                  src={s.src}
                  alt={s[locale]}
                  fill
                  priority={i === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: s.position }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cn-hero-shade" />

        <div className="cn-hero-content">
          <h1 className="f-display" aria-label={t.heroLines.join(" ")}>
            {t.heroLines.map((l) => (
              <span key={l} className="cn-line" aria-hidden="true">
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p>{t.heroBody}</p>
          <div className="cn-hero-ctas">
            <Link href="/shop" className="cn-btn">
              {t.shop}
              <span className="cn-btn-ico">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <a href="#work" className="cn-text-link">
              {t.ourWork}
            </a>
          </div>
        </div>

        <div className="cn-hero-meta">
          <div key={active} className="cn-meta-cap">
            <small className="f-display">
              {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </small>
            <Link href={`/shop?category=${encodeURIComponent(slide.category)}`}>
              {slide[locale]}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="cn-segs">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className="cn-seg"
                aria-label={s[locale]}
                aria-current={i === active}
                onClick={() => goTo(i)}
              >
                <i>
                  <b />
                </i>
              </button>
            ))}
          </div>
          <div className="cn-meta-note">
            <Check size={15} />
            {t.freeTitle}
          </div>
        </div>

        <div className="cn-hero-dim" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroSlides } from "../../home/cinematic/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface Step {
  label: string;
  state: "done" | "current" | "todo";
}

interface Props {
  kicker: string;
  lines: string[];
  body?: string;
  /** index into the home hero photos */
  photo?: number;
  tall?: boolean;
  /** no photo: a light, quiet header (used for the order confirmation) */
  plain?: boolean;
  tone?: "ok" | "bad";
  steps?: Step[];
  children?: ReactNode;
}

/** Dark photographic header used by checkout and its result pages (same language as the home hero). */
const PageStage = ({ kicker, lines, body, photo = 1, tall, plain, tone, steps, children }: Props) => {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const key = lines.join("|");
  const slide = heroSlides[photo % heroSlides.length];

  useGSAP(
    () => {
      const el = stage.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.dataset.ready = "true";
        return;
      }
      const spans = el.querySelectorAll(".cn-line > span");
      const fades = el.querySelectorAll(".cn-co-fade");
      const mark = el.querySelector(".cn-co-mark path, .cn-co-mark line");
      const marks = el.querySelectorAll(".cn-co-mark path");

      gsap.set(spans, { yPercent: 115 });
      gsap.set(fades, { opacity: 0, y: 22 });
      gsap.set(marks, { strokeDasharray: 1, strokeDashoffset: 1 });
      if (!plain) gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
      el.dataset.ready = "true";

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (!plain) {
        tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.inOut" }, 0).fromTo(
          el.querySelector(".cn-co-img"),
          { scale: 1.2 },
          { scale: 1.04, duration: 2.2 },
          0,
        );
      }
      tl.to(spans, { yPercent: 0, duration: 1.2, stagger: 0.12 }, plain ? 0.15 : 0.5)
        .to(fades, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 }, plain ? 0.4 : 0.75);
      if (mark) {
        tl.to(marks, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", stagger: 0.18 }, 1.1);
      }
    },
    { scope: wrap, dependencies: [key, plain], revertOnUpdate: true },
  );

  /* the floating WhatsApp button would sit on the hero copy */
  useEffect(() => {
    if (plain) return;
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
  }, [plain]);

  return (
    <section ref={wrap} className={plain ? "cn-co-hero cn-co-hero--plain" : "cn-co-hero"}>
      <div
        ref={stage}
        className={plain ? "cn-co-plain" : "cn-hero-stage cn-co-stage"}
        data-ready="false"
        data-tall={tall ? "true" : "false"}
        data-tone={tone}
        data-steps={steps ? "true" : "false"}
      >
        {!plain && (
          <>
        <div className="cn-co-img">
          <Image
            src={slide.src}
            alt=""
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.position }}
          />
        </div>
        <div className="cn-hero-shade" />
          </>
        )}

        <div className={plain ? "cn-co-copy" : "cn-hero-content cn-co-copy"}>
          {tone && (
            <span className="cn-co-mark cn-co-fade" data-tone={tone} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {tone === "ok" ? (
                  <path d="M5.5 12.5l4.2 4.2L18.5 7.5" pathLength="1" />
                ) : (
                  <>
                    <path d="M7 7l10 10" pathLength="1" />
                    <path d="M17 7L7 17" pathLength="1" />
                  </>
                )}
              </svg>
            </span>
          )}
          <span className="cn-kicker f-display cn-co-fade">
            <i className="cn-dot" />
            {kicker}
          </span>
          <h1 className="f-display" aria-label={lines.join(" ")}>
            {lines.map((l) => (
              <span key={l} className="cn-line" aria-hidden="true">
                <span>{l}</span>
              </span>
            ))}
          </h1>
          {body && <p className="cn-co-fade">{body}</p>}
          {children && <div className="cn-hero-ctas cn-co-fade">{children}</div>}
        </div>

        {steps && (
          <ol className="cn-co-steps cn-co-fade">
            {steps.map((s, i) => (
              <li key={s.label} data-state={s.state} aria-current={s.state === "current" ? "step" : undefined}>
                <small className="f-logo" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </small>
                {s.label}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default PageStage;

"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Locale } from "../../home/cinematic/content";
import { useReveal } from "../../home/cinematic/useReveal";
import { abCopy } from "./aboutContent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** "plain *glow* words" → [{w:"plain"},{w:"glow",hl:true}] (same helper the home statement uses) */
function parse(text: string) {
  const out: { w: string; hl: boolean }[] = [];
  let hl = false;
  text.split(/(\*)/).forEach((chunk) => {
    if (chunk === "*") {
      hl = !hl;
      return;
    }
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, hl }));
  });
  return out;
}

/** Big scroll-lit statement, the two story paragraphs and a photograph. */
const AboutStory = ({ locale }: { locale: Locale }) => {
  const t = abCopy[locale];
  const root = useRef<HTMLElement>(null);
  const words = parse(t.statement);

  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".cn-w", {
          opacity: 1,
          ease: "none",
          stagger: 0.14,
          scrollTrigger: { trigger: ".cn-st-text", start: "top 82%", end: "bottom 48%", scrub: true },
        });
        gsap.fromTo(
          ".cn-ab-photo",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ".cn-ab-photo", start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          ".cn-ab-photo-img",
          { scale: 1.25 },
          {
            scale: 1,
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: { trigger: ".cn-ab-photo", start: "top 85%", once: true },
          },
        );
      });
      /* parallax drift only where scrolling is cheap */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".cn-ab-photo-img",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: ".cn-ab-photo", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".cn-w", { opacity: 1 });
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="cn-statement cn-white cn-ab-story" id="story">
      <div className="cn-wrap cn-ab-story-grid">
        <div className="cn-ab-story-copy">
          <span className="cn-kicker f-display cn-rv">
            <i className="cn-dot" />
            {t.storyKicker}
          </span>

          <h2 className="cn-st-text f-display" aria-label={t.statement.replace(/\*/g, "")}>
            {words.map((x, i) => (
              <span key={i} className={`cn-w${x.hl ? " hl" : ""}`} aria-hidden="true">
                {x.w + (i < words.length - 1 ? " " : "")}
              </span>
            ))}
          </h2>

          <div className="cn-ab-story-text">
            <p className="cn-st-body cn-rv">{t.p2}</p>
            <p className="cn-st-body cn-rv">{t.p3}</p>
          </div>
        </div>

        <div className="cn-ab-photo">
          <div className="cn-ab-photo-img">
            <Image
              src="/images/home/banner13.jpg"
              alt={t.photoAlt}
              fill
              quality={80}
              sizes="(max-width: 960px) 100vw, 40vw"
              className="object-cover"
              style={{ objectPosition: "50% 38%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { copy, Locale } from "./content";
import { useReveal } from "./useReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** "plain *glow* words" → [{w:"plain"},{w:"glow",hl:true}] */
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

const Statement = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
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
          scrollTrigger: {
            trigger: ".cn-st-text",
            start: "top 82%",
            end: "bottom 48%",
            scrub: true,
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".cn-w", { opacity: 1 });
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="cn-statement cn-white" id="about">
      <div className="cn-wrap">
        <div className="cn-st-top cn-rv">
          <span className="cn-kicker f-display">
            <i className="cn-dot" />
            {t.statementKicker}
          </span>
          <Link href="/about" className="cn-link" style={{ fontSize: 13 }}>
            {t.aboutCta}
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <h2 className="cn-st-text f-display" aria-label={t.statement.replace(/\*/g, "")}>
          {words.map((x, i) => (
            <span key={i} className={`cn-w${x.hl ? " hl" : ""}`} aria-hidden="true">
              {x.w + (i < words.length - 1 ? " " : "")}
            </span>
          ))}
        </h2>

        <div className="cn-st-grid">
          <p className="cn-st-body cn-rv">{t.statementBody}</p>

          <ul className="cn-services cn-rv">
            {t.services.map((s, i) => (
              <li key={s}>
                <small className="f-logo">{String(i + 1).padStart(2, "0")}</small>
                <span>{s}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default Statement;

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Locale } from "../../home/cinematic/content";
import { abCopy } from "./aboutContent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Dark band with four numbers that count up when it scrolls into view. */
const AboutStats = ({ locale }: { locale: Locale }) => {
  const t = abCopy[locale];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>(".cn-ab-num");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      nums.forEach((el, i) => {
        const target = t.stats[i].n;
        if (reduce) {
          el.textContent = String(target);
          return;
        }
        const o = { v: 0 };
        el.textContent = "0";
        gsap.to(o, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = String(Math.round(o.v));
          },
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
      if (!reduce) {
        gsap.from(".cn-ab-stat", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
      }
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="cn-section cn-white cn-ab-stats-sec">
      <div className="cn-ab-stats">
        <ul>
          {t.stats.map((s) => (
            <li key={s.label} className="cn-ab-stat">
              <b className="f-display" lang="en">
                <span className="cn-ab-num">{s.n}</span>
                {s.plus && <i>+</i>}
              </b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutStats;

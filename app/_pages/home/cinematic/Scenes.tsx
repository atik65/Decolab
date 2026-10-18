"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { copy, Locale, scenes, WHATSAPP_URL } from "./content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

const Scenes = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const count = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [isStatic, setStatic] = useState(false);

  useEffect(() => {
    setStatic(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>(".cn-scene");
        const n = els.length;
        els.forEach((el, i) => {
          gsap.set(el, { zIndex: i + 1 });
          if (i > 0) gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        });

        let last = -1;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * n * 0.9}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
              if (idx !== last && count.current) {
                last = idx;
                count.current.textContent = pad(idx + 1);
              }
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        /* continuous drift inside every photo */
        tl.fromTo(".cn-ph > span", { yPercent: -5 }, { yPercent: 5, duration: n - 1 }, 0);

        els.forEach((el, i) => {
          if (i === 0) return;
          const at = i - 1;
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" },
            at,
          )
            .fromTo(
              el.querySelectorAll(".cn-ph"),
              { y: 140 },
              { y: 0, duration: 1, ease: "power2.out", stagger: 0.08 },
              at,
            )
            .fromTo(
              el.querySelectorAll(".cn-scene-text > *"),
              { y: 46, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.07 },
              at + 0.45,
            )
            .to(els[i - 1].querySelector(".cn-scene-shade"), { opacity: 0.75, duration: 1 }, at)
            .to(
              els[i - 1].querySelector(".cn-scene-text"),
              { y: -40, opacity: 0, duration: 0.5 },
              at,
            );
        });
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      className={`cn-scenes${isStatic ? " is-static" : ""}`}
      id="work"
    >
      <div className="cn-scenes-frame">
        <div className="cn-stage">
          {scenes.map((s, i) => {
            const c = s[locale];
            return (
              <div key={i} className="cn-scene">
                <div className="cn-scene-bg" aria-hidden="true">
                  <Image src={s.photos[0]} alt="" fill sizes="50vw" className="object-cover" />
                </div>
                <div className="cn-scene-photos">
                  {s.photos.map((p) => (
                    <div key={p} className="cn-ph">
                      <span>
                        <Image
                          src={p}
                          alt={c.title}
                          fill
                          sizes="(max-width: 860px) 40vw, 22vw"
                          className="object-cover"
                        />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="cn-scene-text">
                  <span className="cn-kicker f-display">{c.kicker}</span>
                  <h3 className="f-display">{c.title}</h3>
                  <p>{c.body}</p>
                </div>

                <div className="cn-glass cn-glass-card">
                  <div className="cn-glass-row">
                    <span className="cn-glass-ico">
                      <Phone size={16} />
                    </span>
                    <span className="cn-tag">{c.tag}</span>
                  </div>
                  <p>{t.scenesGlassTitle}</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cn-link"
                  >
                    {t.scenesGlassCta}
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <div
                  className="cn-scene-shade"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 7,
                    background: "#f7f5f0",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}

          <div className="cn-ghost f-logo" aria-hidden="true" style={{ zIndex: 20 }}>
            DECOLAB
          </div>
          <div className="cn-counter f-logo" style={{ zIndex: 20 }}>
            <span>
              <b ref={count}>01</b> / {pad(scenes.length)}
            </span>
            <span className="cn-counter-bar">
              <i ref={bar} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scenes;

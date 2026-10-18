"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { copy, Locale, WHATSAPP_URL } from "./content";
import { scenes } from "./sceneData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

const Scenes = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const [isStatic, setStatic] = useState(false);

  useEffect(() => {
    setStatic(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>(".cn-scene");
        const items = gsap.utils.toArray<HTMLElement>(".cn-index li");
        const fills = gsap.utils.toArray<HTMLElement>(".cn-index li b");
        const n = els.length;
        const STEP = 1.5; // timeline units per scene
        const total = STEP * (n - 1) + 0.6;

        els.forEach((el, i) => {
          gsap.set(el, { zIndex: i + 1, autoAlpha: i === 0 ? 1 : 0 });
        });

        let last = -1;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * total * 0.6}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(n - 1, Math.floor(self.progress * n));
              if (idx !== last) {
                last = idx;
                items.forEach((li, k) => li.classList.toggle("on", k === idx));
              }
              fills.forEach((f, k) => {
                f.style.transform = `scaleX(${clamp(self.progress * n - k)})`;
              });
            },
          },
        });
        tl.set({}, {}, total); // fixes the timeline length

        els.forEach((el, i) => {
          if (i === 0) return;
          const at = STEP * (i - 1) + 0.5;
          const prev = els[i - 1];

          tl.to(
            prev.querySelectorAll(".cn-scene-text > *"),
            { y: -22, autoAlpha: 0, duration: 0.5, ease: "power2.in", stagger: 0.04 },
            at,
          )
            .to(prev.querySelectorAll(".cn-ph"), { y: -36, duration: 1, ease: "power2.inOut" }, at)
            .to(el, { autoAlpha: 1, duration: 0.8, ease: "power2.inOut" }, at + 0.1)
            .set(prev, { autoAlpha: 0 }, at + 0.95)
            .fromTo(
              el.querySelectorAll(".cn-ph"),
              { y: 70 },
              { y: 0, duration: 1, ease: "power3.out", stagger: 0.08 },
              at + 0.1,
            )
            .fromTo(
              el.querySelectorAll(".cn-scene-text > *"),
              { y: 26, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out", stagger: 0.06 },
              at + 0.45,
            );
        });
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} className={`cn-scenes${isStatic ? " is-static" : ""}`} id="work">
      <div className="cn-scenes-frame">
        <div className="cn-stage">
          {scenes.map((s, i) => {
            const c = s[locale];
            return (
              <div key={i} className="cn-scene">
                <div className="cn-scene-text">
                  <span className="cn-kicker f-display">
                    {pad(i + 1)} — {c.tag}
                  </span>
                  <h3 className="f-display">{c.title}</h3>
                  <p>{c.body}</p>
                  <ul className="cn-specs">
                    {c.specs.map((x) => (
                      <li key={x}>
                        <Check size={16} />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="cn-scene-cta">
                    <Link
                      href={`/shop?category=${encodeURIComponent(s.category)}`}
                      className="cn-btn"
                    >
                      {t.viewCollection}
                      <span className="cn-btn-ico">
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cn-text-link"
                    >
                      {t.scenesGlassCta}
                    </a>
                  </div>
                </div>

                <div className="cn-scene-photos">
                  {s.photos.map((p) => (
                    <div key={p} className="cn-ph">
                      <span>
                        <Image
                          src={p}
                          alt={c.title}
                          fill
                          quality={85}
                          sizes="(max-width: 860px) 40vw, 24vw"
                          className="object-cover"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <ul className="cn-index" aria-hidden="true">
            {scenes.map((s, i) => (
              <li key={i} className={i === 0 ? "on" : undefined}>
                <i>
                  <b />
                </i>
                <span>
                  {pad(i + 1)} {s[locale].tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Scenes;

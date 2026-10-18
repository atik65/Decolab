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
        const n = els.length;
        const kids = (el: HTMLElement) => ({
          text: el.querySelectorAll(".cn-scene-text > *"),
          photos: el.querySelectorAll(".cn-ph"),
        });

        let current = 0;
        let z = 1;
        gsap.set(els, { autoAlpha: 0 });
        gsap.set(els[0], { autoAlpha: 1, zIndex: z });

        const markIndex = (idx: number) =>
          items.forEach((li, k) => {
            li.classList.toggle("on", k === idx);
            li.classList.toggle("done", k < idx);
          });
        markIndex(0);

        /** time-based swap with a small spring; independent of scroll speed */
        const show = (next: number) => {
          if (next === current) return;
          const dir = next > current ? 1 : -1;
          const out = els[current];
          const inc = els[next];
          const o = kids(out);
          const i = kids(inc);
          current = next;
          markIndex(next);

          gsap.to(o.text, {
            y: -26 * dir,
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.in",
            stagger: 0.03,
            overwrite: true,
          });
          gsap.to(o.photos, {
            y: -60 * dir,
            duration: 0.5,
            ease: "power2.in",
            overwrite: true,
          });
          gsap.to(out, { autoAlpha: 0, duration: 0.4, delay: 0.25, ease: "power1.inOut", overwrite: true });

          gsap.set(inc, { zIndex: ++z });
          gsap.to(inc, { autoAlpha: 1, duration: 0.45, ease: "power1.out", overwrite: true });
          gsap.fromTo(
            i.photos,
            { y: 110 * dir, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.15,
              ease: "back.out(1.5)",
              stagger: 0.09,
              delay: 0.12,
              overwrite: true,
            },
          );
          gsap.fromTo(
            i.text,
            { y: 34 * dir, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "back.out(1.3)",
              stagger: 0.06,
              delay: 0.2,
              overwrite: true,
            },
          );
        };

        const snaps = Array.from({ length: n }, (_, k) => k / (n - 1));

        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 1) * 0.85}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          /* settle on the nearest slide as soon as scrolling pauses */
          snap: {
            snapTo: snaps,
            duration: { min: 0.3, max: 0.7 },
            delay: 0.06,
            ease: "power3.out",
          },
          onUpdate: (self) => show(Math.round(self.progress * (n - 1))),
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
                      <span className="cn-ph-bg" aria-hidden="true">
                        <Image src={p} alt="" fill sizes="40vw" className="object-cover" />
                      </span>
                      <span className="cn-ph-main">
                        <Image
                          src={p}
                          alt={c.title}
                          fill
                          quality={85}
                          sizes="(max-width: 860px) 100vw, 24vw"
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

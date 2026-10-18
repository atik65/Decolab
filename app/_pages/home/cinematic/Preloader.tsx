"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export const INTRO_KEY = "decolab-intro-seen";

const Preloader = ({ onStart }: { onStart: () => void }) => {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      el.dataset.done = "true";
      onStart();
      return;
    }

    gsap.set(logo.current, { opacity: 0, y: 12 });
    const tl = gsap.timeline({
      onComplete: () => {
        el.dataset.done = "true";
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}
      },
    });

    tl.to(logo.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1)
      .to(bar.current, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.2)
      .to(inner.current, { opacity: 0, y: -16, duration: 0.45, ease: "power2.in" }, ">0.1")
      .to(
        el,
        { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut", onStart },
        ">-0.1",
      );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="cn-pre" aria-hidden="true">
      <div ref={inner} className="cn-pre-inner">
        <Image
          ref={logo}
          src="/decolab/black-logo-large.png"
          alt=""
          width={400}
          height={105}
          priority
          className="cn-pre-logo"
        />
        <div className="cn-pre-line">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

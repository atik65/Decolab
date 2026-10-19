"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling wired into ScrollTrigger (cinematic pages only).
 * Returns a ref to the instance so callers can stop/start/scrollTo.
 */
export function useSmoothScroll() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* lerp feels continuous; a fixed-duration expo ease creeps then lurches per wheel tick */
    const l = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    lenis.current = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* let Radix sheets / dialogs lock the page */
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) l.stop();
      else l.start();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  return lenis;
}

"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Fades/slides every `.cn-rv` inside `scope` in as it enters the viewport. */
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch(".cn-rv", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            }),
        });
      });
      /* the grids above/below pins change height once data arrives */
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(raf);
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}

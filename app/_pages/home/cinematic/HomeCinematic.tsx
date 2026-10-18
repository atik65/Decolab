"use client";

import "./cinematic.css";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGetLocale } from "@/hooks/useGetLocale";
import Preloader from "./Preloader";
import Hero from "./Hero";
import Statement from "./Statement";
import CategoryGrid from "./CategoryGrid";
import Scenes from "./Scenes";
import Products from "./Products";
import Closing from "./Closing";

gsap.registerPlugin(ScrollTrigger);

const HomeCinematic = () => {
  const locale = useGetLocale();
  const [intro, setIntro] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const onStart = useCallback(() => setIntro(true), []);

  /* smooth scrolling, wired into ScrollTrigger; home page only */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let tick: ((time: number) => void) | undefined;
    let observer: MutationObserver | undefined;

    if (!reduce) {
      const l = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.current = l;
      l.on("scroll", ScrollTrigger.update);
      tick = (time) => l.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      /* let Radix sheets / dialogs lock the page */
      observer = new MutationObserver(() => {
        if (document.body.hasAttribute("data-scroll-locked")) l.stop();
        else l.start();
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["data-scroll-locked"],
      });
    }

    return () => {
      observer?.disconnect();
      if (tick) gsap.ticker.remove(tick);
      lenis.current?.destroy();
      lenis.current = null;
      history.scrollRestoration = prevRestoration;
      document.documentElement.style.overflow = "";
    };
  }, []);

  /* freeze scroll behind the preloader */
  useEffect(() => {
    const html = document.documentElement;
    if (!intro) {
      html.style.overflow = "hidden";
      lenis.current?.stop();
      return;
    }
    html.style.overflow = "";
    lenis.current?.start();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => window.clearTimeout(id);
  }, [intro]);

  /* hide the global floating buttons while the hero owns the screen */
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom 55%",
      onToggle: (self) => document.body.classList.toggle("cn-hero-active", self.isActive),
    });
    document.body.classList.add("cn-hero-active");
    return () => {
      st.kill();
      document.body.classList.remove("cn-hero-active");
    };
  }, []);

  /* images / fonts settling shifts layout; keep pins accurate */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="cine" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Preloader onStart={onStart} />
      <Hero locale={locale} play={intro} />
      <Statement locale={locale} />
      <CategoryGrid locale={locale} />
      <Scenes locale={locale} />
      <Products locale={locale} />
      <Closing locale={locale} />
    </div>
  );
};

export default HomeCinematic;

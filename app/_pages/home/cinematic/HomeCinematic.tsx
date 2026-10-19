"use client";

import "./cinematic.css";
import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "./useSmoothScroll";
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
  const onStart = useCallback(() => setIntro(true), []);

  /* smooth scrolling, wired into ScrollTrigger */
  const lenis = useSmoothScroll();

  /* always open at the top */
  useEffect(() => {
    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
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
  }, [intro, lenis]);

  /* hide the global floating buttons while the hero owns the screen */
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom 55%",
      onToggle: (self) =>
        document.body.classList.toggle("cn-hero-active", self.isActive),
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

"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../checkout/cinematic/checkout.css";
import "./about.css";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { WHATSAPP_URL } from "../../home/cinematic/content";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import Products from "../../home/cinematic/Products";
import Closing from "../../home/cinematic/Closing";
import PageStage from "../../checkout/cinematic/PageStage";
import { abCopy } from "./aboutContent";
import AboutStory from "./AboutStory";
import AboutStats from "./AboutStats";
import AboutPrinciples from "./AboutPrinciples";
import AboutExpertise from "./AboutExpertise";

/** Cinematic About: same visual language as the home page, built mostly from shared sections. */
const AboutCinematic = () => {
  const locale = useGetLocale();
  const t = abCopy[locale];
  useSmoothScroll();

  return (
    <div className="cine cn-ab" dir={locale === "ar" ? "rtl" : "ltr"}>
      <PageStage tall photo={2} kicker={t.kicker} lines={[...t.heroLines]} body={t.heroBody}>
        <Link href="/shop" className="cn-btn">
          {t.shop}
          <span className="cn-btn-ico">
            <ArrowUpRight size={16} />
          </span>
        </Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-text-link">
          {t.talk}
          <ArrowUpRight size={15} />
        </a>
      </PageStage>

      <AboutStory locale={locale} />
      <AboutStats locale={locale} />
      <AboutPrinciples locale={locale} />
      <AboutExpertise locale={locale} />
      <Products locale={locale} />
      <Closing locale={locale} />
    </div>
  );
};

export default AboutCinematic;

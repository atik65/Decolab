"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../checkout/cinematic/checkout.css";
import "./warranty.css";
import { useRef } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import PageStage from "../../checkout/cinematic/PageStage";
import { wpCopy } from "./warrantyContent";

/** Warranty Policy: an informative page — the hero, then the terms as a plain numbered list. */
const WarrantyCinematic = () => {
  const locale = useGetLocale();
  const t = wpCopy[locale];
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();
  useReveal(root);

  return (
    <div
      ref={root}
      className="cine cn-wp"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <PageStage plain kicker={t.kicker} lines={[...t.lines]} body={t.body} />

      <section className="cn-section cn-paper cn-white cn-wp-terms">
        <div className="cn-wrap">
          <ol className="cn-wp-list">
            {t.terms.map((x, i) => (
              <li key={x.t} className="cn-rv">
                <small className="f-logo" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </small>
                <h3 className="f-display">{x.t}</h3>
                <p>{x.b}</p>
              </li>
            ))}
            {/* <li className="cn-rv cn-wp-note">
              <small className="f-display">{t.noteKicker}</small>
              <h3 className="f-display">{t.noteTitle}</h3>
              <p>{t.noteBody}</p>
            </li> */}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default WarrantyCinematic;

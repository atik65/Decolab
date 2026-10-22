"use client";

import "../home/cinematic/cinematic.css";
import "../shop/cinematic/shop.css";
import "../checkout/cinematic/checkout.css";
import "./info.css";
import { useRef } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "../home/cinematic/useSmoothScroll";
import { useReveal } from "../home/cinematic/useReveal";
import PageStage from "../checkout/cinematic/PageStage";

interface Item {
  readonly t: string;
  readonly b: string;
}

export interface InfoCopy {
  readonly kicker: string;
  readonly lines: readonly string[];
  readonly body: string;
  readonly items: readonly Item[];
  /** optional closing row, styled with an accent label */
  readonly note?: { readonly label: string; readonly t: string; readonly b: string };
}

/** Plain informative page (warranty, support, care guide, FAQ): quiet header + numbered list. */
const InfoPage = ({ copy }: { copy: { en: InfoCopy; ar: InfoCopy } }) => {
  const locale = useGetLocale();
  const t = copy[locale];
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();
  useReveal(root);

  return (
    <div ref={root} className="cine cn-ip" dir={locale === "ar" ? "rtl" : "ltr"}>
      <PageStage plain kicker={t.kicker} lines={[...t.lines]} body={t.body} />

      <section className="cn-section cn-paper cn-white cn-ip-terms">
        <div className="cn-wrap">
          <ol className="cn-ip-list">
            {t.items.map((x, i) => (
              <li key={x.t} className="cn-rv">
                <small className="f-logo" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </small>
                <h3 className="f-display">{x.t}</h3>
                <p>{x.b}</p>
              </li>
            ))}
            {t.note && (
              <li className="cn-rv cn-ip-note">
                <small className="f-display">{t.note.label}</small>
                <h3 className="f-display">{t.note.t}</h3>
                <p>{t.note.b}</p>
              </li>
            )}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;

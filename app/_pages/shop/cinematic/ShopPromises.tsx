"use client";

import { useRef } from "react";
import { useReveal } from "../../home/cinematic/useReveal";
import { Locale } from "../../home/cinematic/content";
import { shopCopy } from "./shopContent";

/** Four business promises in a hairline grid; reused by the product page. */
const ShopPromises = ({ locale }: { locale: Locale }) => {
  const t = shopCopy[locale];
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="cn-section cn-paper cn-shop-promises">
      <div className="cn-wrap">
        <div className="cn-shop-pr-head">
          <span className="cn-kicker f-display cn-rv">
            <i className="cn-dot" />
            {t.promisesKicker}
          </span>
          <h2 className="f-display cn-rv">{t.promisesTitle}</h2>
        </div>

        <ul className="cn-shop-pr-grid cn-rv">
          {t.promises.map((p, i) => (
            <li key={p.t}>
              <small className="f-logo">{String(i + 1).padStart(2, "0")}</small>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopPromises;

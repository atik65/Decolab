"use client";

import { useRef } from "react";
import { Locale } from "../../home/cinematic/content";
import { useReveal } from "../../home/cinematic/useReveal";
import { abCopy } from "./aboutContent";

/** Mission & vision, then the six values in a hairline grid. */
const AboutPrinciples = ({ locale }: { locale: Locale }) => {
  const t = abCopy[locale];
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="cn-section cn-paper cn-ab-principles">
      <div className="cn-wrap">
        <div className="cn-ab-mv">
          {[
            { label: t.missionLabel, text: t.mission, n: "01" },
            { label: t.visionLabel, text: t.vision, n: "02" },
          ].map((x) => (
            <article key={x.n} className="cn-rv">
              <span className="cn-kicker f-display">
                <small className="f-logo" dir="ltr">
                  {x.n}
                </small>
                {x.label}
              </span>
              <p className="f-display">{x.text}</p>
            </article>
          ))}
        </div>

        <div className="cn-sec-head cn-ab-values-head">
          <h2 className="cn-sec-title f-display cn-rv">
            <i className="cn-dot" />
            {t.valuesTitle}
          </h2>
        </div>

        <ul className="cn-ab-grid">
          {t.values.map((v, i) => (
            <li key={v.t} className="cn-rv">
              <small className="f-logo" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </small>
              <h3>{v.t}</h3>
              <p>{v.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPrinciples;

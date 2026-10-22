"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { copy, Locale } from "./content";
import { useReveal } from "./useReveal";

/** "plain *glow* words" → [{w:"plain"},{w:"glow",hl:true}] */
function parse(text: string) {
  const out: { w: string; hl: boolean }[] = [];
  let hl = false;
  let prevStar = false;
  text.split(/(\*)/).forEach((chunk) => {
    if (chunk === "*") {
      hl = !hl;
      prevStar = true;
      return;
    }
    const afterStar = prevStar;
    prevStar = false;
    const parts = chunk.split(/\s+/).filter(Boolean);
    // punctuation right after a closing "*" belongs to the previous word
    if (
      parts.length &&
      out.length &&
      /^[^\s]/.test(chunk) &&
      afterStar &&
      !hl
    ) {
      out[out.length - 1].w += parts.shift()!;
    }
    parts.forEach((w) => out.push({ w, hl }));
  });
  return out;
}

const Statement = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const words = parse(t.statement);

  useReveal(root);

  return (
    <section ref={root} className="cn-statement cn-white" id="about">
      <div className="cn-wrap">
        <div className="cn-st-top cn-rv">
          <span className="cn-kicker f-display">
            <i className="cn-dot" />
            {t.statementKicker}
          </span>
          <Link href="/about" className="cn-link" style={{ fontSize: 13 }}>
            {t.aboutCta}
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <h2
          className="cn-st-text f-display"
          aria-label={t.statement.replace(/\*/g, "")}
        >
          {words.map((x, i) => (
            <span
              key={i}
              className={`cn-w${x.hl ? " hl" : ""}`}
              aria-hidden="true"
            >
              {x.w + (i < words.length - 1 ? " " : "")}
            </span>
          ))}
        </h2>

        <div className="cn-st-grid">
          <p className="cn-st-body cn-rv">{t.statementBody}</p>

          {/* <ul className="cn-services cn-rv">
            {t.services.map((s, i) => (
              <li key={s}>
                <small className="f-logo">
                  {String(i + 1).padStart(2, "0")}
                </small>
                <span>{s}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </section>
  );
};

export default Statement;

"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Locale, WHATSAPP_URL } from "../../home/cinematic/content";
import { useReveal } from "../../home/cinematic/useReveal";
import { abCopy } from "./aboutContent";

/** What Decolab makes — every row leads to the shop or to a WhatsApp chat. */
const AboutExpertise = ({ locale }: { locale: Locale }) => {
  const t = abCopy[locale];
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="cn-section cn-paper cn-white cn-ab-expertise">
      <div className="cn-wrap">
        <div className="cn-sec-head">
          <h2 className="cn-sec-title f-display cn-rv">
            <i className="cn-dot" />
            {t.expertiseTitle}
          </h2>
          <div className="cn-sec-meta cn-rv">
            <span>{t.expertiseMeta}</span>
          </div>
        </div>

        <ul className="cn-ab-rows">
          {t.expertise.map((e, i) => {
            const inner = (
              <>
                <small className="f-logo" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </small>
                <h3 className="f-display">{e.t}</h3>
                <p>{e.b}</p>
                <span className="cn-cat-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </>
            );
            return (
              <li key={e.t} className="cn-rv">
                {e.href === "wa" ? (
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link href={e.href}>{inner}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AboutExpertise;

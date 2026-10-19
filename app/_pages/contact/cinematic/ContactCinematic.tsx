"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../checkout/cinematic/checkout.css";
import "./contact.css";
import { useRef } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useGetLocale } from "@/hooks/useGetLocale";
import InstagramLink from "@/components/shared/InstagramLink";
import { WHATSAPP_URL } from "../../home/cinematic/content";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import PageStage from "../../checkout/cinematic/PageStage";
import { ctCopy, EMAIL, MAP_EMBED, MAP_LINK, PHONE_DISPLAY, PHONE_TEL } from "./contactContent";

/** Cinematic Contact: every line is one tap — call, WhatsApp, email, directions, Instagram. */
const ContactCinematic = () => {
  const locale = useGetLocale();
  const t = ctCopy[locale];
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();
  useReveal(root);

  const wa = `${WHATSAPP_URL}&text=${encodeURIComponent(t.waText)}`;

  const rows = [
    { k: "call", label: t.rows.call, value: PHONE_DISPLAY, hint: t.hint.call, href: `tel:${PHONE_TEL}`, ltr: true, ext: false },
    { k: "whatsapp", label: t.rows.whatsapp, value: PHONE_DISPLAY, hint: t.hint.whatsapp, href: wa, ltr: true, ext: true },
    { k: "email", label: t.rows.email, value: EMAIL, hint: t.hint.email, href: `mailto:${EMAIL}`, ltr: true, ext: false },
    { k: "visit", label: t.rows.visit, value: t.address, hint: t.hint.visit, href: MAP_LINK, ltr: false, ext: true },
  ] as const;

  return (
    <div ref={root} className="cine cn-ct" dir={locale === "ar" ? "rtl" : "ltr"}>
      <PageStage tall photo={0} kicker={t.kicker} lines={[...t.lines]} body={t.body}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="cn-btn">
          {t.whatsapp}
          <span className="cn-btn-ico">
            <MessageCircle size={16} />
          </span>
        </a>
        <a href={`tel:${PHONE_TEL}`} className="cn-text-link">
          {t.call}
          <ArrowUpRight size={15} />
        </a>
      </PageStage>

      <section className="cn-section cn-paper cn-white cn-ct-main">
        <div className="cn-wrap cn-ct-grid">
          <div>
            <span className="cn-kicker f-display cn-rv">
              <i className="cn-dot" />
              {t.reachKicker}
            </span>
            <ul className="cn-ct-rows">
              {rows.map((r) => (
                <li key={r.k} className="cn-rv">
                  <a
                    href={r.href}
                    {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <small>{r.label}</small>
                    <span
                      className="f-display"
                      {...(r.ltr ? { dir: "ltr", style: { direction: "ltr", unicodeBidi: "isolate" } } : {})}
                    >
                      {r.value}
                    </span>
                    <em>{r.hint}</em>
                    <span className="cn-cat-arrow" aria-hidden="true">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside className="cn-ct-card cn-rv">
            <span className="cn-kicker f-display">
              <i className="cn-dot" />
              {t.cardKicker}
            </span>
            <h2 className="f-display">{t.cardTitle}</h2>
            <p>{t.cardBody}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="cn-btn">
              {t.whatsapp}
              <span className="cn-btn-ico">
                <MessageCircle size={16} />
              </span>
            </a>
            <div className="cn-ct-follow">
              <small>{t.followKicker}</small>
              <InstagramLink isAr={locale === "ar"} tone="dark" />
            </div>
          </aside>
        </div>
      </section>

      <section className="cn-section cn-paper cn-white cn-ct-map">
        <div className="cn-wrap">
          <div className="cn-sec-head">
            <h2 className="cn-sec-title f-display cn-rv">
              <i className="cn-dot" />
              {t.mapTitle}
            </h2>
            <div className="cn-sec-meta cn-rv">
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="cn-link">
                {t.mapMeta}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="cn-ct-frame cn-rv">
            <iframe
              src={MAP_EMBED}
              title={t.mapLabel}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactCinematic;

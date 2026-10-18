"use client";

import { useRef } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contact, copy, Locale, WHATSAPP_URL } from "./content";
import { useReveal } from "./useReveal";

const Closing = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="cn-closing" id="contact">
      <div className="cn-wrap">
        <div className="cn-closing-grid">
          <div className="cn-closing-main">
            <span className="cn-kicker f-display cn-rv">
              <i className="cn-dot" />
              {t.ctaKicker}
            </span>
            <h2 className="f-display cn-rv">{t.ctaTitle}</h2>
            <p className="cn-rv">{t.ctaBody}</p>
            <div className="cn-cta-row cn-rv">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-btn">
                {t.ctaWhatsapp}
                <span className="cn-btn-ico">
                  <MessageCircle size={16} />
                </span>
              </a>
              <Link href="/shop" className="cn-btn cn-btn-ghost">
                {t.ctaShop}
                <span className="cn-btn-ico">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          <dl className="cn-closing-info cn-rv">
            <div>
              <dt>{locale === "ar" ? "الهاتف" : "Phone"}</dt>
              <dd>
                <a
                  href={`https://wa.me/${contact.phone.replace(/[\s+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{locale === "ar" ? "العنوان" : "Address"}</dt>
              <dd>{contact.address[locale]}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Closing;

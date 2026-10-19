"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../product-details/cinematic/pd.css";
import "./checkout.css";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import cart from "@/utils/localStorage";
import { useGetLocale } from "@/hooks/useGetLocale";
import { WHATSAPP_URL } from "../../home/cinematic/content";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import { coCopy } from "./checkoutContent";
import { loadOrder, money, OrderSnapshot } from "./checkoutUtils";
import { OrderLine } from "./OrderLines";
import PageStage from "./PageStage";

/** /checkout/success — reads the order the checkout stored, then empties the cart. */
const OrderSuccess = () => {
  const locale = useGetLocale();
  const t = coCopy[locale];
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<OrderSnapshot | null | undefined>(undefined);

  useEffect(() => {
    const o = loadOrder();
    setOrder(o);
    if (o) cart.clearCart();
  }, []);

  useReveal(root, [order === undefined]);

  const dir = locale === "ar" ? "rtl" : "ltr";
  if (order === undefined) return <div className="cine cn-co" dir={dir} style={{ minHeight: "70svh" }} />;

  const first = order?.name.trim().split(/\s+/)[0] ?? "";

  return (
    <div ref={root} className="cine cn-co" dir={dir}>
      {order ? (
        <PageStage
          plain
          tone="ok"
          kicker={t.okKicker}
          lines={first ? [...t.okLinesNamed(first)] : [...t.okLines]}
          body={t.okBody(order.phone)}
        >
          <Link href="/shop" className="cn-btn">
            {t.continue}
            <span className="cn-btn-ico">
              <ArrowUpRight size={16} />
            </span>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-text-link">
            {t.whatsapp}
            <ArrowUpRight size={15} />
          </a>
        </PageStage>
      ) : (
        <PageStage plain kicker={t.kicker} lines={[t.noneTitle]} body={t.noneBody}>
          <Link href="/shop" className="cn-btn">
            {t.browse}
            <span className="cn-btn-ico">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </PageStage>
      )}

      {order && (
        <section className="cn-section cn-paper cn-white cn-co-main">
          <div className="cn-wrap cn-co-split">
            <div>
              <div className="cn-co-next-head">
                <span className="cn-kicker f-display cn-rv">
                  <i className="cn-dot" />
                  {t.nextKicker}
                </span>
                <h2 className="f-display cn-rv">{t.nextTitle}</h2>
              </div>
              <ol className="cn-co-next cn-rv">
                {t.next.map((s, i) => (
                  <li key={s.t}>
                    <small className="f-logo" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </small>
                    <h3>{s.t}</h3>
                    <p>{s.b}</p>
                  </li>
                ))}
              </ol>
              <div className="cn-co-actions cn-rv">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-btn cn-btn-ghost">
                  {t.whatsapp}
                  <span className="cn-btn-ico">
                    <MessageCircle size={16} />
                  </span>
                </a>
              </div>
            </div>

            <aside className="cn-co-summary cn-rv">
              {order.ref && (
                <div className="cn-co-ref">
                  <small>{t.ref}</small>
                  <b lang="en">#{order.ref}</b>
                </div>
              )}
              <header>
                <h2 className="f-display">{t.recap}</h2>
              </header>
              <ul className="cn-co-lines">
                {order.items.map((it, i) => (
                  <OrderLine key={i} index={i} {...it} />
                ))}
              </ul>
              <dl className="cn-co-totals">
                <div className="cn-co-grand">
                  <dt>{t.total}</dt>
                  <dd lang="en">
                    <b>{money(order.total)}</b> <small>KD</small>
                  </dd>
                </div>
              </dl>
              <p className="cn-co-deliver">
                <span>{t.deliverTo}</span>
                <strong>{order.name}</strong>
                <span>{order.address}</span>
              </p>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
};

export default OrderSuccess;

"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../product-details/cinematic/pd.css";
import "./checkout.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import cart, { CartItem } from "@/utils/localStorage";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import { coCopy } from "./checkoutContent";
import {
  CheckoutDraft,
  FailureInfo,
  loadDraft,
  loadFailure,
  money,
  toSnapshotItems,
  whatsappOrderUrl,
} from "./checkoutUtils";
import { OrderLine } from "./OrderLines";
import PageStage from "./PageStage";

interface State {
  fail: FailureInfo | null;
  items: CartItem[];
  draft: CheckoutDraft | null;
}

/** /checkout/failed — the cart and typed details are kept; offers retry or a one-tap WhatsApp order. */
const OrderFailed = () => {
  const locale = useGetLocale();
  const t = coCopy[locale];
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State | undefined>(undefined);

  useEffect(() => {
    setState({ fail: loadFailure(), items: cart.getAllProducts(), draft: loadDraft() });
  }, []);

  useReveal(root, [state === undefined]);

  const snap = useMemo(() => (state ? toSnapshotItems(state.items, locale) : []), [state, locale]);
  const total = state ? state.items.reduce((s, i) => s + i.price * i.quantity, 0) : 0;

  const dir = locale === "ar" ? "rtl" : "ltr";
  if (!state) return <div className="cine cn-co" dir={dir} style={{ minHeight: "70svh" }} />;

  const name = state.draft ? `${state.draft.firstName ?? ""} ${state.draft.lastName ?? ""}`.trim() : "";
  const waUrl = whatsappOrderUrl(snap, total, locale, {
    name,
    phone: state.draft?.phone,
    address: state.draft?.address,
  });

  return (
    <div ref={root} className="cine cn-co" dir={dir}>
      <PageStage tall tone="bad" photo={2} kicker={t.failKicker} lines={[...t.failLines]} body={t.failBody}>
        <Link href="/checkout" className="cn-btn">
          {t.tryAgain}
          <span className="cn-btn-ico">
            <ArrowUpRight size={16} />
          </span>
        </Link>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="cn-btn cn-btn-ghost">
          {t.viaWhatsapp}
          <span className="cn-btn-ico">
            <MessageCircle size={16} />
          </span>
        </a>
      </PageStage>

      <section className="cn-section cn-paper cn-white cn-co-main">
        <div className="cn-wrap cn-co-split">
          <div>
            <div className="cn-co-next-head">
              <span className="cn-kicker f-display cn-rv">
                <i className="cn-dot" />
                {t.helpKicker}
              </span>
              <h2 className="f-display cn-rv">{t.helpTitle}</h2>
            </div>
            <ol className="cn-co-next cn-rv">
              {t.helpItems.map((s, i) => (
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
              <Link href="/shop" className="cn-text-link">
                {t.backShop}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {(snap.length > 0 || state.fail?.message) && (
            <aside className="cn-co-summary cn-rv">
              {state.fail?.message && (
                <p className="cn-co-reason">
                  <strong>{t.reason}: </strong>
                  {state.fail.message}
                </p>
              )}
              {snap.length > 0 && (
                <>
                  <header>
                    <h2 className="f-display">{t.cartKept}</h2>
                  </header>
                  <ul className="cn-co-lines">
                    {snap.map((it, i) => (
                      <OrderLine key={i} index={i} {...it} />
                    ))}
                  </ul>
                  <dl className="cn-co-totals">
                    <div className="cn-co-grand">
                      <dt>{t.total}</dt>
                      <dd lang="en">
                        <b>{money(total)}</b> <small>KD</small>
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </aside>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderFailed;

"use client";

import "../../home/cinematic/cinematic.css";
import "../../shop/cinematic/shop.css";
import "../../product-details/cinematic/pd.css";
import "./checkout.css";
import { useRef } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useSmoothScroll } from "../../home/cinematic/useSmoothScroll";
import { useReveal } from "../../home/cinematic/useReveal";
import { coCopy } from "./checkoutContent";
import { useCartItems } from "./useCartItems";
import PageStage from "./PageStage";
import CheckoutFormCinematic from "./CheckoutFormCinematic";
import OrderSummaryCinematic, { EmptyCart } from "./OrderSummaryCinematic";

const CheckoutCinematic = () => {
  const locale = useGetLocale();
  const t = coCopy[locale];
  useSmoothScroll();
  const cart = useCartItems();
  const root = useRef<HTMLDivElement>(null);
  const empty = cart.items !== null && cart.items.length === 0;

  useReveal(root, [empty]);

  return (
    <div ref={root} className="cine cn-co" dir={locale === "ar" ? "rtl" : "ltr"}>
      <PageStage
        kicker={t.kicker}
        lines={[...t.lines]}
        body={t.body}
        photo={1}
        steps={[
          { label: t.steps[0], state: "done" },
          { label: t.steps[1], state: "current" },
          { label: t.steps[2], state: "todo" },
        ]}
      />

      <section className="cn-section cn-paper cn-white cn-co-main">
        <div className="cn-wrap">
          {empty ? (
            <EmptyCart locale={locale} />
          ) : (
            <div className="cn-co-grid">
              <CheckoutFormCinematic locale={locale} disabled={cart.items === null} />
              <OrderSummaryCinematic locale={locale} cart={cart} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CheckoutCinematic;

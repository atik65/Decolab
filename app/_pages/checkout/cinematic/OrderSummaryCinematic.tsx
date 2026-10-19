"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Locale, WHATSAPP_URL } from "../../home/cinematic/content";
import { coCopy } from "./checkoutContent";
import { describeItem, money } from "./checkoutUtils";
import CartControls from "./CartControls";
import { OrderLine } from "./OrderLines";
import { useCartItems } from "./useCartItems";

type Cart = ReturnType<typeof useCartItems>;

/** Editable cart + totals; sticks beside the form on desktop. */
const OrderSummaryCinematic = ({ locale, cart }: { locale: Locale; cart: Cart }) => {
  const t = coCopy[locale];
  const { items, total, count, setQuantity, remove } = cart;

  if (items === null) {
    return (
      <aside className="cn-co-summary" aria-busy="true">
        <div className="cn-pd-skel">
          <i />
          <i style={{ height: 96 }} />
          <i style={{ height: 96 }} />
          <i style={{ width: "60%" }} />
        </div>
      </aside>
    );
  }

  return (
    <aside className="cn-co-summary">
      <header>
        <h2 className="f-display">{t.summary}</h2>
        <span lang="en">
          {count} {count === 1 ? t.item : t.items}
        </span>
      </header>

      <ul className="cn-co-lines">
        {items.map((it, i) => (
          <OrderLine
            key={`${it.productId}-${i}`}
            index={i}
            title={it.productTitle}
            image={it.productImage}
            options={describeItem(it, locale)}
            price={it.price}
            quantity={it.quantity}
            controls={
              <CartControls
                locale={locale}
                quantity={it.quantity}
                onQuantity={(q) => setQuantity(i, q)}
                onRemove={() => remove(i)}
              />
            }
          />
        ))}
      </ul>

      <dl className="cn-co-totals">
        <div>
          <dt>{t.subtotal}</dt>
          <dd lang="en">KD {money(total)}</dd>
        </div>
        <div>
          <dt>{t.delivery}</dt>
          <dd>{t.free}</dd>
        </div>
        <div className="cn-co-grand">
          <dt>{t.total}</dt>
          <dd lang="en">
            <b>{money(total)}</b> <small>KD</small>
          </dd>
        </div>
      </dl>

      <ul className="cn-pd-perks">
        {t.reassure.map((r) => (
          <li key={r}>
            <Check size={15} />
            {r}
          </li>
        ))}
      </ul>

      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-text-link cn-pd-ask">
        {t.helpCta}
        <ArrowUpRight size={15} />
      </a>
    </aside>
  );
};

export const EmptyCart = ({ locale }: { locale: Locale }) => {
  const t = coCopy[locale];
  return (
    <div className="cn-shop-empty cn-co-empty">
      <h2 className="f-display">{t.emptyTitle}</h2>
      <p>{t.emptyBody}</p>
      <Link href="/shop" className="cn-btn">
        {t.browse}
        <span className="cn-btn-ico">
          <ArrowUpRight size={16} />
        </span>
      </Link>
    </div>
  );
};

export default OrderSummaryCinematic;

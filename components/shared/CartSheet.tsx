"use client";

import "@/app/_pages/home/cinematic/cinematic.css";
import "@/app/_pages/product-details/cinematic/pd.css";
import "@/app/_pages/checkout/cinematic/checkout.css";
import "@/app/_pages/checkout/cinematic/cartsheet.css";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Locale, WHATSAPP_URL } from "@/app/_pages/home/cinematic/content";
import { coCopy } from "@/app/_pages/checkout/cinematic/checkoutContent";
import { cartCopy } from "@/app/_pages/checkout/cinematic/cartCopy";
import { describeItem, money } from "@/app/_pages/checkout/cinematic/checkoutUtils";
import { OrderLine } from "@/app/_pages/checkout/cinematic/OrderLines";
import CartControls from "@/app/_pages/checkout/cinematic/CartControls";
import { useCartItems } from "@/app/_pages/checkout/cinematic/useCartItems";

const CartSheet = ({ tone = "dark" }: { tone?: "dark" | "light" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = coCopy[locale];
  const c = cartCopy[locale];

  const { items: loaded, total, count, setQuantity, remove } = useCartItems();
  const items = loaded ?? [];
  const empty = items.length === 0;
  const close = () => setIsOpen(false);

  const openProduct = (productId: string) => {
    close();
    router.push(`/products/${productId}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          role="button"
          aria-label={c.cartLabel}
          className={`relative cursor-pointer p-2 rounded-full transition-all duration-300 group ${
            tone === "light" ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <ShoppingCart
            className={`w-6 h-6 ${
              tone === "light" ? "text-white" : "text-gray-700 group-hover:text-black"
            }`}
          />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 !font-roboto">
              {count}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent
        isShowCloseButton
        className="flex flex-col w-[calc(100%-1.5rem)] sm:max-w-[440px] p-0 gap-0"
      >
        <div className="cine cn-white cn-cs" dir={locale === "ar" ? "rtl" : "ltr"}>
          <header className="cn-cs-head">
            <SheetTitle asChild>
              <h2 className="f-display">{c.title}</h2>
            </SheetTitle>
            {!empty && (
              <span lang="en">
                {count} {count === 1 ? t.item : t.items}
              </span>
            )}
          </header>

          <p className="cn-cs-banner">
            <i className="cn-dot" />
            {c.banner}
          </p>

          <div className="cn-cs-body">
            {empty ? (
              <div className="cn-cs-empty">
                <h3 className="f-display">{t.emptyTitle}</h3>
                <p>{t.emptyBody}</p>
                <Link href="/shop" className="cn-btn" onClick={close}>
                  {t.browse}
                  <span className="cn-btn-ico">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
                <div className="cn-cs-quick">
                  <small>{c.browseTitle}</small>
                  <div>
                    {c.categories.map((x) => (
                      <Link key={x.href} href={x.href} onClick={close}>
                        {x.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
                    onOpen={() => openProduct(it.productId)}
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
            )}
          </div>

          {!empty && (
            <footer className="cn-cs-foot">
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

              <Link href="/checkout" className="cn-pd-btn cn-pd-btn-solid" onClick={close}>
                {c.checkout}
              </Link>

              <div className="cn-cs-links">
                <button type="button" className="cn-text-link" onClick={close}>
                  {c.keepShopping}
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cn-text-link">
                  {t.helpCta}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </footer>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

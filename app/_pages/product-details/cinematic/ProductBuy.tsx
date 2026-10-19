"use client";

import { RefObject } from "react";
import { ArrowUpRight, BaggageClaim, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductDetails } from "@/types/api/products";
import { Locale, WHATSAPP_NUMBER } from "../../home/cinematic/content";
import { useProductForm } from "../useProductForm";
import ProductOptionsCinematic from "./ProductOptionsCinematic";
import { pdCopy } from "./pdContent";

export type ProductForm = ReturnType<typeof useProductForm>;

const money = (n: number) => n.toFixed(3);

interface Props {
  product: ProductDetails;
  form: ProductForm;
  locale: Locale;
  actionsRef: RefObject<HTMLDivElement | null>;
}

/** Title, live price, options and the order buttons. */
const ProductBuy = ({ product, form, locale, actionsRef }: Props) => {
  const t = pdCopy[locale];
  const { values, errors, touched, setFieldValue, handleSubmit, handleQuantityChange, currentPrice, submitType } = form;

  const priced = currentPrice !== null && currentPrice > 0;
  const minPrice = Number(product.minPrice) || 0;
  const href =
    typeof window === "undefined"
      ? "#"
      : `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
          `${t.askMsg} ${product.title} ${window.location.href}`,
        )}`;

  return (
    <div className="cn-pd-buy">
      <nav className="cn-pd-crumbs cn-pd-in" aria-label="Breadcrumb">
        <Link href="/">{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/shop">{t.shop}</Link>
        {product.category && (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          </>
        )}
      </nav>

      <h1 id="product-title" className="f-display" aria-label={product.title}>
        <span className="cn-line" aria-hidden="true">
          <span>{product.title}</span>
        </span>
      </h1>

      <div className="cn-pd-price cn-pd-in" aria-live="polite">
        <small>{t.price}</small>
        {priced ? (
          <p>
            <b lang="en">{money(currentPrice!)}</b> <span lang="en">KD</span>
            {values.quantity > 1 && (
              <em>
                {t.total}: <span lang="en">{money(currentPrice! * values.quantity)} KD</span>
              </em>
            )}
          </p>
        ) : (
          <>
            {minPrice > 0 && (
              <p>
                {t.from} <b lang="en">{money(minPrice)}</b> <span lang="en">KD</span>
              </p>
            )}
            <em>{t.chooseHint}</em>
          </>
        )}
      </div>

      <ul className="cn-pd-perks cn-pd-in">
        {t.perks.map((p) => (
          <li key={p}>
            <Check size={15} />
            {p}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} noValidate>
        <ProductOptionsCinematic
          product={product}
          values={values}
          errors={errors as never}
          touched={touched as never}
          setFieldValue={setFieldValue}
          locale={locale}
        />

        <div ref={actionsRef} className="cn-pd-actions cn-pd-in">
          <div className="cn-pd-qty" role="group" aria-label={t.quantity}>
            <button type="button" aria-label={t.decrease} onClick={() => handleQuantityChange("decrease")}>
              <Minus size={16} />
            </button>
            <output lang="en">{values.quantity}</output>
            <button type="button" aria-label={t.increase} onClick={() => handleQuantityChange("increase")}>
              <Plus size={16} />
            </button>
          </div>

          <button
            type="submit"
            className="cn-pd-btn cn-pd-btn-ghost"
            onClick={() => (submitType.current = "addToCart")}
          >
            <ShoppingCart size={17} />
            {t.addToCart}
          </button>

          <button
            type="submit"
            className="cn-pd-btn cn-pd-btn-solid"
            onClick={() => (submitType.current = "orderNow")}
          >
            <BaggageClaim size={17} />
            {t.orderNow}
          </button>
        </div>
      </form>

      <a href={href} target="_blank" rel="noopener noreferrer" className="cn-text-link cn-pd-ask cn-pd-in">
        {t.ask}
        <ArrowUpRight size={15} />
      </a>
    </div>
  );
};

export default ProductBuy;

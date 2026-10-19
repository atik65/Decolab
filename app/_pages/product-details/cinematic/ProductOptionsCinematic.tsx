"use client";

import { ReactNode } from "react";
import { Check } from "lucide-react";
import { isFieldUsedInVariants } from "@/lib/variantSystem";
import { ProductDetails } from "@/types/api/products";
import { Locale } from "../../home/cinematic/content";
import { ProductFormValues } from "../useProductForm";
import { pdCopy } from "./pdContent";

type Errors = Partial<Record<keyof ProductFormValues, string>>;
type Touched = Partial<Record<keyof ProductFormValues, boolean>>;

interface Props {
  product: ProductDetails;
  values: ProductFormValues;
  errors: Errors;
  touched: Touched;
  setFieldValue: (field: string, value: unknown) => void;
  locale: Locale;
}

const Group = ({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) => (
  <fieldset className="cn-opt" id={`field-${id}`} data-invalid={Boolean(error)}>
    <legend>
      {label}
      {required && <b aria-hidden="true">*</b>}
      {hint && <em>{hint}</em>}
    </legend>
    {children}
    {error && (
      <p className="cn-opt-err" role="alert">
        {error}
      </p>
    )}
  </fieldset>
);

/** Option groups for the cinematic product page (same fields/ids as the classic form). */
const ProductOptionsCinematic = ({ product, values, errors, touched, setFieldValue, locale }: Props) => {
  const t = pdCopy[locale];
  const err = (k: keyof ProductFormValues) => (touched[k] ? errors[k] : undefined);

  const isBase = product.pricing?.type === "base";
  const showSize = product.sizes?.length > 0 && (isBase || isFieldUsedInVariants(product, "sizeId"));
  const showDigits =
    product.minDigits > 0 &&
    product.maxDigits > 0 &&
    (isBase || isFieldUsedInVariants(product, "digitCount"));

  const digitList = showDigits
    ? Array.from({ length: product.maxDigits - product.minDigits + 1 }, (_, i) => product.minDigits + i)
    : [];

  const selectedColor = product.colors.find((c) => String(c.id) === String(values.color));
  const selectedLight = product.lightColors.find((c) => String(c.id) === String(values.lightColor));

  return (
    <div className="cn-opts">
      {showSize && (
        <Group id="size" label={t.size} required error={err("size")}>
          <div className="cn-chips">
            {product.sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                lang="en"
                aria-pressed={values.size === String(s.id)}
                onClick={() => setFieldValue("size", String(s.id))}
              >
                {s.title}
              </button>
            ))}
          </div>
        </Group>
      )}

      {showDigits && (
        <Group id="digitCount" label={t.digits} required error={err("digitCount")}>
          <div className="cn-chips cn-chips-num">
            {digitList.map((d) => (
              <button
                key={d}
                type="button"
                lang="en"
                aria-pressed={String(values.digitCount) === String(d)}
                onClick={() => setFieldValue("digitCount", String(d))}
              >
                {d}
              </button>
            ))}
          </div>
        </Group>
      )}

      {product.colors.length > 0 && (
        <Group
          id="color"
          label={t.color}
          required
          error={err("color")}
          hint={selectedColor?.name}
        >
          <div className="cn-swatches">
            {product.colors.map((c) => {
              const on = String(values.color) === String(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={on}
                  onClick={() => setFieldValue("color", String(c.id))}
                >
                  <span style={{ background: c.colorCode }}>
                    {on && <Check size={14} />}
                  </span>
                </button>
              );
            })}
          </div>
        </Group>
      )}

      {product.lightColors.length > 0 && (
        <Group
          id="lightColor"
          label={t.lightColor}
          required
          error={err("lightColor")}
          hint={selectedLight?.name}
        >
          <div className="cn-swatches">
            {product.lightColors.map((c) => {
              const on = String(values.lightColor) === String(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={on}
                  onClick={() => setFieldValue("lightColor", String(c.id))}
                >
                  <span style={{ background: c.colorCode, color: /^#?f{3,6}$/i.test(c.colorCode) ? "#111" : "#fff" }}>
                    {on && <Check size={14} />}
                  </span>
                </button>
              );
            })}
          </div>
        </Group>
      )}

      <Group id="houseNumber" label={t.houseNumber} required={product.isCustomizable} error={err("houseNumber")} hint={t.houseNumberHint}>
        <input
          className="cn-field"
          type="number"
          inputMode="numeric"
          name="houseNumber"
          lang="en"
          value={values.houseNumber}
          onChange={(e) => setFieldValue("houseNumber", e.target.value)}
        />
      </Group>

      <Group id="text" label={t.text} hint={t.textHint}>
        <textarea
          className="cn-field"
          name="text"
          rows={3}
          value={values.text}
          onChange={(e) => setFieldValue("text", e.target.value)}
        />
      </Group>

      {product.designs.length > 0 && (
        <Group id="design" label={t.design} required error={err("design")}>
          <div className="cn-pick">
            {product.designs.map((d) => {
              const on = values.design === String(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={on}
                  aria-label={d.name}
                  onClick={() => setFieldValue("design", String(d.id))}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.url || "/images/products/design/design1.avif"} alt={d.name} loading="lazy" />
                  {on && (
                    <i>
                      <Check size={14} />
                    </i>
                  )}
                </button>
              );
            })}
          </div>
        </Group>
      )}

      {product.fonts.length > 0 && (
        <Group id="font" label={t.font} required error={err("font")}>
          <div className="cn-pick cn-pick-wide">
            {product.fonts.map((f) => {
              const on = values.font === String(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  aria-label={f.name}
                  onClick={() => setFieldValue("font", String(f.id))}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url || "/images/products/fonts/f1.avif"} alt={f.name} loading="lazy" />
                  {on && (
                    <i>
                      <Check size={14} />
                    </i>
                  )}
                </button>
              );
            })}
          </div>
        </Group>
      )}
    </div>
  );
};

export default ProductOptionsCinematic;

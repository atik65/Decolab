"use client";

import { Loader } from "lucide-react";
import { Locale } from "../../home/cinematic/content";
import { Group } from "../../product-details/cinematic/ProductOptionsCinematic";
import { useCheckout } from "../useCheckout";
import { coCopy } from "./checkoutContent";

/** Contact + delivery details (same fields and validation as the classic checkout). */
const CheckoutFormCinematic = ({ locale, disabled }: { locale: Locale; disabled?: boolean }) => {
  const t = coCopy[locale];
  const { values, handleChange, handleSubmit, errors, touched, busy } = useCheckout();
  const err = (k: keyof typeof values) => (touched[k] ? (errors[k] as string | undefined) : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="cn-co-form">
      <section className="cn-co-block">
        <header>
          <small className="f-logo">01</small>
          <h2 className="f-display">{t.contactTitle}</h2>
        </header>
        <div className="cn-co-fields">
          <Group id="phone" label={t.phone} required error={err("phone")} hint={t.phoneHint}>
            <input
              className="cn-field"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              name="phone"
              lang="en"
              dir="ltr"
              value={values.phone}
              onChange={handleChange}
            />
          </Group>
        </div>
      </section>

      <section className="cn-co-block">
        <header>
          <small className="f-logo">02</small>
          <h2 className="f-display">{t.deliveryTitle}</h2>
        </header>
        <div className="cn-co-fields">
          <div className="cn-co-two">
            <Group id="firstName" label={t.firstName} required error={err("firstName")}>
              <input
                className="cn-field"
                type="text"
                autoComplete="given-name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </Group>
            <Group id="lastName" label={t.lastName} hint={t.optional}>
              <input
                className="cn-field"
                type="text"
                autoComplete="family-name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </Group>
          </div>

          <Group id="address" label={t.address} required error={err("address")}>
            <textarea
              className="cn-field"
              rows={3}
              autoComplete="street-address"
              name="address"
              placeholder={t.addressPh}
              value={values.address}
              onChange={handleChange}
            />
          </Group>

          <div className="cn-co-two">
            <Group id="apartment" label={t.apartment} hint={t.optional}>
              <input className="cn-field" type="text" name="apartment" value={values.apartment} onChange={handleChange} />
            </Group>
            <Group id="googleMapsLink" label={t.maps} hint={t.optional}>
              <input
                className="cn-field"
                type="url"
                name="googleMapsLink"
                dir="ltr"
                placeholder="https://maps.google.com/…"
                value={values.googleMapsLink}
                onChange={handleChange}
              />
            </Group>
          </div>
        </div>
      </section>

      <div className="cn-co-submit">
        <button type="submit" className="cn-pd-btn cn-pd-btn-solid" disabled={busy || disabled}>
          {busy ? (
            <>
              <Loader className="cn-co-spin" size={18} />
              {t.processing}
            </>
          ) : (
            t.place
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutFormCinematic;

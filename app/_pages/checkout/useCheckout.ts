"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "@/i18n/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useCreateOrder } from "@/hooks/tanstack/useOrder";
import createSheetOrder, { Payload } from "@/lib/createSheetOrder";
import cart from "@/utils/localStorage";
import { coCopy } from "./cinematic/checkoutContent";
import {
  clearDraft,
  errorMessage,
  loadDraft,
  saveFailure,
  saveOrder,
  toSnapshotItems,
} from "./cinematic/checkoutUtils";

const initialValues = {
  phone: "",
  email: "",
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  googleMapsLink: "",
};

/**
 * Checkout form + order submission. On success the order is stored for the
 * /checkout/success page; on failure the cart and the typed details are kept and
 * the customer lands on /checkout/failed.
 */
export function useCheckout() {
  const locale = useGetLocale();
  const router = useRouter();
  const t = coCopy[locale];
  const { isPending, mutateAsync } = useCreateOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        phone: Yup.string().required(t.errPhone),
        firstName: Yup.string().required(t.errFirstName),
        address: Yup.string().required(t.errAddress),
        googleMapsLink: Yup.string().notRequired(),
      }),
    [t],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const cartItems = cart.getAllProducts();
      if (cartItems.length === 0) {
        enqueueSnackbar(t.emptyTitle, {
          variant: "error",
          style: { backgroundColor: "var(--brand-destructive)", color: "white" },
        });
        return;
      }

      try {
        setIsSubmitting(true);

        // Map cart items to backend format
        const items = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          customization: {
            sizeId: item.size?.id.toString(),
            colorId: item.color?.id.toString(),
            lightColorId: item.lightColor?.id.toString(),
            houseNumber: item.houseNumber,
            text: item.text,
            designId: item.design?.id.toString(),
            // fontId: item.font?.id.toString(),
            digitCount: item.digitCount || 0,
          },
        }));

        const payload = {
          items,
          contact: { phoneNumber: values.phone, email: values.email },
          delivery: {
            country: values.country,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            apartmentSuite: values.apartment,
            city: values.city,
            postalCode: values.postalCode,
            googleMapsLink: values.googleMapsLink,
          },
        };

        // Prepare sheet payload for all items
        const sheetPayload: Payload = {
          productTitle: cartItems.map((i) => i.productTitle).join(", "),
          quantity: cartItems.reduce((acc, i) => acc + i.quantity, 0),
          size: cartItems.map((i) => i.size?.title).join(", "),
          color: cartItems.map((i) => i.color?.name).join(", "),
          lightColor: cartItems.map((i) => i.lightColor?.name).join(", "),
          houseNumber: cartItems
            .map((i) => i.houseNumber)
            .filter(Boolean)
            .join(", "),
          design: cartItems.map((i) => i.design?.name).join(", "),
          digitCount: cartItems.map((i) => i.digitCount).join(", "),
          phoneNumber: payload.contact.phoneNumber,
          email: payload.contact.email,
          customerName:
            `${payload.delivery.firstName} ${payload.delivery.lastName}`.trim(),
          address: payload.delivery.address,
          googleMapsLink: payload.delivery.googleMapsLink,
        };

        await createSheetOrder(sheetPayload);
        const res = (await mutateAsync(payload)) as Record<string, unknown> | undefined;

        const ref = res?.id ?? res?.order_id ?? res?.orderId ?? res?.order_number;
        saveOrder({
          at: Date.now(),
          ref: ref !== undefined && ref !== null ? String(ref) : undefined,
          name: `${values.firstName} ${values.lastName}`.trim(),
          phone: values.phone,
          address: values.address,
          total: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
          items: toSnapshotItems(cartItems, locale),
        });

        // the cart is cleared by the success page, so this page never flashes "empty"
        router.push("/checkout/success");
      } catch (error) {
        console.warn("Order failed:", error);
        saveFailure({ at: Date.now(), message: errorMessage(error) }, values);
        router.push("/checkout/failed");
      }
    },
  });

  const { setValues, submitCount, errors, isValidating } = formik;

  /* bring back what the customer typed after a failed attempt */
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setValues({ ...initialValues, ...draft }, false);
      clearDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to first error on failed submission
  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0 && !isValidating) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, isValidating]);

  return { ...formik, busy: isPending || isSubmitting };
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "@/i18n/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ProductDetails } from "@/types/api/products";
import prepareCartItem, { validateUserOptions } from "@/utils/productUtils";
import cart from "@/utils/localStorage";
import {
  calculateCustomizationPrice,
  buildVariantConditions,
  getRequiredVariantKeys,
} from "@/lib/variantSystem";

/**
 * Options form, live price, validation and cart / checkout submit for one product.
 * Shared by the classic and the cinematic product pages.
 */
export function useProductForm(
  currentProduct: ProductDetails | undefined,
  slug: string | string[] | undefined,
) {
  const locale = useGetLocale();

  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const router = useRouter();
  // const { setProductInfo } = useOrderStore();
  const submitType = useRef<"addToCart" | "orderNow">("addToCart");

  // Dynamically build validation schema based on product configuration
  const productValidation = useMemo(() => {
    if (!currentProduct) return Yup.object().shape({});

    const schema: Record<string, any> = {};

    // For variant pricing, only require fields that affect pricing
    // For base pricing, fields are optional (used only for customization)
    const isVariantPricing = currentProduct.pricing?.type === "variant";
    const requiredKeys = isVariantPricing
      ? getRequiredVariantKeys(currentProduct)
      : [];

    // Size validation - required only if used in variant pricing
    if (
      currentProduct.sizes?.length > 0
      // && requiredKeys.includes("sizeId")
    ) {
      schema.size = Yup.string().required("Size is required");
    }

    // Digit count validation - required only if used in variant pricing
    if (
      currentProduct.minDigits &&
      currentProduct.maxDigits
      // && requiredKeys.includes("digitCount")
    ) {
      schema.digitCount = Yup.number()
        .required("Digit count is required")
        .min(
          currentProduct.minDigits,
          `Minimum ${currentProduct.minDigits} digits`,
        )
        .max(
          currentProduct.maxDigits,
          `Maximum ${currentProduct.maxDigits} digits`,
        );
    }

    // Color validation
    if (currentProduct.colors?.length > 0) {
      schema.color = Yup.string().required("Color is required");
    }

    // Light color validation
    if (currentProduct.lightColors?.length > 0) {
      schema.lightColor = Yup.string().required("Light color is required");
    }

    // Design validation
    if (currentProduct.designs?.length > 0) {
      schema.design = Yup.string().required("Design is required");
    }

    // Font validation
    if (currentProduct.fonts?.length > 0) {
      schema.font = Yup.string().required("Font is required");
    }

    // House number is always required for customizable products
    if (currentProduct.isCustomizable) {
      schema.houseNumber = Yup.string().required("House number is required");
    }

    // Text is optional
    schema.text = Yup.string().notRequired();

    // Quantity is always required
    schema.quantity = Yup.number()
      .required("Quantity is required")
      .min(1, "Minimum quantity is 1");

    return Yup.object().shape(schema);
  }, [currentProduct]);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    submitCount,
    isValidating,
    // resetForm,
  } = useFormik({
    initialValues: {
      size: "",
      digitCount: "",
      color: "",
      lightColor: "",
      houseNumber: "",
      text: "",
      design: "",
      font: "",
      quantity: 1,
    },
    validationSchema: productValidation,
    onSubmit: (values) => {
      console.log(values);
      // enqueueSnackbar(
      //   submitType.current === "orderNow"
      //     ? "Checkout is Initiating."
      //     : "Added to Cart successfully!",
      //   {
      //     variant: "success",
      //     style: {
      //       backgroundColor: "var(--brand-secondary)",
      //       color: "white",
      //     },
      //   },
      // );

      const orderStorePayload = {
        productId: Array.isArray(slug) ? slug[0] : slug?.toString() || "",
        sizeId: values.size?.toString(),
        ...(currentProduct?.minDigits && currentProduct?.maxDigits
          ? { digitId: values.digitCount?.toString() }
          : {}),
        colorId: values.color?.toString(),
        lightColorId: values.lightColor?.toString(),
        houseNumber: values.houseNumber?.toString(),
        text: values.text,
        designId: values.design?.toString(),
        fontId: values.font?.toString(),
        quantity: values.quantity,
        digitCount: values.digitCount,
        price: currentPrice || 0,
      };

      // Validate variant selection if using variant pricing
      if (currentProduct?.pricing?.type === "variant") {
        const variantConditions = buildVariantConditions(
          currentProduct,
          values,
        );
        const { price } = calculateCustomizationPrice(
          currentProduct,
          variantConditions,
        );

        if (!price) {
          enqueueSnackbar(
            locale === "en"
              ? "Please select valid options to get a price"
              : "الرجاء اختيار خيارات صالحة للحصول على السعر",
            {
              variant: "error",
              style: {
                backgroundColor: "var(--brand-destructive)",
                color: "white",
              },
            },
          );
          const optionsTop = document.getElementById("product-title");
          if (optionsTop) {
            optionsTop.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          return;
        }
      }

      // Guard: currentProduct must be defined (TypeScript can't narrow across closure boundary)
      if (!currentProduct) return;

      // Validate first (optional)
      const validation = validateUserOptions(orderStorePayload);
      if (!validation.isValid) {
        console.error("Missing fields:", validation.missingFields);
        enqueueSnackbar(
          `Missing required fields: ${validation.missingFields.join(", ")}`,
          {
            variant: "error",
            style: {
              backgroundColor: "var(--brand-destructive)",
              color: "white",
            },
          },
        );
        return;
      }

      // Prepare complete cart item
      const cartItem = prepareCartItem(currentProduct, orderStorePayload);

      if (cartItem && submitType.current === "addToCart") {
        // Add to cart
        cart.addProduct(cartItem);
        console.log("Added to cart:", cartItem);

        enqueueSnackbar("Added to Cart successfully!", {
          variant: "success",
          style: {
            backgroundColor: "var(--brand-primary)",
            color: "white",
          },
        });
      } else if (!cartItem) {
        console.error("Failed to prepare cart item");
        enqueueSnackbar("Failed to prepare cart item", {
          variant: "error",
          style: {
            backgroundColor: "var(--brand-destructive)",
            color: "white",
          },
        });
        return;
      }

      // console.log("order payload = ", orderStorePayload);
      // return;

      // set product order - info to global state
      if (submitType.current === "orderNow") {
        // setProductInfo(orderStorePayload);

        if (cartItem) {
          cart.addProduct(cartItem);
          router.push("/checkout");

          enqueueSnackbar("Checkout is Initiating.", {
            variant: "success",
            style: {
              backgroundColor: "var(--brand-primary)",
              color: "white",
            },
          });
        }
      }
    },
  });

  // Calculate price dynamically whenever relevant form values change
  useEffect(() => {
    if (!currentProduct) return;

    // For base pricing, use base price directly
    if (currentProduct.pricing?.type === "base") {
      setCurrentPrice(
        currentProduct.pricing.price ?? currentProduct.minPrice ?? 0,
      );
      return;
    }

    // For variant pricing, calculate based on selections
    const variantConditions = buildVariantConditions(currentProduct, values);
    const { price } = calculateCustomizationPrice(
      currentProduct,
      variantConditions,
    );

    setCurrentPrice(price);
  }, [
    currentProduct,
    values.size,
    values.digitCount,
    // Add other fields that might affect pricing in the future
  ]);



  // Scroll to first error on failed submission
  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0 && !isValidating) {
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [submitCount, isValidating]);

  // Function to handle quantity change
  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
      setFieldValue("quantity", values.quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setFieldValue("quantity", values.quantity - 1);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    currentPrice,
    submitType,
    handleQuantityChange,
  };
}

export type ProductFormValues = ReturnType<typeof useProductForm>["values"];

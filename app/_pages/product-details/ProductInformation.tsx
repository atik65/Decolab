"use client";
import React, { useEffect, useState, useRef } from "react";

// interface ProductIntroCartProps {
//   productName?: string;
//   price?: number;
//   description?: string;
//   category?: string;
// }

import { ColorOptions, LightColorOptions } from "./ColorSelection";
import DesignSelection from "./DesignSelection";
import { BaggageClaim, ShoppingCart } from "lucide-react";
// import FontSelection from "./FontSelection";
import Link from "next/link";
import { Input, TextArea } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@bprogress/next";
import { useParams } from "next/navigation";
import { useGetLocale } from "@/hooks/useGetLocale";

import { getProductPrice } from "@/utils/getProductPrice";
import { useFormik } from "formik";
// import { productValidation } from "./productValidation";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
// import { useOrderStore } from "@/hooks/zustand/useOrderStore";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";
import { ProductDetails } from "@/types/api/products";
import ProductInfoSkt from "@/components/skeletons/productDetails/ProductInfoSkt";
import { NoDetails } from "@/components/skeletons/productDetails/Not-found";
import prepareCartItem, { validateUserOptions } from "@/utils/productUtils";
import cart from "@/utils/localStorage";
import { cn } from "@/lib/utils";

const ProductInformation = () => {
  const { slug } = useParams();

  const { data: product, isLoading } = useGetProductDetails(
    slug?.toString() || "",
  );

  const locale = useGetLocale();
  const currentProduct = product?.[locale];

  console.log(currentProduct);

  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  const [digitCount, setDigitCount] = useState<number | null>(null);

  useEffect(() => {
    if (currentProduct?.pricing?.type === "variant") {
      const highestVariant = currentProduct?.pricing?.variants?.sort(
        (a, b) => b.conditions.digitCount - a.conditions.digitCount,
      )[0];

      // console.log("highestVariant = ", highestVariant);

      setDigitCount(highestVariant?.conditions.digitCount);
    }

    if (currentProduct?.pricing?.type === "base") {
      setDigitCount(3);
    }
  }, [currentProduct]);

  // console.log("digitCount = ", digitCount);

  const router = useRouter();
  // const { setProductInfo } = useOrderStore();
  const submitType = useRef<"addToCart" | "orderNow">("addToCart");

  const productValidation = Yup.object().shape({
    ...((currentProduct?.sizes?.length ?? 0 > 0)
      ? { size: Yup.string().required("Size is required") }
      : {}),

    ...((currentProduct?.digits?.length ?? 0 > 0)
      ? { digitCount: Yup.number().required("Digit count is required") }
      : {}),
    ...((currentProduct?.colors?.length ?? 0 > 0)
      ? { color: Yup.string().required("Color is required") }
      : {}),
    ...((currentProduct?.lightColors?.length ?? 0 > 0)
      ? { lightColor: Yup.string().required("Light color is required") }
      : {}),
    houseNumber: Yup.string().required("House number is required"),
    text: Yup.string().notRequired(),
    ...((currentProduct?.designs?.length ?? 0 > 0)
      ? { design: Yup.string().required("Design is required") }
      : {}),
    // ...((currentProduct?.fonts?.length ?? 0 > 0)
    //   ? { font: Yup.string().required("Font is required") }
    //   : {}),
    quantity: Yup.number().required("Quantity is required"),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
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
      enqueueSnackbar(
        submitType.current === "orderNow"
          ? "Checkout is Initiating."
          : "Added to Cart successfully!",
        {
          variant: "success",
          style: {
            backgroundColor: "#87A786",
            color: "white",
          },
        },
      );

      const orderStorePayload = {
        productId: Array.isArray(slug) ? slug[0] : slug?.toString() || "",
        sizeId: values.size?.toString(),
        ...((currentProduct?.digits?.length ?? 0 > 0)
          ? { digitId: values.digitCount?.toString() }
          : {}),

        colorId: values.color?.toString(),
        lightColorId: values.lightColor?.toString(),
        houseNumber: values.houseNumber?.toString(),
        text: values.text,
        designId: values.design?.toString(),
        // fontId: values.font?.toString(),
        quantity: values.quantity,
        digitCount: values.digitCount,
        price:
          getProductPrice(
            currentProduct,
            values.size ? Number(values.size) : undefined,
            values.digitCount ? Number(values.digitCount) : undefined,
          ) || 0,
      };

      // if pricing type is variant then must provide size and digitCount
      if (currentProduct?.pricing?.type === "variant") {
        if (!values.size || !values.digitCount) {
          enqueueSnackbar("Please select a valid variant to get price", {
            variant: "error",
            style: {
              backgroundColor: "#c51616",
              color: "white",
            },
          });
          return;
        }
      }

      // Guard: currentProduct must be defined (TypeScript can't narrow across closure boundary)
      if (!currentProduct) return;

      // Validate first (optional)
      const validation = validateUserOptions(orderStorePayload);
      if (!validation.isValid) {
        console.error("Missing fields:", validation.missingFields);
        return;
      }

      // Prepare complete cart item
      const cartItem = prepareCartItem(currentProduct, orderStorePayload);

      if (cartItem) {
        // Add to cart
        cart.addProduct(cartItem);
        console.log("Added to cart:", cartItem);
      } else {
        console.error("Failed to prepare cart item");
      }

      // console.log("order payload = ", orderStorePayload);
      // return;

      // set product order - info to global state
      if (submitType.current === "orderNow") {
        // setProductInfo(orderStorePayload);

        if (cartItem) {
          cart.addProduct(cartItem);
          router.push("/checkout");
        }
      }
    },
  });

  // console.log("values = ", values);

  // console.log(
  //   "price = ",
  //   getProductPrice(
  //     product as any,
  //     values.size ? Number(values.size) : undefined,
  //     values.digitCount ? Number(values.digitCount) : undefined
  //   )
  // );

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

  // console.log(errors);

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <ProductInfoSkt />;
  }

  if (!currentProduct) {
    return <NoDetails />;
  }

  return (
    <div
      className={cn(
        "bg-white shadow-lg rounded-xl p-6 border border-gray-100",
        locale === "ar" && "text-right",
      )}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol
          role="list"
          className={cn(
            "flex items-center space-x-2 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg",
            locale === "ar" && "flex-row-reverse space-x-reverse",
          )}
        >
          <li>
            <Link
              href="/"
              className="text-[#189CD9] hover:text-[#189CD9]/80 duration-200 transition-colors"
            >
              {locale === "en" ? "Home" : "بيت"}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              href="/shop"
              className="text-[#189CD9] hover:text-[#189CD9]/70 duration-200 transition-colors"
            >
              {locale === "en" ? "Products" : "منتجات"}
            </Link>
          </li>
          {/* <li>/</li> */}
          {/* <li>
            <a
              href="#"
              className="text-[#87A786] hover:text-black duration-200"
            >
              Other
            </a>
          </li> */}
          <li className="text-gray-400">/</li>
          <li className="text-gray-700 font-semibold truncate max-w-[200px]">
            {currentProduct.title}
          </li>
        </ol>
      </nav>

      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {currentProduct.title}
      </h1>
      {/* Category Information */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#189CD9]/10 to-[#189CD9]/5 text-[#189CD9] border border-[#189CD9]/30 shadow-sm">
          {currentProduct.category}
        </span>
      </div>

      {/* Product Description */}
      <p className="text-base text-gray-600 leading-relaxed mb-6">
        {currentProduct.description}
      </p>

      {/* Product Price */}
      {getProductPrice(
        currentProduct,
        values.size ? Number(values.size) : undefined,
        values.digitCount ? Number(values.digitCount) : undefined,
      ) ? (
        <div className="bg-gradient-to-r from-[#189CD9]/10 to-[#189CD9]/5 p-4 rounded-lg border-l-4 border-[#189CD9] mb-6">
          <p className="text-sm text-gray-600 mb-1">
            {locale === "en" ? "Price" : "السعر"}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#189CD9] !font-roboto">
            {getProductPrice(
              currentProduct,
              values.size ? Number(values.size) : undefined,
              values.digitCount ? Number(values.digitCount) : undefined,
            ) + " KD"}
          </p>
        </div>
      ) : (
        <p className="animate-pulse font-bold text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 mb-6">
          {locale === "en"
            ? "Please select a valid variant to get price "
            : "الرجاء اختيار متغير صالح للحصول على السعر"}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product options */}
        <ProductOptions
          // handleVariantChange={handleVariantChange}
          size={values.size}
          // digitCount={Number(values.digitCount)}
          color={values.color}
          lightColor={values.lightColor}
          design={values.design}
          font={values.font}
          product={currentProduct}
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          digitCount={digitCount}
        />

        {/* Quantity Selector and place order */}
        <div className="mt-0 pt-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Group: Quantity & Add to Cart (Shared row on mobile) */}
            <div className="flex flex-row items-center gap-3 md:gap-4 flex-1">
              {/* Quantity Selector */}
              <div
                className={cn(
                  "flex items-center shrink-0 border border-gray-300 rounded-lg overflow-hidden shadow-sm h-12",
                  locale === "ar" && "flex-row-reverse",
                )}
              >
                <button
                  type="button"
                  onClick={() => handleQuantityChange("decrease")}
                  className="w-10 h-full text-center text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none transition-colors"
                >
                  -
                </button>
                <span className="w-12 h-full flex items-center justify-center border-x border-gray-300 text-base font-semibold text-gray-900 bg-gray-50">
                  {values.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("increase")}
                  className="w-10 h-full text-center text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none transition-colors"
                >
                  +
                </button>
              </div>

              {/* add to cart Button */}
              <button
                type="submit"
                onClick={() => (submitType.current = "addToCart")}
                className={cn(
                  "flex-1 h-12 px-2 sm:px-6 border-2 border-[#189CD9] text-[#189CD9] hover:bg-[#189CD9]/10 hover:text-[#189CD9] rounded-lg font-bold flex gap-2 items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-md",
                  locale === "ar" && "flex-row-reverse",
                )}
              >
                <ShoppingCart
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-sm sm:text-base whitespace-nowrap">
                  {locale === "en" ? "Add to Cart" : "أضف إلى السلة"}
                </span>
              </button>
            </div>

            {/* order now Button (Full width on mobile, joined row on sm:) */}
            <button
              type="submit"
              onClick={() => (submitType.current = "orderNow")}
              className={cn(
                "w-full sm:flex-1 h-12 px-6 bg-gradient-to-r from-[#189CD9] to-[#1182B5] hover:from-[#1489C1] hover:to-[#0B76A8] text-white rounded-lg font-bold flex gap-2 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group",
                locale === "ar" && "flex-row-reverse",
              )}
            >
              <BaggageClaim
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-base whitespace-nowrap">
                {locale === "en" ? "Order Now" : "الآن تأكد"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductInformation;

const ProductOptions = ({
  product,
  // handleVariantChange,
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  digitCount,
}: // size,
// digitCount,
// color,
// lightColor,
// design,
// font,
{
  product: ProductDetails;
  // handleVariantChange: (
  //   variant: "size" | "digitCount" | "color" | "lightColor" | "design" | "font",
  //   value: string
  // ) => void;
  size: string | null;
  digitCount: number | null;
  color: string | null;
  lightColor: string | null;
  design: string | null;
  font: string | null;
  values: {
    size: string;
    digitCount: string;
    color: string;
    lightColor: string;
    design: string;
    font: string;
    houseNumber: string;
    text: string;
    quantity: number;
  };
  errors: {
    size?: string;
    digitCount?: string;
    color?: string;
    lightColor?: string;
    design?: string;
    font?: string;
    houseNumber?: string;
    text?: string;
    quantity?: string;
  };
  touched: {
    size?: boolean;
    digitCount?: boolean;
    color?: boolean;
    lightColor?: boolean;
    design?: boolean;
    font?: boolean;
    houseNumber?: boolean;
    text?: boolean;
    quantity?: boolean;
  };
  setFieldValue: (field: string, value: unknown) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const locale = useGetLocale();

  return (
    <div className=" space-y-4 mt-4">
      {/* Size Dropdown */}

      {product.sizes.length > 0 && (
        <div>
          <label
            htmlFor="size"
            className="block text-sm  text-gray-700 mb-1 font-bold"
          >
            {locale === "en" ? "Size" : "الحجم"}
            <span className="text-red-500">*</span>
          </label>

          <Select
            value={values.size}
            onValueChange={(value) => setFieldValue("size", value)}
          >
            <SelectTrigger className="">
              <SelectValue
                placeholder={
                  locale === "en" ? "-- Select Size --" : "--اختر الحجم--"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size.id} value={size.id.toString()}>
                  <span className="!font-roboto">{size.title}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Error Message */}
          {errors?.size && touched?.size && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.size as string}
            </p>
          )}
        </div>
      )}

      {/* How Many Digits dropdown */}
      {/* {product?.digits && product.digits.length > 0 && ( */}
      {digitCount && (
        <div>
          <label
            htmlFor="how-many-digits"
            className="block text-sm font-bold text-gray-700 mb-1 "
          >
            {locale === "en" ? "How Many Digits" : "عدد الأرقام"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <Select
            value={values.digitCount.toString()}
            onValueChange={(value) => setFieldValue("digitCount", value)}
          >
            <SelectTrigger className="">
              <SelectValue
                // className="!font-roboto"
                placeholder={
                  locale === "en" ? "-- Select Digit --" : "--اختر الرقم--"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: digitCount }, (_, i) => i + 1).map(
                (digit) => (
                  <SelectItem key={digit} value={digit.toString()}>
                    <span className="!font-roboto">{digit}</span>
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          {/* Error Message */}
          {errors?.digitCount && touched?.digitCount && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.digitCount as string}
            </p>
          )}
        </div>
      )}

      {/* Color Options */}
      {product.colors.length > 0 && (
        <ColorOptions
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          product={product}
        />
      )}
      {/*Light Color Options */}
      {product.lightColors.length > 0 && (
        <LightColorOptions
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          product={product}
        />
      )}
      {/* House Number Input */}

      <div>
        <Input
          label={locale === "en" ? "House Number" : "رقم المنزل"}
          type="number"
          name="houseNumber"
          id="house-number"
          value={values.houseNumber}
          onChange={handleChange}
        />
        {/* Error Message */}
        {errors?.houseNumber && touched?.houseNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.houseNumber as string}
          </p>
        )}
      </div>

      {/* Text Area */}
      <div>
        <TextArea
          label={locale === "en" ? "Text" : "النص"}
          name="text"
          id="text"
          rows={4}
          value={values.text}
          onChange={(e) => {
            setFieldValue("text", e.target.value);
            // handleChange(e);
          }}
        />
        {/* Error Message */}
        {errors?.text && touched?.text && (
          <p className="text-red-500 text-sm mt-1">{errors?.text as string}</p>
        )}
      </div>

      {/* design selection */}
      {product.designs.length > 0 && (
        <DesignSelection
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          product={product}
        />
      )}
      {/* Font selection */}
      {/* {product.fonts.length > 0 && (
        <FontSelection
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          product={product}
        />
      )} */}
    </div>
  );
};

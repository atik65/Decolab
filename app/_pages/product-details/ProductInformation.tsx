"use client";
import React from "react";

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
import { Link } from "@/i18n/navigation";
import { Input, TextArea } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLocale } from "@/hooks/useGetLocale";

// import { useOrderStore } from "@/hooks/zustand/useOrderStore";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";
import { ProductDetails } from "@/types/api/products";
import ProductInfoSkt from "@/components/skeletons/productDetails/ProductInfoSkt";
import { NoDetails } from "@/components/skeletons/productDetails/Not-found";
import { cn } from "@/lib/utils";
import { isFieldUsedInVariants } from "@/lib/variantSystem";
import FontSelection from "./FontSelection";
import { useProductForm } from "./useProductForm";
import ProductDescription from "./ProductDescription";
import { useParams } from "next/navigation";

const ProductInformation = () => {
  const { slug } = useParams();

  const { data: product, isLoading } = useGetProductDetails(
    slug?.toString() || "",
  );

  const locale = useGetLocale();
  const currentProduct = product?.[locale];

  // console.log(currentProduct);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    currentPrice,
    submitType,
    handleQuantityChange,
  } = useProductForm(currentProduct, slug);

  // console.log("current product = ", currentProduct);

  console.log("errors = ", errors);

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
              className="text-brand-primary hover:text-brand-primary/80 duration-200 transition-colors"
            >
              {locale === "en" ? "Home" : "بيت"}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              href="/shop"
              className="text-brand-primary hover:text-brand-primary/70 duration-200 transition-colors"
            >
              {locale === "en" ? "Products" : "منتجات"}
            </Link>
          </li>
          {/* <li>/</li> */}
          {/* <li>
            <a
              href="#"
              className="text-brand-secondary hover:text-black duration-200"
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
      <div id="product-title" className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 text-brand-primary border border-brand-primary/30 shadow-sm">
          {currentProduct.category}
        </span>
      </div>

      {/* Product Description */}
      {/* <p className="text-base text-gray-600 leading-relaxed mb-6">
        {currentProduct.description}
      </p> */}

      {/* Product Price */}
      {currentPrice !== null && currentPrice > 0 ? (
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 p-4 rounded-lg border-l-4 border-brand-primary mb-6">
          <p className="text-sm text-gray-600 mb-1">
            {locale === "en" ? "Price" : "السعر"}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-brand-primary !font-roboto">
            {currentPrice.toFixed(3)} KD
          </p>
        </div>
      ) : (
        <p className="animate-pulse font-bold text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 mb-6">
          {locale === "en"
            ? "Please select valid options to get price"
            : "الرجاء اختيار خيارات صالحة للحصول على السعر"}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Product options */}
        <ProductOptions
          product={currentProduct}
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
        />

        {/* Product Description */}
        <ProductDescription description={currentProduct.description} />

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
                <span className="w-12 h-full flex items-center justify-center border-x border-gray-300 text-base font-semibold text-gray-900 bg-gray-50 !font-roboto">
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
                  "flex-1 h-12 px-2 sm:px-6 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg font-bold flex gap-2 items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-md",
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
                "w-full sm:flex-1 h-12 px-6 bg-gradient-to-r from-brand-primary to-brand-primary-gradEnd hover:from-brand-primary-dark hover:to-brand-primary-gradEndDark text-white rounded-lg font-bold flex gap-2 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group",
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
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: {
  product: ProductDetails;
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

  // Determine what to show based on pricing type
  const isVariantPricing = product.pricing?.type === "variant";
  const isBasePricing = product.pricing?.type === "base";

  // For variant pricing: only show fields that are used in variant conditions
  // For base pricing: show all available fields (they're optional for customization)
  const shouldShowSize =
    product.sizes?.length > 0 &&
    (isBasePricing || isFieldUsedInVariants(product, "sizeId"));

  const shouldShowDigits =
    product.minDigits !== undefined &&
    product.maxDigits !== undefined &&
    product.minDigits > 0 &&
    product.maxDigits > 0 &&
    (isBasePricing || isFieldUsedInVariants(product, "digitCount"));

  return (
    <div className=" space-y-4 mt-4">
      {/* Size Dropdown */}

      {shouldShowSize && (
        <div id="field-size">
          <label
            htmlFor="size"
            className="block text-sm  text-gray-700 mb-1 font-bold space-x-1"
          >
            <strong>{locale === "en" ? "Size" : "الحجم"}</strong>
            <strong className="text-red-500">*</strong>
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

      {/* How Many Digits dropdown - dynamically shown based on product config */}
      {shouldShowDigits && (
        <div id="field-digitCount">
          <label
            htmlFor="how-many-digits"
            className="block text-sm font-bold text-gray-700 mb-1 space-x-1"
          >
            <strong>
              {locale === "en" ? "How Many Digits" : "عدد الأرقام"}
            </strong>
            <strong className="text-red-500">*</strong>
          </label>
          <Select
            value={values.digitCount.toString()}
            onValueChange={(value) => setFieldValue("digitCount", value)}
          >
            <SelectTrigger className="">
              <SelectValue
                placeholder={
                  locale === "en" ? "-- Select Digit --" : "--اختر الرقم--"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: product.maxDigits! - product.minDigits! + 1 },
                (_, i) => product.minDigits! + i,
              ).map((digit) => (
                <SelectItem key={digit} value={digit.toString()}>
                  <span className="!font-roboto">{digit}</span>
                </SelectItem>
              ))}
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
        <div id="field-color">
          <ColorOptions
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            product={product}
          />
        </div>
      )}
      {/*Light Color Options */}
      {product.lightColors.length > 0 && (
        <div id="field-lightColor">
          <LightColorOptions
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            product={product}
          />
        </div>
      )}
      {/* House Number Input */}

      <div id="field-houseNumber">
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
      <div id="field-text">
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
        <div id="field-design">
          <DesignSelection
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            product={product}
          />
        </div>
      )}
      {/* Font selection */}
      {product.fonts.length > 0 && (
        <div id="field-font">
          <FontSelection
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            product={product}
          />
        </div>
      )}
    </div>
  );
};

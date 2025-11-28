"use client";
import React, { useEffect, useState } from "react";

// interface ProductIntroCartProps {
//   productName?: string;
//   price?: number;
//   description?: string;
//   category?: string;
// }

import dynamic from "next/dynamic";

// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaPinterestP,
// } from "react-icons/fa";

// import { FiBarChart2, FiHeart } from "react-icons/fi";

const FaFacebookF = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaFacebookF)
);
const FaTwitter = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaTwitter)
);
const FaInstagram = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaInstagram)
);
const FaPinterestP = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaPinterestP)
);
// const FiBarChart2 = dynamic(() =>
//   import("react-icons/fi").then((mod) => mod.FiBarChart2)
// );
// const FiHeart = dynamic(() =>
//   import("react-icons/fi").then((mod) => mod.FiHeart)
// );

import { ColorOptions, LightColorOptions } from "./ColorSelection";
import DesignSelection from "./DesignSelection";
import { BaggageClaim } from "lucide-react";
import FontSelection from "./FontSelection";
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
// import { findProductById } from "@/data/products";
import { useGetLocale } from "@/hooks/useGetLocale";
import { getProductPrice } from "@/utils/getProductPrice";
import { useFormik } from "formik";
// import { productValidation } from "./productValidation";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import { useOrderStore } from "@/hooks/zustand/useOrderStore";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";
import { ProductDetails } from "@/types/api/products";
import ProductInfoSkt from "@/components/skeletons/productDetails/ProductInfoSkt";
import { NoDetails } from "@/components/skeletons/productDetails/Not-found";

const ProductInformation = () => {
  const { slug } = useParams();

  const { data: product, isLoading } = useGetProductDetails(
    slug?.toString() || ""
  );

  const locale = useGetLocale();
  const currentProduct = product?.[locale];

  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  const [digitCount, setDigitCount] = useState<number | null>(null);

  useEffect(() => {
    if (currentProduct?.pricing?.type === "variant") {
      const highestVariant = currentProduct?.pricing?.variants?.sort(
        (a, b) => b.conditions.digitCount - a.conditions.digitCount
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
  const { setProductInfo } = useOrderStore();

  const productValidation = Yup.object().shape({
    ...(currentProduct?.sizes?.length ?? 0 > 0
      ? { size: Yup.string().required("Size is required") }
      : {}),

    ...(currentProduct?.digits?.length ?? 0 > 0
      ? { digitCount: Yup.number().required("Digit count is required") }
      : {}),
    ...(currentProduct?.colors?.length ?? 0 > 0
      ? { color: Yup.string().required("Color is required") }
      : {}),
    ...(currentProduct?.lightColors?.length ?? 0 > 0
      ? { lightColor: Yup.string().required("Light color is required") }
      : {}),
    houseNumber: Yup.string().required("House number is required"),
    text: Yup.string().required("Text is required"),
    ...(currentProduct?.designs?.length ?? 0 > 0
      ? { design: Yup.string().required("Design is required") }
      : {}),
    ...(currentProduct?.fonts?.length ?? 0 > 0
      ? { font: Yup.string().required("Font is required") }
      : {}),
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
      enqueueSnackbar("Checkout is Initiating.", {
        variant: "success",
        style: {
          backgroundColor: "#87A786",
          color: "white",
        },
      });

      const orderStorePayload = {
        productId: Array.isArray(slug) ? slug[0] : slug?.toString(),
        sizeId: values.size?.toString(),
        ...(currentProduct?.digits?.length ?? 0 > 0
          ? { digitId: values.digitCount?.toString() }
          : {}),

        colorId: values.color?.toString(),
        lightColorId: values.lightColor?.toString(),
        houseNumber: values.houseNumber,
        text: values.text,
        designId: values.design?.toString(),
        fontId: values.font?.toString(),
        quantity: values.quantity,
        digitCount: values.digitCount,
        price:
          getProductPrice(
            currentProduct,
            values.size ? Number(values.size) : undefined,
            values.digitCount ? Number(values.digitCount) : undefined
          ) || 0,
      };

      // if pricing type is variant then must provide size and digitCount
      if (currentProduct?.pricing?.type === "variant") {
        if (!values.size || !values.digitCount) {
          enqueueSnackbar("Please select a valid variant", {
            variant: "error",
            style: {
              backgroundColor: "#c51616",
              color: "white",
            },
          });
          return;
        }
      }

      // set product order - info to global state
      setProductInfo(orderStorePayload);

      router.push("/checkout");
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
    <div className="bg-white shadow-md p-6 ">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex items-center space-x-2 text-sm font-medium text-gray-500"
        >
          <li>
            <Link
              href="/"
              className="text-[#87A786] hover:text-black duration-200"
            >
              {locale === "en" ? "Home" : "بيت"}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/shop"
              className="text-[#87A786] hover:text-black duration-200"
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
          <li>/</li>
          <li className="hover:text-[#87A786] text-black duration-200">
            {currentProduct.title}
          </li>
        </ol>
      </nav>

      {/* Product Title */}
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        {currentProduct.title}
      </h1>
      {/* Category Information */}
      <div className="mt-1">
        <span className="inline-flex items-center px-2 py-[2px] rounded-full text-xs font-medium bg-[#87A786]/10 text-[#87A786] border border-[#87A786]/20">
          {currentProduct.category}
        </span>
      </div>

      {/* Product Description */}
      <p className="mt-4 text-base text-gray-600">
        {currentProduct.description}
      </p>

      {/* Product Price */}
      {getProductPrice(
        currentProduct,
        values.size ? Number(values.size) : undefined,
        values.digitCount ? Number(values.digitCount) : undefined
      ) ? (
        <p className="mt-4 text-lg sm:text-2xl font-semibold text-gray-900">
          {getProductPrice(
            currentProduct,
            values.size ? Number(values.size) : undefined,
            values.digitCount ? Number(values.digitCount) : undefined
          ) + " KD"}
        </p>
      ) : (
        <p className="animate-pulse font-bold mt-4 text-sm text-red-500 ">
          {locale === "en"
            ? "Please select a valid variant "
            : "الحالة غير متاحة"}
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
        <div className="mt-6 flex items-center space-x-3">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => handleQuantityChange("decrease")}
              className="w-10 text-center py-2 border border-gray-300  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  "
            >
              -
            </button>
            <span className="w-10 text-center py-2 border border-gray-300  text-sm font-medium text-gray-700 bg-white">
              {values.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange("increase")}
              className="w-10 text-center py-2 border border-gray-300  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
            >
              +
            </button>
          </div>

          {/* order now Button */}
          <button
            type="submit"
            // onClick={handleOrderNow}
            className="px-4 py-2 border border-transparent  shadow-sm text-sm  text-white bg-[#87A786] hover:bg-[#87A786] font-bold flex gap-2 items-center w-full justify-center"
          >
            <span>{locale === "en" ? "Order Now" : "الآن تأكد"}</span>
            <BaggageClaim size={16} />
          </button>
        </div>
      </form>

      {/* Additional Actions  */}
      {/* <div className="mt-4 flex items-center space-x-4">
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <FiBarChart2 className="w-5 h-5 mr-1" /> Add to compare
        </button>
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <FiHeart className="w-5 h-5 mr-1" /> Add to wishlist
        </button>
      </div> */}

      {/* Sharing Options */}
      <div className="mt-5">
        {/* <p className="text-sm text-gray-600">Share:</p> */}
        <div className="flex space-x-2">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FaPinterestP className="w-5 h-5" />
          </a>
        </div>
      </div>
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
            {/* <Select onValueChange={(value) => handleVariantChange("size", value)}> */}
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
                  {size.title}
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
                placeholder={
                  locale === "en" ? "-- Select Digit --" : "--اختر الرقم--"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: digitCount }, (_, i) => i + 1).map(
                (digit) => (
                  <SelectItem key={digit} value={digit.toString()}>
                    {digit}
                  </SelectItem>
                )
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
      {product.fonts.length > 0 && (
        <FontSelection
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          product={product}
        />
      )}
    </div>
  );
};

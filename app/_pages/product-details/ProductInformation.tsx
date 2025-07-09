"use client";
import React, { useState } from "react";

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
import { findProductById, ProductLN } from "@/data/research-product";
import { getProductPrice } from "@/utils/getProductPrice";

const ProductInformation = () => {
  const { slug } = useParams();

  const product = findProductById(Number(slug));
  const locale = useGetLocale();
  const currentProduct = product?.[locale];

  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [digitCount, setDigitCount] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [lightColor, setLightColor] = useState<string | null>(null);
  const [design, setDesign] = useState<string | null>(null);
  const [font, setFont] = useState<string | null>(null);

  const handleVariantChange = (
    variant: "size" | "digitCount" | "color" | "lightColor" | "design" | "font",
    value: string
  ) => {
    switch (variant) {
      case "size":
        setSize(value);
        break;
      case "digitCount":
        setDigitCount(Number(value));
        break;
      case "color":
        setColor(value);
        break;
      case "lightColor":
        setLightColor(value);
        break;
      case "design":
        setDesign(value);
        break;
      case "font":
        setFont(value);
        break;
      default:
        break;
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // console.log("size = ", size);

  const router = useRouter();

  const handleOrderNow = () => {
    router.push("/checkout");
  };

  if (!currentProduct) {
    return <div>Product not found</div>;
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
        size ? Number(size) : undefined,
        digitCount ? Number(digitCount) : undefined
      ) ? (
        <p className="mt-4 text-lg sm:text-2xl font-semibold text-gray-900">
          {getProductPrice(
            currentProduct,
            size ? Number(size) : undefined,
            digitCount ? Number(digitCount) : undefined
          ) + " KD"}
        </p>
      ) : (
        <p className="animate-pulse font-bold mt-4 text-base text-gray-900">
          {locale === "en"
            ? "Please select a size and digit count to see the price"
            : "الرجاء اختيار حجم وعدد الأرقام لعرض السعر"}
        </p>
      )}

      {/* Product options */}
      <ProductOptions
        handleVariantChange={handleVariantChange}
        size={size}
        digitCount={digitCount}
        color={color}
        lightColor={lightColor}
        design={design}
        font={font}
        product={currentProduct}
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
            {quantity}
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
          onClick={handleOrderNow}
          className="px-4 py-2 border border-transparent  shadow-sm text-sm  text-white bg-[#87A786] hover:bg-[#87A786] font-bold flex gap-2 items-center w-full justify-center"
        >
          <span>{locale === "en" ? "Order Now" : "الآن تأكد"}</span>
          <BaggageClaim size={16} />
        </button>
      </div>

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
  handleVariantChange,
  // size,
  // digitCount,
  // color,
  // lightColor,
  // design,
  // font,
}: {
  product: ProductLN;
  handleVariantChange: (
    variant: "size" | "digitCount" | "color" | "lightColor" | "design" | "font",
    value: string
  ) => void;
  size: string | null;
  digitCount: number | null;
  color: string | null;
  lightColor: string | null;
  design: string | null;
  font: string | null;
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

          <Select onValueChange={(value) => handleVariantChange("size", value)}>
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
        </div>
      )}

      {/* How Many Digits dropdown */}
      {product?.digits && product.digits.length > 0 && (
        <div>
          <label
            htmlFor="how-many-digits"
            className="block text-sm font-bold text-gray-700 mb-1 "
          >
            {locale === "en" ? "How Many Digits" : "عدد الأرقام"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={(value) => handleVariantChange("digitCount", value)}
          >
            <SelectTrigger className="">
              <SelectValue
                placeholder={
                  locale === "en" ? "-- Select Digit --" : "--اختر الرقم--"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {product.digits.map((digit) => (
                <SelectItem key={digit.id} value={digit.value.toString()}>
                  {digit.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Color Options */}
      {product.colors.length > 0 && <ColorOptions product={product} />}
      {/*Light Color Options */}
      {product.lightColors.length > 0 && (
        <LightColorOptions product={product} />
      )}
      {/* House Number Input */}

      <Input
        label={locale === "en" ? "House Number" : "رقم المنزل"}
        type="number"
        name="house-number"
        id="house-number"
      />
      {/* Text Area */}
      <TextArea
        label={locale === "en" ? "Text" : "النص"}
        name="text"
        id="text"
        rows={4}
      />

      {/* design selection */}
      {product.designs.length > 0 && <DesignSelection product={product} />}
      {/* Font selection */}
      {product.fonts.length > 0 && <FontSelection product={product} />}
    </div>
  );
};

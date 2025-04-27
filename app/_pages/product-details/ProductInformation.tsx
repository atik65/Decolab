"use client";
import React, { useState } from "react";

interface ProductIntroCartProps {
  productName?: string;
  price?: number;
  description?: string;
  category?: string;
}

import dynamic from "next/dynamic";

// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaPinterestP,
// } from "react-icons/fa"; 

// import { FiBarChart2, FiHeart } from "react-icons/fi";

const FaFacebookF = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFacebookF));
const FaTwitter = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTwitter));
const FaInstagram = dynamic(() => import("react-icons/fa").then((mod) => mod.FaInstagram));
const FaPinterestP = dynamic(() => import("react-icons/fa").then((mod) => mod.FaPinterestP));
const FiBarChart2 = dynamic(() => import("react-icons/fi").then((mod) => mod.FiBarChart2));
const FiHeart = dynamic(() => import("react-icons/fi").then((mod) => mod.FiHeart));

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

const ProductInformation = ({
  productName = "Box On The Wall",
  price = 19.99,
  description = "Introducing our Aluminum House Numbers, Installed on the wall. Crafted from high-quality aluminum with a layer of acrylic behind the Aluminum.The house numbers withstand the elements, backed by a 1-year warranty on the light and 5 years on the paint for your peace of mind.Enjoy free delivery, and installation by our team of experts.",
  category = "Other",
}: ProductIntroCartProps) => {
  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);

  // Function to handle quantity change
  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const router = useRouter();

  const handleOrderNow = () => {
    router.push("/checkout");
  };

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
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/shop"
              className="text-[#87A786] hover:text-black duration-200"
            >
              Shop
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
            {productName}
          </li>
        </ol>
      </nav>

      {/* Product Title */}
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{productName}</h1>

      {/* Product Price */}
      <p className="mt-2 text-xl font-semibold text-gray-900">${price}</p>

      {/* Product Description */}
      <p className="mt-4 text-base text-gray-600">{description}</p>

      {/* Product options */}
      <ProductOptions />

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
          <span>Order Now </span>
          <BaggageClaim size={16} />
        </button>
      </div>

      {/* Additional Actions  */}
      <div className="mt-4 flex items-center space-x-4">
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <FiBarChart2 className="w-5 h-5 mr-1" /> Add to compare
        </button>
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <FiHeart className="w-5 h-5 mr-1" /> Add to wishlist
        </button>
      </div>

      {/* Category Information */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">Category: {category}</p>
      </div>

      {/* Sharing Options */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">Share:</p>
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

const ProductOptions = () => {
  return (
    <div className=" space-y-4 mt-7">
      {/* Size Dropdown */}
      <div>
        <label
          htmlFor="size"
          className="block text-sm  text-gray-700 mb-1 font-bold"
        >
          Size <span className="text-red-500">*</span>
        </label>

        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="-- Select Size --" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* How Many Digits dropdown */}
      <div>
        <label
          htmlFor="how-many-digits"
          className="block text-sm font-bold text-gray-700 mb-1 "
        >
          How Many Digits <span className="text-red-500">*</span>
        </label>
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="-- Select Digit --" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Color Options */}
      <ColorOptions />
      {/*Light Color Options */}
      <LightColorOptions />
      {/* House Number Input */}

      <Input
        label="House Number"
        type="number"
        name="house-number"
        id="house-number"
      />
      {/* Text Area */}
      <TextArea label="Text" name="text" id="text" rows={4} />

      {/* design selection */}
      <DesignSelection />
      {/* Font selection */}
      <FontSelection />
    </div>
  );
};

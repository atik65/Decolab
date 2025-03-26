"use client";
import React, { useState } from "react";

interface ProductIntroCartProps {
  productName?: string;
  price?: number;
  description?: string;
  category?: string;
}

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa"; // Importing icons from react-icons
import { FiBarChart2, FiHeart } from "react-icons/fi";

const ProductIntroCart = ({
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

  return (
    <div className="bg-white shadow-md p-6 ">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex items-center space-x-2 text-sm font-medium text-gray-500"
        >
          <li>
            <a
              href="#"
              className="text-[#87A786] hover:text-black duration-200"
            >
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a
              href="#"
              className="text-[#87A786] hover:text-black duration-200"
            >
              Shop
            </a>
          </li>
          <li>/</li>
          <li>
            <a
              href="#"
              className="text-[#87A786] hover:text-black duration-200"
            >
              Other
            </a>
          </li>
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

      {/* Quantity Selector and Add to Cart */}
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

        {/* Add to Cart Button */}
        <button className="px-4 py-2 border border-transparent  shadow-sm text-sm  text-white bg-[#87A786] hover:bg-[#87A786] font-bold">
          ADD TO CART
        </button>
      </div>

      {/* Additional Actions */}
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

export default ProductIntroCart;

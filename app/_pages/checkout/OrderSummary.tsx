"use client";

import Image from "next/image";
// import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
// import { GiPayMoney } from "react-icons/gi";
// import dynamic from "next/dynamic";
import { useOrderStore } from "@/hooks/zustand/useOrderStore";
import { ProductLN, products } from "@/data/research-product";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ProductDetails } from "@/types/api/products";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";

// const GiPayMoney = dynamic(() =>
//   import("react-icons/gi").then((mod) => mod.GiPayMoney)
// );

const OrderSummary = () => {
  const locale = useGetLocale();

  // const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
  //   null
  // );

  const { productInfo } = useOrderStore();

  // get product by id
  const { data: product } = useGetProductDetails(productInfo.productId!);

  const selectedProduct = product?.[locale];
  // useEffect(() => {
  //   if (productInfo.productId) {
  //     const product = products.find(
  //       (product) => product.id.toString() === productInfo.productId
  //     );
  //     if (product) {
  //       setSelectedProduct(product[locale]);
  //     }
  //   }
  // }, [productInfo.productId]);

  // console.log(selectedProduct);

  if (!selectedProduct) {
    return <p className="text-center font-bold text-md">Product not found</p>;
  }

  return (
    <div className="rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        {/* Product image + name + description */}
        <div className="flex items-start gap-4 border-b pb-4 ">
          <div className="relative">
            {selectedProduct?.mainImage ? (
              <Image
                width={80}
                height={80}
                src={selectedProduct?.mainImage || ""}
                alt="Number Front Light"
                className="w-16 h-16 object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            )}

            <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {productInfo.quantity}
            </span>
          </div>

          <div className="flex-1 w-full">
            {/* title and price */}
            <div className="flex justify-between w-full">
              <h3 className="font-bold">{selectedProduct?.title}</h3>

              <div className="text-right">
                <p className="font-medium">KD {productInfo.price}</p>
              </div>
            </div>

            <div className="space-y-2 mt-1">
              {/* description */}
              {selectedProduct?.description && (
                <p className="text-sm text-gray-600 flex justify-between w-full gap-2">
                  {/* <span>{locale === "en" ? "Description : " : "الوصف"}</span> */}
                  <span>{selectedProduct?.description}</span>
                </p>
              )}
            </div>
          </div>
          {/* <div className="text-right">
            <p className="font-medium">KWD 22.000</p>
          </div> */}
        </div>

        {/* Product details */}
        <div className="space-y-2 mt-3 border-b pb-4">
          {/* digit count */}
          {productInfo.digitId && (
            <p className="text-sm text-gray-600 flex justify-between w-full gap-2">
              <span className="">
                {" "}
                {locale === "en" ? "How Many Digits  " : "كم عدد الأرقام"}
              </span>
              <span>
                {
                  selectedProduct?.digits?.find(
                    (digit) => digit.id.toString() === productInfo.digitId
                  )?.value
                }
              </span>
            </p>
          )}

          {/* size */}
          {productInfo.sizeId && (
            <p className="text-sm text-gray-600 flex justify-between w-full gap-2 ">
              <span>{locale === "en" ? "Size  " : "الطول"}</span>
              <span>
                {" "}
                {
                  selectedProduct?.sizes?.find(
                    (size) => size.id.toString() === productInfo.sizeId
                  )?.value
                }
              </span>
            </p>
          )}

          {/* color */}
          {productInfo.colorId && (
            <div className="text-sm text-gray-600 flex justify-between w-full gap-2 items-center">
              <span>{locale === "en" ? "Color  " : "اللون"}</span>

              <ColorCapsule
                color={selectedProduct?.colors?.find(
                  (color) => color.id.toString() === productInfo.colorId
                )}
              />
            </div>
          )}

          {/* light color */}
          {productInfo.lightColorId && (
            <div className="text-sm text-gray-600 flex justify-between w-full gap-2 items-center">
              <span>{locale === "en" ? "Light Color  " : "لون الضوء"}</span>
              <span>
                <ColorCapsule
                  color={selectedProduct?.lightColors?.find(
                    (lightColor) =>
                      lightColor.id.toString() === productInfo.lightColorId
                  )}
                />
              </span>
            </div>
          )}

          {/* house number */}
          {productInfo.houseNumber && (
            <p className="text-sm text-gray-600 flex justify-between w-full gap-2 ">
              <span>{locale === "en" ? "House Number  " : "رقم المنزل"}</span>
              <span> {productInfo.houseNumber}</span>
            </p>
          )}

          {/* text */}
          {productInfo.text && (
            <p className="text-sm text-gray-600 flex justify-between w-full gap-2 ">
              <span>{locale === "en" ? "Text  " : "النص"}</span>
              <span> {productInfo.text}</span>
            </p>
          )}

          {/* design */}
          {productInfo.designId && (
            <div className="text-sm text-gray-600 w-full gap-2 flex  justify-between items-center">
              <span>{locale === "en" ? "Design  " : "التصميم"}</span>
              <div>
                <Image
                  width={200}
                  height={200}
                  src={
                    selectedProduct?.designs?.find(
                      (design) => design.id.toString() === productInfo.designId
                    )?.url || ""
                  }
                  alt="Design"
                  className="w-full max-h-16 object-cover"
                />
              </div>
            </div>
          )}

          {/* font */}
          {productInfo.fontId && (
            <div className="text-sm text-gray-600 flex flex-row gap-5 justify-between items-center  w-full ">
              <span>{locale === "en" ? "Font  " : "الخط"}</span>
              <div className="mt-1">
                <Image
                  title={
                    selectedProduct?.fonts?.find(
                      (font) => font.id.toString() === productInfo.fontId
                    )?.name
                  }
                  width={200}
                  height={200}
                  src={
                    selectedProduct?.fonts?.find(
                      (font) => font.id.toString() === productInfo.fontId
                    )?.url || ""
                  }
                  alt={
                    selectedProduct?.fonts?.find(
                      (font) => font.id.toString() === productInfo.fontId
                    )?.name || "Font"
                  }
                  className="w-auto max-h-12 object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Discount Code */}
        {/* <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Discount code"
                className="flex-1"
              />
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-900  border border-[#87A786] px-4  rounded">
                Apply
              </button>
            </div> */}

        {/* Order Summary */}
        <div className="space-y-2 ">
          <div className="flex justify-between">
            <span>Subtotal · {productInfo.quantity} items</span>
            <span>KD {productInfo.price}</span>
          </div>
          {/* <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Upcoming</span>
          </div> */}
          <div className="flex justify-between text-lg font-semibold pt-2 border-t">
            <span>Total</span>
            <span>KD {productInfo.price * productInfo.quantity}</span>
          </div>
        </div>

        {/* Place Order Button */}
        {/* <button
          type="submit"
          onClick={() => {
            enqueueSnackbar("Coming Soon", {
              variant: "info",
              style: {
                backgroundColor: "#87a786ef",
                fontWeight: "bold",
              },
            });
          }}
          className="w-full mt-4 bg-[#87A786] hover:bg-[#87a786ea] text-white py-2  font-bold flex justify-center items-center gap-2"
        >
          <span>Place Order </span> <GiPayMoney size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default OrderSummary;

const ColorCapsule = ({
  color,
}: {
  color?: { name: string; colorCode: string };
}) => {
  return (
    <div
      title={color?.colorCode}
      className={`flex items-center gap-2 px-2 py-1 rounded-full border hover:border-[#87A786] transition-colors border-[#87A786] `}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{
          backgroundColor: color?.colorCode,
        }}
      />

      <span className="text-xs">{color?.name}</span>
    </div>
  );
};

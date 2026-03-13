"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import cart from "@/utils/localStorage";
import { useGetLocale } from "@/hooks/useGetLocale";
import { Trash2, Plus, Minus } from "lucide-react";

const OrderSummary = () => {
  const locale = useGetLocale();
  const [cartItems, setCartItems] = React.useState(cart.getAllProducts());

  React.useEffect(() => {
    setCartItems(cart.getAllProducts());
  }, []);

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    cart.updateQuantity(index, newQuantity);
    setCartItems(cart.getAllProducts());
  };

  const handleRemoveItem = (index: number) => {
    cart.removeProduct(index);
    setCartItems(cart.getAllProducts());
  };

  const totalPrice = cart.getTotalPrice();

  console.log("Cart items in Order Summary:", cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg p-10 bg-gray-50 border border-dashed border-gray-300 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {locale === "en" ? "Order Summary" : "ملخص الطلب"}
        </h2>
        <p className="text-gray-500 mb-6">
          {locale === "en" ? "Your cart is empty" : "سلة التسوق فارغة"}
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2 bg-[#1489C1] text-white rounded-lg font-medium hover:bg-[#6d8a6c] transition-colors"
        >
          {locale === "en" ? "Continue Shopping" : "مواصلة التسوق"}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {locale === "en" ? "Order Summary" : "ملخص الطلب"}
      </h2>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={`${item.productId}-${index}`}
            className="border-b pb-6 last:border-0 border-gray-100"
          >
            {/* Product image + name + description */}
            <div className="flex items-start gap-4">
              <div className="relative group shrink-0">
                {item.productImage && item.productImage !== "" ? (
                  <Image
                    width={80}
                    height={80}
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* title and removal */}
                <div className="flex justify-between items-start w-full gap-2">
                  <h3 className="font-bold text-gray-900 truncate">
                    {item.productTitle}
                  </h3>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title={locale === "en" ? "Remove item" : "إزالة العنصر"}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      {item.category}
                    </p>
                    <p
                      lang="en"
                      className="font-bold text-[#1489C1] !font-roboto"
                    >
                      KD {item.price}
                    </p>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(index, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold text-gray-700 bg-gray-50 border-x border-gray-200 !font-roboto">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(index, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product details simplified list */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              {/* digit count */}
              {item.digitCount && (
                <p className="text-sm text-gray-600 flex justify-between w-full gap-2">
                  <span className="">
                    {locale === "en" ? "Digits" : "عدد الأرقام"}
                  </span>
                  <span lang="en" className="!font-roboto">
                    {item.digitCount}
                  </span>
                </p>
              )}

              {/* size */}
              {item.size && (
                <p className="text-sm text-gray-600 flex justify-between w-full gap-2">
                  <span>{locale === "en" ? "Size" : "الحجم"}</span>
                  <span className="!font-roboto">{item.size.title}</span>
                </p>
              )}

              {/* color */}
              {item.color && (
                <div className="text-sm text-gray-600 flex justify-between w-full gap-2 items-center">
                  <span>{locale === "en" ? "Color" : "اللون"}</span>
                  <ColorCapsule color={item.color} />
                </div>
              )}

              {/* light color */}
              {item.lightColor && (
                <div className="text-sm text-gray-600 flex justify-between w-full gap-2 items-center">
                  <span>{locale === "en" ? "Light Color" : "لون الضوء"}</span>
                  <ColorCapsule color={item.lightColor} />
                </div>
              )}

              {/* house number */}
              {item.houseNumber && (
                <p className="text-sm text-gray-600 flex justify-between w-full gap-2 ">
                  <span>{locale === "en" ? "House Number" : "رقم المنزل"}</span>
                  <span className="!font-roboto"> {item.houseNumber}</span>
                </p>
              )}

              {/* text */}
              {item.text && (
                <p className="text-sm text-gray-600 flex justify-between w-full gap-2 ">
                  <span>{locale === "en" ? "Text" : "النص"}</span>
                  <span> {item.text}</span>
                </p>
              )}

              {/* design */}
              {item.design && (
                <div className="text-sm text-gray-600 w-full gap-2 flex justify-between items-center">
                  <span>{locale === "en" ? "Design" : "التصميم"}</span>
                  <div className="max-w-[100px]">
                    {item.design.url ? (
                      <Image
                        width={100}
                        height={40}
                        src={item.design.url}
                        alt={item.design.name || "Design"}
                        className="w-full max-h-12 object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">
                        N/A
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* font */}
              {/* {item.font && (
                <div className="text-sm text-gray-600 flex flex-row gap-5 justify-between items-center w-full">
                  <span>{locale === "en" ? "Font" : "الخط"}</span>
                  <div className="max-w-[100px]">
                    {item.font.image ? (
                      <Image
                        width={100}
                        height={40}
                        src={item.font.image}
                        alt={item.font.name || "Font"}
                        className="w-auto max-h-12 object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400">
                        N/A
                      </div>
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        ))}

        {/* Totals Section */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between">
            <span>
              {locale === "en" ? "Subtotal" : "المجموع الفرعي"} ·{" "}
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              {locale === "en" ? "items" : "عناصر"}
            </span>
            <span className="!font-roboto">KD {cart.getTotalPrice()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-4 border-t border-gray-200">
            <span className="text-gray-900">
              {locale === "en" ? "Total" : "الإجمالي"}
            </span>
            <span className="!font-roboto text-2xl text-[#1489C1]">
              KD {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

const ColorCapsule = ({
  color,
}: {
  color?: { name: string; colorCode: string; image?: string };
}) => {
  // console.log("ColorCapsule color:", color);

  return (
    <div
      title={color?.colorCode}
      className={`flex items-center gap-2 px-2 py-1 rounded-full border hover:border-[#87A786] transition-colors border-[#87A786] `}
    >
      {color?.image && color.image !== "" ? (
        <Image
          src={color.image}
          alt={color.name}
          width={20}
          height={20}
          className="w-5 h-5 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: color?.colorCode,
          }}
        />
      )}

      <span className="text-xs">{color?.name}</span>
    </div>
  );
};

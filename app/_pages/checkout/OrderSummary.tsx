"use client";

import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import React from "react";
// import { GiPayMoney } from "react-icons/gi";
import dynamic from "next/dynamic";

const GiPayMoney = dynamic(() =>
  import("react-icons/gi").then((mod) => mod.GiPayMoney)
);

const OrderSummary = () => {
  return (
    <div className="rounded-lg ">
      <div className="space-y-4">
        {/* Product Items */}
        <div className="flex items-start gap-4 border-b pb-4 ">
          <div className="relative">
            <Image
              width={80}
              height={80}
              src="/images/home/banner9.jpg"
              alt="Number Front Light"
              className="w-16 h-16 object-cover"
            />
            <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              1
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Number Front Light</h3>
            <p className="text-sm text-gray-600">How Many Numbers: Two</p>
            <p className="text-sm text-gray-600">Height Size (Two): 20CM</p>
          </div>
          <div className="text-right">
            <p className="font-medium">KWD 22.000</p>
          </div>
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
            <span>Subtotal · 2 items</span>
            <span>KWD 38.000</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Upcoming</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t">
            <span>Total</span>
            <span>KWD 38.000</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
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
          <span>Pay Now</span> <GiPayMoney size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

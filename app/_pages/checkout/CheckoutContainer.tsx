import React from "react";
import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";

export const CheckoutContainer = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-0 sm:mt-0 md:mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-40 relative ">
        {/* Left Side - Contact & Delivery Form */}
        <div className="order-2 md:order-2">
          <CheckoutForm />
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-1 md:order-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

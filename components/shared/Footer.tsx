import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 pb-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Copyright Text */}
        <p className="text-sm font-light">
          One Direction © 2025 CREATED BY{" "}
          <span className="font-bold">ATIK</span> PREMIUM E-COMMERCE SOLUTIONS.
        </p>

        {/* Right Section: Payment Method Logos */}
        <div className="f">
          {/* Visa */}
          <Image
            src="/images/icons/payment.png"
            alt="Visa"
            height={100}
            width={500}
            className="w-full h-8"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

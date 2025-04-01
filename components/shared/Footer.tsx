import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 pb-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section: Copyright Text */}
        <p className="text-sm font-light text-center sm:text-start">
          One Direction © 2025 CREATED BY{" "}
          <Link
            href={"https://www.linkedin.com/in/atik65/"}
            target="_blank"
            className="font-bold"
          >
            {" "}
            ATIK
          </Link>{" "}
          PREMIUM E-COMMERCE SOLUTIONS.
        </p>

        {/* Right Section: Payment Method Logos */}
        <div className="">
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

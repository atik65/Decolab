"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    // isVisible && (
    //   <button
    //     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    //     className="fixed bottom-[50px] right-[50px] h-[50px] w-[50px] bg-blue-500 text-white p-3 rounded-full shadow-lg"
    //   >
    //     ↑
    //   </button>
    // )

    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`z-50 fixed bottom-[50px] right-[50px] h-[40px] w-[40px] bg-[#FFFCC7] border-2 border-[#CFB284] rounded-full  transform grid place-items-center shadow-lg  ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-80"
      } duration-200 ease-in-out`}
    >
      <Image
        src={"/images/icons/up-arrow.svg"}
        alt="Scroll to Top"
        width={100}
        height={100}
        className="object-contain w-[23px] h-[23px]"
        quality={100}
      />
    </button>
  );
}

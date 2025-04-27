"use client";

import { useState, useEffect } from "react";
// import { MdArrowUpward } from "react-icons/md";
import dynamic from "next/dynamic";

const MdArrowUpward = dynamic(() =>
  import("react-icons/md").then((mod) => mod.MdArrowUpward)
);

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
      className={`z-50 fixed bottom-[50px] right-[50px] h-[40px] w-[40px] bg-[#e1fae0] border-2 border-[#99b998] rounded-full  transform grid place-items-center shadow-lg  ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-80"
      } duration-200 ease-in-out`}
    >
      <MdArrowUpward fill="#99b998" className="h-6 w-6" />
    </button>
  );
}

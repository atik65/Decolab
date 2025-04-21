import Image from "next/image";
import React from "react";

const FloatingWP = () => {
  return (
    <div>
      {" "}
      {/* for call to whatsapp floating button */}
      <div className="whatsapp-booking animate-bounce">
        <a
          href="https://api.whatsapp.com/send?phone=96567059197"
          className="text-decoration-none"
          target="_blank"
        >
          <Image
            height="60"
            width="60"
            id="whatsapp-icon"
            src="https://img.icons8.com/color/48/000000/whatsapp--v2.png"
            alt="whatsapp logo"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
};

export default FloatingWP;

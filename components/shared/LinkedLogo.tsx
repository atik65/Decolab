import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface LinkedLogoProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href"
> {
  href?: string;
  logoSrc?: string;
  altText?: string;
  width?: number;
  height?: number;
  imgClassName?: string;
  containerClassName?: string;
}

export const LinkedLogo = React.forwardRef<HTMLAnchorElement, LinkedLogoProps>(
  (
    {
      logoSrc = "/images/logo.svg",
      altText = "Decolab",
      width = 140,
      height = 50,
      imgClassName,
      containerClassName,
      className,
      href = "/",
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-block transition-all duration-300 hover:opacity-80 relative group",
          containerClassName || className,
        )}
        {...props}
      >
        <Image
          src={logoSrc}
          alt={altText}
          width={width}
          height={height}
          className={cn(
            "object-contain transition-transform duration-300 group-hover:scale-105",
            imgClassName,
          )}
        />
      </Link>
    );
  },
);

LinkedLogo.displayName = "LinkedLogo";

export default LinkedLogo;

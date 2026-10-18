"use client";

import Image from "next/image";
import { useState } from "react";

interface SmartImageProps {
  src?: string | null;
  fallback: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Fills its (positioned) parent. Remote API images skip the Next optimizer
 * (same as ProductCard) and fall back to a local photo if they fail to load.
 */
const SmartImage = ({
  src,
  fallback,
  alt,
  sizes,
  priority,
  className,
}: SmartImageProps) => {
  const [failed, setFailed] = useState(false);
  const real = failed || !src ? fallback : src;
  const remote = /^https?:\/\//.test(real);

  return (
    <Image
      key={real}
      src={real}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={remote}
      className={className ?? "object-cover"}
      onError={() => setFailed(true)}
    />
  );
};

export default SmartImage;

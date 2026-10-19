"use client";

import { ReactNode } from "react";
import SmartImage from "../../home/cinematic/SmartImage";
import { fallbackImages } from "../../home/cinematic/content";
import { money } from "./checkoutUtils";

export interface LineProps {
  title: string;
  image?: string;
  options: string[];
  price: number;
  quantity: number;
  index: number;
  /** quantity stepper / remove button (cart only) */
  controls?: ReactNode;
  /** makes the photo and title open the product */
  onOpen?: () => void;
}

/** One order line: photo, title, option list, price. Shared by checkout, success and failed pages. */
export const OrderLine = ({ title, image, options, price, quantity, index, controls, onOpen }: LineProps) => (
  <li className="cn-co-line">
    <div className="cn-co-thumb" data-link={onOpen ? "true" : undefined} onClick={onOpen}>
      <SmartImage
        src={image}
        fallback={fallbackImages[index % fallbackImages.length]}
        alt={title}
        sizes="96px"
      />
    </div>
    <div className="cn-co-line-body">
      <h3 data-link={onOpen ? "true" : undefined} onClick={onOpen}>
        {title}
      </h3>
      {options.length > 0 && <p dir="auto">{options.join(" · ")}</p>}
      {controls ? (
        controls
      ) : (
        <span className="cn-co-qty-ro" lang="en">
          × {quantity}
        </span>
      )}
    </div>
    <b className="cn-co-line-price" lang="en">
      {money(price * quantity)}
      <small>KD</small>
    </b>
  </li>
);

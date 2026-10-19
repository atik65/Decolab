"use client";

import { Minus, Plus, X } from "lucide-react";
import { Locale } from "../../home/cinematic/content";
import { coCopy } from "./checkoutContent";

/** Quantity stepper + remove link for one cart line (checkout summary and the cart sheet). */
const CartControls = ({
  locale,
  quantity,
  onQuantity,
  onRemove,
}: {
  locale: Locale;
  quantity: number;
  onQuantity: (q: number) => void;
  onRemove: () => void;
}) => {
  const t = coCopy[locale];
  return (
    <div className="cn-co-controls">
      <div className="cn-co-stepper" role="group">
        <button type="button" aria-label={t.decrease} disabled={quantity <= 1} onClick={() => onQuantity(quantity - 1)}>
          <Minus size={14} />
        </button>
        <output lang="en">{quantity}</output>
        <button type="button" aria-label={t.increase} onClick={() => onQuantity(quantity + 1)}>
          <Plus size={14} />
        </button>
      </div>
      <button type="button" className="cn-co-remove" onClick={onRemove}>
        <X size={13} />
        {t.remove}
      </button>
    </div>
  );
};

export default CartControls;

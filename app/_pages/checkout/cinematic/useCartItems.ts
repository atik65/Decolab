"use client";

import { useCallback, useEffect, useState } from "react";
import cart, { CartItem } from "@/utils/localStorage";

/** Live view of the localStorage cart. `items` is null until the client has read it. */
export function useCartItems() {
  const [items, setItems] = useState<CartItem[] | null>(null);

  const load = useCallback(() => setItems(cart.getAllProducts()), []);

  useEffect(() => {
    load();
    window.addEventListener("cart-updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("cart-updated", load);
      window.removeEventListener("storage", load);
    };
  }, [load]);

  const total = (items ?? []).reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = (items ?? []).reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    total,
    count,
    setQuantity: (index: number, q: number) => q >= 1 && cart.updateQuantity(index, q),
    remove: (index: number) => cart.removeProduct(index),
  };
}

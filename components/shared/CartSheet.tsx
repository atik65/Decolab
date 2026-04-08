"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import cart, { CartItem } from "@/utils/localStorage";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const CartSheet = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const router = useRouter();

  const loadCart = () => {
    setItems(cart.getAllProducts());
  };

  useEffect(() => {
    loadCart();
    // Listen for cart-updated event (from addProduct, etc.)
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      cart.updateQuantity(index, newQuantity);
    }
  };

  const handleRemove = (index: number) => {
    cart.removeProduct(index);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group">
          <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-black" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#189CD9] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 !font-roboto">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#189CD9]" />
            {locale === "en" ? "Shopping Cart" : "سلة التسوق"}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({items.length} {locale === "en" ? "items" : "عناصر"})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {locale === "en" ? "Your cart is empty" : "سلة التسوق فارغة"}
                </p>
                <p className="text-sm text-gray-500">
                  {locale === "en"
                    ? "Looks like you haven't added anything yet."
                    : "يبدو أنك لم تضف أي شيء بعد."}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/shop");
                }}
                className="mt-4"
              >
                {locale === "en" ? "Start Shopping" : "ابدأ التسوق"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex gap-4 group"
                >
                  <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        N/A
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-gray-900 truncate text-sm sm:text-base">
                          {item.productTitle}
                        </h4>
                        <button
                          onClick={() => handleRemove(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-tight mt-0.5">
                        {item.category}
                      </p>

                      {/* Compact customizations */}
                      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                        {item.size && (
                          <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            {item.size.title}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                            {item.color.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg h-8">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(index, item.quantity - 1)
                          }
                          className="px-2 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(index, item.quantity + 1)
                          }
                          className="px-2 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-bold text-[#1489C1] text-sm">
                        KD {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 border-t bg-gray-50/50 flex-col gap-4 sm:flex-col">
            <div className="space-y-1.5 w-full">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{locale === "en" ? "Subtotal" : "المجموع الفرعي"}</span>
                <span>KD {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900">
                  {locale === "en" ? "Total" : "الإجمالي"}
                </span>
                <span className="text-2xl font-bold text-[#1489C1]">
                  KD {total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#189CD9] to-[#1182B5] hover:from-[#1489C1] hover:to-[#0B76A8] duration-300 shadow-lg transition-all ">
                {locale === "en" ? "Proceed to Checkout" : "الذهاب للدفع"}
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

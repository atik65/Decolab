"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetLocale } from "@/hooks/useGetLocale";
import Image from "next/image";
import { useState } from "react";
import { ProductDetails } from "@/types/api/products";
import { cn } from "@/lib/utils";

// const designs = [
//   {
//     id: 1,
//     image: "/images/products/design/design1.avif",
//     name: "Design 1",
//   },
//   {
//     id: 2,
//     image: "/images/products/design/design2.avif",
//     name: "Design 2",
//   },
//   {
//     id: 3,
//     image: "/images/products/design/design3.avif",
//     name: "Design 1",
//   },
//   {
//     id: 4,
//     image: "/images/products/design/design4.avif",
//     name: "Design 2",
//   },
//   {
//     id: 5,
//     image: "/images/products/design/design5.webp",
//     name: "Design 2",
//   },
// ];

const DesignSelection = ({
  product,
  // values,
  setFieldValue,
  errors,
  touched,
}: {
  product: ProductDetails;
  values: { design: string };
  setFieldValue: (field: string, value: unknown) => void;
  errors: { design?: string };
  touched: { design?: boolean };
}) => {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const locale = useGetLocale();

  const handleDesignSelect = (designId: number) => {
    setSelectedDesign(designId);
  };

  return (
    <div>
      {/* accordion */}
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={cn(locale === "ar" && "flex-row-reverse")}
          >
            {" "}
            <label
              htmlFor="size"
              className={cn(
                "block text-sm font-bold text-gray-700 space-x-1",
                locale === "ar" && "text-right w-full px-2",
              )}
            >
              <strong>
                {locale === "en" ? "Select Design" : "اختر التصميم"}
              </strong>
              <strong className="text-red-500">*</strong>
            </label>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={cn(
                "grid grid-cols-2 sm:grid-cols-3 gap-5 p-1",
                locale === "ar" && "[direction:rtl]",
              )}
            >
              {product?.designs?.map((design) => {
                const isSelected = selectedDesign === design.id;
                return (
                  <div
                    key={design.id}
                    onClick={() => {
                      setFieldValue("design", design.id.toString());
                      handleDesignSelect(Number(design.id));
                    }}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-[#189CD9] ring-offset-2 scale-100"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      height={300}
                      width={300}
                      alt={design.name}
                      src={
                        design?.url || "/images/products/design/design1.avif"
                      }
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#189CD9]/10 rounded-lg" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {errors?.design && touched?.design && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.design as string}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DesignSelection;

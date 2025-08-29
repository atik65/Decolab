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

// const fonts = [
//   {
//     id: 1,
//     image: "/images/products/fonts/f1.avif",
//     name: "Font 1",
//   },
//   {
//     id: 2,
//     image: "/images/products/fonts/f2.avif",
//     name: "Font 2",
//   },
//   {
//     id: 3,
//     image: "/images/products/fonts/f3.avif",
//     name: "Font 3",
//   },
//   {
//     id: 4,
//     image: "/images/products/fonts/f4.avif",
//     name: "Font 4",
//   },
//   {
//     id: 5,
//     image: "/images/products/fonts/f5.avif",
//     name: "Font 5",
//   },
//   {
//     id: 6,
//     image: "/images/products/fonts/f6.avif",
//     name: "Font 6",
//   },
//   {
//     id: 7,
//     image: "/images/products/fonts/f7.avif",
//     name: "Font 7",
//   },
//   {
//     id: 8,
//     image: "/images/products/fonts/f8.avif",
//     name: "Font 8",
//   },
//   {
//     id: 9,
//     image: "/images/products/fonts/f9.avif",
//     name: "Font 9",
//   },
// ];

const FontSelection = ({
  product,
  // values,
  setFieldValue,
  errors,
  touched,
}: {
  product: ProductDetails;
  values: { font: string };
  setFieldValue: (field: string, value: unknown) => void;
  errors: { font?: string };
  touched: { font?: boolean };
}) => {
  const [selectedFont, setSelectedFont] = useState<number | null>(null);
  const locale = useGetLocale();

  const handleFontSelect = (fontId: number) => {
    setSelectedFont(fontId);
  };

  return (
    <div>
      {/* accordion */}
      <Accordion type="single" collapsible defaultValue="font">
        <AccordionItem value="font">
          <AccordionTrigger className="">
            {" "}
            <label
              htmlFor="size"
              className="block text-sm font-bold text-gray-700"
            >
              {locale === "en" ? "Select Font" : "اختر الخط"}{" "}
              <span className="text-red-500">*</span>
            </label>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-1">
              {product?.fonts?.map((font) => {
                const isSelected = selectedFont === font.id;
                return (
                  <div
                    key={font.id}
                    onClick={() => {
                      handleFontSelect(font.id);
                      setFieldValue("font", font.id.toString());
                    }}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-[#87A786] ring-offset-2 scale-100"
                        : "hover:scale-105"
                    }`}
                  >
                    <Image
                      height={300}
                      width={300}
                      alt={font.name}
                      src={font?.url}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#87A786]/10 rounded-lg" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {errors?.font && touched?.font && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.font as string}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FontSelection;

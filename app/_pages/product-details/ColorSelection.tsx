"use client";
import { useGetLocale } from "@/hooks/useGetLocale";
import { useState } from "react";
import { ProductDetails } from "@/types/api/products";
import { cn } from "@/lib/utils";

interface Color {
  name: string;
  colorCode: string;
}
// Define the list of colors
// const colors: Color[] = [
//   { name: "Black", colorCode: "#000000" },
//   { name: "Brown", colorCode: "#8B4513" },
//   { name: "Gray", colorCode: "#808080" },
//   { name: "dark blue", colorCode: "#000080" },
//   { name: "light blue", colorCode: "#ADD8E6" },
//   { name: "light green", colorCode: "#90EE90" },
//   { name: "red", colorCode: "#FF0000" },
//   { name: "yellow", colorCode: "#FFFF00" },
// ];

// Color selection
export const ColorOptions = ({
  product,
  values,
  setFieldValue,
  errors,
  touched,
}: {
  product: ProductDetails;
  values: { color: string };
  setFieldValue: (field: string, value: unknown) => void;
  errors: { color?: string };
  touched: { color?: boolean };
}) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const locale = useGetLocale();

  // const handleColorSelect = (color: Color) => {
  //   setSelectedColor(color);
  // };

  return (
    <div className="">
      <label
        // htmlFor="color"
        className="text-sm  mb-2 font-bold text-gray-700 space-x-1 "
      >
        <strong>{locale === "en" ? "Colors" : "الألوان"}</strong>
        <strong className="text-red-500">*</strong>
      </label>
      <div
        className={cn(
          "flex flex-wrap gap-2 mt-1",
          locale === "ar" && "flex-row-reverse",
        )}
      >
        {product.colors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => {
              setFieldValue("color", color.id);
              setSelectedColor(color);
            }}
            className={cn(
              "group relative flex items-center gap-3 pr-4 rounded-full border transition-all duration-300 active:scale-95",
              values.color == color.id.toString()
                ? "border-[#189CD9] bg-[#189CD9]/5 shadow-sm"
                : "border-gray-200 bg-white hover:border-[#189CD9]/50 shadow-none hover:shadow-xs",
            )}
          >
            {/* Color Swatch / Check Container */}
            <div
              className={cn(
                "relative w-10 h-8 flex items-center justify-center transition-transform duration-300",
                locale === "ar" ? "rounded-l-full" : "rounded-l-full",
                values.color == color.id.toString() && "scale-105",
              )}
              style={{ backgroundColor: color.colorCode }}
            >
              {values.color == color.id.toString() && (
                <div className={cn(
                  "absolute inset-0 bg-black/20 flex items-center justify-center",
                  locale === "ar" ? "rounded-l-full" : "rounded-l-full"
                )}>
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <span
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                values.color == color.id.toString()
                  ? "text-[#189CD9]"
                  : "text-gray-600 group-hover:text-gray-900",
              )}
            >
              {color.name}
            </span>

            {/* Active Indicator Dot (Optional Premium Touch) */}
            {values.color == color.id.toString() && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#189CD9] rounded-full border-2 border-white animate-in zoom-in duration-300" />
            )}
          </button>
        ))}
      </div>

      {errors.color && touched.color && (
        <div className="text-red-500 text-xs mt-1">{errors.color}</div>
      )}

      {/* Selected Color Chip */}
      {selectedColor && (
        <div
          style={{
            borderColor: selectedColor.colorCode,
          }}
          className={cn(
            "mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border",
            locale === "ar" && "flex-row-reverse",
          )}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedColor.colorCode }}
          />
          <span className="text-sm text-gray-600">
            {locale === "en" ? "Selected" : "تم اختيار"}: {selectedColor.name}
          </span>
        </div>
      )}
    </div>
  );
};

// Define the list of light colors
// const lightColors: Color[] = [
//   { name: "white", colorCode: "#FFFFFF" },
//   { name: "light gray", colorCode: "#D3D3D3" },
//   { name: "light blue", colorCode: "#ADD8E6" },
//   { name: "light green", colorCode: "#90EE90" },
//   { name: "light yellow", colorCode: "#FFFFE0" },
//   { name: "light pink", colorCode: "#FFB6C1" },
//   { name: "light red", colorCode: "#FF0000" },
//   { name: "light orange", colorCode: "#FFA500" },
//   { name: "light purple", colorCode: "#C19AED" },
//   { name: "light brown", colorCode: "#A52A2A" },
// ];

// Light Color selection

export const LightColorOptions = ({
  product,
  values,
  setFieldValue,
  errors,
  touched,
}: {
  product: ProductDetails;
  values: { lightColor: string };
  setFieldValue: (field: string, value: unknown) => void;
  errors: { lightColor?: string };
  touched: { lightColor?: boolean };
}) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const locale = useGetLocale();

  // const handleColorSelect = (color: Color) => {
  //   setSelectedColor(color);
  // };

  return (
    <div className="">
      <h3 className="mb-2 text-sm font-bold text-gray-700 space-x-1">
        <strong>{locale === "en" ? "Light Colors" : "ألوان الإضاءة"}</strong>
        <strong className="text-red-500">*</strong>
      </h3>
      <div
        className={cn(
          "flex flex-wrap gap-2 mt-1",
          locale === "ar" && "flex-row-reverse",
        )}
      >
        {product.lightColors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => {
              setFieldValue("lightColor", color.id);
              setSelectedColor(color);
            }}
            className={cn(
              "group relative flex items-center gap-3 pr-4 rounded-full border transition-all duration-300 active:scale-95",
              values.lightColor == color.id.toString()
                ? "border-[#87A786] bg-[#87A786]/5 shadow-sm"
                : "border-gray-200 bg-white hover:border-[#87A786]/50 shadow-none hover:shadow-xs",
            )}
          >
            {/* Swatch with Glow Effect for Light Colors */}
            <div
              className={cn(
                "relative w-10 h-8 flex items-center justify-center transition-all duration-300",
                locale === "ar" ? "rounded-r-full" : "rounded-l-full",
                values.lightColor == color.id.toString() && "scale-105",
              )}
              style={{
                backgroundColor: color.colorCode,
                boxShadow: values.lightColor == color.id.toString() ? `0 0 10px ${color.colorCode}80` : 'none'
              }}
            >
              {values.lightColor == color.id.toString() && (
                <div className={cn(
                  "absolute inset-0 bg-black/10 flex items-center justify-center",
                  locale === "ar" ? "rounded-r-full" : "rounded-l-full"
                )}>
                  <svg
                    className={cn(
                      "w-4 h-4",
                      color.colorCode.toLowerCase() === '#ffffff' ? "text-black" : "text-white"
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <span
              className={cn(
                "text-sm font-semibold transition-colors duration-300",
                values.lightColor == color.id.toString()
                  ? "text-[#87A786]"
                  : "text-gray-600 group-hover:text-gray-900",
              )}
            >
              {color.name}
            </span>

            {values.lightColor == color.id.toString() && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#87A786] rounded-full border-2 border-white animate-in zoom-in duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* error message */}
      {errors.lightColor && touched.lightColor && (
        <div className="text-red-500 text-xs mt-1">{errors.lightColor}</div>
      )}

      {/* Selected Color Chip */}
      {selectedColor && (
        <div
          style={{
            borderColor: selectedColor.colorCode,
          }}
          className={cn(
            "mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border",
            locale === "ar" && "flex-row-reverse",
          )}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: selectedColor.colorCode,
              borderColor: "#87A786",
              borderWidth: "1px",
            }}
          />
          <span className="text-sm text-gray-600">
            {locale === "en" ? "Selected" : "تم اختيار"}: {selectedColor.name}
          </span>
        </div>
      )}
    </div>
  );
};

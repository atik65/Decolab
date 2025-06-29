import { useGetLocale } from "@/hooks/useGetLocale";
import { ProductLN } from "@/types/product";
import { useState } from "react";

interface Color {
  name: string;
  colorCode: string;
}
// Define the list of colors
const colors: Color[] = [
  { name: "Black", colorCode: "#000000" },
  { name: "Brown", colorCode: "#8B4513" },
  { name: "Gray", colorCode: "#808080" },
  { name: "dark blue", colorCode: "#000080" },
  { name: "light blue", colorCode: "#ADD8E6" },
  { name: "light green", colorCode: "#90EE90" },
  { name: "red", colorCode: "#FF0000" },
  { name: "yellow", colorCode: "#FFFF00" },
];

// Color selection
export const ColorOptions = ({ product }: { product: ProductLN }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const locale = useGetLocale();

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <h3 className="text-sm  mb-2 font-bold text-gray-700">
        {locale === "en" ? "Colors" : "اللون"}
      </h3>
      <div className="flex flex-wrap gap-2">
        {product.colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorSelect(color)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border hover:border-[#87A786] transition-colors ${
              selectedColor?.name === color.name
                ? "border-[#87A786]"
                : "border-gray-200"
            }`}
          >
            {selectedColor?.name === color.name ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color.colorCode }}
              />
            )}
            <span className="text-sm">{color.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Color Chip */}
      {selectedColor && (
        <div
          style={{
            borderColor: selectedColor.colorCode,
          }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border "
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedColor.colorCode }}
          />
          <span className="text-sm text-gray-600">
            Selected: {selectedColor.name}
          </span>
        </div>
      )}
    </div>
  );
};

// Define the list of light colors
const lightColors: Color[] = [
  { name: "white", colorCode: "#FFFFFF" },
  { name: "light gray", colorCode: "#D3D3D3" },
  { name: "light blue", colorCode: "#ADD8E6" },
  { name: "light green", colorCode: "#90EE90" },
  { name: "light yellow", colorCode: "#FFFFE0" },
  { name: "light pink", colorCode: "#FFB6C1" },
  { name: "light red", colorCode: "#FF0000" },
  { name: "light orange", colorCode: "#FFA500" },
  { name: "light purple", colorCode: "#C19AED" },
  { name: "light brown", colorCode: "#A52A2A" },
];

// Light Color selection

export const LightColorOptions = ({ product }: { product: ProductLN }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const locale = useGetLocale();

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <h3 className="mb-2 text-sm font-bold text-gray-700">
        {locale === "en" ? "Light Colors" : "اللونات الخفيفة"}
      </h3>
      <div className="flex flex-wrap gap-2">
        {product.lightColors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorSelect(color)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border hover:border-[#87A786] transition-colors ${
              selectedColor?.name === color.name
                ? "border-[#87A786]"
                : "border-gray-200"
            }`}
          >
            {selectedColor?.name === color.name ? (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: color.colorCode,
                }}
              />
            )}
            <span className="text-sm">{color.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Color Chip */}
      {selectedColor && (
        <div
          style={{
            borderColor: selectedColor.colorCode,
          }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border"
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
            Selected: {selectedColor.name}
          </span>
        </div>
      )}
    </div>
  );
};

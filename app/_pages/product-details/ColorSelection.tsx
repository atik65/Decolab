import { useState } from "react";

interface Color {
  name: string;
  hexCode: string;
}
// Define the list of colors
const colors: Color[] = [
  { name: "Black", hexCode: "#000000" },
  { name: "Brown", hexCode: "#8B4513" },
  { name: "Gray", hexCode: "#808080" },
  { name: "dark blue", hexCode: "#000080" },
  { name: "light blue", hexCode: "#ADD8E6" },
  { name: "light green", hexCode: "#90EE90" },
  { name: "red", hexCode: "#FF0000" },
  { name: "yellow", hexCode: "#FFFF00" },
];

// Color selection
export const ColorOptions = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <h3 className="text-sm  mb-2 font-bold text-gray-700">Colors</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
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
                style={{ backgroundColor: color.hexCode }}
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
            borderColor: selectedColor.hexCode,
          }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border "
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedColor.hexCode }}
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
  { name: "white", hexCode: "#FFFFFF" },
  { name: "light gray", hexCode: "#D3D3D3" },
  { name: "light blue", hexCode: "#ADD8E6" },
  { name: "light green", hexCode: "#90EE90" },
  { name: "light yellow", hexCode: "#FFFFE0" },
  { name: "light pink", hexCode: "#FFB6C1" },
  { name: "light red", hexCode: "#FF0000" },
  { name: "light orange", hexCode: "#FFA500" },
  { name: "light purple", hexCode: "#C19AED" },
  { name: "light brown", hexCode: "#A52A2A" },
];

// Light Color selection

export const LightColorOptions = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <h3 className="mb-2 text-sm font-bold text-gray-700">Light Colors</h3>
      <div className="flex flex-wrap gap-2">
        {lightColors.map((color) => (
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
                  backgroundColor: color.hexCode,
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
            borderColor: selectedColor.hexCode,
          }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full font-bold border"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: selectedColor.hexCode,
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

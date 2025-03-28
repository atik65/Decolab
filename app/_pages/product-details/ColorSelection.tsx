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
  { name: "Multicolor", hexCode: "#F0E68C" }, // Example multicolor
];

// Color selection
export const ColorOptions = () => {
  // State to track the selected color with proper typing
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // Function to handle color selection
  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <div>
        {/* Color Selection Section */}
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2 mt-2">
            {/* Render each color square */}
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`h-7 w-7  cursor-pointer ${
                  selectedColor?.name === color.name
                    ? "border-2 border-[#87A786]"
                    : ""
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color.hexCode }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Display the selected color (optional) */}
        {selectedColor && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700">
              Selected Color: {selectedColor.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Light Color selection

export const LightColorOptions = () => {
  // State to track the selected color with proper typing
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  // Function to handle color selection
  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="">
      <div>
        {/* Color Selection Section */}
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Light Color <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2 mt-2">
            {/* Render each color square */}
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`h-7 w-7  cursor-pointer ${
                  selectedColor?.name === color.name
                    ? "border-2 border-[#87A786]"
                    : ""
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color.hexCode }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Display the selected color (optional) */}
        {selectedColor && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700">
              Selected Light Color: {selectedColor.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

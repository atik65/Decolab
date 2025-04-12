import { X } from "lucide-react";
import React from "react";

interface FiltersProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const Filters = ({ show, setShow }: FiltersProps) => {
  return (
    <div className="bg-white  w-full ">
      {/* line */}
      <div
        className={`${show ? "opacity-100" : "opacity-0"} h-[1px] bg-gray-200 `}
      ></div>

      {/* Main Container with Fixed Height */}
      <div
        className={`${
          show ? "lg:h-[250px] py-5 opacity-100" : "h-0 py-0 opacity-0 "
        } duration-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full`}
      >
        {/* Column 1: Sort By */}
        <div className="w-full rounded overflow-y-hidden h-full">
          <h3 className="text-lg font-semibold mb-2">SORT BY</h3>
          <ul>
            <li className="mb-1">Default</li>
            <li className="mb-1">Popularity</li>
            <li className="mb-1">Average rating</li>
            <li className="mb-1">Newness</li>
            <li className="mb-1">Price: low to high</li>
            <li className="mb-1">Price: high to low</li>
          </ul>
        </div>

        {/* Column 2: Price Filter */}
        <div className="w-full p-4 rounded overflow-y-hidden h-full">
          <h3 className="text-lg font-semibold mb-2">PRICE FILTER</h3>
          <ul>
            <li className="mb-1">$0.00 - $2,050.00</li>
            <li className="mb-1">$2,050.00 - $4,100.00</li>
            <li className="mb-1">$4,100.00 - $6,150.00</li>
            <li className="mb-1">$6,150.00 - $8,200.00</li>
          </ul>
        </div>

        {/* Column 3: Filter by Color */}
        <div className="w-full p-4 rounded overflow-y-hidden h-full">
          <h3 className="text-lg font-semibold mb-2">FILTER BY COLOR</h3>
          <ul>
            <li className="flex items-center mb-1">
              <div className="w-4 h-4 bg-beige rounded-full mr-2"></div>
              Beige
              <span className="ml-auto text-sm bg-gray-200 px-1 rounded">
                14
              </span>
            </li>
            <li className="flex items-center mb-1">
              <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
              Black
              <span className="ml-auto text-sm bg-gray-200 px-1 rounded">
                36
              </span>
            </li>
            <li className="flex items-center mb-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              Blue
              <span className="ml-auto text-sm bg-gray-200 px-1 rounded">
                23
              </span>
            </li>
            <li className="flex items-center mb-1">
              <div className="w-4 h-4 bg-brown rounded-full mr-2"></div>
              Brown
              <span className="ml-auto text-sm bg-gray-200 px-1 rounded">
                18
              </span>
            </li>
            <li className="flex items-center mb-1">
              <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
              Gray
              <span className="ml-auto text-sm bg-gray-200 px-1 rounded">
                29
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: Filter by Brand */}
        <div className="w-full  p-4 rounded  h-full overflow-y-hidden">
          <h3 className="text-lg font-semibold mb-2">FILTER BY BRAND</h3>
          <ul className="h-[250px] overflow-y-auto">
            <li className="mb-1">FLOS</li>
            <li className="mb-1">HAY</li>
            <li className="mb-1">Joseph Joseph</li>
            <li className="mb-1">KLOBER</li>
            <li className="mb-1">louis poulsen</li>
            <li className="mb-1">magisso</li>
            <li className="mb-1">NICHE</li>
            <li className="mb-1">PACKIT</li>
            <li className="mb-1">Roshults</li>
            <li className="mb-1">vitra.</li>
          </ul>
        </div>
      </div>

      {/* line */}
      <div
        className={`${
          show ? "opacity-100 mb-4" : "opacity-0 mb-0"
        } h-[1px] bg-gray-200 `}
      ></div>

      {/* clear filters */}
      <div className=" flex items-center gap-4 font-bold  ">
        <div className="flex items-center space-x-1">
          <span>
            <X size={16} />
          </span>
          <button className="text-sm">Clear Filters</button>
        </div>

        {/* vertical line */}
        <div className="h-[20px] w-[1px] bg-gray-200"></div>

        {/* reset filters */}
        <div className="flex items-center space-x-1 ">
          <span>
            <X size={16} />
          </span>
          <button className="text-sm">Price High to Low</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

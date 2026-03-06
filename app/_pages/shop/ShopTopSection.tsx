"use client";
import React from "react";

import dynamic from "next/dynamic";
const MdGridView = dynamic(() =>
  import("react-icons/md").then((mod) => mod.MdGridView),
);
const MdViewModule = dynamic(() =>
  import("react-icons/md").then((mod) => mod.MdViewModule),
);
const MdApps = dynamic(() =>
  import("react-icons/md").then((mod) => mod.MdApps),
);
const LiaSlidersHSolid = dynamic(() =>
  import("react-icons/lia").then((mod) => mod.LiaSlidersHSolid),
);

import Filters from "./Filters";

const ShopTopSection = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [layout, setLayout] = React.useState<"grid-2" | "grid-3" | "grid-4">(
    "grid-4",
  );

  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Breadcrumb */}
        <nav className="mb-0">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <a href="#" className="text-gray-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="text-black hover:underline">
                Shop
              </a>
            </li>
          </ol>
        </nav>

        {/* Pagination and Filters */}
        <div className="flex justify-between md:justify-end gap-8 items-center mb-0">
          <div className="flex items-center space-x-2 text-sm">
            <span>Show:</span>
            <button className="cursor-pointer">9</button>
            <span>/</span>
            <button className="cursor-pointer">10</button>
            <span>/</span>
            <button className="font-bold cursor-pointer">18</button>
            <span>/</span>
            <button className="cursor-pointer">24</button>
          </div>
          <div className="flex items-center space-x-6">
            {/* grid layout selection */}
            <div className="flex items-center space-x-2">
              <button className="cursor-pointer" title="Grid View">
                <MdGridView className="h-5 w-5" />
              </button>
              <button className="cursor-pointer" title="Module View">
                <MdViewModule className="h-5 w-5" />
              </button>
              <button className="cursor-pointer" title="Compact View">
                <MdApps className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-5">
              {/* filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center cursor-pointer space-x-1"
              >
                <LiaSlidersHSolid className="h-5 w-5" />
                <span className="font-bold ">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Options */}
      <div
        className={`${showFilters ? "mb-7 mt-5" : "mb-7 mt-2  "} duration-300`}
      >
        <Filters
          show={showFilters}
          categoryName=""
          totalItems={0}
          layout={layout}
          setLayout={setLayout}
        />
      </div>
    </div>
  );
};

export default ShopTopSection;

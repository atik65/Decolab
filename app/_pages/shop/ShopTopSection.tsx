"use client";
import React from "react";
import { MdGridView, MdViewModule, MdApps } from "react-icons/md";
import { LiaSlidersHSolid } from "react-icons/lia";
import Filters from "./Filters";

const ShopTopSection = () => {  
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div>
      {" "}
      {/* Top Mini Banner */}
      {/* <nav className="bg-gray-100 text-gray-600 py-2 mb-6">
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdMusicNote className="h-5 w-5" />
              <span>ALBUMS</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdCheckroom className="h-5 w-5" />
              <span>CLOTHING</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdLocalOffer className="h-5 w-5" />
              <span>ACCESSORIES</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdPhotoCamera className="h-5 w-5" />
              <span>POSTERS</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdCollections className="h-5 w-5" />
              <span>COLLECTIBLES</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-yellow-400"
            >
              <MdFavorite className="h-5 w-5" />
              <span>LIMITED EDITION</span>
            </a>
          </li>
        </ul>
      </nav> */}
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
            {/* <li>/</li> */}
            {/* <li>Page 3</li> */}
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
            {/* <button className="cursor-pointer" title="List View">
              <MdViewList className="h-5 w-5" />
            </button> */}

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
              {/* price range */}
              {/* <button className="flex items-center cursor-pointer space-x-1">
                <CiSliderVertical className="h-5 w-5" />{" "}
                <span className="font-bold ">Price </span>
              </button> */}
              {/* sort by */}
              {/* <button className="flex items-center cursor-pointer space-x-1">
                <BsSortUp className="h-5 w-5" />
                <span className="font-bold ">Sort by</span>
              </button> */}

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
        <Filters show={showFilters} setShow={setShowFilters} />
      </div>
    </div>
  );
};

export default ShopTopSection;

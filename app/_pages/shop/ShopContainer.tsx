import React from "react";
import ProductCard from "@/components/shared/product/ProductCard";
import {
  MdMusicNote,
  MdCheckroom,
  MdLocalOffer,
  MdPhotoCamera,
  MdCollections,
  MdFavorite,
  MdViewList,
  MdGridView,
  MdViewModule,
  MdApps,
  MdFilterList,
} from "react-icons/md";

const ShopContainer = () => {
  // Mock data for products
  // const products = [
  //   {
  //     id: 1,
  //     image: "/images/watch.jpg",
  //     title: "Smart watches wood edition",
  //     categories: ["Accessories", "Clocks"],
  //     price: "$359.00",
  //     isHot: false,
  //     rating: 0,
  //   },
  //   {
  //     id: 2,
  //     image: "/images/penguin.jpg",
  //     title: "Penatibus parturient orci morbi",
  //     categories: ["Toys"],
  //     price: "$444.00",
  //     isHot: false,
  //     rating: 0,
  //   },
  //   {
  //     id: 3,
  //     image: "/images/bowtie.jpg",
  //     title: "Wooden bow tie man",
  //     categories: ["Accessories"],
  //     price: "$359.00",
  //     isHot: true,
  //     rating: 5,
  //   },
  // ];

  return (
    <div className="container mx-auto px-4">
      {/* Top Mini Banner */}
      <nav className="bg-gray-100 text-gray-600 py-2 mb-6">
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
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Breadcrumb */}
        <nav className="mb-6">
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
        <div className="flex justify-between md:justify-end gap-8 items-center mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <span>Show:</span>
            <button className="px-2 py-1 border rounded bg-gray-200">9</button>
            <button className="px-2 py-1 border rounded bg-gray-200">10</button>
            <button className="px-2 py-1 border rounded bg-gray-200">18</button>
            <button className="px-2 py-1 border rounded bg-gray-200">24</button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 border rounded hover:bg-gray-200"
              title="List View"
            >
              <MdViewList className="h-5 w-5" />
            </button>
            <button
              className="p-2 border rounded hover:bg-gray-200"
              title="Grid View"
            >
              <MdGridView className="h-5 w-5" />
            </button>
            <button
              className="p-2 border rounded hover:bg-gray-200"
              title="Module View"
            >
              <MdViewModule className="h-5 w-5" />
            </button>
            <button
              className="p-2 border rounded hover:bg-gray-200"
              title="Compact View"
            >
              <MdApps className="h-5 w-5" />
            </button>
            <button className="p-2 border rounded hover:bg-gray-200 flex items-center space-x-1">
              <MdFilterList className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShopContainer;

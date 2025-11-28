import { ImageOff, PackageX, AlertCircle } from "lucide-react";
import Link from "next/link";

export const NoImage = () => {
  return (
    <section className="sticky top-20">
      <div className="relative">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[15px] border-2 border-dashed border-gray-300 p-8 md:p-12">
          {/* Main Image Area - No Images */}
          <div className="w-full flex flex-col justify-center items-center mb-8 lg:mb-6 min-h-[300px] sm:min-h-[402px] md:min-h-[402px] lg:min-h-[425px] xl:min-h-[430px] 2xl:min-h-[550px]">
            {/* Icon with animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg">
                <ImageOff
                  size={80}
                  className="text-gray-400"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                No Images Available
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Product images are currently unavailable. Please check back
                later or contact support for assistance.
              </p>
            </div>

            {/* Action Button */}
            <Link
              href="/shop"
              className="mt-6 px-6 py-2.5 bg-[#87A786] hover:bg-[#6d8a6c] text-white font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Browse Other Products
            </Link>
          </div>

          {/* Thumbnail Area - Empty State */}
          <div className="w-full sm:w-[90%] mx-auto">
            <div className="flex gap-2 justify-center opacity-40">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 w-20 md:h-[90px] xl:h-[80px] md:w-40 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center"
                >
                  <ImageOff
                    size={24}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NoDetails = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      {/* Header with Icon */}
      <div className="flex flex-col items-center justify-center py-8 mb-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30"></div>
          <div className="relative bg-red-50 rounded-full p-6 shadow-md">
            <PackageX size={64} className="text-red-400" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn't find the product you're looking for. It may have been
          removed or is temporarily unavailable.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Info Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="text-amber-600 mt-0.5 flex-shrink-0"
          />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">
              What can you do?
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Check the product URL for any typos</li>
              <li>• Browse our shop for similar products</li>
              <li>• Contact our support team for assistance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="flex-1 px-6 py-3 bg-[#87A786] hover:bg-[#6d8a6c] text-white font-semibold rounded-md transition-all duration-200 shadow-sm hover:shadow-md text-center"
        >
          Browse All Products
        </Link>
        <Link
          href="/"
          className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md transition-all duration-200 text-center"
        >
          Go to Homepage
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@onedirection.com"
            className="text-[#87A786] hover:underline font-medium"
          >
            support@onedirection.com
          </a>
        </p>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Input, TextArea } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { enqueueSnackbar } from "notistack";
import { GiPayMoney } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useOrderStore } from "@/hooks/zustand/useOrderStore";
import { useCreateOrder } from "@/hooks/tanstack/useOrder";
import { Loader } from "lucide-react";
import { useRouter } from "@bprogress/next";
import createSheetOrder, { Payload } from "@/lib/createSheetOrder";
import { useGetProductDetails } from "@/hooks/tanstack/useProducts";
import {
  Color,
  Design,
  Font,
  LightColor,
  ProductDetails,
  Size,
} from "@/types/api/products";
// import { useOrderStore } from "@/hooks/zustand/useOrderStore";
// import { products } from "@/data/research-product";
// import axios from "axios";

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone number is required"),
  // email: Yup.string().email("Invalid email address"),
  // country: Yup.string().required("Country is required"),
  firstName: Yup.string().required("First name is required"),
  // lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  // apartment: Yup.string().required("Apartment is required"),
  // city: Yup.string().required("City is required"),
});

export interface OrderInfo {
  checkoutInfo: {
    phone?: string;
    email?: string;
    country?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    apartment?: string;
    city?: string;
    postalCode?: string;
  };
  productInfo: {
    name?: string;
    size?: string;
    digitCount?: number;
    color?: string;
    lightColor?: string;
    houseNumber?: string;
    text?: string;
    design?: string;
    font?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
  };
}

const CheckoutForm = () => {
  const { productInfo } = useOrderStore();
  const { data: product } = useGetProductDetails(productInfo?.productId || "");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { mutateAsync, isPending } = useCreateOrder();
  const router = useRouter();

  // console.log("product ", product);

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      phone: "",
      email: "",
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Check if product info exists
      if (!productInfo.productId) {
        enqueueSnackbar("No product selected. Please select a product first.", {
          variant: "error",
          style: {
            backgroundColor: "#c51616",
            color: "white",
          },
        });
        return;
      }

      const payload = {
        productId: productInfo.productId,
        quantity: productInfo.quantity,
        customization: {
          sizeId: productInfo.sizeId,
          colorId: productInfo.colorId,
          lightColorId: productInfo.lightColorId,
          houseNumber: productInfo.houseNumber,
          text: productInfo.text,
          designId: productInfo.designId,
          fontId: productInfo.fontId,
          digitCount: productInfo?.digitCount || 0,
        },
        contact: {
          phoneNumber: values.phone,
          email: values.email,
        },
        delivery: {
          country: values.country,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          apartmentSuite: values.apartment,
          city: values.city,
          postalCode: values.postalCode,
        },
      };

      const enProduct: ProductDetails = product
        ? product["en"]
        : ({} as ProductDetails);

      // Helper functions to find names by ID
      const getSizeTitle = (id: string) =>
        enProduct.sizes?.find((s: Size) => s.id == id)?.title || id;
      const getColorName = (id: string) =>
        enProduct.colors?.find((c: Color) => c.id == id)?.name || id;
      const getLightColorName = (id: string) =>
        enProduct.lightColors?.find((lc: LightColor) => lc.id == id)?.name ||
        id;
      const getDesignName = (id: string) =>
        enProduct.designs?.find((d: Design) => d.id == id)?.name || id;
      const getFontName = (id: string) =>
        enProduct.fonts?.find((f: Font) => f.id == id)?.name || id;
      const sheetPayload: Payload = {
        // Product Info
        productTitle: enProduct.title,
        quantity: payload.quantity,

        // Customization (Mapped to readable values)
        size: getSizeTitle(payload.customization.sizeId),
        color: getColorName(payload.customization.colorId),
        lightColor: getLightColorName(payload.customization.lightColorId),
        houseNumber: payload.customization.houseNumber
          ? Number(payload.customization.houseNumber)
          : undefined,
        // additionalText: payload.customization.text,
        design: getDesignName(payload.customization.designId),
        font: getFontName(payload.customization.fontId),
        digitCount: payload.customization.digitCount
          ? String(payload.customization.digitCount)
          : undefined,

        // Contact Info
        phoneNumber: payload.contact.phoneNumber,
        email: payload.contact.email,

        // Delivery Info
        customerName:
          `${payload.delivery.firstName} ${payload.delivery.lastName}`.trim(),
        address: payload.delivery.address,
        // apartmentSuite: payload.delivery.apartmentSuite,
        // city: payload.delivery.city,
        // country: payload.delivery.country,
        // postalCode: payload.delivery.postalCode,
      };

      // console.log("enProduct:", enProduct);
      // console.log("product info:", productInfo);
      console.log("payload:", payload);
      console.log("sheetPayload:", sheetPayload);
      // return;

      try {
        setIsSubmitting(true);
        const response = await mutateAsync(payload);
        console.log(response);

        const res = await createSheetOrder(sheetPayload);
        console.log("Sheet order created:", res);

        enqueueSnackbar("Order placed successfully", {
          variant: "success",
          style: {
            backgroundColor: "#87A786",
            color: "white",
          },
        });

        router.push("/");
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Order placed failed", {
          variant: "error",
          style: {
            backgroundColor: "#c51616",
            color: "white",
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-[#87A786]/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#87A786]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
        </div>

        {/* phone number */}
        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            placeholder="Enter your phone number"
            name="phone"
            id="phone"
            className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
            onChange={handleChange}
            value={values.phone}
          />

          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.phone}
            </p>
          )}
        </div>
        {/* <div className="mt-4">
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            className="w-full"
            onChange={handleChange}
            value={values.email}
          />

          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div> */}
        {/* <div className="flex items-center gap-2">
          <input type="checkbox" id="newsletter" className="rounded" />
          <label htmlFor="newsletter">Email me with news and offers</label>
        </div> */}
      </div>

      {/* Delivery Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-[#87A786]/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#87A786]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Delivery</h2>
        </div>
        {/* <div>
          <Select
            name="country"
            defaultValue="Kuwait"
            onValueChange={(value) => setFieldValue("country", value)}
            value={values.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kuwait">Kuwait</SelectItem>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Sudan">Sudan</SelectItem>
              <SelectItem value="Morocco">Morocco</SelectItem>
            </SelectContent>
          </Select>

          {errors.country && touched.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div> */}

        {/* first name & last name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* first name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter first name"
              className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
              onChange={handleChange}
              name="firstName"
              id="firstName"
              value={values.firstName}
            />

            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.firstName}
              </p>
            )}
          </div>

          {/* last name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name{" "}
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <Input
              type="text"
              placeholder="Enter last name"
              className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
              onChange={handleChange}
              name="lastName"
              id="lastName"
              value={values.lastName}
            />

            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* address */}
        <div className="mt-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="e.g., Block 5, Street 50, House 25, Hawalli, Kuwait"
            className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
            onChange={handleChange}
            name="address"
            id="address"
            value={values.address}
            rows={3}
          />

          {errors.address && touched.address && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.address}
            </p>
          )}
        </div>

        {/* apartment, suite, etc. */}
        <div className="mt-4">
          <label
            htmlFor="apartment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Apartment, Suite, etc.{" "}
            <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <Input
            type="text"
            placeholder="Apt, Suite, Unit, Building, Floor, etc."
            className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
            onChange={handleChange}
            name="apartment"
            id="apartment"
            value={values.apartment}
          />

          {errors.apartment && touched.apartment && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.apartment}
            </p>
          )}
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Input
              type="text"
              placeholder="City"
              className="w-full"
              onChange={handleChange}
              name="city"
              id="city"
              value={values.city}
            />

            {errors.city && touched.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Postal code (optional)"
              className="w-full"
              onChange={handleChange}
              name="postalCode"
              id="postalCode"
              value={values.postalCode}
            />

            {errors.postalCode && touched.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div> */}

        {/* <div className="mt-4">
          <Select defaultValue="Hawalli">
            <SelectTrigger>
              <SelectValue placeholder="Select governorate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hawalli">Hawalli</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className="pt-6 mt-6 border-t border-gray-200">
          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isPending || isSubmitting}
            className="w-full bg-gradient-to-r from-[#87A786] to-[#6d8a6c] hover:from-[#6d8a6c] hover:to-[#87A786] text-white py-3.5 rounded-lg font-bold flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {!isPending && !isSubmitting ? (
              <>
                <span className="text-base">Place Order</span>
                <GiPayMoney
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </>
            ) : (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#87A786]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#87A786]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;

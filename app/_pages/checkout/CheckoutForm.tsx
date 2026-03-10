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
import { useLocale } from "next-intl";
import { useRouter } from "@bprogress/next";
import { useCreateOrder } from "@/hooks/tanstack/useOrder";
import { Loader } from "lucide-react";
// import createSheetOrder, { Payload } from "@/lib/createSheetOrder";
import { Payload } from "@/lib/createSheetOrder";
// import { products } from "@/data/research-product";
// import axios from "axios";

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone number is required"),
  // email: Yup.string().email("Invalid email address"),
  // country: Yup.string().required("Country is required"),
  firstName: Yup.string().required("First name is required"),
  // lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  googleMapsLink: Yup.string().notRequired(),
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
    googleMapsLink?: string;
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

import cart from "@/utils/localStorage";

const CheckoutForm = () => {
  const cartItems = cart.getAllProducts();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isPending, mutateAsync } = useCreateOrder();
  const router = useRouter();
  const locale = useLocale();

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
      googleMapsLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (cartItems.length === 0) {
        enqueueSnackbar("Your cart is empty.", {
          variant: "error",
          style: {
            backgroundColor: "#c51616",
            color: "white",
          },
        });
        return;
      }

      try {
        setIsSubmitting(true);

        // Map cart items to backend format
        const items = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          customization: {
            sizeId: item.size?.id.toString(),
            colorId: item.color?.id.toString(),
            lightColorId: item.lightColor?.id.toString(),
            houseNumber: item.houseNumber,
            text: item.text,
            designId: item.design?.id.toString(),
            fontId: item.font?.id.toString(),
            digitCount: item.digitCount || 0,
          },
        }));

        const payload = {
          items,
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
            googleMapsLink: values.googleMapsLink,
          },
        };

        // Prepare sheet payload for all items (joined or separate, usually joined for summary)
        const sheetPayload: Payload = {
          productTitle: cartItems.map((i) => i.productTitle).join(", "),
          quantity: cartItems.reduce((acc, i) => acc + i.quantity, 0),
          size: cartItems.map((i) => i.size?.title).join(", "),
          color: cartItems.map((i) => i.color?.name).join(", "),
          lightColor: cartItems.map((i) => i.lightColor?.name).join(", "),
          houseNumber: cartItems
            .map((i) => i.houseNumber)
            .filter(Boolean)
            .join(", "),
          design: cartItems.map((i) => i.design?.name).join(", "),
          font: cartItems.map((i) => i.font?.name).join(", "),
          digitCount: cartItems.map((i) => i.digitCount).join(", "),
          phoneNumber: payload.contact.phoneNumber,
          email: payload.contact.email,
          customerName:
            `${payload.delivery.firstName} ${payload.delivery.lastName}`.trim(),
          address: payload.delivery.address,
          googleMapsLink: payload.delivery.googleMapsLink,
        };

        console.log("payload:", payload);
        console.log("sheetPayload:", sheetPayload);

        // await mutateAsync(payload as any); // Type cast if backend expects single item for now, but usually it should be multi
        // const res = await createSheetOrder(sheetPayload);
        // const res = await mutateAsync(payload);
        const res = await mutateAsync(sheetPayload);
        console.log("Sheet order created:", res);

        enqueueSnackbar("Order placed successfully", {
          variant: "success",
          style: {
            backgroundColor: "#87A786",
            color: "white",
          },
        });

        // Clear cart after successful order
        cart.clearCart();
        router.push("/");
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Failed to place order", {
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
          <h2 className="text-2xl font-bold text-gray-800">
            {locale === "ar" ? "معلومات الاتصال" : "Contact Information"}
          </h2>
        </div>

        {/* phone number */}
        <div className="mt-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
            <span className="text-red-500">*</span>
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
          <h2 className="text-2xl font-bold text-gray-800">
            {locale === "ar" ? "معلومات التوصيل" : "Delivery Information"}
          </h2>
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
              {locale === "ar" ? "الاسم الأول" : "First Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder={
                locale === "ar" ? "أدخل الاسم الأول" : "Enter first name"
              }
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
              {locale === "ar" ? "الاسم الأخير" : "Last Name"}{" "}
              <span className="text-gray-400 text-xs">
                ({locale === "ar" ? "اختياري" : "Optional"})
              </span>
            </label>
            <Input
              type="text"
              placeholder={
                locale === "ar" ? "أدخل الاسم الأخير" : "Enter last name"
              }
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
            {locale === "ar" ? "العنوان" : "Address"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder={
              locale === "ar"
                ? "مثال: بلوك 5، شارع 50، منزل 25، حولي، الكويت"
                : "e.g., Block 5, Street 50, House 25, Hawalli, Kuwait"
            }
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
            {locale === "ar" ? "الشقة، الجناح، إلخ." : "Apartment, Suite, etc."}{" "}
            <span className="text-gray-400 text-xs">
              ({locale === "ar" ? "اختياري" : "Optional"})
            </span>
          </label>
          <Input
            type="text"
            placeholder={
              locale === "ar"
                ? "شقة، جناح، وحدة، مبنى، طابق، إلخ."
                : "Apt, Suite, Unit, Building, Floor, etc."
            }
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

        {/* google maps link */}
        <div className="mt-4">
          <label
            htmlFor="googleMapsLink"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {locale === "ar" ? "رابط خرائط جوجل" : "Google Maps Link"}{" "}
            <span className="text-gray-400 text-xs">
              ({locale === "ar" ? "اختياري" : "Optional"})
            </span>
          </label>
          <Input
            type="text"
            placeholder={
              locale === "ar" ? "رابط خرائط جوجل" : "Google Maps Link"
            }
            className="w-full transition-all focus:ring-2 focus:ring-[#87A786]/20"
            onChange={handleChange}
            name="googleMapsLink"
            id="googleMapsLink"
            value={values.googleMapsLink}
          />

          {errors.googleMapsLink && touched.googleMapsLink && (
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
              {errors.googleMapsLink}
            </p>
          )}
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Input
              type="text"
              placeholder={locale === "ar" ? "المدينة" : "City"}
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
                <span className="text-base">
                  {locale === "ar" ? "إتمام الطلب" : "Place Order"}
                </span>
                <GiPayMoney
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </>
            ) : (
              <>
                <Loader className="animate-spin" size={20} />
                <span>
                  {locale === "ar" ? "جارٍ المعالجة..." : "Processing..."}
                </span>
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
              <span>{locale === "ar" ? "الدفع الآمن" : "Secure Checkout"}</span>
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
              <span>
                {locale === "ar" ? "التوصيل السريع" : "Fast Delivery"}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;

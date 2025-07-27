"use client";

import React from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enqueueSnackbar } from "notistack";
import { GiPayMoney } from "react-icons/gi";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useOrderStore } from "@/hooks/zustand/useOrderStore";
// import { products } from "@/data/research-product";
// import axios from "axios";

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email address"),
  country: Yup.string().required("Country is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  // apartment: Yup.string().required("Apartment is required"),
  city: Yup.string().required("City is required"),
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
  // const { productInfo } = useOrderStore();

  // const sendOrderMessage = async (orderInfo: OrderInfo) => {
  //   // console.log("orderInfo :", orderInfo);

  //   const url = "http://localhost:3000/api/order-whatsapp-message";

  //   try {
  //     const response = await axios.post(url, {
  //       data: orderInfo,
  //     });

  //     console.log(response);
  //     enqueueSnackbar(
  //       response.data.message || "Order message sent successfully",
  //       {
  //         variant: "success",
  //         style: {
  //           backgroundColor: "#87A786",
  //           color: "white",
  //         },
  //       }
  //     );
  //   } catch (error: unknown) {
  //     console.log(error);
  //     enqueueSnackbar(
  //       (error as { message: string })?.message || "Order message sent failed",
  //       {
  //         variant: "error",
  //         style: {
  //           backgroundColor: "#dd3024",
  //           color: "white",
  //         },
  //       }
  //     );
  //   }
  // };

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
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
      onSubmit: (values) => {
        console.log(values);

        // const product = products.find(
        //   (product) => product.id.toString() === productInfo.productId
        // );

        // const currentProduct = product?.["en"];

        // const productOrderInfo = {
        //   name: currentProduct?.title,
        //   // size
        //   size: currentProduct?.sizes.find(
        //     (size) => size.id.toString() === productInfo.sizeId
        //   )?.value,

        //   // digit count
        //   ...(currentProduct?.digits?.length ?? 0 > 0
        //     ? {
        //         digitCount: currentProduct?.digits?.find(
        //           (digitCount) =>
        //             digitCount.id.toString() === productInfo.digitId
        //         )?.value,
        //       }
        //     : {}),

        //   // color
        //   color:
        //     currentProduct?.colors.find(
        //       (color) => color.id.toString() === productInfo.colorId
        //     )?.name +
        //     " - " +
        //     currentProduct?.colors.find(
        //       (color) => color.id.toString() === productInfo.colorId
        //     )?.colorCode,

        //   // light color
        //   lightColor:
        //     currentProduct?.lightColors.find(
        //       (lightColor) =>
        //         lightColor.id.toString() === productInfo.lightColorId
        //     )?.name +
        //     " - " +
        //     currentProduct?.lightColors.find(
        //       (lightColor) =>
        //         lightColor.id.toString() === productInfo.lightColorId
        //     )?.colorCode,

        //   // house number
        //   houseNumber: productInfo.houseNumber,

        //   // text
        //   text: productInfo.text,

        //   // design
        //   design: currentProduct?.designs.find(
        //     (design) => design.id.toString() === productInfo.designId
        //   )?.name,

        //   // font
        //   font: currentProduct?.fonts.find(
        //     (font) => font.id.toString() === productInfo.fontId
        //   )?.name,

        //   // quantity
        //   quantity: productInfo.quantity,

        //   // individual price
        //   price: productInfo.price,

        //   // total price
        //   totalPrice: productInfo.price * productInfo.quantity,
        // };

        enqueueSnackbar("Order placed successfully", {
          variant: "success",
          style: {
            backgroundColor: "#87A786",
            color: "white",
          },
        });

        // console.log({
        //   checkoutInfo: values,
        //   productInfo: productOrderInfo,
        // });

        // sendOrderMessage({
        //   checkoutInfo: values,
        //   productInfo: productOrderInfo,
        // });
      },
    });

  console.log(values);

  return (
    <form onSubmit={handleSubmit} className="space-y-8  ">
      {/* Contact Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>

        {/* phone number */}
        <div className="mt-4">
          <Input
            type="number"
            placeholder="Phone number"
            name="phone"
            id="phone"
            className="w-full"
            onChange={handleChange}
            value={values.phone}
          />

          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mt-4">
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
        </div>
        {/* <div className="flex items-center gap-2">
          <input type="checkbox" id="newsletter" className="rounded" />
          <label htmlFor="newsletter">Email me with news and offers</label>
        </div> */}
      </div>

      {/* Delivery Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Delivery</h2>
        <div>
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
        </div>

        {/* first name & last name */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* first name */}
          <div>
            <Input
              type="text"
              placeholder="First name"
              className="w-full"
              onChange={handleChange}
              name="firstName"
              id="firstName"
              value={values.firstName}
            />

            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* last name */}
          <div>
            <Input
              type="text"
              placeholder="Last name"
              className="w-full"
              onChange={handleChange}
              name="lastName"
              id="lastName"
              value={values.lastName}
            />

            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* address */}
        <div>
          <Input
            type="text"
            placeholder="Address"
            className="w-full mt-4"
            onChange={handleChange}
            name="address"
            id="address"
            value={values.address}
          />

          {errors.address && touched.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* apartment, suite, etc. */}
        <div>
          <Input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            className="w-full mt-4"
            onChange={handleChange}
            name="apartment"
            id="apartment"
            value={values.apartment}
          />

          {errors.apartment && touched.apartment && (
            <p className="text-red-500 text-sm mt-1">{errors.apartment}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* city */}
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

          {/* postal code */}
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
        </div>

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

        <div className="pt-1">
          {/* Place Order Button */}
          <button
            type="submit"
            // onClick={() => {
            //   enqueueSnackbar("Order placed successfully", {
            //     variant: "success",
            //     style: {
            //       backgroundColor: "#87a786ef",
            //       fontWeight: "bold",
            //     },
            //   });
            // }}
            className="w-full mt-4 bg-[#87A786] hover:bg-[#87a786ea] text-white py-2  font-bold flex justify-center items-center gap-2"
          >
            <span>Place Order </span> <GiPayMoney size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;

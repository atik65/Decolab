// import { OrderInfo } from "@/app/_pages/checkout/CheckoutForm";
import axios from "axios";
// import { NextRequest } from "next/server";

// post api for order whatsapp message
export const POST = async () => {
  // const body = await request.json();
  // const data: OrderInfo = body.data;

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_ID;
  const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER;

  //   const components = [
  //     {
  //       type: "header",
  //       parameters: [
  //         {
  //           type: "text",
  //           text: `${data.checkoutInfo.firstName} ${data.checkoutInfo.lastName}`,
  //         },
  //       ],
  //     },
  //     {
  //       type: "body",
  //       parameters: [
  //         {
  //           type: "text",
  //           text: `📦 ${data.productInfo.name} (${data.productInfo.size})
  // 🎨 Color: ${data.productInfo.color}
  // 💡 Light: ${data.productInfo.lightColor}
  // 🔢 House Number: ${data.productInfo.houseNumber} (${data.productInfo.text})
  // 🖋️ Font: ${data.productInfo.font}, Design: ${data.productInfo.design}

  // 📍 Address: ${data.checkoutInfo.address}, ${data.checkoutInfo.city}, ${data.checkoutInfo.country} - ${data.checkoutInfo.postalCode}
  // 📞 ${data.checkoutInfo.phone}
  // ✉️ ${data.checkoutInfo.email}

  // 🛒 Qty: ${data.productInfo.quantity}
  // 💰 Total: ৳${data.productInfo.totalPrice}
  // `,
  //         }, // {{1}} in body
  //       ],
  //     },
  //   ];

  // const smallComponents = [
  //   {
  //     type: "header",
  //     parameters: [
  //       {
  //         type: "text",
  //         text: "hello header",
  //       },
  //     ],
  //   },
  //   {
  //     type: "body",
  //     parameters: [
  //       {
  //         type: "text",
  //         text: "hello body",
  //       },
  //     ],
  //   },
  // ];

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: ownerNumber,
        type: "template",
        template: {
            name: "hello_world",
          //     name: "one_direction",
          // name: "one_direction_template",
          // name: "one_direction_order_placed",
          language: {
            // code: "en_US",
            code: "en",
          },
          //   components: components,
          // components: smallComponents,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "WhatsApp message sent successfully",
        data: response.data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

import axios from "axios";

// {
//     "productTitle": "House Numbers",
//     "quantity": 1,
//     "size": "20cm",
//     "color": "Black",
//     "lightColor": "Light Pink",
//     "houseNumber": 23,
//     "design": "Design 11222",
//     "font": "Traditional Font",
//     "digitCount": "1",
//     "phoneNumber": 3234234,
//     "email": "",
//     "customerName": "wdfsdf asdfa",
//     "address": "dasdfsf"
// }
export type Payload = {
  productTitle?: string;
  quantity?: number;
  size?: string;
  color?: string;
  lightColor?: string;
  houseNumber?: number;
  design?: string;
  font?: string;
  digitCount?: string;
  phoneNumber?: string;
  email?: string;
  customerName?: string;
  address?: string;
  googleMapsLink?: string;
};

const createSheetOrder = async (payload: Payload) => {
  try {
    const uri = `${process.env.NEXT_PUBLIC_API_URL_NEXT}/api/order`;
    const res = await axios.post(uri, payload);
    console.log("Sheet order created:", res.data);
  } catch (error) {
    console.error("Error creating sheet order:", error);
  }
};

export default createSheetOrder;

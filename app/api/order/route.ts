import { Payload } from "@/lib/createSheetOrder";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from 2026!" });
}

export async function POST(request: Request) {
  //   const body = await request.json();
  //   return NextResponse.json({ received: body }, { status: 201 });

  try {
    const body = await request.json();
    await saveOrder(body);
    return NextResponse.json(
      { message: "Order saved to Google Sheets" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { message: "Error saving order" },
      { status: 500 }
    );
  }
}

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

// app/actions/saveOrder.js

const rawKey = process.env.GOOGLE_PRIVATE_KEY;
if (!rawKey) throw new Error("Missing GOOGLE_PRIVATE_KEY env var");
const privateKey = rawKey.replace(/\\n/g, "\n");

async function saveOrder(orderData: Payload) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Orders!A:E", // Append to the 'Orders' tab
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          orderData.productTitle,
          orderData.quantity,
          orderData.size,
          orderData.color,
          orderData.lightColor,
          orderData.houseNumber,
          orderData.design,
          orderData.font,
          orderData.digitCount,
          orderData.phoneNumber,
          orderData.email,
          orderData.customerName,
          orderData.address,
        ],
      ],
    },
  });
}

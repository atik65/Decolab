import axios from "axios";
import React from "react";

const CreateSheetOrder = () => {
  const handleCreateOrder = async () => {
    try {
      const uri = `${process.env.NEXT_PUBLIC_API_URL_NEXT}/api/order`;
      const res = await axios.post(uri, {
        customerName: "John Doe",
        product: "Sample Product",
        quantity: 2,
      });
      console.log("Sheet order created:", res.data);
    } catch (error) {
      console.error("Error creating sheet order:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleCreateOrder}
        className="p-2  bg-gray-100 rounded-full hover:bg-gray-50 transition-all duration-300 w-52 py-3"
      >
        Create Sheet Order
      </button>
    </div>
  );
};

export default CreateSheetOrder;

import React, { useState, useEffect } from "react";
import {
  useDeleteCartMutation,
  useGetCartQuery,
} from "../../Redux/features/Cart/cartApi";

import CartCard from "./CartCard";
import { useAddOrderMutation } from "../../Redux/features/Order/OrderApi";
import { useSelector } from "react-redux";
function Cart() {
  const [payment, setPayment] = useState(false);
  const id = useSelector((state) => state.user.id);
  console.log(id);

  const { data, isError, error, refetch } = useGetCartQuery(id);
  const [deleteCart] = useDeleteCartMutation();
  const [addOrder] = useAddOrderMutation();
  if (data) console.log(data);
  if (isError) console.log(error);
  useEffect(() => {
    refetch();
  }, []);

  const openRazorpay = async () => {
    console.log("payment is hit", data?.cart?.totalPrice);
    const res = await fetch(
      "http://localhost:4000/api/v1/payment/createpayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalamount: data?.cart?.totalPrice }),
      }
    );
    const order = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay Key ID
      amount: data?.cart?.totalQuantity,
      currency: "INR",
      name: "Your Company",
      description: "Test Transaction",
      order_id: order.id, // Order ID from backend
      handler: async function (response) {
        const verifyRes = await fetch(
          "http://localhost:4000/api/v1/payment/verifypayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const result = await verifyRes.json();
        setPayment(true);
        // alert(result.message);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };
  // console.log("the payment is successfull", payment);
  useEffect(() => {
    if (data) {
      const orderObj = {
        userId: data?.cart?.userId,
        shippingInfo: data?.userAdd?.address,
        products: data?.cart?.items,
        subtotal: data?.cart?.totalPrice,
        totalAmount: data?.cart?.totalPrice,
      };
      console.log(orderObj);
      addOrder({ id: localStorage.getItem("token"), credential: orderObj });
      console.log(data.cart._id);
      deleteCart(data.cart._id);
      // setPayment(false);
    }
  }, [payment]);

  function checkaddress() {
    if (data.userAdd) {
      openRazorpay();
    } else {
      alert("Please enter address first");
    }
  }
  return (
    <div className="flex justify-between p-4 gap-4">
      {/* Cart Items */}
      <div className="w-2/3">
        {data?.cart?.items?.map((val, key) => (
          <CartCard
            key={key}
            name={val.name}
            price={val.price}
            imageUrl={val.imageUrl}
            sellerId={val.sellerId}
            quantity={val.quantity}
            productId={val.productId}
            cartId={data.cart._id}
            itemId={val._id}
            refetchcart={refetch}
          />
        ))}
      </div>

      {/* Rest of the Data */}
      <div className="w-1/3 bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-2 flex justify-between">
          <span>Total Items:</span>
          <span>{data?.cart?.totalQuantity}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Delivery Fee:</span>
          <span>₹40</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Discount:</span>
          <span>-₹40</span>
        </div>
        <div className="mb-4 flex justify-between font-semibold">
          <span>Total Sum:</span>
          <span>₹{data?.cart?.totalPrice}</span>
        </div>
        <button
          onClick={checkaddress}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Order
        </button>
      </div>
    </div>
  );
}

export default Cart;

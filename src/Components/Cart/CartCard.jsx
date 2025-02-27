import React, { useState } from "react";
import {
  useDeleteItemMutation,
  useUpdateCartMutation,
} from "../../Redux/features/Cart/cartApi";

function CartCard(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [updateCart] = useUpdateCartMutation();
  const [deleteItem] = useDeleteItemMutation();
  // console.log(props);
  // cartId(as parameter), productId, quantity,price

  async function inputHandler(e) {
    const { name } = e.target;
    // let newQuantity;

    if (name === "dec" && quantity >= 2) {
      console.log("we reach here");
      const obj = {
        productId: props.productId,
        quantity: -1, // <-- Updated to use newQuantity
        price: props.price,
      };
      const data = await updateCart({ id: props.cartId, credentials: obj });
      props.refetchcart();
      if (data) {
        setQuantity((prev) => prev - 1);
      }
    }
    if (name === "inc" && quantity <= 9) {
      const obj = {
        productId: props.productId,
        quantity: 1, // <-- Updated to use newQuantity
        price: props.price,
      };
      const data = await updateCart({ id: props.cartId, credentials: obj });
      props.refetchcart();
      if (data) {
        setQuantity((prev) => prev + 1);
      }
    }
  }

  async function deleteItemHandler() {
    const cartId = props.cartId;
    const obj = {
      quantity: props.quantity,
      price: props.price,
      itemId: props.itemId,
    };
    console.log(obj);
    await deleteItem({ id: cartId, credential: obj });
    props.refetchcart();
  }
  return (
    <div>
      <div className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4 mb-4">
        <img
          src={props.imageUrl}
          //   alt={props.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1 pl-4">
          <h2 className="text-lg font-semibold">{props.name}</h2>
          <p className="text-gray-600">₹{props.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            name="dec"
            onClick={inputHandler}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            -
          </button>
          <input
            name="directinput"
            type="text"
            // onChange={inputHandler}
            value={quantity}
            className="w-12 text-center border border-gray-300 rounded-md"
            readOnly
          />
          <button
            onClick={inputHandler}
            name="inc"
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            +
          </button>
        </div>
        <button
          className="ml-4 text-red-500 cursor-pointer"
          onClick={deleteItemHandler}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartCard;

import React from "react";
import img from "../../assets/img.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddCartMutation } from "../../Redux/features/Cart/cartApi";
function Card(props) {
  let string = "Not reviewed yet";
  // console.log("this is card ", props);
  const userid = useSelector((state) => state.user.id);
  // console.log(userid);
  if (props.review?.length === !0) {
    string = "";
    for (let i = 0; i < props.review.length(); i++) {
      string.concat("★");
    }
  }

  const [addCart] = useAddCartMutation();

  async function addToCart() {
    const obj = {
      userId: userid,
      productId: props.id,
      name: props.name,
      price: props.price,
      quantity: 1,
      imageUrl: props.image,
      sellerId: props.seller,
    };
    console.log("i don't know", obj);
    try {
      await addCart(obj);
      console.log(obj);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Wrap all clickable parts inside Link */}
      <Link to={`/product/${props.id}`} className="block flex-grow">
        <img
          src={props.image}
          alt="product"
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col items-start">
          <div className="text-yellow-500 text-sm">{string}</div>
          <div className="font-semibold text-lg mt-2">{props.name}</div>
          <div className="text-gray-600 text-sm">
            Price: <span className="line-through text-red-500">$199</span> $
            {props.price}
          </div>
        </div>
      </Link>
      {/* Button at the bottom */}
      <button
        onClick={addToCart}
        className="mt-auto w-full px-4 py-2 bg-blue-600 text-white rounded-b-2xl hover:bg-blue-700 transition duration-300"
      >
        Add to cart
      </button>
    </div>
  );
}

export default Card;

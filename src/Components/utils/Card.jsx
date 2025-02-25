import React from "react";
import img from "../../assets/img.jpeg";
import { Link } from "react-router-dom";

function Card(props) {
  let string = "Not reviewed yet";
  // console.log("this is card ", props);
  if (props.review?.length === !0) {
    string = "";
    for (let i = 0; i < props.review.length(); i++) {
      string.concat("★");
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
        onClick={() => console.log("Add to cart", props.id)}
        className="mt-auto w-full px-4 py-2 bg-blue-600 text-white rounded-b-2xl hover:bg-blue-700 transition duration-300"
      >
        Add to cart
      </button>
    </div>
  );
}

export default Card;

import React from "react";

function ProductCard(props) {
  return (
    <div className="max-w-xl rounded-2xl overflow-hidden shadow-lg border border-gray-200 p-4 flex items-center space-x-4">
      <div className="w-32 h-32 overflow-hidden rounded-2xl flex-shrink-0">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800">{props.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{props.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-semibold">
            Stock: {props.stock}
          </span>
          <span className="text-lg font-bold text-gray-800">
            ₹{props.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

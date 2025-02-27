import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductInfoQuery } from "../../Redux/features/products/ProductApi";
import { useAddCartMutation } from "../../Redux/features/Cart/cartApi";
import { useSelector } from "react-redux";
function ProductInfo() {
  const id = useParams();
  const userId = useSelector((state) => state.user.id);
  const { data, isError, isLoading, error } = useGetProductInfoQuery(id.id);
  // if (data) console.log("here is the data", data.data);
  const [addCart] = useAddCartMutation();
  if (isError) console.log(error);

  async function addToCarthandler() {
    const obj = {
      userId: userId,
      productId: id.id,
      name: data.data.product.name,
      price: data.data.product.price,
      imageUrl: data.data.product.imageUrl,
      quantity: 1,
      sellerId: data.data.product.seller,
    };
    const returnedData = await addCart(obj);
    console.log(returnedData);
  }
  return (
    <div>
      <div className="flex flex-row p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-1/2">
          <img
            src={`${data?.data?.product.imageUrl}`}
            alt="Product"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="ml-8 flex flex-col justify-between w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {data?.data?.product.name}
            </h2>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-red-500 text-2xl font-bold">
                ₹{data?.data?.product.price}
              </span>
              <span className="text-gray-500 line-through text-xl">
                ₹{(data?.data?.product.price * 1.2).toFixed(0)}
              </span>
            </div>
            <p className="text-gray-600 mt-4">
              {data?.data?.product.description}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={addToCarthandler}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
            <ul className="space-y-4">
              <li className="text-gray-700 text-base">
                ⭐⭐⭐⭐⭐ - Great product! Highly recommend.
              </li>
              <li className="text-gray-700 text-base">
                ⭐⭐⭐⭐ - Value for money. Satisfied with the purchase.
              </li>
              <li className="text-gray-700 text-base">
                ⭐⭐⭐⭐⭐ - Excellent quality and fast delivery.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

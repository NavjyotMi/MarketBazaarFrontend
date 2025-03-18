import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddCartMutation } from "../../Redux/features/Cart/cartApi";
import { ShoppingCart } from "lucide-react";
function Card(props) {
  // let string = "Not reviewed yet";
  // console.log("this is card ", props);
  const userid = useSelector((state) => state.user.id);
  // console.log(userid);
  // if (props.review?.length === !0) {
  //   string = "";
  //   for (let i = 0; i < props.review.length(); i++) {
  //     string.concat("★");
  //   }
  // }

  const [addCart] = useAddCartMutation();

  async function addToCart() {
    console.log("the cart button is clicked");
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
    <div className="bg-white overflow-hidden  flex flex-col h-full">
      <div className="block flex-grow group relative overflow-hidden">
        <Link
          to={`/product/${props.id}`}
          className="block flex-grow group relative overflow-hidden"
        >
          <div className="bg-gray-200">
            <img
              src={props.image}
              alt="product"
              className="w-full h-[25rem] object-cover transition-transform duration-500 group-hover:translate-x-2 group-hover:brightness-75 group-hover:saturate-150"
            />
          </div>

          <div className="flex flex-row justify-between py-4">
            <div className="space-y-2">
              <div className="text-lg mt-2 tracking-normal">{props.name}</div>
              <div className="text-gray-600 text-sm">
                ₹ {props.price} -
                <span className="line-through text-purple-500"> ₹ 199</span>
              </div>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart();
                }}
                className=" cursor-pointer hover:text-purple-500"
              >
                <ShoppingCart strokeWidth={1.25} hover:stroke-purple-500 />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;

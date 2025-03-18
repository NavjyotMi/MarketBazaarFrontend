import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSearchedProductQuery } from "../../Redux/features/products/ProductApi";
import Card from "../utils/Card";
import ValueBar from "../utils/ValueBar";
import { useSelector } from "react-redux";
function SearchProduct() {
  const [searchParams] = useSearchParams();
  const queryString = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log(queryString);
  const { isError, isLoading, data, error } =
    useGetSearchedProductQuery(queryString);
  if (isError) console.log(error);

  return (
    <div>
      {" "}
      <div className="px-10 mt-10 mb-10 text-center">
        <h1
          className="text-[30px] font-semibold inline-block relative 
    before:content-[''] before:absolute before:bg-black before:w-20 before:h-[2px] before:right-full before:top-[50%] before:mr-5
    after:content-[''] after:absolute after:bg-black after:w-20 after:h-[2px] after:left-full after:top-[50%] after:ml-5"
        >
          Searched Products
        </h1>
      </div>
      {isError && <div>there no such product</div>}
      <ValueBar />
      {data?.data?.products.length === 0 && <div>No product found</div>}
      <div className="px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
          data.data.products.map((ele) => {
            // console.log(ele);
            return (
              <Card
                key={ele._id}
                id={ele._id}
                image={ele.imageUrl}
                name={ele.name}
                price={ele.price}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SearchProduct;

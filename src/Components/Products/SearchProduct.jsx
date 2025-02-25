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

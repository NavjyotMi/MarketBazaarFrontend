import React from "react";
import {
  useGetProductQuery,
  useGetSearchedProductQuery,
} from "../Redux/features/products/ProductApi";
import Card from "./utils/Card";
import ValueBar from "./utils/ValueBar";
import { useSearchParams } from "react-router-dom";
const Home = () => {
  let { data, isLoading, isError } = useGetProductQuery();
  const [searchParams] = useSearchParams();
  const queryString = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const {
    isError: isFilteredError,
    data: filteredData,
    error,
  } = useGetSearchedProductQuery(queryString);
  if (isFilteredError) console.log(error);
  data = filteredData;

  return (
    <>
      <div>
        <ValueBar />
        <div className="px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading && <h1>Loading...</h1>}
          {isError && (
            <h1>There is some error while connecting to the server</h1>
          )}
          {data &&
            data.data.products.map((value) => (
              <Card
                key={value._id}
                id={value._id}
                name={value.name}
                description={value.description}
                image={value.imageUrl}
                price={value.price}
                seller={value.seller}
                review={value.review}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

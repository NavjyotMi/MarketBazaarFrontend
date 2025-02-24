import React from "react";
import { useGetProductQuery } from "../Redux/features/products/ProductApi";
import Card from "./utils/Card";
const Home = () => {
  const { data, isLoading, isError } = useGetProductQuery();
  if (data) {
    console.dir(data.data.products);
    data.data.products.map((value) => console.log(value));
  }

  return (
    <>
      <div className="px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>There is some error while connecting to the server</h1>}
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
    </>
  );
};

export default Home;

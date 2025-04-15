import React from "react";
import {
  useGetProductQuery,
  useGetSearchedProductQuery,
} from "../Redux/features/products/ProductApi";
import Card from "./utils/Card";
import { useSearchParams } from "react-router-dom";
import Description from "./Description";
import im from "../assets/single.webp";
import Grid from "./HomeGrid/Grid";
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
        <div className="bg-[#f0e0ff] min-h-screen flex flex-col sm:flex-row items-center overflow-hidden px-6 sm:px-20 gap-2">
          <div className="w-full text-center sm:text-left">
            <h3 className="text-[20px] sm:text-[20px] md:text-[20px] lg:md:text-[24px]">
              Smart Product
            </h3>
            <h1 className="text-[30px] sm:text-[30px] md:text-[40px] lg:md:text-[72px] leading-tight">
              Summer Offer <br />
              2025 Collections
            </h1>
            <button className="relative overflow-hidden border border-black p-3 sm:p-4 px-5 sm:px-6 mt-4 text-black font-semibold cursor-pointer transition-all duration-300 group">
              <span className="absolute inset-0 bg-black translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0"></span>
              <span className="relative z-10 text-black font-thin group-hover:text-white">
                SHOP NOW
              </span>
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full flex justify-center sm:justify-end sm:self-end">
            <img
              src={im}
              className="object-contain sm:object-cover transition-all duration-1500 ease-out opacity-0 translate-y-10"
              onLoad={(e) =>
                e.currentTarget.classList.remove("opacity-0", "translate-y-10")
              }
            />
          </div>
        </div>

        <Grid />
        {/* <ValueBar /> */}
        <div className="px-10 mb-10 text-center">
          <h1
            className="text-[30px] font-semibold inline-block relative 
    before:content-[''] before:absolute before:bg-black before:w-20 before:h-[2px] before:right-full before:top-[50%] before:mr-5
    after:content-[''] after:absolute after:bg-black after:w-20 after:h-[2px] after:left-full after:top-[50%] after:ml-5"
          >
            PRODUCTS
          </h1>
        </div>
        <div className="px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
        <Description />
      </div>
    </>
  );
};

export default Home;

// home page  #FFFFFF

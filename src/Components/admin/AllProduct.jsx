import React from "react";
import { useGetVendorQuery } from "../../Redux/features/products/ProductApi";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
function AllProduct() {
  const id = useSelector((state) => state.user.id);
  const { data, isError, error } = useGetVendorQuery(id);
  if (data) console.log(data.data);
  if (isError) console.log(error);
  return (
    <div>
      {data &&
        data.data.map((ele, key) => {
          return (
            <ProductCard
              key={key}
              imageUrl={ele.imageUrl}
              name={ele.name}
              price={ele.price}
              stock={ele.stock}
              description={ele.description}
            />
          );
        })}
    </div>
  );
}

export default AllProduct;

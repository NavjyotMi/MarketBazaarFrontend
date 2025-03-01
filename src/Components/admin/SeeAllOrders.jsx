import React from "react";
import { useGetVendorOrdersQuery } from "../../Redux/features/Order/OrderApi";
import { useSelector } from "react-redux";

const SeeAllOrders = () => {
  const id = useSelector((state) => state.user.id);
  const { data, isError, error } = useGetVendorOrdersQuery(id);
  if (data) console.log(data);
  if (isError) console.log(error);
  return <div>See all orders</div>;
};

export default SeeAllOrders;

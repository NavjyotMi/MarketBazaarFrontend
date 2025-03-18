import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://mb-backend-x7k5.onrender.com/api/v1/order",
    baseUrl: "http://127.0.0.1:4000/api/v1/order",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: ({ id, credential }) => ({
        url: "/createorder",
        method: "POST",
        body: credential,
        // headers: {
        //   Authorization: `Bearer ${id}`,
        // },
      }),
    }),
    getVendorOrders: builder.query({
      query: (id) => ({
        url: `/vendor/${id}`,
      }),
    }),
  }),
});
export const { useAddOrderMutation, useGetVendorOrdersQuery } = orderApi;
export default orderApi;

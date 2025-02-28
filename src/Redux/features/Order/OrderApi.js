import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000/api/v1/order" }),
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: ({ id, credential }) => ({
        url: "/createorder",
        method: "POST",
        body: credential,
        headers: {
          Authorization: `Bearer ${id}`,
        },
      }),
    }),
  }),
});
export const { useAddOrderMutation } = orderApi;
export default orderApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/api/v1/cart",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (credential) => ({
        url: "/add",
        method: "POST",
        body: credential,
      }),
    }),
    getCart: builder.query({
      query: (id) => ({ url: `${id}` }),
    }),
    updateCart: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `${id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
    deleteItem: builder.mutation({
      query: ({ id, credential }) => ({
        url: `${id}`,
        method: "DELETE",
        body: credential,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: "/deletecart",
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteItemMutation,
  useDeleteCartMutation,
} = cartApi;

export default cartApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productapi = createApi({
  reducerPath: "productapi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000/api/v1" }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({ url: "/" }),
    }),
    getProductInfo: builder.query({
      query: (id) => ({ url: `/product/${id}` }),
    }),
    getSearchedProduct: builder.query({
      query: (params) => ({ url: `/search/?${params}` }),
    }),
    getCategory: builder.query({
      query: () => ({ url: "/product/category" }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductInfoQuery,
  useGetSearchedProductQuery,
  useGetCategoryQuery,
} = productapi;

export default productapi;

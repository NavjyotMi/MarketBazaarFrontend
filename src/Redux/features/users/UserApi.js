import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userapi = createApi({
  reducerPath: "userapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/api/v1/user",
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserInfo: builder.query({
      query: (token) => ({
        url: `/getuser`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useGetUserInfoQuery,
  useLoginUserMutation,
} = userapi;
export default userapi;

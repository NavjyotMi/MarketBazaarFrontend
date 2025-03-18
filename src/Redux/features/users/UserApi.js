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
    getAllUserInfo: builder.query({
      query: (token) => ({
        url: "/aboutme",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ id, credential }) => ({
        url: "/updateme",
        body: credential,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${id}`,
        },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useGetUserInfoQuery,
  useLoginUserMutation,
  useGetAllUserInfoQuery,
  useUpdateUserInfoMutation,
} = userapi;
export default userapi;

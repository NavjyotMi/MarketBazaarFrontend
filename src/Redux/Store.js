import { configureStore } from "@reduxjs/toolkit";
import userapi from "./features/users/UserApi";
import userSlice from "./features/users/UserSlice";
import productapi from "./features/products/ProductApi";
const store = configureStore({
  reducer: {
    [userapi.reducerPath]: userapi.reducer,
    [productapi.reducerPath]: productapi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userapi.middleware, productapi.middleware),
});

export default store;

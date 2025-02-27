import { configureStore } from "@reduxjs/toolkit";
import userapi from "./features/users/UserApi";
import userSlice from "./features/users/UserSlice";
import productapi from "./features/products/ProductApi";
import cartApi from "./features/Cart/cartApi";
const store = configureStore({
  reducer: {
    [userapi.reducerPath]: userapi.reducer,
    [productapi.reducerPath]: productapi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userapi.middleware,
      productapi.middleware,
      cartApi.middleware
    ),
});

export default store;

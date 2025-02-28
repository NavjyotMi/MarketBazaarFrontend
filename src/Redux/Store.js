import { configureStore } from "@reduxjs/toolkit";
import userapi from "./features/users/UserApi";
import userSlice from "./features/users/UserSlice";
import productapi from "./features/products/ProductApi";
import cartApi from "./features/Cart/cartApi";
import orderApi from "./features/Order/OrderApi";
const store = configureStore({
  reducer: {
    [userapi.reducerPath]: userapi.reducer,
    [productapi.reducerPath]: productapi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userapi.middleware,
      productapi.middleware,
      cartApi.middleware,
      orderApi.middleware
    ),
});

export default store;

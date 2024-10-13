import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { productApi } from "../service/product";
import { configReducer } from "./configSlice";
import { productsSortReducer } from "./productsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    config: configReducer,
    productsSort: productsSortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import orderReducer from "../redux/features/order/orderSlice"
import filterReducer from "../redux/features/product/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    order: orderReducer
  },
});

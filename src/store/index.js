import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@/store/slices/languageSlice";
import cartReducer from "@/store/slices/cartSlice";
import productsReducer from "@/store/slices/productsSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialLanguage = () => {
  const savedLanguage = Cookies.get("dukaanLanguage");
  return savedLanguage || "en";
};

const initialState = {
  language: getInitialLanguage(),
  direction: getInitialLanguage() === "ur" ? "rtl" : "ltr",
  isLoading: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.isLoading = true;
      state.language = action.payload;
      state.direction = action.payload === "ur" ? "rtl" : "ltr";
      
      // Save to cookie with 1 year expiry
      Cookies.set("dukaanLanguage", action.payload, { expires: 365 });
      
      // Simulate loading for smooth transition
      setTimeout(() => {
        state.isLoading = false;
      }, 200);
    },
    toggleLanguage: (state) => {
      const newLanguage = state.language === "en" ? "ur" : "en";
      state.isLoading = true;
      state.language = newLanguage;
      state.direction = newLanguage === "ur" ? "rtl" : "ltr";
      
      Cookies.set("dukaanLanguage", newLanguage, { expires: 365 });
      
      setTimeout(() => {
        state.isLoading = false;
      }, 200);
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
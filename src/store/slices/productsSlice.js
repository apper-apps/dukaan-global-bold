import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  featuredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    priceRange: [0, 10000],
    sortBy: "featured",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setCategories,
  setFeaturedProducts,
  setFilters,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
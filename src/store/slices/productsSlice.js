import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  featuredProducts: [],
  searchResults: [],
  dealProducts: [],
  loading: false,
  error: null,
  searchLoading: false,
  searchQuery: "",
  filters: {
    category: "",
    priceRange: [0, 10000],
    sortBy: "featured",
    rating: 0,
    brand: "",
    availability: "all",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.searchLoading = false;
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.searchLoading = false;
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDealProducts: (state, action) => {
      state.dealProducts = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
      state.searchLoading = false;
    },
  },
});

export const {
  setLoading,
  setSearchLoading,
  setError,
  setProducts,
  setCategories,
  setFeaturedProducts,
  setSearchResults,
  setSearchQuery,
  setDealProducts,
  setFilters,
  clearError,
  clearSearch,
} = productsSlice.actions;

export default productsSlice.reducer;
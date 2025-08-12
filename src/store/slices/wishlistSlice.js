import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.Id === product.Id);
      
      if (!existingItem) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.Id !== productId);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishlistError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistItems,
  setWishlistLoading,
  setWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
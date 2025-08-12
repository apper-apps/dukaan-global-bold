import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  recentOrders: [],
  savedForLater: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.Id === product.Id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.Id !== productId);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.Id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.Id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    saveForLater: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.Id === productId);
      if (item) {
        state.savedForLater.push(item);
        state.items = state.items.filter(item => item.Id !== productId);
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },
    moveToCart: (state, action) => {
      const productId = action.payload;
      const item = state.savedForLater.find(item => item.Id === productId);
      if (item) {
        state.items.push(item);
        state.savedForLater = state.savedForLater.filter(item => item.Id !== productId);
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },
    addRecentOrder: (state, action) => {
      state.recentOrders.unshift(action.payload);
      if (state.recentOrders.length > 10) {
        state.recentOrders.pop();
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
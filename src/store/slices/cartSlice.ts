import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Cart } from '../../types';

const initialCart: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  shipping: 0,
  discount: 0,
};

const initialState: CartState = {
  cart: initialCart,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.items.find(
        item => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.items.push(action.payload);
      }

      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.items = state.cart.items.filter(
        item => item.id !== action.payload
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cart.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    
    clearCart: (state) => {
      state.cart = initialCart;
    },
    
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.cart.discount = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    setShipping: (state, action: PayloadAction<number>) => {
      state.cart.shipping = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    calculateTotals: (state) => {
      state.cart.subtotal = state.cart.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      state.cart.total = state.cart.subtotal + state.cart.shipping - state.cart.discount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
  setShipping,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

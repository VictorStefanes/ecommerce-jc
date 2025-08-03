"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  maxStock: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalValue: number;
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalValue: 0,
  isOpen: false,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
                item.color === action.payload.color && 
                item.size === action.payload.size
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Item já existe, aumenta quantidade
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: Math.min(item.quantity + 1, item.maxStock) }
            : item
        );
      } else {
        // Novo item
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => !(item.id === action.payload.id && 
                 item.color === action.payload.color && 
                 item.size === action.payload.size)
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color && 
        item.size === action.payload.size
          ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.maxStock)) }
          : item
      ).filter(item => item.quantity > 0);

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalValue,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalValue: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'SET_CART_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      };

    default:
      return state;
  }
}

// Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { state, dispatch } = context;

  // Helper functions
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string, color: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, color, size } });
  };

  const updateQuantity = (id: string, color: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, color, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen });
  };

  const getItemCount = (id: string, color: string, size: string) => {
    const item = state.items.find(
      item => item.id === id && item.color === color && item.size === size
    );
    return item?.quantity || 0;
  };

  return {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
    getItemCount,
  };
}

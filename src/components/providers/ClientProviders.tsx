"use client";

import { Provider } from 'react-redux';
import { store } from '../../store';
import { CartProvider } from '../../contexts/CartContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartProvider>
        {children}
      </CartProvider>
    </Provider>
  );
}

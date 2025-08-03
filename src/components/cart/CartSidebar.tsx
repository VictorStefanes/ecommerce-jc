"use client";

import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import './CartSidebar.scss';

export default function CartSidebar() {
  const { items, totalItems, totalValue, isOpen, removeItem, updateQuantity, setCartOpen, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleCheckout = () => {
    // TODO: Implementar checkout
    alert('Checkout será implementado na próxima fase!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      
      {/* Sidebar */}
      <div className="cart-sidebar">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} />
            <h3>Carrinho ({totalItems})</h3>
          </div>
          <button 
            className="cart-close"
            onClick={() => setCartOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <h4>Seu carrinho está vazio</h4>
              <p>Adicione produtos para continuar</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="cart-items">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-specs">
                        <span className="item-color" style={{ backgroundColor: item.color }}></span>
                        <span className="item-size">{item.size}</span>
                      </div>
                      
                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          className="remove-item"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-price">
                      <span className="current-price">{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} itens)</span>
                  <span>{formatPrice(totalValue)}</span>
                </div>
                <div className="summary-row">
                  <span>Frete</span>
                  <span className="free-shipping">
                    {totalValue >= 198 ? 'Grátis' : 'Calcular'}
                  </span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>{formatPrice(totalValue)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="cart-actions">
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Limpar carrinho
                </button>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

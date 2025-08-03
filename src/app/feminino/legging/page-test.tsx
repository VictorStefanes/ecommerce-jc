"use client";

import React, { useState } from 'react';
import { Star, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import './styles.scss';

export default function LeggingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  return (
    <div className="alphaco-style-page">
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Leggings Femininas - Teste</h1>
            <p>Versão de teste para debug do carrinho</p>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="/api/placeholder/300/400" alt="Legging Teste" />
                <div className="product-overlay">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => alert('Teste de clique funcionou!')}
                  >
                    <ShoppingBag size={18} />
                    Testar Clique
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">Legging Teste</h3>
                <div className="product-price">
                  <span className="promotional-price">R$ 89,90</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

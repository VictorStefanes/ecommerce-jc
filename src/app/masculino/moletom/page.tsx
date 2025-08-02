"use client";

import React, { useState } from 'react';
import { Star, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import './styles.scss';

export default function MoletomPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const products = [
    {
      id: 1,
      name: "Moletom Canguru Essential Preto",
      price: 159.90,
      originalPrice: 199.90,
      image: "/api/placeholder/300/400",
      colors: ["#000000", "#ffffff", "#6b7280"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.8,
      reviews: 142,
      isNew: false,
      isLaunch: false,
      badge: "LANÇAMENTO",
      category: "Linha Essential",
      line: "Essential"
    },
    {
      id: 2,
      name: "Moletom Canguru Urban Street Cinza",
      price: 169.90,
      originalPrice: 219.90,
      image: "/api/placeholder/300/400",
      colors: ["#6b7280", "#000000", "#374151"],
      sizes: ["P", "M", "G", "GG", "XGG"],
      rating: 4.9,
      reviews: 203,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Urban Collection",
      line: "Urban"
    },
    {
      id: 3,
      name: "Moletom Zip Premium Marinho",
      price: 189.90,
      originalPrice: 239.90,
      image: "/api/placeholder/300/400",
      colors: ["#1e40af", "#000000", "#6b7280"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.7,
      reviews: 156,
      isNew: false,
      isLaunch: false,
      badge: "PREMIUM",
      category: "Premium Line",
      line: "Premium"
    },
    {
      id: 4,
      name: "Moletom Canguru Oversized Verde",
      price: 179.90,
      originalPrice: 229.90,
      image: "/api/placeholder/300/400",
      colors: ["#059669", "#000000", "#374151"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.8,
      reviews: 98,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Oversized",
      line: ""
    },
    {
      id: 5,
      name: "Moletom Zip Tech Preto",
      price: 199.90,
      originalPrice: 249.90,
      image: "/api/placeholder/300/400",
      colors: ["#000000", "#6b7280", "#ffffff"],
      sizes: ["P", "M", "G", "GG", "XGG"],
      rating: 5.0,
      reviews: 234,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Tech Line",
      line: "Tech"
    },
    {
      id: 6,
      name: "Moletom Canguru Classic Branco",
      price: 149.90,
      originalPrice: 189.90,
      image: "/api/placeholder/300/400",
      colors: ["#ffffff", "#000000", "#6b7280"],
      sizes: ["M", "G", "GG", "XGG"],
      rating: 4.6,
      reviews: 145,
      isNew: false,
      isLaunch: false,
      badge: "CLÁSSICO",
      category: "Classic",
      line: ""
    },
    {
      id: 7,
      name: "Moletom Zip Vintage Bordô",
      price: 169.90,
      originalPrice: 209.90,
      image: "/api/placeholder/300/400",
      colors: ["#7c2d12", "#000000", "#1e40af"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.7,
      reviews: 167,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Vintage",
      line: ""
    },
    {
      id: 8,
      name: "Moletom Canguru Comfort Mescla",
      price: 159.90,
      originalPrice: 199.90,
      image: "/api/placeholder/300/400",
      colors: ["#6b7280", "#374151", "#000000"],
      sizes: ["P", "M", "G", "GG", "XGG"],
      rating: 4.8,
      reviews: 189,
      isNew: false,
      isLaunch: false,
      badge: "CONFORTO",
      category: "Comfort",
      line: ""
    }
  ];

  return (
    <div className="alphaco-style-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Moletons</h1>
            <p>Conforto e estilo para os dias mais frios. Nossa coleção de moletons oferece qualidade superior e design moderno.</p>
          </div>
        </div>
      </section>

      {/* Filter and Sort Section */}
      <section className="filter-sort-section">
        <div className="container">
          <div className="filter-sort-bar">
            <div className="filter-controls">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                Filtro e ordem
              </button>
              <span className="products-count">68 produtos</span>
            </div>
            <div className="sort-controls">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="relevance">Mais relevantes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="newest">Mais novos</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="quick-filters">
            <button className="quick-filter active">Todos</button>
            <button className="quick-filter">Canguru</button>
            <button className="quick-filter">Zip</button>
            <button className="quick-filter">Premium</button>
            <button className="quick-filter">Oversized</button>
            <button className="quick-filter">Lançamentos</button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {/* Product Badges */}
                <div className="product-badges">
                  {product.isLaunch && (
                    <span className="badge launch">🔥 Lançamento</span>
                  )}
                  {product.badge && (
                    <span className="badge promo">{product.badge}</span>
                  )}
                  {product.category && (
                    <span className="badge category">{product.category}</span>
                  )}
                </div>

                {/* Product Image */}
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-actions">
                    <button className="action-btn favorite" title="Favoritar">
                      <Heart size={20} />
                    </button>
                    <button className="action-btn quick-view" title="Visualização rápida">
                      <Eye size={20} />
                    </button>
                  </div>
                  <div className="product-overlay">
                    <button className="add-to-cart-btn">
                      <ShoppingBag size={18} />
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    <span className="rating-text">{product.rating} de 5.0 estrelas</span>
                  </div>

                  {/* Colors */}
                  <div className="product-colors">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className="color-option"
                        style={{ backgroundColor: color }}
                        title={`Cor ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Sizes */}
                  <div className="product-sizes">
                    {product.sizes.map((size) => (
                      <span key={size} className="size-option">{size}</span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="product-price">
                    <span className="promotional-price">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="original-price">R$ {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="load-more-section">
            <button className="load-more-btn">Ver mais produtos</button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">📦</div>
              <div className="trust-content">
                <h4>FRETE GRÁTIS</h4>
                <p>Ganhe frete grátis a partir de R$198 para todo Brasil.</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">💬</div>
              <div className="trust-content">
                <h4>ATENDIMENTO</h4>
                <p>O nosso time de atendimento 100% online e humanizado.</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">🔄</div>
              <div className="trust-content">
                <h4>TROCA GRÁTIS</h4>
                <p>Não ficou legal e quer trocar? A 1ª troca é por nossa conta em até 7 dias.</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">🔒</div>
              <div className="trust-content">
                <h4>SITE SEGURO</h4>
                <p>Todas as transações são 100% criptografadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

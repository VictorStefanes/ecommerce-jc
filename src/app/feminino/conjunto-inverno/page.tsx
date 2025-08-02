"use client";

import React, { useState } from 'react';
import { Star, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import './styles.scss';

export default function ConjuntoInvernoPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const products = [
    {
      id: 1,
      name: "Conjunto Inverno Moletom Feminino Cinza",
      price: 159.90,
      originalPrice: 219.90,
      image: "/api/placeholder/300/400",
      colors: ["#6b7280", "#000000", "#ec4899"],
      sizes: ["PP", "P", "M", "G", "GG"],
      rating: 4.9,
      reviews: 287,
      isNew: false,
      isLaunch: true,
      badge: "INVERNO 2024",
      category: "Moletom",
      line: "Comfort"
    },
    {
      id: 2,
      name: "Conjunto Tricot Gola Alta + Calça Nude",
      price: 189.90,
      originalPrice: 259.90,
      image: "/api/placeholder/300/400",
      colors: ["#d4af9a", "#000000", "#6b7280"],
      sizes: ["PP", "P", "M", "G"],
      rating: 4.8,
      reviews: 198,
      isNew: false,
      isLaunch: false,
      badge: "02 POR R$329",
      category: "Tricot",
      line: "Premium"
    },
    {
      id: 3,
      name: "Conjunto Plush Cropped + Calça Preta",
      price: 149.90,
      originalPrice: 199.90,
      image: "/api/placeholder/300/400",
      colors: ["#000000", "#6b7280", "#ec4899"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.7,
      reviews: 156,
      isNew: false,
      isLaunch: false,
      badge: "PLUSH",
      category: "Inverno",
      line: "Cozy"
    },
    {
      id: 4,
      name: "Conjunto Veludo Blazer + Calça Bordeaux",
      price: 199.90,
      originalPrice: 279.90,
      image: "/api/placeholder/300/400",
      colors: ["#7c2d12", "#000000", "#6b7280"],
      sizes: ["PP", "P", "M", "G", "GG"],
      rating: 4.9,
      reviews: 234,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Veludo",
      line: "Elegant"
    },
    {
      id: 5,
      name: "Conjunto Lã Oversized + Legging Cinza",
      price: 179.90,
      originalPrice: 239.90,
      image: "/api/placeholder/300/400",
      colors: ["#6b7280", "#000000", "#ffffff"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.8,
      reviews: 176,
      isNew: false,
      isLaunch: false,
      badge: "OVERSIZED",
      category: "Lã",
      line: "Warm"
    },
    {
      id: 6,
      name: "Conjunto Fleece Zip + Calça Verde Militar",
      price: 169.90,
      originalPrice: 229.90,
      image: "/api/placeholder/300/400",
      colors: ["#374151", "#000000", "#6b7280"],
      sizes: ["PP", "P", "M", "G"],
      rating: 4.6,
      reviews: 142,
      isNew: false,
      isLaunch: false,
      badge: "02 POR R$289",
      category: "Fleece",
      line: "Sport"
    },
    {
      id: 7,
      name: "Conjunto Cashmere Cropped + Saia Bege",
      price: 229.90,
      originalPrice: 319.90,
      image: "/api/placeholder/300/400",
      colors: ["#d4af9a", "#000000", "#ec4899"],
      sizes: ["PP", "P", "M", "G", "GG"],
      rating: 4.9,
      reviews: 203,
      isNew: false,
      isLaunch: true,
      badge: "",
      category: "Cashmere",
      line: "Luxury"
    },
    {
      id: 8,
      name: "Conjunto Sherpa Cropped + Short Branco",
      price: 139.90,
      originalPrice: 189.90,
      image: "/api/placeholder/300/400",
      colors: ["#ffffff", "#000000", "#6b7280"],
      sizes: ["P", "M", "G", "GG"],
      rating: 4.7,
      reviews: 165,
      isNew: false,
      isLaunch: false,
      badge: "SHERPA",
      category: "Comfort",
      line: "Cozy"
    }
  ];

  return (
    <div className="alphaco-style-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Conjuntos de Inverno</h1>
            <p>Aconchego e estilo para os dias mais frios. Descubra nossa coleção de conjuntos de inverno femininos.</p>
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
              <span className="products-count">42 produtos</span>
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
            <button className="quick-filter">Moletom</button>
            <button className="quick-filter">Tricot</button>
            <button className="quick-filter">Veludo</button>
            <button className="quick-filter">Lã</button>
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

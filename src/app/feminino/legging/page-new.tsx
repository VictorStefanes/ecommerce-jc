"use client";

import React, { useState } from 'react';
import { Star, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import './styles.scss';

export default function LeggingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedColors, setSelectedColors] = useState<{[key: string]: string}>({});
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});

  const products = [
    {
      id: "1",
      name: "Legging Feminina High Waist Preta",
      price: 89.90,
      originalPrice: 129.90,
      image: "/api/placeholder/300/400",
      colors: ["#000000", "#6b7280", "#1e40af"],
      sizes: ["PP", "P", "M", "G", "GG"],
      rating: 4.9,
      reviews: 312,
      stock: 50,
      isNew: false,
      isLaunch: true,
      badge: "HIGH WAIST",
      category: "Fitness",
      line: "Premium"
    },
    {
      id: "2",
      name: "Calça Legging Seamless Nude",
      price: 119.90,
      originalPrice: 159.90,
      image: "/api/placeholder/300/400",
      colors: ["#d4af9a", "#000000", "#ffffff"],
      sizes: ["PP", "P", "M", "G"],
      rating: 4.8,
      reviews: 287,
      stock: 30,
      isNew: false,
      isLaunch: false,
      badge: "SEAMLESS",
      category: "Premium",
      line: "Seamless"
    }
  ];

  // Funções para seleção
  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: any) => {
    const selectedColor = selectedColors[product.id] || product.colors[0];
    const selectedSize = selectedSizes[product.id] || product.sizes[0];

    if (!selectedColor || !selectedSize) {
      alert('Por favor, selecione cor e tamanho');
      return;
    }

    alert(`${product.name} - Cor: ${selectedColor}, Tamanho: ${selectedSize} - FUNCIONOU!`);
  };

  return (
    <div className="alphaco-style-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Leggings Femininas</h1>
            <p>Conforto e performance para treinos e dia a dia. Descubra nossa coleção de leggings com tecnologia e estilo.</p>
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
              <span className="products-count">{products.length} produtos</span>
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
            <button className="quick-filter">High Waist</button>
            <button className="quick-filter">Seamless</button>
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
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
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
                        className={`color-option ${selectedColors[product.id] === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        title={`Cor ${index + 1}`}
                        onClick={() => handleColorSelect(product.id, color)}
                      />
                    ))}
                  </div>

                  {/* Sizes */}
                  <div className="product-sizes">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSizes[product.id] === size ? 'selected' : ''}`}
                        onClick={() => handleSizeSelect(product.id, size)}
                      >
                        {size}
                      </button>
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

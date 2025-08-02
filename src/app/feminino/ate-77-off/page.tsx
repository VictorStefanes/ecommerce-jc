"use client";

import React, { useState } from 'react';
import { Flame, TrendingDown, Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import './styles.scss';

const Ate77OffPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const saleProducts = [
    {
      id: 1,
      name: "Conjunto Fitness Premium",
      price: 89.90,
      originalPrice: 389.90,
      discount: 77,
      image: "/api/placeholder/300/400",
      category: "conjuntos",
      rating: 4.9,
      reviews: 234,
      isLimited: true,
      stock: 12
    },
    {
      id: 2,
      name: "Legging High Waist Seamless",
      price: 69.90,
      originalPrice: 239.90,
      discount: 71,
      image: "/api/placeholder/300/400",
      category: "leggings",
      rating: 4.8,
      reviews: 189,
      isLimited: false,
      stock: 25
    },
    {
      id: 3,
      name: "Top Sports Bra Deluxe",
      price: 49.90,
      originalPrice: 179.90,
      discount: 72,
      image: "/api/placeholder/300/400",
      category: "tops",
      rating: 4.7,
      reviews: 156,
      isLimited: true,
      stock: 8
    },
    {
      id: 4,
      name: "Kit 3 Camisetas Dry Fit",
      price: 119.90,
      originalPrice: 519.90,
      discount: 77,
      image: "/api/placeholder/300/400",
      category: "camisetas",
      rating: 4.9,
      reviews: 312,
      isLimited: false,
      stock: 45
    },
    {
      id: 5,
      name: "Short Bike Premium",
      price: 39.90,
      originalPrice: 149.90,
      discount: 73,
      image: "/api/placeholder/300/400",
      category: "shorts",
      rating: 4.6,
      reviews: 98,
      isLimited: true,
      stock: 15
    },
    {
      id: 6,
      name: "Cropped Oversized Vintage",
      price: 59.90,
      originalPrice: 199.90,
      discount: 70,
      image: "/api/placeholder/300/400",
      category: "camisetas",
      rating: 4.8,
      reviews: 145,
      isLimited: false,
      stock: 32
    }
  ];

  const categories = [
    { key: 'todos', label: 'Todos', count: saleProducts.length },
    { key: 'conjuntos', label: 'Conjuntos', count: saleProducts.filter(p => p.category === 'conjuntos').length },
    { key: 'leggings', label: 'Leggings', count: saleProducts.filter(p => p.category === 'leggings').length },
    { key: 'tops', label: 'Tops', count: saleProducts.filter(p => p.category === 'tops').length },
    { key: 'camisetas', label: 'Camisetas', count: saleProducts.filter(p => p.category === 'camisetas').length },
    { key: 'shorts', label: 'Shorts', count: saleProducts.filter(p => p.category === 'shorts').length }
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? saleProducts 
    : saleProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="sale-77-page">
      {/* Fire Sale Hero */}
      <section className="fire-sale-hero">
        <div className="fire-background">
          <div className="flames">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`flame flame-${i + 1}`}>🔥</div>
            ))}
          </div>
          <div className="sparks">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`spark spark-${i + 1}`}>✨</div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="sale-announcement">
              <div className="fire-badge">
                <Flame size={24} />
                <span>LIQUIDAÇÃO TOTAL</span>
                <Flame size={24} />
              </div>

              <h1>
                <span className="main-text">ATÉ</span>
                <span className="percentage">77%</span>
                <span className="off-text">OFF</span>
              </h1>

              <p className="hero-description">
                A maior liquidação do ano chegou! Produtos femininos com descontos imperdíveis. 
                Aproveite antes que acabe o estoque!
              </p>

              <div className="sale-stats">
                <div className="stat">
                  <TrendingDown size={24} />
                  <div className="stat-info">
                    <span className="number">300+</span>
                    <span className="label">Produtos</span>
                  </div>
                </div>
                <div className="stat">
                  <Flame size={24} />
                  <div className="stat-info">
                    <span className="number">50-77%</span>
                    <span className="label">Desconto</span>
                  </div>
                </div>
                <div className="stat">
                  <Heart size={24} />
                  <div className="stat-info">
                    <span className="number">4.8★</span>
                    <span className="label">Avaliação</span>
                  </div>
                </div>
              </div>

              <button className="shop-sale-btn">
                <Flame size={20} />
                COMPRAR AGORA
                <span className="btn-fire">🔥</span>
              </button>
            </div>

            <div className="hero-visual">
              <div className="discount-showcase">
                <div className="product-example">
                  <img src="/api/placeholder/350/450" alt="Produto em promoção" />
                  <div className="price-tag">
                    <span className="was">R$ 389,90</span>
                    <span className="now">R$ 89,90</span>
                    <span className="save">77% OFF</span>
                  </div>
                </div>
                <div className="floating-discounts">
                  <div className="discount-bubble bubble-1">-70%</div>
                  <div className="discount-bubble bubble-2">-77%</div>
                  <div className="discount-bubble bubble-3">-65%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          <h2>Encontre sua categoria</h2>
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-tab ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <span className="category-name">{category.label}</span>
                <span className="category-count">{category.count}</span>
                <div className="fire-indicator">🔥</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="sale-products">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Liquidação</h2>
            <p>Descontos de até 77% - Estoque limitado!</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="sale-card">
                <div className="discount-badge">
                  <Flame size={16} />
                  -{product.discount}%
                </div>

                {product.isLimited && (
                  <div className="limited-badge">
                    ESTOQUE LIMITADO
                  </div>
                )}

                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="image-overlay">
                    <button className="quick-view">
                      <Eye size={18} />
                    </button>
                    <button className="add-to-wishlist">
                      <Heart size={18} />
                    </button>
                  </div>
                  <div className="stock-indicator">
                    <div className="stock-bar">
                      <div 
                        className="stock-fill" 
                        style={{ width: `${Math.min(product.stock / 50 * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="stock-text">Restam {product.stock} unidades</span>
                  </div>
                </div>

                <div className="product-details">
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    <span className="rating-count">({product.reviews})</span>
                  </div>

                  <h3 className="product-name">{product.name}</h3>

                  <div className="price-comparison">
                    <div className="current-price">R$ {product.price.toFixed(2)}</div>
                    <div className="original-price">R$ {product.originalPrice.toFixed(2)}</div>
                    <div className="savings">
                      Economize R$ {(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </div>

                  <button className="add-to-cart-sale">
                    <ShoppingCart size={16} />
                    ADICIONAR AGORA
                    {product.isLimited && <span className="urgency">⚡</span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="urgency-section">
        <div className="container">
          <div className="urgency-content">
            <div className="urgency-icon">⚠️</div>
            <div className="urgency-text">
              <h3>Últimas Horas da Liquidação!</h3>
              <p>Produtos com estoque limitado. Garanta já o seu antes que esgote!</p>
            </div>
            <div className="urgency-cta">
              <button className="final-cta">
                <Flame size={20} />
                VER TODOS OS PRODUTOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Benefits */}
      <section className="sale-benefits">
        <div className="container">
          <h2>Vantagens da Liquidação</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <h3>Frete Grátis</h3>
              <p>Em compras acima de R$ 99</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💳</div>
              <h3>Parcelamento</h3>
              <p>Até 3x sem juros no cartão</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔄</div>
              <h3>Troca Garantida</h3>
              <p>30 dias para trocar</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🏷️</div>
              <h3>Preço Justo</h3>
              <p>Os menores preços garantidos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ate77OffPage;

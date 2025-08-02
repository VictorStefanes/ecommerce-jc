"use client";

import React, { useState } from 'react';
import { Heart, Star, Sparkles, Wind, Droplet } from 'lucide-react';
import './styles.scss';

const CamisetasDryFitFemininoPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const products = [
    {
      id: 1,
      name: "Camiseta Dry Fit Feminina Essential",
      price: 79.90,
      originalPrice: 119.90,
      image: "/api/placeholder/300/400",
      colors: ["#FFB6C1", "#DDA0DD", "#87CEEB", "#98FB98"],
      sizes: ["PP", "P", "M", "G"],
      style: "basic",
      isNew: true,
      rating: 4.9,
      reviews: 156
    },
    {
      id: 2,
      name: "Camiseta Dry Fit Cropped Sport",
      price: 69.90,
      originalPrice: 99.90,
      image: "/api/placeholder/300/400",
      colors: ["#000", "#FF69B4", "#20B2AA"],
      sizes: ["PP", "P", "M", "G", "GG"],
      style: "cropped",
      isNew: false,
      rating: 4.8,
      reviews: 203
    },
    {
      id: 3,
      name: "Camiseta Dry Fit Oversized",
      price: 84.90,
      originalPrice: 129.90,
      image: "/api/placeholder/300/400",
      colors: ["#F0E68C", "#DDA0DD", "#B0E0E6"],
      sizes: ["P", "M", "G", "GG"],
      style: "oversized",
      isNew: true,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: "Camiseta Dry Fit Performance",
      price: 89.90,
      originalPrice: 139.90,
      image: "/api/placeholder/300/400",
      colors: ["#FF1493", "#9370DB", "#32CD32", "#000"],
      sizes: ["PP", "P", "M", "G"],
      style: "performance",
      isNew: false,
      rating: 4.9,
      reviews: 267
    }
  ];

  const filteredProducts = selectedFilter === 'todos' 
    ? products 
    : products.filter(product => product.style === selectedFilter);

  return (
    <div className="dry-fit-feminino-page">
      {/* Hero Section - Feminino */}
      <section className="feminine-hero">
        <div className="hero-background">
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          <div className="sparkles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`sparkle sparkle-${i + 1}`}>✨</div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Sparkles size={18} />
                <span>Coleção Feminina</span>
              </div>
              
              <h1>
                <span className="main-title">DRY FIT</span>
                <span className="sub-title">FEMININO</span>
                <span className="accent">Performance & Estilo</span>
              </h1>
              
              <p>Tecnologia avançada que combina performance esportiva com design exclusivamente feminino. Peças que acompanham cada movimento com elegância.</p>
              
              <div className="features-preview">
                <div className="feature-item">
                  <Wind size={20} />
                  <span>Respirabilidade</span>
                </div>
                <div className="feature-item">
                  <Droplet size={20} />
                  <span>Secagem Rápida</span>
                </div>
                <div className="feature-item">
                  <Sparkles size={20} />
                  <span>UV Protection</span>
                </div>
              </div>

              <button className="cta-button">
                <span>Explorar Coleção</span>
                <div className="button-sparkle"></div>
              </button>
            </div>

            <div className="hero-visual">
              <div className="product-carousel">
                <div className="carousel-item active">
                  <img src="/api/placeholder/400/500" alt="Camiseta Dry Fit Feminina" />
                  <div className="product-tag">
                    <span className="price">R$ 79,90</span>
                    <span className="name">Essential Pink</span>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/api/placeholder/350/450" alt="Camiseta Dry Fit Cropped" />
                </div>
                <div className="carousel-item">
                  <img src="/api/placeholder/380/480" alt="Camiseta Dry Fit Oversized" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Style Filter Section */}
      <section className="style-filter-section">
        <div className="container">
          <div className="filter-header">
            <h2>Encontre seu estilo perfeito</h2>
            <p>Cada silhueta pensada para realçar sua beleza natural</p>
          </div>

          <div className="style-filters">
            {[
              { key: 'todos', label: 'Todos os Estilos', count: products.length },
              { key: 'basic', label: 'Básica', count: products.filter(p => p.style === 'basic').length },
              { key: 'cropped', label: 'Cropped', count: products.filter(p => p.style === 'cropped').length },
              { key: 'oversized', label: 'Oversized', count: products.filter(p => p.style === 'oversized').length },
              { key: 'performance', label: 'Performance', count: products.filter(p => p.style === 'performance').length }
            ].map((filter) => (
              <button
                key={filter.key}
                className={`style-filter ${selectedFilter === filter.key ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.key)}
              >
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="products-showcase">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card-feminine">
                {product.isNew && (
                  <div className="new-badge">
                    <Sparkles size={14} />
                    Novo
                  </div>
                )}
                
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="image-overlay">
                    <button className="favorite-btn">
                      <Heart size={20} />
                    </button>
                    <button className="quick-shop">Compra Rápida</button>
                  </div>
                </div>

                <div className="product-details">
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < Math.floor(product.rating) ? "#FFD700" : "none"}
                          color="#FFD700"
                        />
                      ))}
                    </div>
                    <span className="reviews">({product.reviews})</span>
                  </div>

                  <h3 className="product-name">{product.name}</h3>

                  <div className="color-palette">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        title={`Cor ${index + 1}`}
                      ></span>
                    ))}
                  </div>

                  <div className="size-guide">
                    <span className="size-label">Tamanhos:</span>
                    <div className="sizes">
                      {product.sizes.map((size) => (
                        <span key={size} className="size-option">{size}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pricing">
                    <span className="current-price">R$ {product.price.toFixed(2)}</span>
                    <span className="original-price">R$ {product.originalPrice.toFixed(2)}</span>
                    <span className="discount">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  <button className="add-to-cart-btn">
                    <span>Adicionar ao Carrinho</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-feminine">
        <div className="container">
          <div className="benefits-header">
            <h2>Por que escolher Dry Fit Feminino?</h2>
            <p>Tecnologia pensada especialmente para o universo feminino</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <div className="icon-bg">👩‍💼</div>
              </div>
              <h3>Versatilidade</h3>
              <p>Do treino ao trabalho, peças que se adaptam ao seu dia a dia dinâmico</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <div className="icon-bg">💨</div>
              </div>
              <h3>Leveza</h3>
              <p>Tecido ultra leve que não marca e proporciona movimento livre</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <div className="icon-bg">🌸</div>
              </div>
              <h3>Feminilidade</h3>
              <p>Cortes e cores pensados para realçar a beleza feminina</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <div className="icon-bg">⚡</div>
              </div>
              <h3>Performance</h3>
              <p>Tecnologia anti-odor e controle de temperatura para máximo desempenho</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Feminine */}
      <section className="newsletter-feminine">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <div className="newsletter-icon">💌</div>
              <h2>Seja a primeira a saber</h2>
              <p>Receba novidades, dicas de styling e ofertas exclusivas</p>
              
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail"
                  className="email-input"
                />
                <button className="subscribe-btn">
                  <span>Cadastrar</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
            <div className="newsletter-visual">
              <div className="floating-elements">
                <span className="element">💕</span>
                <span className="element">✨</span>
                <span className="element">🌸</span>
                <span className="element">💎</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CamisetasDryFitFemininoPage;

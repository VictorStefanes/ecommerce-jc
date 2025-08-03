"use client";

import React, { useState, useEffect } from 'react';
import { Star, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import './styles.scss';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: Array<{ url: string; alt?: string }>;
  shortDescription?: string;
  badge?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  colors?: Array<{ name: string; code: string }>;
  sizes?: Array<{ name: string }>;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isPromotion?: boolean;
}

const CamisetasPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Buscar produtos da categoria masculino usando a nova rota de filtros
      const response = await fetch(`/api/products/filter?category=masculino&sort=${sortBy}`);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getMainImage = (images: Array<{ url: string }>) => {
    return images && images.length > 0 ? images[0].url : '/placeholder-product.jpg';
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="alphaco-style-page">
        <div className="container">
          <h2>Carregando camisetas...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alphaco-style-page">
        <div className="container">
          <h2>Erro ao carregar produtos</h2>
          <p>{error}</p>
          <button onClick={fetchProducts}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="alphaco-style-page">
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Camisetas Masculinas</h1>
            <p>Descubra nossa coleção exclusiva de camisetas masculinas de alta qualidade</p>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/masculino">Masculino</Link>
              <span>/</span>
              <span>Camisetas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          {products.length === 0 ? (
            <div className="no-products">
              <h3>Nenhum produto encontrado</h3>
              <p>Não encontramos camisetas nesta categoria. Que tal explorar outras opções?</p>
              <Link href="/masculino">Explorar Masculino</Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => {
                const mainImage = getMainImage(product.images);
                
                return (
                  <div key={product._id} className="product-card">
                    <Link href={`/produtos/${product.category.slug}/${product.slug}`}>
                      <div className="product-image">
                        <img
                          src={mainImage}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    </Link>

                    <div className="product-info">
                      <h3 className="product-name">
                        <Link href={`/produtos/${product.category.slug}/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      
                      <div className="product-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>

                      <button className="add-to-cart-btn">
                        <ShoppingBag size={16} />
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CamisetasPage;

  return (
    <div className="alphaco-style-page">
      {/* Header Section */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1>Camisetas Masculinas</h1>
            <p>Tecnologia Dry Fit para máximo conforto e estilo em qualquer ocasião.</p>
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
              <span className="products-count">24 produtos</span>
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
            <button className="quick-filter">Essential</button>
            <button className="quick-filter">Linha Apex</button>
            <button className="quick-filter">Oversized</button>
            <button className="quick-filter">Training</button>
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
};

export default CamisetasPage;
